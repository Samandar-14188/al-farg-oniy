import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Send, Instagram, Youtube, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050914] text-slate-400 pt-16 pb-12 border-t border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-48 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Al-Farg’oniy Education"
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Al-Farg’oniy Academy – Zamonaviy IT, Dasturlash, Chet tillari va Dizayn yo‘nalishlarida sifatli ta'lim beruvchi yetakchi ta'lim markazi. Kelajak kasblarini biz bilan egallang!
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Sahifalar</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  Kurslarimiz
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  Filiallar
                </Link>
              </li>
              <li>
                <Link href="/teachers" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  O‘qituvchilar
                </Link>
              </li>
              <li>
                <Link href="/test" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  Bilimni sinash testi
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-slate-500">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Courses */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Ommabop Kurslar</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/courses/full-stack-web-dasturlash" className="hover:text-emerald-400 transition-colors">
                  Full-Stack Web Dasturlash
                </Link>
              </li>
              <li>
                <Link href="/courses/python-va-suniy-intellekt" className="hover:text-emerald-400 transition-colors">
                  Python & AI Botlar
                </Link>
              </li>
              <li>
                <Link href="/courses/english-ielts-intensive" className="hover:text-emerald-400 transition-colors">
                  IELTS 7.5+ Intensive
                </Link>
              </li>
              <li>
                <Link href="/courses/graphic-ux-ui-design" className="hover:text-emerald-400 transition-colors">
                  Graphic & UX/UI Dizayn
                </Link>
              </li>
              <li>
                <Link href="/courses/kompyuter-savodxonligi-it-star" className="hover:text-emerald-400 transition-colors">
                  IT-Savatxonlik
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Filiallarimiz */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Filiallarimiz</h4>
            <div className="space-y-3 text-xs">
              <div>
                <p className="font-semibold text-slate-200">Uchko'prik Filiali</p>
                <p className="text-slate-500">Mustaqillik ko'chasi 45-uy</p>
                <p className="text-emerald-400 mt-0.5">+998 90 123 45 67</p>
              </div>
              <div>
                <p className="font-semibold text-slate-200">Yangiqo'rg'on Filiali</p>
                <p className="text-slate-500">Al-Farg'oniy shoh ko'chasi 12-uy</p>
                <p className="text-emerald-400 mt-0.5">+998 91 234 56 78</p>
              </div>
              <div>
                <p className="font-semibold text-slate-200">Buvayda Filiali</p>
                <p className="text-slate-500">Yangiobod q., Ibn Sino 8-uy</p>
                <p className="text-emerald-400 mt-0.5">+998 93 345 67 89</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Al-Farg’oniy Academy. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-6">
            <span>Uchko'prik | Yangiqo'rg'on | Buvayda</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
