import React from 'react';

export default function Loading() {
  return (
    <div className="space-y-4 animate-pulse p-4">
      {/* Skeleton Top Banner */}
      <div className="h-16 bg-slate-200/70 rounded-2xl w-full" />

      {/* Skeleton Lesson Items */}
      <div className="space-y-3">
        <div className="h-20 bg-slate-200/60 rounded-2xl w-full" />
        <div className="h-20 bg-slate-200/60 rounded-2xl w-full" />
        <div className="h-20 bg-slate-200/60 rounded-2xl w-full" />
      </div>
    </div>
  );
}
