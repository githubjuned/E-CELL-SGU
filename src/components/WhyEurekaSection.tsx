import React, { useState } from 'react';

export const WhyEurekaSection: React.FC = () => {
  const statsRow1 = [
    { stat: 'INR 2.0 Cr+', label: 'PRIZES' },
    { stat: '$2.5 B+', label: 'COMBINED STARTUP VALUATION' },
    { stat: '300+', label: 'MENTORS' },
    { stat: '100+', label: 'INVESTORS & VCs' },
    { stat: '10,000+', label: 'STARTUPS REACHED' },
  ];

  const statsRow2 = [
    { stat: '25 lakhs+', label: 'EQUITY FREE GRANTS' },
    { stat: '28th', label: 'EDITION' },
    { stat: '45+', label: 'FINALISTS & WINNERS' },
    { stat: '150+', label: 'GLOBAL PARTNERS' },
    { stat: '50+', label: 'MEDIA COVERAGE' },
  ];

  // Repeat items for seamless infinite marquee loop
  const duplicatedRow1 = [...statsRow1, ...statsRow1, ...statsRow1, ...statsRow1];
  const duplicatedRow2 = [...statsRow2, ...statsRow2, ...statsRow2, ...statsRow2];

  const [row1Paused, setRow1Paused] = useState(false);
  const [row2Paused, setRow2Paused] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="w-full">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase text-black">
            WHY <span className="text-[#2563eb] drop-shadow-sm">EUREKA!</span>
          </h2>
        </div>

        {/* Marquee Rows Wrapper */}
        <div className="space-y-6 sm:space-y-8 overflow-hidden py-4">
          
          {/* Row 1: Moving Right to Left */}
          <div
            className="flex overflow-hidden relative w-full group cursor-pointer"
            onMouseEnter={() => setRow1Paused(true)}
            onMouseLeave={() => setRow1Paused(false)}
            onClick={() => setRow1Paused((prev) => !prev)}
          >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div
              className="animate-marquee-left flex gap-6 shrink-0"
              style={{
                animationPlayState: row1Paused ? 'paused' : 'running',
              }}
            >
              {duplicatedRow1.map((item, idx) => (
                <div
                  key={idx}
                  className="w-[320px] sm:w-[380px] shrink-0 bg-[#020617] border border-blue-900/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:border-blue-500 transition-colors group/card"
                >
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight group-hover/card:scale-105 transition-transform">
                      {item.stat}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-300 uppercase tracking-wider leading-tight max-w-[130px]">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Moving Left to Right */}
          <div
            className="flex overflow-hidden relative w-full group cursor-pointer"
            onMouseEnter={() => setRow2Paused(true)}
            onMouseLeave={() => setRow2Paused(false)}
            onClick={() => setRow2Paused((prev) => !prev)}
          >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div
              className="animate-marquee-right flex gap-6 shrink-0"
              style={{
                animationPlayState: row2Paused ? 'paused' : 'running',
              }}
            >
              {duplicatedRow2.map((item, idx) => (
                <div
                  key={idx}
                  className="w-[320px] sm:w-[380px] shrink-0 bg-[#020617] border border-blue-900/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:border-blue-500 transition-colors group/card"
                >
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight group-hover/card:scale-105 transition-transform">
                      {item.stat}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-300 uppercase tracking-wider leading-tight max-w-[130px]">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


