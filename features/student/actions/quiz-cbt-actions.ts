/**
 * Re-export quiz CBT actions from localized route modules
 */
export {
  getQuizSessionForStudentAction,
  submitQuizCbtAction,
  type QuizQuestionPublic,
  type QuizCbtSessionData,
  type SubmitQuizAnswerInput,
  type QuizEvaluationResult,
} from '@/app/(portal)/siswa/kelas/[id]/bab/[moduleId]/_actions/quiz-cbt.actions';
