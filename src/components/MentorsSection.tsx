import React, { useState } from 'react';
import { MENTORS_DATA } from '../data/eurekaData';
import { Mentor } from '../types';
import { Users, Linkedin, Search, Building2 } from 'lucide-react';

export const MentorsSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const domains = ['All', 'FinTech', 'DeepTech & AI', 'Consumer Tech', 'GreenTech & Sustainability', 'Venture Capital'];

  const filteredMentors = MENTORS_DATA.filter((m) => {
    const matchesDomain =
      selectedDomain === 'All' ||
      m.domain.some((d) => d.toLowerCase().includes(selectedDomain.toLowerCase()));
    
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDomain && matchesSearch;
  });

  return (
    <section id="mentors" className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest">
            <Users className="w-4 h-4 text-blue-600" />
            <span>300+ Industry Experts</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            The Eureka! <span className="text-blue-600">Mentorship Network</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Shortlisted teams get paired 1-on-1 with veteran founders, angel investors, and executives to sharpen unit economics, pitch decks, and market strategy.
          </p>

          {/* Search Bar & Domain Filters */}
          <div className="pt-4 space-y-4">
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search mentor by name or company (e.g., 100X.VC, Google, FinTech)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-full pl-11 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-xs"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {domains.map((dom) => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedDomain === dom
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              onClick={() => setSelectedMentor(mentor)}
              className="bg-white hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 rounded-2xl p-5 transition-all duration-300 flex items-start gap-4 group cursor-pointer shadow-sm"
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-100 shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="space-y-1 overflow-hidden">
                <h3 className="text-base font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors truncate">
                  {mentor.name}
                </h3>
                <p className="text-xs font-bold text-blue-700 truncate">
                  {mentor.role}
                </p>
                <div className="text-[11px] text-slate-600 flex items-center gap-1 font-medium truncate">
                  <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{mentor.company}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 pt-2">
                  {mentor.domain.map((d, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Mentor Bio Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-6 relative shadow-2xl text-slate-900">
            <button
              onClick={() => setSelectedMentor(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 text-xs font-bold px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full"
            >
              ✕ Close
            </button>

            <div className="flex items-center gap-4">
              <img
                src={selectedMentor.image}
                alt={selectedMentor.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-600"
              />
              <div>
                <h3 className="text-xl font-extrabold text-slate-950">{selectedMentor.name}</h3>
                <p className="text-xs font-bold text-blue-700">{selectedMentor.role}</p>
                <p className="text-xs text-slate-600 font-semibold">{selectedMentor.company}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mentor Bio</h4>
              <p className="text-slate-700 text-xs leading-relaxed">{selectedMentor.bio}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="flex flex-wrap gap-1">
                {selectedMentor.domain.map((d, i) => (
                  <span key={i} className="text-[10px] text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md font-bold">
                    {d}
                  </span>
                ))}
              </div>

              {selectedMentor.linkedin && (
                <a
                  href={selectedMentor.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
