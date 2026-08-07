import React from 'react';
import { Rocket, ExternalLink, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRegister }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = [
    { label: 'Home', id: 'home' },
    { label: 'Structure', id: 'structure' },
    { label: 'Contact us', id: 'contact' },
  ];

  return (
    <footer className="bg-[#030712] text-slate-400 pt-16 sm:pt-20 pb-12 relative overflow-hidden rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4.5rem] border-t border-slate-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black">
                <Rocket className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">EUREKA! 2026</span>
                <p className="text-[11px] text-slate-400 font-medium">E-CELL IIT BOMBAY</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Asia's Largest Business Model Competition fostering innovation, providing mentorship, non-dilutive prizes, and venture funding for early-stage founders globally.
            </p>

            <div className="pt-2 text-xs font-bold text-blue-400">
              📍 Sanjay Ghodawat University, Kolhapur (Internal Pitch)
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs font-medium">
              {links.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">E-Cell Portals</h4>
            <div className="space-y-2 text-xs">
              <a href="https://ecell.in" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-400">
                <span>E-Cell IIT Bombay Main Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://ecell.in/esummit" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-400">
                <span>E-Summit 2026 Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://sineiitb.org" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-400">
                <span>SINE IITB Incubator</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
              >
                Register Startup
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Entrepreneurship Cell, IIT Bombay. All rights reserved.
          </div>

          {/* Premium "Designed by AUTHENEX" Branding Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800/90 text-[11px] font-medium text-slate-400 shadow-sm hover:border-blue-500/40 transition-all duration-300 group cursor-default">
            <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Designed by</span>
            <span className="font-black tracking-wider bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent uppercase text-[11px]">
              AUTHENEX
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold cursor-pointer transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
