import React from 'react';
import { Rocket, GraduationCap, CheckCircle2, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const uniqueFeatures = [
    {
      badge: '300+ Mentors',
      title: 'DEDICATED ADVISORY',
      description:
        '1-on-1 dedicated advisory over 4 weeks with 300+ domain experts in AI, FinTech, Health, SaaS, and DeepTech.',
    },
    {
      badge: '₹1.5 Crore+ Pool',
      title: 'NON-DILUTIVE CASH',
      description:
        'Non-dilutive grant funding and cash prizes with zero equity taken, ensuring founders retain 100% ownership.',
    },
    {
      badge: 'Premier Investors',
      title: 'TOP VC NETWORK',
      description:
        'Pitch directly in closed-door sessions to top partners from 100X.VC, WestBridge, Sequoia, and angel networks.',
    },
    {
      badge: 'IIT Bombay Campus',
      title: 'SINE INCUBATION',
      description:
        'Access physical workspace, hardware/prototyping labs, patent assistance, and fast-tracked IIT Bombay incubation.',
    },
  ];

  return (
    <section id="structure" className="py-20 bg-white text-slate-900 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Structure & Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            26 Years of Building <span className="text-blue-600">Asia's Largest</span> Launchpad
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Founded by the Entrepreneurship Cell at IIT Bombay, Eureka! is structured to solve the critical gap between early ideation and venture funding.
          </p>
        </div>

        {/* Outer Sky-Blue Gradient Container matching Roadmap section style */}
        <div className="rounded-3xl bg-gradient-to-b from-[#8fbae0] via-[#afd2f0] to-[#e4f0fa] p-6 sm:p-10 md:p-14 shadow-sm border border-blue-200/60 space-y-8">
          
          {/* Section Sub-Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/80 text-blue-700 text-xs font-extrabold uppercase tracking-widest shadow-xs">
              <Rocket className="w-4 h-4 text-blue-600" />
              <span>The Eureka! Advantage</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              What Makes <span className="text-blue-600">Eureka! Unique?</span>
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              Unlike conventional pitch competitions, Eureka! is a comprehensive 5-month founder accelerator. We provide systematic hand-holding: from transforming a napkin sketch into a validated business model, to pairing you with industry veterans and putting you face-to-face with top-tier VCs.
            </p>
          </div>

          {/* 4 Feature Cards Grid matching Competition Roadmap Cards design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {uniqueFeatures.map((feat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 border border-white/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Badge / Subtitle */}
                  <h3 className="text-slate-950 font-bold text-sm sm:text-base mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{feat.badge}</span>
                  </h3>

                  {/* Title in vibrant blue */}
                  <h4 className="text-blue-600 font-extrabold text-xs sm:text-sm tracking-wide uppercase mb-3 leading-tight">
                    {feat.title}
                  </h4>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Did You Know Banner */}
          <div className="max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white text-slate-900 text-xs sm:text-sm leading-relaxed font-medium flex items-center gap-3 shadow-xs">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <strong className="text-blue-800">Did You Know?</strong> Startups launched through Eureka! have gone on to become global unicorns (<strong>BrowserStack</strong>), public enterprises, and pioneer space exploration (<strong>Agnikul Cosmos</strong>).
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

