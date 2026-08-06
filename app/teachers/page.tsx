import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeacherCard from '@/components/TeacherCard';
import FloatingButtons from '@/components/FloatingButtons';
import { prisma } from '@/lib/prisma';
import { Users } from 'lucide-react';

export const revalidate = 60;

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany();

  return (
    <div className="min-h-screen flex flex-col bg-[#080D1A] text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        
        {/* Page Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Users className="w-3.5 h-3.5" /> TAJRIBALI MENTORLAR
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Bizning <span className="gradient-text">Ustozlarimiz</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Sochaning xalqaro sertifikatlar va ko'p yillik amaliy tajribaga ega mutaxassislari bilan tanishing.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>

      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
