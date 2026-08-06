'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight, Sparkles, Tag } from 'lucide-react';
import LeadModal from './LeadModal';

export interface CourseProps {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  level: string;
  image: string;
  featured?: boolean;
}

export default function CourseCard({ course }: { course: CourseProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col group hover:-translate-y-1 shadow-md hover:shadow-glow">
        
        {/* Course Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

          {/* Category Tag */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
              {course.category}
            </span>
            {course.featured && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" /> Top Kurs
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {course.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                {course.level}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
              <Link href={`/courses/${course.slug}`}>
                {course.title}
              </Link>
            </h3>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Price & Action */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Oylik to'lov</div>
              <div className="text-base font-black text-emerald-400">{course.price}</div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/courses/${course.slug}`}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
              >
                Batafsil
              </Link>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-glow flex items-center gap-1 cursor-pointer"
              >
                <span>Yozilish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCourse={course.title}
      />
    </>
  );
}
