/**
 * Helper & Types untuk Mendukung Multi-Format Konten Materi
 * Menggabungkan Teks, Gambar, PDF, Audio (opsional), dan Video (opsional) di dalam satu Materi.
 */

export interface LessonMultiMediaContent {
  text: string;
  imageUrl?: string | null;
  pdfUrl?: string | null;
  audioUrl?: string | null;
  videoUrl?: string | null;
}

/**
 * Parsing konten materi dari content_text & content_url yang disimpan di DB.
 * Jika content_text adalah string JSON yang memuat MultiMediaContent, parse langsung.
 * Jika teks biasa, gabungkan dengan content_url sesuai tipe atau deteksi link.
 */
export function parseLessonMultiContent(
  contentText: string | null | undefined,
  contentUrl: string | null | undefined,
  contentType?: string
): LessonMultiMediaContent {
  if (contentText) {
    const trimmed = contentText.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}') && trimmed.includes('"text"')) {
      try {
        const parsed = JSON.parse(trimmed) as Partial<LessonMultiMediaContent>;
        return {
          text: parsed.text ?? '',
          imageUrl: parsed.imageUrl || null,
          pdfUrl: parsed.pdfUrl || (contentType === 'PDF' ? contentUrl : null),
          audioUrl: parsed.audioUrl || (contentType === 'AUDIO' ? contentUrl : null),
          videoUrl: parsed.videoUrl || (contentType === 'VIDEO' ? contentUrl : null),
        };
      } catch {
        // Fallback jika bukan JSON yang valid
      }
    }
  }

  // Fallback default: Membangun MultiMediaContent dari kolom standar DB
  let videoUrl: string | null = null;
  let pdfUrl: string | null = null;
  let audioUrl: string | null = null;
  let imageUrl: string | null = null;

  if (contentUrl) {
    const lower = contentUrl.toLowerCase();
    if (contentType === 'VIDEO' || lower.includes('youtube.com') || lower.includes('youtu.be') || lower.endsWith('.mp4')) {
      videoUrl = contentUrl;
    } else if (contentType === 'PDF' || lower.endsWith('.pdf')) {
      pdfUrl = contentUrl;
    } else if (contentType === 'AUDIO' || lower.endsWith('.mp3') || lower.endsWith('.m4a') || lower.endsWith('.wav')) {
      audioUrl = contentUrl;
    } else if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp')) {
      imageUrl = contentUrl;
    } else {
      videoUrl = contentUrl;
    }
  }

  return {
    text: contentText ?? '',
    imageUrl,
    pdfUrl,
    audioUrl,
    videoUrl,
  };
}

/**
 * Memformat LessonMultiMediaContent menjadi JSON string untuk disimpan di content_text
 */
export function serializeLessonMultiContent(data: LessonMultiMediaContent): string {
  return JSON.stringify(data);
}
