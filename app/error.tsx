"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Catat galat ke logging service/console
    console.error("[Application Error 500]:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 shadow-xs">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 border border-rose-200 text-rose-700 mb-2">
        Galat Server (500)
      </span>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
        Gagal Memuat Halaman
      </h1>
      <p className="text-sm text-slate-500 max-w-md mt-2 mb-4">
        Terjadi kendala saat memproses permintaan atau menghubungi basis data server.
        Silakan coba muat ulang halaman.
      </p>

      {error?.message && (
        <div className="max-w-md w-full mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-left">
          <p className="text-[11px] font-bold text-rose-800 uppercase tracking-wider mb-1">
            Detail Kesalahan:
          </p>
          <p className="text-xs font-mono text-rose-700 break-words">
            {error.message}
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Coba Lagi</span>
        </button>

        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all"
        >
          <Home className="w-4 h-4 text-slate-500" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
