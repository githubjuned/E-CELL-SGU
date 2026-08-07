import React, { useState } from 'react';
import { PitchSubmission } from '../types';
import { TRACKS_DATA } from '../data/eurekaData';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Gift, 
  Copy, 
  Check, 
  Award,
  Layers,
  Users,
  FileText,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: PitchSubmission | null;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  submission,
}) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  if (!isOpen || !submission) return null;

  const trackInfo = TRACKS_DATA.find((t) => t.id === submission.trackId);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const unlockedPerks = [
    { id: 'perk-1', title: 'Zoho One 1-Year Free', code: 'EUREKA-ZOHO-2026', value: '₹1,50,000 / team', category: 'SaaS & Productivity' },
    { id: 'perk-2', title: 'Swipe Pro 12-Mo Upgrade', code: 'EUREKA-SWIPE-PRO', value: '₹50,000 / team', category: 'Billing & Invoicing' },
    { id: 'perk-3', title: 'AWS Cloud Credits', code: 'AWS-ACTIVATE-EUREKA', value: '$5,000 Credits', category: 'Cloud Infrastructure' },
    { id: 'perk-4', title: 'Google Gemini API Trial', code: 'GEMINI-EUREKA-IITB', value: '$10,000 Credits', category: 'AI Models' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:28px_28px] animate-fadeIn">
      
      {/* Top Header / Navbar space with Close Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/xabhk9g8/image/upload/v1786130806/E-Cell_Logo-Black_qdscmy.png"
            alt="E-CELL SGU Logo"
            className="h-9 sm:h-11 w-auto object-contain"
          />
          <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
            E-CELL SGU
          </span>
        </div>

        <button
          onClick={onClose}
          id="close-dashboard-portal-btn"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer shadow-md hover:scale-105"
        >
          <span>Close Portal</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Portal Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col items-center">
        
        {/* Giant Page Title matching website styling */}
        <div className="text-center mb-8">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2 inline-flex items-center gap-1.5 border border-emerald-300 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Registration Confirmed</span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-black tracking-tight uppercase mt-2">
            APPLICATION PORTAL
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 max-w-xl mx-auto">
            Welcome back, <strong className="text-slate-900">{submission.teamLead.name}</strong>! Track your startup submission details and instant participant benefits below.
          </p>
        </div>

        {/* Solid Black High-Contrast Card */}
        <div className="bg-black text-white p-6 sm:p-10 rounded-2xl w-full max-w-4xl shadow-2xl relative border border-slate-950 space-y-8">
          
          {/* Card Header & Reference Badge */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-600/60 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{submission.status || 'Under Review'}</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">Submitted: {submission.submittedAt}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 tracking-tight">
                {submission.startupName}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Team Lead: <strong className="text-slate-200">{submission.teamLead.name}</strong> ({submission.teamLead.email})
              </p>
            </div>

            {/* Team Reference Code Badge */}
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3 shrink-0 shadow-md">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Team Reference Code
                </span>
                <span className="text-amber-400 font-mono font-extrabold text-base tracking-wider">
                  {submission.id}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(submission.id, 'ref-code')}
                className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {copiedCodeId === 'ref-code' ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Stage 1 Evaluation Status Banner */}
          <div className="p-5 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-start gap-3.5 shadow-lg">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
              <Clock className="w-5 h-5 animate-spin" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-amber-200 tracking-wide">
                Stage 1 Business Review In Progress
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your submission and pitch deck are currently under evaluation by the Eureka! screening panel. Shortlisted Zonalist teams will be officially announced on <strong className="text-amber-300">September 5th</strong> for 1-on-1 mentor matching.
              </p>
            </div>
          </div>

          {/* Grid Row 1: Track Info & Mentorship Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Track Info Box */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Assigned Track</span>
              </div>
              <div className="text-lg font-black text-white">
                {trackInfo?.name || 'Flagship Business Track'}
              </div>
              <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/80 flex flex-col gap-0.5">
                <span>Sponsor: <strong className="text-slate-200">{trackInfo?.sponsor || 'Salesken / 100X.VC'}</strong></span>
                <span>Prize Pool: <strong className="text-emerald-400">{trackInfo?.prizePool || '₹25,00,000 + Equity Term Sheets'}</strong></span>
              </div>
            </div>

            {/* Mentorship Status Box */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Mentorship Network Status</span>
              </div>
              <div className="text-lg font-black text-emerald-400">
                Mentor Allocation Pending
              </div>
              <p className="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                Access to 300+ corporate executives & VCs unlocked upon Stage 1 Zonalist announcement.
              </p>
            </div>

          </div>

          {/* Instant Unlocked Participant Perks Section */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Unlocked Participant Perks (Instant Access)</span>
              </h3>
              <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-bold uppercase">
                4 Perks Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {unlockedPerks.map((perk) => (
                <div
                  key={perk.id}
                  className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-extrabold text-white group-hover:text-blue-300 transition-colors">
                        {perk.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        {perk.category}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 rounded">
                      {perk.value}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-mono font-bold text-amber-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                      {perk.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(perk.code, perk.id)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-blue-600 text-white font-bold text-[11px] rounded transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCodeId === perk.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Details Summary Card */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Submitted Startup Overview</span>
            </h3>

            {submission.oneLiner && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Elevator Pitch</span>
                <p className="text-xs text-slate-200 italic bg-slate-950 p-3 rounded-lg border border-slate-850 leading-relaxed font-medium">
                  "{submission.oneLiner}"
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Development Stage</span>
                <span className="text-white font-bold">{submission.stage}</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Pitch Deck</span>
                <span className="text-amber-400 font-bold truncate block">{submission.deckName || 'Pitch_Deck.pdf'}</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Team Members</span>
                <span className="text-white font-bold">{1 + (submission.teamMembers?.length || 0)} Member(s)</span>
              </div>
            </div>

            {submission.teamMembers && submission.teamMembers.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Co-Founders & Team List
                </span>
                <div className="flex flex-wrap gap-2">
                  {submission.teamMembers.map((m, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-slate-950 text-slate-300 text-xs font-semibold border border-slate-800">
                      {m.name || 'Team Member'} {m.role ? `(${m.role})` : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-800">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-colors cursor-pointer border border-slate-800 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Print Application Summary</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-extrabold text-xs transition-all cursor-pointer shadow-lg shadow-blue-600/30 flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>Close Portal</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
