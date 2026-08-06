import Image from 'next/image';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function StudentReviews() {
  const reviews = [
    {
      id: 1,
      name: "Sardorbek Tursunov",
      course: "Full-Stack Web Dasturlash",
      branch: "Uchko'prik Filiali",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
      review: "Al-Farg’oniy Academyda 8 oy o'qib, hozirda xalqaro frilans loyihalarida web dasturchi bo'lib ishlayapman. Rustambek ustoza alohida rahmat!"
    },
    {
      id: 2,
      name: "Madinabonu Komilova",
      course: "English & IELTS Intensive",
      branch: "Yangiqo'rg'on Filiali",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      review: "IELTS topshirishdan oldin judayam xavotirda edim. Malika ustoz bilan 6 oylik intensiv tayyorgarlikdan so'ng Overall 7.5 ball natijani qo'lga kiritdim!"
    },
    {
      id: 3,
      name: "Jahongir Qodirov",
      course: "Python va Sun'iy Intellekt",
      branch: "Buvayda Filiali",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      review: "Python tilida Telegram bot va AI avtomatlashtirishni chuqur o'rgandim. Amaliy darslar va topsiriqlar judayam qiziqarli o'tdi."
    }
  ];

  return (
    <section className="py-20 bg-slate-950/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Muvaffaqiyat Tarixlari
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            O‘quvchilarimiz <span className="gradient-text-gold">Fikrlari</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Akademiyamizni muvaffaqiyatli tamomlagan va orzularidagi kasbga erishgan o'quvchilar ko'rsatkichlari.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-4 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-amber-500/10 group-hover:text-amber-500/20 transition-colors" />

              <div className="space-y-3">
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-emerald-500/30 shrink-0">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1">
                    {rev.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-semibold">{rev.course}</p>
                  <p className="text-[9px] text-slate-500">{rev.branch}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
