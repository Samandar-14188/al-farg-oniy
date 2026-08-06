'use client';

import { useState } from 'react';
import { Phone, Send, Sparkles } from 'lucide-react';
import LeadModal from './LeadModal';

export default function FloatingButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Telegram Button */}
        <a
          href="https://t.me"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg hover:scale-110 hover:bg-sky-400 transition-all duration-300 group"
          title="Telegram orqali bog'lanish"
        >
          <Send className="w-5 h-5 -translate-x-0.5 group-hover:rotate-12 transition-transform" />
        </a>

        {/* Call Button */}
        <a
          href="tel:+998901234567"
          className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-glow hover:scale-110 hover:bg-emerald-400 transition-all duration-300"
          title="Qo'ng'iroq qilish"
        >
          <Phone className="w-5 h-5 animate-pulse" />
        </a>

        {/* Fast Registration CTA */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-glow-lg hover:scale-105 transition-all duration-300 cursor-pointer border border-emerald-300/30"
        >
          <Sparkles className="w-4 h-4" />
          <span>Aziya topshirish</span>
        </button>
      </div>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
