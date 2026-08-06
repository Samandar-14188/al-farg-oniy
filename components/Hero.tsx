'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Award, Users, BookOpen, Play } from 'lucide-react';
import LeadModal from './LeadModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-[85vh] pt-12 pb-20 flex items-center justify-center overflow-hidden hero-glow">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold shadow-glow">
              <Sparkles className="w-4 h-4" />
              <span>Zamonaviy kasblar va kelajak akademiyasi</span>
            </div>

            {/* Main Heading in Uzbek Latin */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Al-Farg’oniy Academy bilan{' '}
              <span className="gradient-text">Kelajagingizni</span> Quramiz!
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Dasturlash, Chet tillari, Sun'iy Intellekt va Grafik dizayn bo'yicha amaliy ta'lim oling. Real loyihalar, tajribali ustozlar va 100% amaliyot.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-base shadow-glow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>Hoziroq ro‘yxatdan o‘ting</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/test"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card text-white font-bold text-base hover:bg-slate-800/80 transition-all flex items-center justify-center gap-2 border border-slate-700/80"
              >
                <Award className="w-5 h-5 text-emerald-400" />
                <span>Bilimni sinash (Bepul)</span>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-white gradient-text">5 000+</div>
                <div className="text-xs text-slate-400 font-medium">Muvaffaqiyatli o‘quvchilar</div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-white gradient-text-gold">3 Ta</div>
                <div className="text-xs text-slate-400 font-medium">Zamonaviy filiallar</div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-white gradient-text">95%</div>
                <div className="text-xs text-slate-400 font-medium">Natija & Ishga kirish</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card */}
              <div className="glass-card rounded-3xl p-4 sm:p-6 border border-emerald-500/20 shadow-glow-lg overflow-hidden relative">
                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-5">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                    alt="Al-Farg’oniy Academy Ta'lim Jarayoni"
                    fill
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  {/* Floating Play Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between glass-card p-3 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                        <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Akademiya Hayoti</p>
                        <p className="text-[10px] text-slate-400">Zamonaviy sharoitlar va kovorking</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Feature Badges */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-300 font-medium">Sertifikat bilan ta'minlash</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <Users className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-slate-300 font-medium">Kichik guruhlar (12 kishi)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
