'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import FloatingButtons from '@/components/FloatingButtons';
import { Search, Filter, BookOpen } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Barchasi', 'Dasturlash', 'Chet tillari', 'Dizayn', 'IT-Savatxonlik'];

  useEffect(() => {
    // Fetch courses from seed/api or static fallback
    async function loadCourses() {
      try {
        const res = await fetch('/api/courses');
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        } else {
          // Fallback static seed list
          setCourses(defaultCourses);
        }
      } catch (err) {
        setCourses(defaultCourses);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === 'Barchasi' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#080D1A] text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <BookOpen className="w-3.5 h-3.5" /> BARCHA YO'NALISHLAR
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Al-Farg’oniy <span className="gradient-text">O‘quv Dasturlari</span>
          </h1>
          <p className="text-slate-400 text-sm">
            O'zingizga mos zamonaviy kasbni tanlang va sohaning yetuk mutaxassisiga aylaning!
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-card border border-slate-800">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-glow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Kurs qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-sm">Kurslar yuklanmoqda...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <p className="text-slate-300 font-bold text-lg">Hali kurslar topilmadi</p>
            <p className="text-slate-500 text-xs">Qidiruv sorovini o'zgartirib ko'ring</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id || course.slug} course={course} />
            ))}
          </div>
        )}

      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}

// Fallback seed courses
const defaultCourses = [
  {
    id: "1",
    slug: "full-stack-web-dasturlash",
    title: "Full-Stack Web Dasturlash",
    category: "Dasturlash",
    description: "Zamonaviy veb-saytlar va murakkab tizimlarni yaratishni o'rganing. HTML, CSS, JavaScript, React, Next.js, Node.js va PostgreSQL.",
    price: "650 000 so'm / oy",
    duration: "8 oy",
    level: "Boshlang'ich va O'rta",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "2",
    slug: "python-va-suniy-intellekt",
    title: "Python va Sun'iy Intellekt (AI)",
    category: "Dasturlash",
    description: "Python tilining asoslaridan tortib Sun'iy Intelekt va Telegram botlar yaratishgacha bo'lgan chuqurlashtirilgan dastur.",
    price: "600 000 so'm / oy",
    duration: "6 oy",
    level: "Boshlang'ich",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "3",
    slug: "english-ielts-intensive",
    title: "English & IELTS 7.5+ Intensive",
    category: "Chet tillari",
    description: "Xalqaro standartlar asosida ingliz tilida erkin so'zlashish va IELTS imtihonidan 7.5+ ball olish kafolati.",
    price: "450 000 so'm / oy",
    duration: "6 oy",
    level: "Barcha darajalar",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "4",
    slug: "graphic-ux-ui-design",
    title: "Graphic & UX/UI Dizayn",
    category: "Dizayn",
    description: "Adobe Photoshop, Illustrator va Figma orqali zamonaviy grafikalar hamda veb/mobil ilovalar interfeysini loyihalash.",
    price: "550 000 so'm / oy",
    duration: "5 oy",
    level: "Boshlang'ich",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "5",
    slug: "kompyuter-savodxonligi-it-star",
    title: "IT-Savatxonlik & Office Pro",
    category: "IT-Savatxonlik",
    description: "Noldan kompyuter imkoniyatlarini o'rganish, Word, Excel, PowerPoint, Internet xavfsizligi va tez yozish ko'nikmalari.",
    price: "350 000 so'm / oy",
    duration: "2 oy",
    level: "Noldan",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    featured: false
  }
];
