'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Route Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080D1A] text-slate-100 p-4">
      <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-rose-500/30 text-center space-y-6 shadow-glow">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
          <AlertTriangle className="w-8 h-8 text-rose-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white">Xatolik yuz berdi</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Kechirasiz, sahifani yuklashda kutilmagan xatolik yuz berdi.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Qayta urinish</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Bosh sahifa</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
