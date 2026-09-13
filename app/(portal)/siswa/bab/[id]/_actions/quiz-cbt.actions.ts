'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/features/shared/types/storage';
import type { Submission } from '@/types/database';

export interface QuizQuestionPublic {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  order_index: number;
}

export interface QuizCbtSessionData {
  assignmentId: string;
  prompt: string;
  totalPoolCount: number;
  displayCount: number;
  passingScore: number;
  questions: QuizQuestionPublic[];
}

export interface SubmitQuizAnswerInput {
  assignmentId: string;
  answers: Array<{
    questionId: string;
    selectedOption: 'A' | 'B' | 'C' | 'D';
  }>;
}

export interface QuizEvaluationResult {
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  passed: boolean;
  passingScore: number;
  isPerfect: boolean;
  isExcellent: boolean;
  isGood: boolean;
  isNeedsRetry: boolean;
  submissionId: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function getQuizSessionForStudentAction(
  assignmentId: string
): Promise<ActionResponse<QuizCbtSessionData>> {
  try {
    const supabase = await createClient();

    const { data: assignment, error: asgError } = await supabase
      .from('assignments')
      .select('id, type, prompt, quiz_question_count, passing_score')
      .eq('id', assignmentId)
      .single();

    if (asgError || !assignment) {
      return { success: false, error: 'Kuis tidak ditemukan atau telah dihapus.' };
    }

    if (assignment.type !== 'QUIZ_CBT') {
      return { success: false, error: 'Penugasan ini bukan format Kuis CBT Pilihan Ganda.' };
    }

    const { data: rawQuestions, error: qError } = await supabase
      .from('quiz_questions')
      .select('id, question_text, option_a, option_b, option_c, option_d, order_index')
      .eq('assignment_id', assignmentId)
      .order('order_index', { ascending: true });

    if (qError) {
      console.error('[Action Error] Gagal memuat soal kuis:', qError);
      return { success: false, error: 'Gagal memuat daftar soal kuis.' };
    }

    const allQuestions = (rawQuestions ?? []) as QuizQuestionPublic[];
    if (allQuestions.length === 0) {
      return {
        success: false,
        error: 'Belum ada butir pertanyaan yang disiapkan guru untuk kuis ini.',
      };
    }

    const targetCount = assignment.quiz_question_count ?? allQuestions.length;
    const shuffled = shuffleArray(allQuestions);
    const selectedQuestions = shuffled.slice(0, Math.min(targetCount, shuffled.length));

    return {
      success: true,
      data: {
        assignmentId: assignment.id,
        prompt: assignment.prompt,
        totalPoolCount: allQuestions.length,
        displayCount: selectedQuestions.length,
        passingScore: assignment.passing_score ?? 70,
        questions: selectedQuestions,
      },
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in getQuizSessionForStudentAction:', err);
    const msg = err instanceof Error ? err.message : 'Kesalahan sistem saat memuat kuis.';
    return { success: false, error: msg };
  }
}

export async function submitQuizCbtAction(
  payload: SubmitQuizAnswerInput
): Promise<ActionResponse<QuizEvaluationResult>> {
  try {
    const { assignmentId, answers } = payload;
    if (!assignmentId || !Array.isArray(answers) || answers.length === 0) {
      return { success: false, error: 'Lembar jawaban tidak valid atau kosong.' };
    }

    const supabase = await createClient();

    // 1. Verifikasi Autentikasi Pengguna
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return {
        success: false,
        error: 'Sesi belajar siswa telah berakhir. Silakan login kembali.',
      };
    }

    const studentId = user.id;

    // 2. Ambil penugasan dan kriteria kelulusan
    const { data: assignment, error: asgError } = await supabase
      .from('assignments')
      .select(`
        id,
        passing_score,
        lessons (
          id,
          modules (
            id,
            subjects (
              id,
              class_id
            )
          )
        )
      `)
      .eq('id', assignmentId)
      .single();

    if (asgError || !assignment) {
      return { success: false, error: 'Penugasan kuis tidak ditemukan.' };
    }

    const passingScore = assignment.passing_score ?? 70;

    // 3. Ambil Kunci Jawaban Resmi dari Server
    const questionIds = answers.map((a) => a.questionId);
    const { data: officialQuestions, error: keyError } = await supabase
      .from('quiz_questions')
      .select('id, correct_answer')
      .in('id', questionIds);

    if (keyError || !officialQuestions) {
      console.error('[Action Error] Gagal memuat kunci jawaban:', keyError);
      return { success: false, error: 'Gagal memverifikasi kunci jawaban kuis.' };
    }

    const keyMap = new Map<string, string>(
      officialQuestions.map((q) => [q.id, q.correct_answer])
    );

    // 4. Kalkulasi Nilai
    let correctCount = 0;
    for (const ans of answers) {
      const rightKey = keyMap.get(ans.questionId);
      if (rightKey && rightKey.toUpperCase() === ans.selectedOption.toUpperCase()) {
        correctCount++;
      }
    }

    const totalQuestions = answers.length;
    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    const passed = finalScore >= passingScore;

    // 5. Simpan / Perbarui Entri Submissions
    const { data: existingSub } = await supabase
      .from('submissions')
      .select('id, score')
      .eq('assignment_id', assignmentId)
      .eq('student_id', studentId)
      .maybeSingle();

    let submissionRecord: Submission | null = null;

    if (existingSub) {
      const bestScore = Math.max(existingSub.score ?? 0, finalScore);
      const { data: updatedSub, error: updateError } = await supabase
        .from('submissions')
        .update({
          score: bestScore,
          grade: bestScore,
          status: 'GRADED',
          teacher_feedback: `Kuis CBT: ${correctCount} dari ${totalQuestions} soal benar (Skor: ${finalScore})`,
          teacher_feedback_text: `Kuis CBT: ${correctCount} dari ${totalQuestions} soal benar (Skor: ${finalScore})`,
          submitted_at: new Date().toISOString(),
        })
        .eq('id', existingSub.id)
        .select()
        .single();

      if (updateError) {
        console.error('[Action Error] Gagal memperbarui nilai submission:', updateError);
        return { success: false, error: 'Gagal memperbarui rekaman nilai kuis.' };
      }
      submissionRecord = updatedSub as unknown as Submission;
    } else {
      const { data: newSub, error: insertError } = await supabase
        .from('submissions')
        .insert({
          assignment_id: assignmentId,
          student_id: studentId,
          file_url: `cbt://assignment/${assignmentId}`,
          status: 'GRADED',
          score: finalScore,
          grade: finalScore,
          teacher_feedback: `Kuis CBT: ${correctCount} dari ${totalQuestions} soal benar (Skor: ${finalScore})`,
          teacher_feedback_text: `Kuis CBT: ${correctCount} dari ${totalQuestions} soal benar (Skor: ${finalScore})`,
        })
        .select()
        .single();

      if (insertError) {
        console.error('[Action Error] Gagal menyimpan submission baru:', insertError);
        return { success: false, error: 'Gagal menyimpan hasil kuis siswa.' };
      }
      submissionRecord = newSub as unknown as Submission;
    }

    // Revalidasi rute
    const lessonData = assignment.lessons;
    const moduleId = lessonData?.modules?.id;
    const classId = lessonData?.modules?.subjects?.class_id;

    revalidatePath('/siswa');
    if (classId) {
      revalidatePath(`/siswa/kelas/${classId}`);
    }
    if (moduleId) {
      revalidatePath(`/siswa/bab/${moduleId}`);
    }
    revalidatePath('/guru');

    const resultPayload: QuizEvaluationResult = {
      score: finalScore,
      totalQuestions,
      correctCount,
      wrongCount: totalQuestions - correctCount,
      passed,
      passingScore,
      isPerfect: finalScore === 100,
      isExcellent: finalScore >= 80,
      isGood: finalScore >= 60 && finalScore < 80,
      isNeedsRetry: finalScore < 60,
      submissionId: submissionRecord?.id ?? '',
    };

    return {
      success: true,
      data: resultPayload,
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in submitQuizCbtAction:', err);
    const msg = err instanceof Error ? err.message : 'Kesalahan sistem saat evaluasi kuis.';
    return { success: false, error: msg };
  }
}