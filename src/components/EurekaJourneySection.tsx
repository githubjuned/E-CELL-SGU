import React from 'react';
import { Calendar } from 'lucide-react';

interface JourneyStep {
  date: string;
  title: string;
  description: string;
}

export const EurekaJourneySection: React.FC = () => {
  const steps: JourneyStep[] = [
    {
      date: 'August 7th',
      title: 'Applications Open',
      description: 'Submit your startup idea and team information',
    },
    {
      date: 'August 18',
      title: 'Questionaire Deadline',
      description: 'Final deadline for all submissions',
    },
    {
      date: 'August 22',
      title: 'Finals & Demo Day (Internal Pitch)',
      description: 'Submit, refine through workshops, then compete at Finals and Demo Day.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#f8fafc] border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Large Outlined TIMELINE Display Text */}
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-10 text-center overflow-hidden select-none">
          <h1 className="timeline-stroke-text text-[60px] sm:text-[110px] md:text-[145px] lg:text-[176px] tracking-[6px] leading-none pointer-events-none opacity-90 transition-all">
            TIMELINE
          </h1>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase text-black">
            THE <span className="text-[#2563eb]">EUREKA!</span> JOURNEY
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            From idea to enterprise, here's your journey through Asia's Largest Startup Launchpad Program
          </p>
        </div>

        {/* 3 Journey Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              
              {/* Card Box with Calendar Icon & Date */}
              <div className="w-full bg-white border-2 border-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-blue-600 transition-all aspect-square max-w-[220px] mx-auto">
                <Calendar className="w-7 h-7 text-slate-900 group-hover:text-blue-600 transition-colors mb-3 stroke-[2]" />
                <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {step.date}
                </span>
              </div>

              {/* Step Info below box */}
              <div className="mt-5 space-y-2 max-w-[240px]">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-950 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
