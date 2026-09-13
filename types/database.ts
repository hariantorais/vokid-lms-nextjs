export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      assignments: {
        Row: {
          created_at: string
          due_date: string | null
          id: string
          instruction_audio_url: string | null
          lesson_id: string
          passing_score: number | null
          prompt: string
          quiz_question_count: number | null
          type: Database["public"]["Enums"]["assignment_type"]
        }
        Insert: {
          created_at?: string
          due_date?: string | null
          id?: string
          instruction_audio_url?: string | null
          lesson_id: string
          passing_score?: number | null
          prompt: string
          quiz_question_count?: number | null
          type: Database["public"]["Enums"]["assignment_type"]
        }
        Update: {
          created_at?: string
          due_date?: string | null
          id?: string
          instruction_audio_url?: string | null
          lesson_id?: string
          passing_score?: number | null
          prompt?: string
          quiz_question_count?: number | null
          type?: Database["public"]["Enums"]["assignment_type"]
        }
        Relationships: [
          {
            foreignKeyName: "assignments_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          academic_year: string
          created_at: string
          created_by: string | null
          grade_level: number
          id: string
          name: string
        }
        Insert: {
          academic_year: string
          created_at?: string
          created_by?: string | null
          grade_level: number
          id?: string
          name: string
        }
        Update: {
          academic_year?: string
          created_at?: string
          created_by?: string | null
          grade_level?: number
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_competency_evaluations: {
        Row: {
          evaluated_at: string | null
          id: string
          lesson_id: string
          mastery_level: string
          notes: string | null
          student_id: string
          tp_indicator_text: string
        }
        Insert: {
          evaluated_at?: string | null
          id?: string
          lesson_id: string
          mastery_level: string
          notes?: string | null
          student_id: string
          tp_indicator_text: string
        }
        Update: {
          evaluated_at?: string | null
          id?: string
          lesson_id?: string
          mastery_level?: string
          notes?: string | null
          student_id?: string
          tp_indicator_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_competency_evaluations_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_competency_evaluations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_completions: {
        Row: {
          completed_at: string
          id: string
          lesson_id: string
          student_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          lesson_id: string
          student_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          lesson_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_completions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_completions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_schedules: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          lesson_id: string
          scheduled_date: string
          status: string
          student_id: string
          time_block: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lesson_id: string
          scheduled_date: string
          status?: string
          student_id: string
          time_block: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string
          scheduled_date?: string
          status?: string
          student_id?: string
          time_block?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_schedules_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_schedules_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          allocated_minutes: number | null
          audio_url: string | null
          content_text: string | null
          content_type: Database["public"]["Enums"]["content_type"]
          content_url: string | null
          created_at: string
          id: string
          image_url: string | null
          intro_guide: Json | null
          joyful_guide: Json | null
          learning_objectives: string | null
          meaningful_guide: Json | null
          mindful_guide: Json | null
          module_id: string
          order_index: number
          pdf_url: string | null
          required_materials: string[] | null
          title: string
        }
        Insert: {
          allocated_minutes?: number | null
          audio_url?: string | null
          content_text?: string | null
          content_type: Database["public"]["Enums"]["content_type"]
          content_url?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          intro_guide?: Json | null
          joyful_guide?: Json | null
          learning_objectives?: string | null
          meaningful_guide?: Json | null
          mindful_guide?: Json | null
          module_id: string
          order_index?: number
          pdf_url?: string | null
          required_materials?: string[] | null
          title: string
        }
        Update: {
          allocated_minutes?: number | null
          audio_url?: string | null
          content_text?: string | null
          content_type?: Database["public"]["Enums"]["content_type"]
          content_url?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          intro_guide?: Json | null
          joyful_guide?: Json | null
          learning_objectives?: string | null
          meaningful_guide?: Json | null
          mindful_guide?: Json | null
          module_id?: string
          order_index?: number
          pdf_url?: string | null
          required_materials?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          created_at: string
          id: string
          is_published: boolean
          order_index: number
          subject_id: string
          target_semester: number | null
          title: string
          week_target: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_published?: boolean
          order_index?: number
          subject_id: string
          target_semester?: number | null
          title: string
          week_target?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          is_published?: boolean
          order_index?: number
          subject_id?: string
          target_semester?: number | null
          title?: string
          week_target?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "modules_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          equipped_badge_icon: string
          equipped_title: string
          equipped_trophy_tier: string
          full_name: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          equipped_badge_icon?: string
          equipped_title?: string
          equipped_trophy_tier?: string
          full_name: string
          id: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          equipped_badge_icon?: string
          equipped_title?: string
          equipped_trophy_tier?: string
          full_name?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          assignment_id: string
          correct_answer: string
          created_at: string
          explanation: string | null
          id: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          order_index: number
          question_text: string
        }
        Insert: {
          assignment_id: string
          correct_answer: string
          created_at?: string
          explanation?: string | null
          id?: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          order_index?: number
          question_text: string
        }
        Update: {
          assignment_id?: string
          correct_answer?: string
          created_at?: string
          explanation?: string | null
          id?: string
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          order_index?: number
          question_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          class_id: string
          code: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          class_id: string
          code: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          class_id?: string
          code?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          assignment_id: string
          file_url: string
          grade: number | null
          graded_at: string | null
          id: string
          score: number | null
          status: Database["public"]["Enums"]["submission_status"]
          student_id: string
          submitted_at: string
          teacher_feedback: string | null
          teacher_feedback_audio_url: string | null
          teacher_feedback_text: string | null
        }
        Insert: {
          assignment_id: string
          file_url: string
          grade?: number | null
          graded_at?: string | null
          id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["submission_status"]
          student_id: string
          submitted_at?: string
          teacher_feedback?: string | null
          teacher_feedback_audio_url?: string | null
          teacher_feedback_text?: string | null
        }
        Update: {
          assignment_id?: string
          file_url?: string
          grade?: number | null
          graded_at?: string | null
          id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["submission_status"]
          student_id?: string
          submitted_at?: string
          teacher_feedback?: string | null
          teacher_feedback_audio_url?: string | null
          teacher_feedback_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_teacher: { Args: never; Returns: boolean }
      reset_student_progress: {
        Args: { target_student_id: string }
        Returns: undefined
      }
    }
    Enums: {
      assignment_type: "VOICE_TASK" | "PHOTO_HOMEWORK" | "QUIZ_CBT"
      content_type: "VIDEO" | "PDF" | "AUDIO" | "TEXT" | "MULTIMEDIA"
      submission_status: "PENDING" | "GRADED"
      user_role: "GURU" | "SISWA" | "ORANG_TUA"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      assignment_type: ["VOICE_TASK", "PHOTO_HOMEWORK", "QUIZ_CBT"],
      content_type: ["VIDEO", "PDF", "AUDIO", "TEXT", "MULTIMEDIA"],
      submission_status: ["PENDING", "GRADED"],
      user_role: ["GURU", "SISWA", "ORANG_TUA"],
    },
  },
} as const

// Alias entity types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ClassRecord = Database['public']['Tables']['classes']['Row'];
export type Subject = Database['public']['Tables']['subjects']['Row'];
export type Module = Database['public']['Tables']['modules']['Row'];
export type Lesson = Database['public']['Tables']['lessons']['Row'];
export type LessonCompletion = Database['public']['Tables']['lesson_completions']['Row'];
export type Assignment = Database['public']['Tables']['assignments']['Row'];
export type QuizQuestion = Database['public']['Tables']['quiz_questions']['Row'];
export type Submission = Database['public']['Tables']['submissions']['Row'];
