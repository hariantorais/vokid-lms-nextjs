'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAssignmentSchema } from '../validations';
import type { Assignment } from '@/types/database';
import type { ActionResponse } from '@/features/shared/types/storage';

function parsePayload(input: unknown): Record<string, unknown> {
  if (input instanceof FormData) {
    const obj: Record<string, unknown> = {};
    input.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
  if (typeof input === 'object' && input !== null) {
    return input as Record<string, unknown>;
  }
  return {};
}

async function verifyTeacherRole(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<{ authorized: true; userId: string } | { authorized: false; error: string }> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { authorized: false, error: 'Sesi kedaluwarsa atau belum masuk. Silakan login kembali.' };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return { authorized: false, error: 'Profil pengguna tidak ditemukan dalam basis data.' };
  }

  if (profile.role !== 'GURU') {
    return { authorized: false, error: 'Akses ditolak. Tindakan ini hanya boleh dilakukan oleh Guru.' };
  }

  return { authorized: true, userId: user.id };
}

/**
 * Server Action: Pembuatan Tugas Siswa (Assignment) Baru oleh Guru
 */
export async function createAssignmentAction(formData: unknown): Promise<ActionResponse<Assignment>> {
  try {
    const rawPayload = parsePayload(formData);
    const validationResult = createAssignmentSchema.safeParse(rawPayload);

    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      return { success: false, error: issue ? issue.message : 'Data penugasan tidak valid.' };
    }

    const {
      lessonId,
      type,
      prompt,
      instructionAudioUrl,
      dueDate,
      quizQuestionCount,
      passingScore,
      questions,
    } = validationResult.data;

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    if (type === 'QUIZ_CBT') {
      if (!questions || questions.length === 0) {
        return { success: false, error: 'Tugas Pilihan Ganda CBT wajib memiliki minimal 1 soal dalam bank soal.' };
      }
    }

    const { data: newAssignment, error: insertError } = await supabase
      .from('assignments')
      .insert({
        lesson_id: lessonId,
        type,
        prompt,
        instruction_audio_url: instructionAudioUrl,
        due_date: dueDate,
        quiz_question_count: type === 'QUIZ_CBT' ? (quizQuestionCount ?? questions?.length ?? 5) : null,
        passing_score: type === 'QUIZ_CBT' ? (passingScore ?? 60) : null,
      })
      .select()
      .single();

    if (insertError || !newAssignment) {
      console.error('[Action Error] Gagal insert penugasan:', insertError);
      return {
        success: false,
        error: `Gagal menyimpan penugasan siswa: ${insertError?.message ?? 'Kesalahan basis data'}`,
      };
    }

    // Jika tipe QUIZ_CBT, simpan bank soal ke tabel quiz_questions
    if (type === 'QUIZ_CBT' && questions && questions.length > 0) {
      const questionRows = questions.map((q, idx) => ({
        assignment_id: newAssignment.id,
        question_text: q.questionText,
        option_a: q.optionA,
        option_b: q.optionB,
        option_c: q.optionC,
        option_d: q.optionD,
        correct_answer: q.correctAnswer,
        explanation: q.explanation || null,
        order_index: idx + 1,
      }));

      const { error: questionsError } = await supabase
        .from('quiz_questions')
        .insert(questionRows);

      if (questionsError) {
        console.error('[Action Error] Gagal insert bank soal:', questionsError);
        // Rollback assignment jika gagal insert soal
        await supabase.from('assignments').delete().eq('id', newAssignment.id);
        return {
          success: false,
          error: `Gagal menyimpan bank soal kuis: ${questionsError.message}`,
        };
      }
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return {
      success: true,
      data: newAssignment,
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in createAssignmentAction:', err);
    const errorMsg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem yang tidak diharapkan.';
    return { success: false, error: errorMsg };
  }
}

/**
 * Server Action: Mengambil bank soal untuk suatu kuis CBT
 */
export async function getQuizQuestionsAction(assignmentId: string): Promise<ActionResponse<any[]>> {
  try {
    const supabase = await createClient();
    const { data: questions, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('assignment_id', assignmentId)
      .order('order_index', { ascending: true });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: questions ?? [] };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Gagal memuat soal kuis.',
    };
  }
}
