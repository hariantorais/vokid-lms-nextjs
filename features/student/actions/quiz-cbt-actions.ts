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
  isExcellent: boolean; // >= 80
  isGood: boolean;      // 60 - 79
  isNeedsRetry: boolean; // < 60
  submissionId: string;
}

/**
 * Helper fisher-yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Server Action: Mengambil soal kuis CBT yang diacak untuk sesi pengerjaan siswa.
 * Soal diambil dari bank soal, diacak (shuffled), dan dibatasi sesuai quiz_question_count.
 * Catatan: Kunci jawaban sengaja TIDAK dikirimkan ke client demi integritas ujian CBT.
 */
export async function getQuizSessionForStudentAction(
  assignmentId: string
): Promise<ActionResponse<QuizCbtSessionData>> {
  try {
    const supabase = await createClient();

    // 1. Ambil detail tugas kuis
    const { data: assignment, error: asgError } = await supabase
      .from('assignments')
      .select('id, prompt, quiz_question_count, passing_score')
      .eq('id', assignmentId)
      .single();

    if (asgError || !assignment) {
      return { success: false, error: 'Tugas kuis CBT tidak ditemukan.' };
    }

    // 2. Ambil seluruh bank soal kuis
    const { data: allQuestions, error: qError } = await supabase
      .from('quiz_questions')
      .select('id, question_text, option_a, option_b, option_c, option_d, order_index')
      .eq('assignment_id', assignmentId);

    if (qError || !allQuestions || allQuestions.length === 0) {
      return { success: false, error: 'Bank soal kuis belum tersedia atau masih kosong.' };
    }

    // 3. Acak (randomize) soal
    const shuffled = shuffleArray(allQuestions);

    // 4. Batasi jumlah soal yang tampil sesuai quiz_question_count
    const targetCount = assignment.quiz_question_count && assignment.quiz_question_count > 0
      ? Math.min(assignment.quiz_question_count, shuffled.length)
      : shuffled.length;

    const selectedQuestions = shuffled.slice(0, targetCount).map((q, idx) => ({
      ...q,
      order_index: idx + 1,
    }));

    return {
      success: true,
      data: {
        assignmentId: assignment.id,
        prompt: assignment.prompt,
        totalPoolCount: allQuestions.length,
        displayCount: targetCount,
        passingScore: Number(assignment.passing_score ?? 60),
        questions: selectedQuestions,
      },
    };
  } catch (err: unknown) {
    console.error('[Quiz Action Error] Exception in getQuizSessionForStudentAction:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Gagal memuat sesi kuis CBT.',
    };
  }
}

/**
 * Server Action: Mengoreksi jawaban kuis CBT secara instan di server dan menyimpan skor ke Supabase.
 */
export async function submitQuizCbtAction(
  payload: SubmitQuizAnswerInput
): Promise<ActionResponse<QuizEvaluationResult>> {
  try {
    const { assignmentId, answers } = payload;
    if (!assignmentId || !answers || answers.length === 0) {
      return { success: false, error: 'Jawaban kuis tidak boleh kosong.' };
    }

    const supabase = await createClient();

    // 1. Identifikasi siswa aktif
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    let studentId: string;
    if (!user || authError) {
      if (process.env.NODE_ENV === 'development') {
        studentId = '22222222-2222-2222-2222-222222222222'; // Budi Pratama (Seed Dev)
      } else {
        return { success: false, error: 'Sesi siswa telah berakhir. Silakan masuk kembali.' };
      }
    } else {
      studentId = user.id;
    }

    // 2. Ambil informasi assignment dan passing score
    const { data: assignment, error: asgError } = await supabase
      .from('assignments')
      .select(`
        id,
        prompt,
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
      return { success: false, error: 'Tugas kuis tidak ditemukan.' };
    }

    // 3. Ambil kunci jawaban yang sah dari database untuk id pertanyaan yang dijawab
    const questionIds = answers.map((a) => a.questionId);
    const { data: correctQuestions, error: cqError } = await supabase
      .from('quiz_questions')
      .select('id, correct_answer')
      .in('id', questionIds);

    if (cqError || !correctQuestions) {
      return { success: false, error: 'Gagal memverifikasi kunci jawaban di server.' };
    }

    const answerKeyMap = new Map<string, string>(
      correctQuestions.map((cq) => [cq.id, cq.correct_answer])
    );

    // 4. Koreksi otomatis langsung di server
    let correctCount = 0;
    for (const ans of answers) {
      const correct = answerKeyMap.get(ans.questionId);
      if (correct && correct === ans.selectedOption) {
        correctCount++;
      }
    }

    const totalQuestions = answers.length;
    const rawScore = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
    const finalScore = Math.round(rawScore * 100) / 100;
    const passingScore = Number(assignment.passing_score ?? 60);
    const passed = finalScore >= passingScore;

    const isPerfect = finalScore >= 100;
    const isExcellent = finalScore >= 80 && !isPerfect;
    const isGood = finalScore >= 60 && finalScore < 80;
    const isNeedsRetry = finalScore < 60;

    // 5. Simpan / Perbarui hasil ke tabel submissions dengan status 'GRADED'
    // Cek apakah siswa sudah pernah mengerjakan sebelumnya
    const { data: existingSub } = await supabase
      .from('submissions')
      .select('id')
      .eq('assignment_id', assignmentId)
      .eq('student_id', studentId)
      .maybeSingle();

    let submissionId = '';
    const feedbackText = isPerfect
      ? 'Hebat sekali! Skor Sempurna 100! Kamu menjawab semua soal dengan tepat.'
      : isExcellent
      ? `Luar biasa! Nilai kamu ${finalScore}. Pemahamanmu sangat baik.`
      : isGood
      ? `Bagus! Nilai kamu ${finalScore}. Kamu sudah mencapai KKM.`
      : `Nilai kamu ${finalScore}. Belum mencapai batas KKM (${passingScore}). Jangan berkecil hati, ayo ulangi kuis dengan soal baru!`;

    if (existingSub) {
      submissionId = existingSub.id;
      await supabase
        .from('submissions')
        .update({
          score: finalScore,
          grade: finalScore,
          status: 'GRADED',
          teacher_feedback: feedbackText,
          teacher_feedback_text: feedbackText,
          graded_at: new Date().toISOString(),
          submitted_at: new Date().toISOString(),
        })
        .eq('id', existingSub.id);
    } else {
      const { data: newSub, error: subError } = await supabase
        .from('submissions')
        .insert({
          assignment_id: assignmentId,
          student_id: studentId,
          file_url: 'cbt://quiz_result',
          score: finalScore,
          grade: finalScore,
          status: 'GRADED',
          teacher_feedback: feedbackText,
          teacher_feedback_text: feedbackText,
          graded_at: new Date().toISOString(),
          submitted_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (subError || !newSub) {
        return { success: false, error: `Gagal mencatat nilai kuis: ${subError?.message}` };
      }
      submissionId = newSub.id;
    }

    // Revalidate paths
    revalidatePath('/siswa');
    revalidatePath('/guru');

    return {
      success: true,
      data: {
        score: finalScore,
        totalQuestions,
        correctCount,
        wrongCount: totalQuestions - correctCount,
        passed,
        passingScore,
        isPerfect,
        isExcellent,
        isGood,
        isNeedsRetry,
        submissionId,
      },
    };
  } catch (err: unknown) {
    console.error('[Quiz Submit Error] Exception in submitQuizCbtAction:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Gagal mengirimkan lembar kuis CBT.',
    };
  }
}
