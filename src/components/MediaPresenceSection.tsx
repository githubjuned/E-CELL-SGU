import React from 'react';
import { Newspaper, ExternalLink, Video, Radio, Award } from 'lucide-react';

export const MediaPresenceSection: React.FC = () => {
  const mediaFeatures = [
    {
      outlet: 'The Economic Times',
      tag: 'Print & Digital',
      headline: "E-Cell IIT Bombay's Eureka! 2026 Launches Asia's Biggest Startup Search with $180K Prizes",
      quote: "Eureka! continues to be the incubator for India's next unicorns, providing invaluable access to SINE mentors and seed funds.",
      link: 'https://economictimes.indiatimes.com',
      logoText: 'THE ECONOMIC TIMES',
    },
    {
      outlet: 'YourStory',
      tag: 'Startup Coverage',
      headline: "How Eureka! Has Molded Over 15,000 Early-Stage Indian Founders Into Market Leaders",
      quote: "From GreenTech to DeepTech AI, Eureka! 2026 introduces specialized tracks supported by global investors.",
      link: 'https://yourstory.com',
      logoText: 'YOURSTORY',
    },
    {
      outlet: 'Inc42',
      tag: 'Ecosystem Insight',
      headline: "Eureka! GCC Expands To Dubai: Connecting Middle East Capital With Indian Innovation",
      quote: "The cross-border track allows UAE founders and Indian expats to pitch directly to Dubai Future District Fund.",
      link: 'https://inc42.com',
      logoText: 'Inc42',
    },
    {
      outlet: 'CNBC-TV18',
      tag: 'Television Feature',
      headline: "Young Innovators Take The Stage At IIT Bombay's Flagship Business Plan Competition",
      quote: "Broadcast coverage of the finals at E-Summit 2026 featuring live pitch feedback from Sequoia & Accel partners.",
      link: 'https://cnbctv18.com',
      logoText: 'CNBC TV18',
    },
  ];

  return (
    <section id="media-presence" className="py-20 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5 text-blue-600" />
            <span>In The Headlines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Media & Global Recognition
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Eureka! features prominently across national and international business publications, highlighting breakthrough student and early-stage ventures.
          </p>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mediaFeatures.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900 tracking-wider text-sm uppercase">
                    {item.logoText}
                  </span>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  "{item.headline}"
                </h3>

                <p className="text-xs text-slate-600 italic leading-relaxed">
                  {item.quote}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400">Published in Eureka! Season</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  <span>Read Full Article</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Broadcast Statistics */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Video className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h4 className="font-extrabold text-base">50+ Million Media Impressions</h4>
              <p className="text-xs text-blue-200">Across television, digital media, podcasts, and print newspapers annually.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-xs text-blue-200">Official PR Partner</div>
              <div className="text-sm font-bold text-white">Press Trust of India (PTI)</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
