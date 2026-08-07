import React from 'react';
import { PAST_WINNERS_DATA } from '../data/eurekaData';
import { Trophy, TrendingUp, Quote } from 'lucide-react';

export const WallOfFameSection: React.FC = () => {
  return (
    <section id="past-winners" className="py-20 bg-white text-slate-900 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-blue-600" />
            <span>Eureka! Alumni Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Past Winners & <span className="text-blue-600">Wall of Fame</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            From classroom prototypes to global unicorns and multi-billion dollar acquisitions. Look where Eureka! alumni are today.
          </p>
        </div>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PAST_WINNERS_DATA.map((winner) => (
            <div
              key={winner.id}
              className="bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between group shadow-sm relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-sm">
                      {winner.logo.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors">
                        {winner.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">Founders: {winner.founder}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                    Winner '{winner.year}
                  </span>
                </div>

                {/* Valuation / Funding Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>{winner.fundingRaised}</span>
                </div>

                {/* Description */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {winner.description}
                </p>

                {/* Quote */}
                {winner.quote && (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 relative shadow-xs">
                    <Quote className="w-4 h-4 text-blue-300 absolute top-2 right-3" />
                    <p className="text-xs text-slate-600 italic font-serif leading-relaxed">
                      "{winner.quote}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Flagship Track:</span>
                <span className="font-bold text-blue-700">{winner.track}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
