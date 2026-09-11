/**
 * Re-export student services from localized route modules
 * to preserve backward compatibility for tests and existing consumers.
 */
export {
  getStudentClassrooms,
} from '@/app/(portal)/siswa/_services/siswa-portal.service';

export {
  getStudentClassroom,
  type StudentClassroomData,
  type StudentAssignment,
  type LessonWithAssignment,
} from '@/app/(portal)/siswa/kelas/[id]/_services/student-classroom.service';

export {
  getStudentLessons,
} from '@/app/(portal)/siswa/kelas/[id]/bab/[moduleId]/_services/student-bab.service';
