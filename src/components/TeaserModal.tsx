import React from 'react';
import { X, Play, Download, Sparkles, Trophy, Video } from 'lucide-react';

interface TeaserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEventUpdates: () => void;
}

export const TeaserModal: React.FC<TeaserModalProps> = ({
  isOpen,
  onClose,
  onOpenEventUpdates,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#080E21] border border-amber-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" />
            <span>Eureka! 2026 Official Teaser</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Asia's Largest Business Model Competition
          </h2>
        </div>

        {/* Video Frame Simulation */}
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 border border-slate-800 flex items-center justify-center group shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200"
            alt="Eureka Pitch Stage"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-transparent to-transparent" />
          
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
            className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/40 hover:scale-110 transition-all cursor-pointer group-hover:bg-amber-400"
          >
            <Play className="w-8 h-8 fill-slate-950 ml-1" />
          </a>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
            <span className="font-bold bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
              🎬 Eureka! Launch Teaser Video (2:45)
            </span>
            <span className="text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              IIT Bombay Campus
            </span>
          </div>
        </div>

        {/* Resources & Download Pitch Template */}
        <div className="p-4 rounded-2xl bg-[#0B132B] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">Download Sample Pitch Deck Template</h4>
            <p className="text-xs text-slate-400">Official 10-slide Eureka! PPT format designed by SINE IIT Bombay investors.</p>
          </div>

          <a
            href="#download-deck"
            onClick={(e) => {
              e.preventDefault();
              alert('Downloading official Eureka! 2026 Sample Pitch Deck Template (PPTX)...');
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Download PPT Template</span>
          </a>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenEventUpdates();
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
          >
            EVENT UPDATES 🚀
          </button>
        </div>

      </div>
    </div>
  );
};
