import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080D1A] text-slate-100 p-4">
      <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-emerald-500/30 text-center space-y-6 shadow-glow">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
          <FileQuestion className="w-8 h-8 text-emerald-400" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-black gradient-text">404</span>
          <h1 className="text-2xl font-black text-white">Sahifa topilmadi</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan bo'lishi mumkin.
          </p>
        </div>

        <div className="flex items-center justify-center pt-2">
          <Link
            href="/"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-glow transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Bosh sahifaga qaytish</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
