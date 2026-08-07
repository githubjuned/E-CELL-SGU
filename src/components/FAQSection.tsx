import React, { useState } from 'react';
import { FAQ_DATA } from '../data/eurekaData';
import { HelpCircle, ChevronDown, Search, ShieldCheck } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('f1');

  const categories = ['All', 'General', 'Eligibility', 'Confidentiality', 'Tracks & Prizes', 'Mentorship'];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-20 bg-white text-slate-900 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Everything you need to know about confidentiality, team eligibility, guidelines, and submission stages.
          </p>

          {/* Search Bar & Category Filters */}
          <div className="pt-4 space-y-4">
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search question (e.g. confidentiality, equity, team size)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-full pl-11 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 ${
                  isOpen ? 'border-blue-500 bg-blue-50/30 shadow-xs' : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer gap-4"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-950">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Confidentiality Assurance Card */}
        <div className="mt-12 p-6 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-950">
              Strict Intellectual Property & Closed-Room Judging Guarantee
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your business model and intellectual property remain 100% your own. Presentations are held in closed rooms with only team members and assigned evaluators present. E-Cell IIT Bombay takes 0% equity and 0% revenue share.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
