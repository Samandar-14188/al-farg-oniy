import Image from 'next/image';
import { CheckCircle2, Cpu, GraduationCap, Laptop, Users2, Trophy, Clock } from 'lucide-react';

export default function AboutSection() {
  const advantages = [
    {
      icon: Cpu,
      title: "Zamonaviy IT Texnologiyalar",
      desc: "So'nggi avlod kompyuterlari, yuqori tezlikdagi internet va qulay kovorking zonalari."
    },
    {
      icon: Users2,
      title: "Kuchli Mentorlar Jamoasi",
      desc: "Xalqaro darajaga ega tajribali mutaxassislardan amaliy bilim va doimiy feedback."
    },
    {
      icon: Trophy,
      title: "Sertifikat va Amaliyot",
      desc: "Kursni muvaffaqiyatli tugatgan o'quvchilarga rasmiy sertifikat va hamkor kompaniyalarda amaliyot."
    },
    {
      icon: Clock,
      title: "Moslashuvchan Dars Jadvallari",
      desc: "Ertalabki, tushdan keyingi va kechki smenalarda o'zingizga qulay vaqtni tanlang."
    }
  ];

  return (
    <section className="py-20 bg-slate-950/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Grid: Visual collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card p-3 border border-emerald-500/20 shadow-glow">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80"
                  alt="Biz haqimizda - Al-Farg’oniy Academy"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Sifatli Ta'lim</span>
                  <h3 className="text-xl font-extrabold text-white">Al-Farg’oniy Academy O'quv Markazi</h3>
                  <p className="text-xs text-slate-300">Farg'ona vodiysidagi eng ilg'or bilim maskanlaridan biri</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Grid: Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                <GraduationCap className="w-4 h-4" /> BIZ HAQIMIZDA
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Nima Uchun Aynan <span className="gradient-text">Al-Farg’oniy Academy</span>?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Biz shunchaki nazariy bilim bermaymiz. Biz har bir o'quvchimizni amaliy loyihalar va xalqaro talablarga mos mutaxassis sifatiga tayyorlaymiz. Uchko'prik, Yangiqo'rg'on va Buvayda filiallarimizda barcha sharoitlar yaratilgan.
              </p>
            </div>

            {/* Grid of Advantages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {advantages.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
