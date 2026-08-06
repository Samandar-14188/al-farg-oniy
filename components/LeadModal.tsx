'use client';

import { useState } from 'react';
import { X, CheckCircle2, Send, Phone, User, BookOpen, MapPin, Sparkles } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
  defaultBranch?: string;
}

export default function LeadModal({ isOpen, onClose, defaultCourse = '', defaultBranch = '' }: LeadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
    age: '',
    courseName: defaultCourse || "Full-Stack Web Dasturlash",
    branchName: defaultBranch || "Uchko'prik Filiali"
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || formData.phone.trim().length < 9) {
      setError("Iltimos, ism va telefon raqamingizni to'liq kiriting!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age) : null
        })
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Xatolik yuz berdi. Qayta urinib ko'ring.");
      }
    } catch (err) {
      setError("Tarmoq xatoligi. Qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-glow-lg">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-white">Arizangiz qabul qilindi!</h3>
            <p className="text-slate-300 text-sm max-w-xs mx-auto">
              Tez orada operatorimiz siz bilan bog‘lanib, barcha savollaringizga javob beradi.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" /> Bepul konsultatsiya
              </div>
              <h2 className="text-2xl font-extrabold text-white">Hoziroq ro‘yxatdan o‘ting</h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Ma'lumotlaringizni qoldiring, biz sizga eng mos o'quv dasturini tanlashda yordam beramiz!
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Ism va Familiyangiz *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Ali Valiyev"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Phone & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Telefon raqamingiz *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="+998 90 123 45 67"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Yoshingiz</label>
                  <input
                    type="number"
                    min="7"
                    max="80"
                    placeholder="Masalan: 18"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Course Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tanlangan Kurs</label>
                <div className="relative">
                  <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm appearance-none"
                  >
                    <option value="Full-Stack Web Dasturlash">Full-Stack Web Dasturlash</option>
                    <option value="Python va Sun'iy Intellekt (AI)">Python va Sun'iy Intellekt (AI)</option>
                    <option value="English & IELTS 7.5+ Intensive">English & IELTS 7.5+ Intensive</option>
                    <option value="Graphic & UX/UI Dizayn">Graphic & UX/UI Dizayn</option>
                    <option value="IT-Savatxonlik & Office Pro">IT-Savatxonlik & Office Pro</option>
                    <option value="SMM va Raqamli Marketing">SMM va Raqamli Marketing</option>
                  </select>
                </div>
              </div>

              {/* Branch Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Qaysi Filial Qulay?</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={formData.branchName}
                    onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm appearance-none"
                  >
                    <option value="Uchko'prik Filiali">Uchko'prik Filiali</option>
                    <option value="Yangiqo'rg'on Filiali">Yangiqo'rg'on Filiali</option>
                    <option value="Buvayda Filiali">Buvayda Filiali</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-glow transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Ro‘yxatdan o‘tish</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
