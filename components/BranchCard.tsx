'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Clock, ExternalLink, Navigation, Sparkles } from 'lucide-react';
import LeadModal from './LeadModal';

export interface BranchProps {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapLink: string;
  mapEmbedUrl?: string | null;
  image: string;
}

export default function BranchCard({ branch }: { branch: BranchProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col group">
        
        {/* Branch Image */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={branch.image}
            alt={branch.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-4 left-4 right-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
              Rasmiy Filial
            </span>
            <h3 className="text-2xl font-black text-white mt-1">{branch.name}</h3>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            
            {/* Address */}
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Manzil</span>
                <p className="font-medium leading-relaxed">{branch.address}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Telefon</span>
                <p className="font-semibold text-emerald-400">{branch.phone}</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Ish vaqti</span>
                <p className="font-medium">{branch.hours}</p>
              </div>
            </div>

          </div>

          {/* Map Embed Toggle or Link */}
          {showMap && branch.mapEmbedUrl && (
            <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-slate-800 mt-2">
              <iframe
                src={branch.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowMap(!showMap)}
              className="py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showMap ? "Xaritani yopish" : "Xaritada ko'rish"}</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-glow transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ro‘yxatdan o‘tish</span>
            </button>
          </div>

        </div>

      </div>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultBranch={branch.name}
      />
    </>
  );
}
