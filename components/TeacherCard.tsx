import Image from 'next/image';
import { Star, Award, BookOpen } from 'lucide-react';

export interface TeacherProps {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
  rating?: number;
}

export default function TeacherCard({ teacher }: { teacher: TeacherProps }) {
  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1 p-6 space-y-4">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shrink-0">
          <Image
            src={teacher.image}
            alt={teacher.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{teacher.rating || 4.9}</span>
          </div>
          <h3 className="text-lg font-extrabold text-white group-hover:text-emerald-400 transition-colors">
            {teacher.name}
          </h3>
          <p className="text-xs font-semibold text-emerald-400">
            {teacher.role}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1">
          <Award className="w-3 h-3 text-emerald-400" /> {teacher.experience}
        </span>
        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1">
          <BookOpen className="w-3 h-3 text-emerald-400" /> {teacher.specialty}
        </span>
      </div>

      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
        {teacher.bio}
      </p>
    </div>
  );
}
