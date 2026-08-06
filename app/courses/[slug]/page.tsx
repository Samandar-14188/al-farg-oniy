import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Clock, Tag, Award, CheckCircle2, Sparkles, UserCheck, BookOpen, Layers } from 'lucide-react';
import LeadModal from '@/components/LeadModal';

export const revalidate = 60;

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug }
  });

  if (!course) {
    notFound();
  }

  let modules: any[] = [];
  try {
    modules = JSON.parse(course.curriculum || '[]');
  } catch (e) {
    modules = [];
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#080D1A] text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        
        {/* Banner Section */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-emerald-500/20 overflow-hidden relative shadow-glow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" /> {course.duration}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-emerald-400" /> {course.level}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Oylik Ta'lim Narxi</p>
                  <p className="text-2xl font-black text-emerald-400">{course.price}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Course Syllabus & Learning Outcomes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Syllabus & Details */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Outcomes */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" /> Kurs Yakunida Nimani O'rganasiz?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Amaliy loyihalar va portfolio yaratish</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Xalqaro standartlarga mos bilimlarni egallash</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Tajribali mentordan shaxsiy feedback</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Rasmiy sertifikat va rezyume tayyorlash</span>
                </div>
              </div>
            </div>

            {/* Curriculum Accordion */}
            {modules.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" /> Kurs O'quv Dasturi (Syllabus)
                </h3>

                <div className="space-y-3">
                  {modules.map((mod: any, index: number) => (
                    <div
                      key={index}
                      className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1"
                    >
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                        {mod.module}
                      </span>
                      <h4 className="text-base font-bold text-white">
                        {mod.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Direct Lead Form Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-6 shadow-glow">
              <div>
                <h3 className="text-xl font-bold text-white">Ushbu kursga yozilish</h3>
                <p className="text-slate-400 text-xs mt-1">
                  Joylar soni cheklangan. Operatorimiz 15 daqiqada bog'lanadi.
                </p>
              </div>

              {/* Directly embedded form */}
              <DirectCourseForm courseTitle={course.title} />
            </div>
          </div>

        </div>

      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}

function DirectCourseForm({ courseTitle }: { courseTitle: string }) {
  return (
    <form action="/api/leads" method="POST" className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">Ism-familiyangiz *</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Ali Valiyev"
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">Telefon raqamingiz *</label>
        <input
          type="text"
          name="phone"
          required
          defaultValue="+998 "
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <input type="hidden" name="courseName" value={courseTitle} />
      <input type="hidden" name="branchName" value="Uchko'prik Filiali" />

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs shadow-glow hover:opacity-95 cursor-pointer"
      >
        Yozilish so'rovini yuborish
      </button>
    </form>
  );
}
