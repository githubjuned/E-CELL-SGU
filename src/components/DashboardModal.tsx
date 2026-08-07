import React from 'react';
import { PitchSubmission } from '../types';
import { TRACKS_DATA, PERKS_DATA } from '../data/eurekaData';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Clock, 
  User, 
  FileText, 
  Gift, 
  Users, 
  Copy, 
  ExternalLink,
  ShieldCheck
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
  if (!isOpen || !submission) return null;

  const trackInfo = TRACKS_DATA.find((t) => t.id === submission.trackId);

  const copyCode = () => {
    navigator.clipboard.writeText(submission.id);
    alert(`Copied team code ${submission.id} to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-[#080E21] border border-amber-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase">
                APPLICATION SUBMITTED
              </span>
              <span className="text-xs text-slate-400">Date: {submission.submittedAt}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {submission.startupName}
            </h2>
            <p className="text-xs text-slate-400">
              Team Lead: <strong className="text-slate-200">{submission.teamLead.name}</strong> ({submission.teamLead.email})
            </p>
          </div>

          {/* Reference ID Badge */}
          <div className="bg-[#0B132B] border border-amber-500/30 p-3 rounded-2xl flex items-center gap-3">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Team Reference Code</span>
              <span className="text-amber-400 font-mono font-extrabold text-sm">{submission.id}</span>
            </div>
            <button
              onClick={copyCode}
              title="Copy Code"
              className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Application Status Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-spin" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Stage 1 Evaluation In Progress</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your business questionnaire and pitch deck are currently being reviewed by the Eureka! evaluators. Shortlisted Zonalist teams will be announced on <strong>September 5th</strong> for 1-on-1 mentor allocation.
            </p>
          </div>
        </div>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#0B132B] border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Track</span>
            <div className="text-base font-extrabold text-amber-300">{trackInfo?.name || 'Business Track'}</div>
            <div className="text-xs text-slate-400">Sponsor: {trackInfo?.sponsor} | Prize: {trackInfo?.prizePool}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B132B] border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mentorship Network Status</span>
            <div className="text-base font-extrabold text-emerald-400">Mentor Allocation Pending</div>
            <div className="text-xs text-slate-400">300+ mentors available upon Stage 1 clearing.</div>
          </div>
        </div>

        {/* Instant Unlocked Perks */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-2">
            <Gift className="w-4 h-4" />
            <span>Your Instant Participant Perks (Unlocked)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Zoho One 1-Year Free', code: 'EUREKA-ZOHO-2026', val: '₹1,50,000' },
              { title: 'Swipe Pro 12-Mo Upgrade', code: 'EUREKA-SWIPE-PRO', val: '₹50,000' },
              { title: 'AWS Cloud Credit Request', code: 'AWS-ACTIVATE-EUREKA', val: '$5,000' },
              { title: 'Google Gemini API Trial', code: 'GEMINI-EUREKA-IITB', val: '$10,000' },
            ].map((perk, i) => (
              <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{perk.title}</h4>
                  <p className="text-[10px] text-emerald-400 font-bold">Value: {perk.val}</p>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-300">
                  {perk.code}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pitch Summary Details */}
        <div className="p-4 rounded-2xl bg-[#0B132B] border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Submitted One-Liner Pitch</h3>
          <p className="text-xs text-slate-200 italic font-medium">"{submission.oneLiner}"</p>

          <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-400 border-t border-slate-800">
            <div>Development Stage: <strong className="text-white">{submission.stage}</strong></div>
            <div>Deck File: <strong className="text-amber-400">{submission.deckName}</strong></div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
