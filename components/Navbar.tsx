'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Phone, Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import LeadModal from './LeadModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { name: 'Bosh sahifa', href: '/' },
    { name: 'Kurslar', href: '/courses' },
    { name: 'Filiallar', href: '/branches' },
    { name: 'O‘qituvchilar', href: '/teachers' },
    { name: 'Test topshirish', href: '/test', badge: 'Bepul' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-glow group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Al-Farg’oniy
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 -mt-1">
                  Academy
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                        isActive ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="tel:+998901234567"
                className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors px-3 py-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+998 (90) 123-45-67</span>
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className="py-2.5 px-5 rounded-full text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:opacity-95 shadow-glow transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ro‘yxatdan o‘tish</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-card border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.name}
                      {link.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
                          {link.badge}
                        </span>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-800 space-y-3">
              <a
                href="tel:+998901234567"
                className="flex items-center justify-center gap-2 text-sm font-medium text-slate-300 bg-slate-900/90 py-3 rounded-xl border border-slate-800"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+998 (90) 123-45-67</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-center shadow-glow"
              >
                Ro‘yxatdan o‘tish
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Reusable Lead Modal */}
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
