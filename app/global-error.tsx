'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Root Error:', error);
  }, [error]);

  return (
    <html lang="uz" className="dark">
      <body className="bg-[#080D1A] text-slate-100 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-rose-500/30 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl font-bold">
            ⚠️
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">Tizimda jiddiy xatolik</h1>
            <p className="text-slate-400 text-xs">
              Ilovani qayta yuklash uchun quyidagi tugmani bosing.
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
          >
            Tizimni qayta yuklash
          </button>
        </div>
      </body>
    </html>
  );
}
