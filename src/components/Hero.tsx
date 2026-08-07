import React from 'react';
import { Play, Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenRegister: () => void;
  onExploreTracks: () => void;
  onOpenTeaserModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenRegister,
  onExploreTracks,
  onOpenTeaserModal,
}) => {
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#a0c4e2] via-[#b8d5ec] to-[#d0e2f2] flex items-center overflow-hidden">
      
      {/* Soft background ambient highlights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-white/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-6 space-y-4 antialiased">
            <div className="space-y-0.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-[#000000] tracking-tight leading-[1.05] uppercase">
                ASIA'S LARGEST
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-[#273A8F] tracking-tight leading-[1.05] uppercase">
                STARTUP
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-[#000000] tracking-tight leading-[1.05] uppercase">
                LAUNCHPAD
              </h1>
            </div>

            <p className="text-[#2d3748] text-sm sm:text-base font-normal leading-relaxed max-w-lg pt-1 antialiased">
              One Stage. Direct access to capital, partnerships, mentorship, and a global network.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenRegister}
                className="px-8 py-3.5 rounded-xl border-2 border-slate-950 bg-white text-slate-950 font-extrabold text-sm tracking-wider uppercase hover:bg-slate-950 hover:text-white transition-all shadow-md cursor-pointer"
              >
                REGISTER
              </button>
            </div>

            {/* Micro Metrics Banner */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-900/10 max-w-lg">
              <div>
                <div className="text-2xl font-black text-slate-950">₹1.5+ Cr</div>
                <div className="text-xs font-semibold text-slate-700">In Cash & Prizes</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#1d3557]">15,000+</div>
                <div className="text-xs font-semibold text-slate-700">Startups Pitched</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-950">25+ Yrs</div>
                <div className="text-xs font-semibold text-slate-700">Legacy of SINE</div>
              </div>
            </div>
          </div>

          {/* Right Column: Eureka! Main Official Banner Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-blue-100 max-w-xl w-full relative group hover:shadow-3xl transition-shadow bg-white">
              <img
                src="https://res.cloudinary.com/dyvmqkxok/image/upload/v1786093192/Screenshot_2026-08-07_142722_ux7gsx.png"
                alt="Eureka! 2026 Main Banner"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
