import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import CourseCard from '@/components/CourseCard';
import TeacherCard from '@/components/TeacherCard';
import BranchCard from '@/components/BranchCard';
import StudentReviews from '@/components/StudentReviews';
import NewsSection from '@/components/NewsSection';
import FloatingButtons from '@/components/FloatingButtons';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, MapPin } from 'lucide-react';

export const revalidate = 60; // SSR with ISR fallback

export default async function HomePage() {
  // Fetch initial data from DB via Prisma
  const [courses, teachers, branches, posts] = await Promise.all([
    prisma.course.findMany({ take: 6, orderBy: { createdAt: 'desc' } }),
    prisma.teacher.findMany({ take: 4 }),
    prisma.branch.findMany(),
    prisma.post.findMany({ take: 2, orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#080D1A] text-slate-100">
      <Navbar />

      <main className="flex-1 space-y-12">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <AboutSection />

        {/* Featured Courses Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 w-fit">
                <BookOpen className="w-3.5 h-3.5" /> OMMABOP TA'LIM YO'NALISHLARI
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Bizning <span className="gradient-text">Kurslarimiz</span>
              </h2>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors group"
            >
              <span>Barcha kurslarni ko‘rish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Teachers Section */}
        <section className="py-16 bg-slate-950/60 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 w-fit">
                  <Users className="w-3.5 h-3.5" /> MALAKALI MUTAXASSISLAR
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Bizning <span className="gradient-text">Ustozlarimiz</span>
                </h2>
              </div>

              <Link
                href="/teachers"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors group"
              >
                <span>Barcha ustozlar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          </div>
        </section>

        {/* 3 Branches Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 w-fit">
                <MapPin className="w-3.5 h-3.5" /> QULAY JOY LASHUV
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Al-Farg’oniy <span className="gradient-text">Filiallari</span>
              </h2>
            </div>

            <Link
              href="/branches"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors group"
            >
              <span>Barcha filial ma'lumotlari</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <StudentReviews />

        {/* News Section */}
        <NewsSection posts={posts} />
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
