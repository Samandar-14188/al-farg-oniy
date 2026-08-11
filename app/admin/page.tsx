'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Users, BookOpen, MapPin, Search, Filter, Trash2, CheckCircle2,
  Clock, XCircle, Phone, User, Calendar, Sparkles, RefreshCw,
  Lock, LogOut, KeyRound, Eye, EyeOff, ShieldAlert, Plus, Edit3, X,
  FileText, Star, Award
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'leads' | 'courses' | 'teachers' | 'branches' | 'posts'>('leads');

  // Resource States
  const [leads, setLeads] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter & Search
  const [statusFilter, setStatusFilter] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [modalType, setModalType] = useState<'course' | 'teacher' | 'branch' | 'post' | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [modalLoading, setModalLoading] = useState(false);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      if (res.ok) {
        setIsAuthenticated(true);
        fetchAllData();
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [leadsRes, coursesRes, teachersRes, branchesRes, postsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/courses'),
        fetch('/api/teachers'),
        fetch('/api/branches'),
        fetch('/api/posts')
      ]);

      if (leadsRes.ok) setLeads(await leadsRes.json());
      if (coursesRes.ok) setCourses(await coursesRes.json());
      if (teachersRes.ok) setTeachers(await teachersRes.json());
      if (branchesRes.ok) setBranches(await branchesRes.json());
      if (postsRes.ok) setPosts(await postsRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
        fetchAllData();
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

  // --- CRUD ACTIONS ---

  // Leads
  const handleUpdateLeadStatus = async (id: string, newStatus: string) => {
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

  // Generic Save / Submit handler for Modals
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);

    const endpoint = `/api/${modalType}s`;
    const isEdit = Boolean(editingItem);
    const url = isEdit ? `${endpoint}/${editingItem.id}` : endpoint;
    const method = isEdit ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        closeModal();
        fetchAllData();
      } else {
        const errData = await res.json();
        alert(errData.error || "Xatolik yuz berdi");
      }
    } catch (err) {
      alert("Tarmoq xatoligi");
    } finally {
      setModalLoading(false);
    }
  };

  // Generic Delete handler
  const handleDeleteResource = async (type: 'course' | 'teacher' | 'branch' | 'post', id: string) => {
    if (!confirm("Ushbu yozuvni o'chirishni tasdiqlaysizmi?")) return;
    try {
      const res = await fetch(`/api/${type}s/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Modal Control Helpers
  const openModal = (type: 'course' | 'teacher' | 'branch' | 'post', item: any = null) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item || {});
  };

  const closeModal = () => {
    setModalType(null);
    setEditingItem(null);
    setFormData({});
  };

  // Initial Loading Screen
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
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-start gap-2">
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

  return (
    <div className="min-h-screen flex flex-col bg-[#080D1A] text-slate-100">
      <Navbar />

      <main className="flex-1 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Top Header & Logout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" /> BOSHGARUV PANELI
            </div>
            <h1 className="text-3xl font-black text-white">Al-Farg’oniy Admin</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              <span>Yangilash</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Chiqish</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-emerald-500 text-slate-950 shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Arizalar ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-emerald-500 text-slate-950 shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kurslar ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'teachers'
                ? 'bg-emerald-500 text-slate-950 shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>O'qituvchilar ({teachers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('branches')}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'branches'
                ? 'bg-emerald-500 text-slate-950 shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Filiallar ({branches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'posts'
                ? 'bg-emerald-500 text-slate-950 shadow-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Yangiliklar ({posts.length})</span>
          </button>
        </div>

        {/* TAB 1: ARIZALAR (LEADS) */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
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

            {/* Leads Table */}
            <div className="glass-card rounded-3xl overflow-hidden border border-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
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
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white text-sm">{lead.name}</div>
                          <div className="text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" /> {lead.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-200">{lead.courseName}</td>
                        <td className="px-6 py-4 text-slate-300">{lead.branchName}</td>
                        <td className="px-6 py-4 text-slate-400">{lead.age ? `${lead.age} yosh` : '-'}</td>
                        <td className="px-6 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className="px-3 py-1.5 rounded-xl font-extrabold text-[11px] bg-slate-900 text-white border border-slate-700 cursor-pointer"
                          >
                            <option value="Yangi">Yangi</option>
                            <option value="Aloqada">Aloqada</option>
                            <option value="Yozildi">Yozildi</option>
                            <option value="Bekor qilindi">Bekor qilindi</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KURSLAR (COURSES) */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Barcha Kurslar</h2>
              <button
                onClick={() => openModal('course')}
                className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-glow flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi Kurs Qo'shish</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div key={c.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {c.category}
                    </span>
                    <h3 className="text-lg font-bold text-white">{c.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{c.description}</p>
                    <p className="text-sm font-black text-emerald-400 pt-1">{c.price}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openModal('course', c)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                      title="Tahrirlash"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteResource('course', c.id)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: O'QITUVCHILAR (TEACHERS) */}
        {activeTab === 'teachers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">O'qituvchilar va Mentorlar</h2>
              <button
                onClick={() => openModal('teacher')}
                className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-glow flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi O'qituvchi Qo'shish</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teachers.map((t) => (
                <div key={t.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-white">{t.name}</h3>
                    <p className="text-xs text-emerald-400 font-semibold">{t.role}</p>
                    <p className="text-xs text-slate-400">{t.specialty}</p>
                    <p className="text-[11px] text-slate-500">{t.experience}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openModal('teacher', t)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                      title="Tahrirlash"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteResource('teacher', t.id)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FILIALLAR (BRANCHES) */}
        {activeTab === 'branches' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Filiallar va Joylashuvlar</h2>
              <button
                onClick={() => openModal('branch')}
                className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-glow flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi Filial Qo'shish</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {branches.map((b) => (
                <div key={b.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-white">{b.name}</h3>
                    <p className="text-xs text-slate-300">{b.address}</p>
                    <p className="text-xs text-emerald-400 font-mono">{b.phone}</p>
                    <p className="text-[11px] text-slate-500">{b.hours}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openModal('branch', b)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                      title="Tahrirlash"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteResource('branch', b.id)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: YANGILIKLAR (POSTS) */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Yangiliklar va E'lonlar</h2>
              <button
                onClick={() => openModal('post')}
                className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-glow flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi Yangilik Qo'shish</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((p) => (
                <div key={p.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-emerald-400 font-semibold">{p.date}</span>
                    <h3 className="text-base font-bold text-white">{p.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{p.excerpt}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openModal('post', p)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                      title="Tahrirlash"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteResource('post', p.id)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />

      {/* DYNAMIC FORM MODAL DIALOG */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-glow-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">
              {editingItem ? "Tahrirlash" : "Yangi Yozuv Qo'shish"} ({modalType.toUpperCase()})
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              
              {/* COURSE FORM FIELDS */}
              {modalType === 'course' && (
                <>
                  <div>
                    <label className="block text-slate-300 mb-1">Kurs Nomi *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1">Kategoriya</label>
                      <select
                        value={formData.category || 'Dasturlash'}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      >
                        <option value="Dasturlash">Dasturlash</option>
                        <option value="Chet tillari">Chet tillari</option>
                        <option value="Dizayn">Dizayn</option>
                        <option value="IT-Savatxonlik">IT-Savatxonlik</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Narxi *</label>
                      <input
                        type="text"
                        required
                        placeholder="650 000 so'm / oy"
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Davomiyligi</label>
                    <input
                      type="text"
                      placeholder="8 oy"
                      value={formData.duration || ''}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Tavsif</label>
                    <textarea
                      rows={3}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                </>
              )}

              {/* TEACHER FORM FIELDS */}
              {modalType === 'teacher' && (
                <>
                  <div>
                    <label className="block text-slate-300 mb-1">F.I.SH *</label>
                    <input
                      type="text"
                      required
                      placeholder="Rustambek Olimov"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1">Lavozimi *</label>
                      <input
                        type="text"
                        required
                        placeholder="Senior Web Developer"
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Tajribasi</label>
                      <input
                        type="text"
                        placeholder="6 yillik tajriba"
                        value={formData.experience || ''}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Mutaxassisligi</label>
                    <input
                      type="text"
                      placeholder="Full-Stack Web (React, Next.js)"
                      value={formData.specialty || ''}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Bio (Qisqacha)</label>
                    <textarea
                      rows={3}
                      value={formData.bio || ''}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                </>
              )}

              {/* BRANCH FORM FIELDS */}
              {modalType === 'branch' && (
                <>
                  <div>
                    <label className="block text-slate-300 mb-1">Filial Nomi *</label>
                    <input
                      type="text"
                      required
                      placeholder="Uchko'prik Filiali"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Manzil *</label>
                    <input
                      type="text"
                      required
                      placeholder="Mustaqillik ko'chasi 45-uy"
                      value={formData.address || ''}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1">Telefon *</label>
                      <input
                        type="text"
                        required
                        placeholder="+998 90 123 45 67"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">Ish vaqti</label>
                      <input
                        type="text"
                        placeholder="08:00 - 20:00 (Du - Sha)"
                        value={formData.hours || ''}
                        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* POST FORM FIELDS */}
              {modalType === 'post' && (
                <>
                  <div>
                    <label className="block text-slate-300 mb-1">Sarlavha *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Qisqa mazmun (Excerpt)</label>
                    <textarea
                      rows={2}
                      value={formData.excerpt || ''}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">To'liq matn</label>
                    <textarea
                      rows={4}
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={modalLoading}
                className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-sm shadow-glow cursor-pointer mt-2"
              >
                {modalLoading ? "Saqlanmoqda..." : "Saqlash"}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
