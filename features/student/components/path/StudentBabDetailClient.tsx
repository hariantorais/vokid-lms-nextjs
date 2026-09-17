'use client';

import React, { useState, useTransition, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cleanModuleTitle } from '@/lib/formatters';
import { markLessonAsStudiedAction } from '@/features/student/actions/lesson-learning.actions';
import { QuizCbtModal } from '../submissions/QuizCbtModal';
import { BabAdventureProgressBar } from './BabAdventureProgressBar';
import { BabFocusedPostView } from './BabFocusedPostView';
import { BabAdventurePath } from './BabAdventurePath';
import type { PathNodeItem } from '../../types/learning-path';
import { StudentBabDetailData } from '../../services/student-bab.service';
import { StudentLayoutShell } from '../StudentLayoutShell';

interface StudentBabDetailClientProps {
  data: StudentBabDetailData;
  classId?: string;
}

export function StudentBabDetailClient({ data, classId }: StudentBabDetailClientProps) {
  const router = useRouter();
  const { module, nextModule } = data;
  const lessons = module.lessons ?? [];

  // Flatten: 1 Lesson + N Assignments menjadi urutan pos mandiri
  const pathNodes: PathNodeItem[] = useMemo(() => {
    const list: PathNodeItem[] = [];
    lessons.forEach((les, lIdx) => {
      list.push({
        id: `lesson-node-${les.id}`,
        nodeType: 'LESSON',
        lesson: les,
        title: les.title,
        orderLabel: `Tahap ${lIdx + 1}`,
      });

      (les.assignments ?? []).forEach((asg, aIdx) => {
        list.push({
          id: `asg-node-${asg.id}`,
          nodeType: 'ASSIGNMENT',
          lesson: les,
          assignment: asg,
          title: asg.prompt,
          orderLabel: `Misi ${lIdx + 1}.${aIdx + 1}`,
        });
      });
    });
    return list;
  }, [lessons]);

  const [focusedNode, setFocusedNode] = useState<PathNodeItem | null>(null);
  const [previewNode, setPreviewNode] = useState<{
    node: PathNodeItem;
    nodeIdx: number;
    isUnlocked: boolean;
  } | null>(null);

  const [studiedLessons, setStudiedLessons] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const les of lessons) {
      if (les.isStudied) initial[les.id] = true;
    }
    return initial;
  });

  const [isStudyingPending, startStudyingTransition] = useTransition();

  const handleMarkAsStudied = (lessonId: string) => {
    startStudyingTransition(async () => {
      const res = await markLessonAsStudiedAction(lessonId);
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setStudiedLessons((prev) => ({ ...prev, [lessonId]: true }));
      toast.success('Materi selesai dipelajari! Pos berikutnya telah terbuka 🎉');
    });
  };

  const [activeQuizModal, setActiveQuizModal] = useState<{
    id: string;
    title: string;
    score?: number | null;
  } | null>(null);

  const [submittedTasks, setSubmittedTasks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const les of lessons) {
      for (const asg of les.assignments ?? []) {
        if (asg.hasSubmitted) initial[asg.id] = true;
      }
    }
    return initial;
  });

  const isNodeCompleted = (node: PathNodeItem): boolean => {
    if (node.nodeType === 'LESSON') return Boolean(studiedLessons[node.lesson.id]);
    return Boolean(submittedTasks[node.assignment.id]);
  };

  const isNodeUnlocked = (nodeIdx: number): boolean => {
    if (nodeIdx === 0) return true;
    const prevNode = pathNodes[nodeIdx - 1];
    return prevNode ? isNodeCompleted(prevNode) : true;
  };

  const totalNodesCount = pathNodes.length;
  const doneNodesCount = pathNodes.filter(isNodeCompleted).length;
  const isChapterFullyCompleted = totalNodesCount > 0 && doneNodesCount === totalNodesCount;

  return (
    <StudentLayoutShell
      title={cleanModuleTitle(module.title)}
      subtitle={module.subject?.name ?? 'Pelajaran'}
      badgeText={`Bab ${module.order_index}`}
      backHref={classId ? `/siswa/kelas/${classId}` : '/siswa'}
      maxWidth="sm"
    >
      <div className="w-full space-y-4 select-none font-sans">
        {/* Modal CBT Quiz */}
        {activeQuizModal && (
          <QuizCbtModal
            assignmentId={activeQuizModal.id}
            assignmentTitle={activeQuizModal.title}
            initialScore={activeQuizModal.score}
            isOpen={Boolean(activeQuizModal)}
            onClose={() => setActiveQuizModal(null)}
            onSuccess={() => {
              setSubmittedTasks((prev) => ({ ...prev, [activeQuizModal.id]: true }));
              toast.success('Hore! Kuis CBT berhasil diselesaikan! 🎉');
            }}
          />
        )}

        {/* 1. Tampilan Fokus Saat Masuk Pos */}
        {focusedNode ? (
          <BabFocusedPostView
            node={focusedNode}
            isStudied={Boolean(studiedLessons[focusedNode.lesson.id])}
            isStudyingPending={isStudyingPending}
            isTaskDone={
              focusedNode.nodeType === 'ASSIGNMENT'
                ? Boolean(submittedTasks[focusedNode.assignment.id])
                : false
            }
            onMarkAsStudied={handleMarkAsStudied}
            onTaskSuccess={(asgId) => {
              setSubmittedTasks((prev) => ({ ...prev, [asgId]: true }));
              toast.success('Hore! Misi tugas berhasil dikirim! 🎉');
            }}
            onOpenQuiz={(asgId, title, score) =>
              setActiveQuizModal({ id: asgId, title, score })
            }
            onBackToPath={() => setFocusedNode(null)}
          />
        ) : (
          /* 2. Tampilan Peta Jalur Petualangan */
          <div className="space-y-4">
            <BabAdventureProgressBar
              doneCount={doneNodesCount}
              totalCount={totalNodesCount}
            />

            <section className="space-y-4 pt-2">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🗺️</span>
                  <span>Jalur Petualangan ({totalNodesCount} Pos Mandiri)</span>
                </h3>
                <span className="text-[11px] font-bold text-teal-700">Klik Ikon Pos</span>
              </div>

              <BabAdventurePath
                pathNodes={pathNodes}
                previewNode={previewNode}
                moduleOrderIndex={module.order_index}
                nextModule={nextModule}
                classId={classId}
                isNodeUnlocked={isNodeUnlocked}
                isNodeCompleted={isNodeCompleted}
                isChapterFullyCompleted={isChapterFullyCompleted}
                onSelectNodePreview={(node, nodeIdx, isUnlocked) =>
                  setPreviewNode({ node, nodeIdx, isUnlocked })
                }
                onClosePreview={() => setPreviewNode(null)}
                onFocusNode={(node) => {
                  setPreviewNode(null);
                  if (node.nodeType === 'LESSON') {
                    router.push(`/siswa/pelajaran/${node.lesson.id}/slide`);
                  } else {
                    setFocusedNode(node);
                  }
                }}
              />
            </section>
          </div>
        )}
      </div>
    </StudentLayoutShell>
  );
}