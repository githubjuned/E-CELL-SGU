import React, { useState } from 'react';
import { PERKS_DATA } from '../data/eurekaData';
import { Gift, Calculator } from 'lucide-react';

export const IncentivesSection: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('All');

  const stages = ['All', 'All Participants', 'Zonalists', 'Semi-Finalists', 'Winners'];

  const filteredPerks = selectedStage === 'All'
    ? PERKS_DATA
    : PERKS_DATA.filter(p => p.stage === selectedStage);

  return (
    <section id="incentives" className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest">
            <Gift className="w-4 h-4 text-blue-600" />
            <span>₹1.5 Crore+ Total Value</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Perks & <span className="text-blue-600">Incentives Engine</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Every registered team gains immediate access to software credits and tools worth over ₹50,000—even before shortlisting!
          </p>

          {/* Stage Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {stages.map((stg) => (
              <button
                key={stg}
                onClick={() => setSelectedStage(stg)}
                id={`perk-stage-${stg.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedStage === stg
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {stg}
              </button>
            ))}
          </div>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredPerks.map((perk) => (
            <div
              key={perk.id}
              className="bg-white hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
                    {perk.stage}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{perk.category}</span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-extrabold text-xs mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {perk.logo}
                </div>

                <h3 className="text-lg font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors mb-1">
                  {perk.title}
                </h3>
                <div className="text-xs font-bold text-emerald-600 mb-2">
                  Value: {perk.value}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {perk.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Provided by:</span>
                <span className="font-bold text-slate-800">{perk.provider}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Perks Value Calculator Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                <Calculator className="w-4 h-4" />
                <span>Instant Value Unlocked</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                What do you get just by submitting your application?
              </h3>
              <p className="text-blue-100 text-sm max-w-xl">
                Simply completing Stage 1 registration unlocks free Zoho One 1-year licenses, Swipe Pro billing, and AWS starter cloud passes!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-3 min-w-[280px]">
              <span className="text-xs text-blue-200 font-bold uppercase tracking-wider">
                Stage 1 Instant Perk Value
              </span>
              <div className="text-3xl sm:text-4xl font-black text-amber-300">
                ₹2,00,000+
              </div>
              <div className="text-[11px] text-blue-200">
                Per team in software, cloud & SaaS credits
              </div>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-extrabold">
                  ✓ 100% Non-Dilutive
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
