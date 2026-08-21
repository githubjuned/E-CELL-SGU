import React, { useState } from 'react';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface TimelineSectionProps {
  onOpenEventUpdates: () => void;
}

interface PhaseData {
  id: string;
  label: string;
  cards: {
    date: string;
    title: string;
    description: string;
    actionLabel?: string;
  }[];
}

const ROADMAP_PHASES: PhaseData[] = [
  {
    id: 'registration',
    label: 'REGISTRATION',
    cards: [
      {
        date: '10th July',
        title: 'REGISTRATION PERIOD',
        description:
          'Eureka! opens its applications for all entrepreneurs on 10th July. Register by filling your details and logging in to the Eureka! dashboard. Add your co-founders and fill your startup idea details.',
        actionLabel: 'VIEW EVENT UPDATES 🚀',
      },
      {
        date: '18th August',
        title: 'QUESTIONNAIRE DEADLINE',
        description:
          'Our questionnaire tests the fundamental aspects of your startup idea, including customer segments, target markets, value propositions, and market analysis.',
      },
      {
        date: '11th September',
        title: 'ZONALIST DECLARATION',
        description:
          'Top startups are selected for the zonals round. This embarks your journey into Eureka! wherein you would be provided with a multiple opportunities to network, access to mentoring and workshops.',
      },
    ],
  },
  {
    id: 'zonals',
    label: 'ZONALS',
    cards: [
      {
        date: '15th September',
        title: 'MENTOR ALLOCATION',
        description:
          'Shortlisted zonalists get 1-on-1 mentor assignment. Dedicated industry leaders guide you through financial modeling, market validation, and pitch deck refinement.',
      },
      {
        date: '3rd October',
        title: 'OFFLINE ZONAL PITCHING',
        description:
          'Pitch your startup live in front of zonal juries across 8 major hub cities in India. Gain critical feedback, networking, and regional media visibility.',
      },
      {
        date: '10th October',
        title: 'SEMI-FINALIST DECLARATION',
        description:
          'Announcement of top semi-finalist startups advancing to the national stage for closed-room VC interactions and direct term sheet reviews.',
      },
    ],
  },
  {
    id: 'vc_round',
    label: 'VC ROUND',
    cards: [
      {
        date: '17th October',
        title: 'CLOSED-DOOR VC PITCHING',
        description:
          'Present 10-minute high-stakes pitches to partners from 100X.VC, WestBridge, Sequoia, and premier angel networks in private evaluation rooms.',
      },
      {
        date: '20th October',
        title: 'DUE DILIGENCE & TERM SHEETS',
        description:
          'Top performing startups enter term sheet evaluations, iSAFE agreements, and SINE IIT Bombay incubation fast-track reviews.',
      },
      {
        date: '28th October',
        title: 'FINALISTS ANNOUNCEMENT',
        description:
          'Top finalists selected across all tracks receive spotlight invitations for E-Summit IIT Bombay Grand Finale.',
      },
    ],
  },
  {
    id: 'finale',
    label: 'FINALE',
    cards: [
      {
        date: '20th November',
        title: 'NATIONAL E-SUMMIT DEMO DAY',
        description:
          'Showcase your product and prototype live at IIT Bombay campus before 10,000+ attendees, global VCs, and media outlets.',
      },
      {
        date: '21st November',
        title: 'GRAND FINALE PITCH',
        description:
          'The ultimate pitch stage to claim cash prizes from the ₹1.5 Crore+ pool, equity term sheets, and global recognition.',
      },
      {
        date: '22nd November',
        title: 'AWARDS & INCUBATION',
        description:
          'Winners felicitated at the Grand Award Ceremony, unlocking $100k+ cloud credits, legal support, and SINE campus incubation.',
      },
    ],
  },
];

export const TimelineSection: React.FC<TimelineSectionProps> = ({ onOpenEventUpdates }) => {
  const [activePhaseId, setActivePhaseId] = useState<string>('registration');

  const currentPhase = ROADMAP_PHASES.find((p) => p.id === activePhaseId) || ROADMAP_PHASES[0];

  return (
    <section id="timeline" className="py-20 bg-white text-slate-900 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>5-Month Acceleration Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Competition <span className="text-blue-600">Roadmap & Milestones</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From initial registration to the grand finale stage at E-Summit IIT Bombay. Here is how your journey unfolds.
          </p>
        </div>

        {/* Outer Sky-Blue Gradient Container matching image */}
        <div className="rounded-3xl bg-gradient-to-b from-[#8fbae0] via-[#afd2f0] to-[#e4f0fa] p-6 sm:p-10 md:p-14 shadow-sm border border-blue-200/60">
          
          {/* Phase Header Horizontal Indicator Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-10 text-center">
            {ROADMAP_PHASES.map((phase, idx) => {
              const isActive = phase.id === activePhaseId;
              return (
                <React.Fragment key={phase.id}>
                  <button
                    onClick={() => setActivePhaseId(phase.id)}
                    className={`text-base sm:text-xl md:text-2xl font-black uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'text-blue-600 drop-shadow-xs scale-105'
                        : 'text-slate-950 hover:text-blue-700'
                    }`}
                  >
                    {phase.label}
                  </button>

                  {idx < ROADMAP_PHASES.length - 1 && (
                    <span className="text-blue-500 font-extrabold text-xs sm:text-base tracking-tighter select-none">
                      »»»»»
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* 3 Milestone Cards Grid matching image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {currentPhase.cards.map((card, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Date */}
                  <h3 className="text-slate-950 font-bold text-base sm:text-lg mb-1">
                    {card.date}
                  </h3>

                  {/* Title in vibrant blue */}
                  <h4 className="text-blue-600 font-extrabold text-sm sm:text-base tracking-wide uppercase mb-4 leading-tight">
                    {card.title}
                  </h4>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Optional Action Button if present */}
                {card.actionLabel && (
                  <div className="mt-6 pt-4 border-t border-slate-200/80">
                    <button
                      onClick={onOpenEventUpdates}
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{card.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Subtext info */}
          <div className="mt-8 text-center text-xs text-slate-700 font-medium">
            Click on <strong className="text-slate-900">ZONALS</strong>, <strong className="text-slate-900">VC ROUND</strong>, or <strong className="text-slate-900">FINALE</strong> above to view upcoming stage deadlines.
          </div>

        </div>

      </div>
    </section>
  );
};

