'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Users, BookOpen, MapPin, Search, Filter, Trash2, CheckCircle2,
  Clock, XCircle, Phone, User, Calendar, Sparkles, RefreshCw,
  Lock, LogOut, KeyRound, Eye, EyeOff, ShieldAlert, Check
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [leads, setLeads] = useState<any[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [statusFilter, setStatusFilter] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      if (res.ok) {
        setIsAuthenticated(true);
        fetchLeads();
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!passwordInput.trim()) {
      setLoginError('Iltimos, parolni kiriting!');
      return;
    }

    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();

      if (res.ok) {
        setIsAuthenticated(true);
        setPasswordInput('');
        fetchLeads();
      } else {
        setLoginError(data.error || 'Parol noto\'g\'ri!');
      }
    } catch (err) {
      setLoginError('Tarmoq xatoligi. Qayta urinib ko\'ring.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuthenticated(false);
      setLeads([]);
    }
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Arizani o'chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Initial Auth Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080D1A] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-medium">Tizim holati tekshirilmoqda...</span>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN (Unauthenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#080D1A] text-slate-100">
        <Navbar />

        <main className="flex-1 flex items-center justify-center p-4 py-16 hero-glow">
          <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-emerald-500/30 shadow-glow-lg space-y-6 relative overflow-hidden">
            
            {/* Top Security Badge */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-glow">
                <Lock className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-black text-white">Admin Paneli</h1>
              <p className="text-xs text-slate-400">
                Arizalar va akademiya tizimini boshqarish uchun maxfiy parolni kiriting.
              </p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-start gap-2 animate-shake">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Admin Paroli
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-10 pr-12 py-3.5 bg-slate-900/90 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
              >
                {loginLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Tizimga kirish</span>
                    <Lock className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-500">
                🔒 Xavfsiz HTTP-Only Seans & Rate Limit Himoyalangan
              </span>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // DASHBOARD VIEW (Authenticated)
  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === 'Barchasi' || l.status === statusFilter;
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'Yangi').length;
  const contactedCount = leads.filter(l => l.status === 'Aloqada').length;
  const enrolledCount = leads.filter(l => l.status === 'Yozildi').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#080D1A] text-slate-100">
      <Navbar />

      <main className="flex-1 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Header with Logout Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" /> ADMINISTRATOR PANELI (XAVFSIZ SEANS)
            </div>
            <h1 className="text-3xl font-black text-white">Boshqaruv Paneli</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              <span>Yangilash</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Chiqish</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Jami Arizalar</span>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-white">{totalLeads}</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 space-y-2 shadow-glow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase">Yangi Arizalar</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-emerald-400">{newLeadsCount}</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase">Aloqaga Chiqilgan</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-amber-400">{contactedCount}</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 uppercase">Yozilgan O'quvchilar</span>
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-teal-400">{enrolledCount}</p>
          </div>

        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {['Barchasi', 'Yangi', 'Aloqada', 'Yozildi', 'Bekor qilindi'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-emerald-500 text-slate-950 shadow-glow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Ism, tel yoki kurs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

        </div>

        {/* Table */}
        <div className="glass-card rounded-3xl overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800 tracking-wider">
                <tr>
                  <th className="px-6 py-4">F.I.SH & Tel</th>
                  <th className="px-6 py-4">Kurs</th>
                  <th className="px-6 py-4">Filial</th>
                  <th className="px-6 py-4">Yosh</th>
                  <th className="px-6 py-4">Holat</th>
                  <th className="px-6 py-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loadingLeads ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      Yuklanmoqda...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      Arizalar topilmadi.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-sm">{lead.name}</div>
                        <div className="text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" /> {lead.phone}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-200">
                        {lead.courseName}
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {lead.branchName}
                      </td>

                      <td className="px-6 py-4 text-slate-400">
                        {lead.age ? `${lead.age} yosh` : '-'}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-xl font-extrabold text-[11px] outline-none border cursor-pointer ${
                            lead.status === 'Yangi'
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                              : lead.status === 'Aloqada'
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                              : lead.status === 'Yozildi'
                              ? 'bg-teal-500/20 text-teal-400 border-teal-500/40'
                              : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                          }`}
                        >
                          <option value="Yangi" className="bg-slate-900 text-white">Yangi</option>
                          <option value="Aloqada" className="bg-slate-900 text-white">Aloqada</option>
                          <option value="Yozildi" className="bg-slate-900 text-white">Yozildi</option>
                          <option value="Bekor qilindi" className="bg-slate-900 text-white">Bekor qilindi</option>
                        </select>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-colors cursor-pointer"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
