import React, { useState } from 'react';
import { TRACKS_DATA } from '../data/eurekaData';
import { Track, TrackId } from '../types';
import { 
  Briefcase, 
  HeartHandshake, 
  Leaf, 
  Coins, 
  Cpu, 
  Stethoscope, 
  Globe, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Info,
  X
} from 'lucide-react';

interface TracksSectionProps {
  onSelectTrackToRegister: (trackId: TrackId) => void;
}

export const TracksSection: React.FC<TracksSectionProps> = ({ onSelectTrackToRegister }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalTrack, setActiveModalTrack] = useState<Track | null>(null);

  const categories = ['All', 'Flagship', 'Specialized', 'Global', 'School'];

  const filteredTracks = selectedCategory === 'All' 
    ? TRACKS_DATA 
    : TRACKS_DATA.filter(t => t.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return Briefcase;
      case 'HeartHandshake': return HeartHandshake;
      case 'Leaf': return Leaf;
      case 'Coins': return Coins;
      case 'Cpu': return Cpu;
      case 'Stethoscope': return Stethoscope;
      case 'Globe': return Globe;
      case 'GraduationCap': return GraduationCap;
      default: return Briefcase;
    }
  };

  return (
    <section id="tracks" className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Tailored For Every Domain</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Explore Eureka! <span className="text-blue-600">8 Specialized Tracks</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Choose the track that fits your startup sector. Each track features dedicated industry mentors, partner grants, and tailored cash prize pools.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                id={`track-filter-${cat.toLowerCase()}`}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat === 'All' ? 'All 8 Tracks' : `${cat} Tracks`}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => {
            const IconComp = getIcon(track.iconName);
            return (
              <div
                key={track.id}
                className="bg-white hover:bg-blue-50/30 border border-slate-200 hover:border-blue-300 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-sm"
              >
                {/* Accent top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${track.accentColor}`} />

                <div>
                  {/* Header Badge */}
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:scale-105 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full">
                      {track.category}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-extrabold text-slate-950 mb-1 group-hover:text-blue-600 transition-colors">
                    {track.name}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                    {track.tagline}
                  </p>

                  {/* Sponsor & Prize */}
                  <div className="space-y-2 mb-5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Track Partner:</span>
                      <span className="font-bold text-blue-700">{track.sponsor}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Prize Pool:</span>
                      <span className="font-extrabold text-slate-950">{track.prizePool}</span>
                    </div>
                  </div>

                  {/* Key Perks Snippet */}
                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Key Incentives:
                    </div>
                    {track.keyPerks.slice(0, 2).map((perk, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA Actions */}
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onSelectTrackToRegister(track.id)}
                    id={`apply-track-${track.id}`}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply to {track.name.split(' ')[0]} Track</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveModalTrack(track)}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                    <span>View Eligibility & Details</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Track Details Modal */}
      {activeModalTrack && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900">
            
            <button
              onClick={() => setActiveModalTrack(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                  {activeModalTrack.category} Track
                </span>
                <h3 className="text-2xl font-extrabold text-slate-950 mt-1">
                  {activeModalTrack.name}
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {activeModalTrack.description}
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-slate-500 text-xs">Partner Sponsor:</span>
                <p className="font-bold text-blue-700 text-sm">{activeModalTrack.sponsor}</p>
              </div>
              <div>
                <span className="text-slate-500 text-xs">Total Prize Pool:</span>
                <p className="font-bold text-slate-950 text-sm">{activeModalTrack.prizePool}</p>
              </div>
            </div>

            {/* Eligibility Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                Eligibility Criteria
              </h4>
              <div className="space-y-2">
                {activeModalTrack.eligibility.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* All Perks */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                Included Track Perks
              </h4>
              <div className="space-y-2">
                {activeModalTrack.keyPerks.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setActiveModalTrack(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const trackId = activeModalTrack.id;
                  setActiveModalTrack(null);
                  onSelectTrackToRegister(trackId);
                }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-blue-700 shadow-md"
              >
                Register For This Track
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
