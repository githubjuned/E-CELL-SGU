import React from 'react';
import { Handshake, ExternalLink } from 'lucide-react';

export const SponsorsSection: React.FC = () => {
  const sponsorsData = [
    { name: 'GoDaddy', tier: 'Title Sponsor', link: 'https://godaddy.com', logoText: 'GoDaddy' },
    { name: 'WestBridge Capital', tier: 'Co-Presents', link: 'https://westbridgecap.com', logoText: 'WESTBRIDGE | CAPITAL' },
    { name: 'Voltas', tier: 'Brought To You By', link: 'https://voltas.com', logoText: 'VOLTAS' },
    { name: 'FedEx ALFA', tier: 'Powered By', link: 'https://fedex.com', logoText: 'FedEx ALFA' },
    { name: 'GII', tier: 'In Association With', link: 'https://gii.ae', logoText: 'GII' },
    { name: '100X.VC', tier: 'Venture Capital Partner', link: 'https://100x.vc', logoText: '100X.VC' },
    { name: 'SINE IIT Bombay', tier: 'Incubation Partner', link: 'https://sineiitb.org', logoText: 'SINE IITB' },
    { name: 'Amazon Web Services', tier: 'Cloud credits ($100K)', link: 'https://aws.amazon.com', logoText: 'AWS' },
    { name: 'Google Cloud for Startups', tier: 'AI Credits Partner', link: 'https://cloud.google.com', logoText: 'Google Cloud' },
  ];

  return (
    <section id="sponsors" className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest">
            <Handshake className="w-4 h-4 text-blue-600" />
            <span>Powering Asian Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Our Esteemed <span className="text-blue-600">Sponsors & Partners</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Eureka! 2026 is proudly backed by global corporations, venture capital giants, and technology ecosystem leaders.
          </p>
        </div>

        {/* Sponsor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsorsData.map((sponsor, idx) => (
            <a
              key={idx}
              href={sponsor.link}
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-2xl p-6 transition-all group shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  {sponsor.tier}
                </span>
                <div className="text-lg font-extrabold text-slate-950 mt-3 group-hover:text-blue-600 transition-colors">
                  {sponsor.logoText}
                </div>
              </div>

              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors">
                <ExternalLink className="w-5 h-5" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
