import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export interface PostProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
}

export default function NewsSection({ posts }: { posts: PostProps[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 bg-slate-900/40 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              YANGILIKLAR VA HABARLAR
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Akademiya <span className="gradient-text">Hayotidan</span>
            </h2>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group grid grid-cols-1 sm:grid-cols-12 gap-0"
            >
              <div className="relative h-48 sm:h-auto sm:col-span-5 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 sm:col-span-7 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
