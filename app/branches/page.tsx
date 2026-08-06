import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BranchCard from '@/components/BranchCard';
import FloatingButtons from '@/components/FloatingButtons';
import { prisma } from '@/lib/prisma';
import { MapPin } from 'lucide-react';

export const revalidate = 60;

export default async function BranchesPage() {
  const branches = await prisma.branch.findMany();

  return (
    <div className="min-h-screen flex flex-col bg-[#080D1A] text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        
        {/* Page Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <MapPin className="w-3.5 h-3.5" /> FARG'ONA VODIYSI BO'YICHA 3 TA FILIAL
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Bizning <span className="gradient-text">Filiallarimiz</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Uchko'prik, Yangiqo'rg'on va Buvayda tumanlarida joylashgan zamonaviy ta'lim maskanlarimiz haqida batafsil ma'lumot.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>

      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
