import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, MapPin, Clock, AlertTriangle, MessageCircle, Globe } from 'lucide-react';

interface EventUpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EventUpdatesModal: React.FC<EventUpdatesModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white transition-all duration-300 flex flex-col animate-in fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors z-50 shadow-sm border border-slate-200"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative overflow-y-auto flex-1 w-full">
        <div className="max-w-5xl mx-auto p-4 sm:p-8 md:p-12 space-y-10 sm:space-y-16 pb-24">
          
          {/* Subtle Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-20 left-0 w-72 h-72 bg-purple-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight">
              🔥 The Wait is Over!<br />
              <span className="text-blue-600">Eureka Pitch is Here 🚀</span>
            </h2>
            <p className="text-lg sm:text-xl font-bold text-slate-600">
              62 Teams. Big Ideas. One Stage.
            </p>
          </div>

          {/* WhatsApp CTA */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 text-center max-w-lg mx-auto shadow-sm">
            <a
              href="https://chat.whatsapp.com/FV0Hlp9mefK4Zu57uxRBeU?s=sh&p=a&mlu=4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all hover:scale-[1.02] shadow-lg shadow-green-600/30 mb-3"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Join Official WhatsApp Group</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-sm font-medium text-green-800">
              Stay active on WhatsApp for live event updates and announcements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Timeline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-extrabold text-slate-900">Event Schedule</h3>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                
                {/* 10 AM */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="text-lg">🎉</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-blue-600 text-sm">10:00 AM – 11:00 AM</span>
                    </div>
                    <div className="font-bold text-slate-900 text-lg mb-1">Inauguration</div>
                    <p className="text-sm text-slate-600 mb-2">MBA Building, Auditorium – 2nd Floor</p>
                    <span className="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-xs font-semibold">
                      Attendance mandatory for all teams
                    </span>
                  </div>
                </div>

                {/* 11 AM */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="text-lg">🎤</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-blue-600 text-sm">11:00 AM – 3:30 PM</span>
                    </div>
                    <div className="font-bold text-slate-900 text-lg mb-1">Round 1 – Pitching</div>
                    <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
                      <li>Report directly to your allotted section/room.</li>
                      <li>Mark your attendance before pitching.</li>
                    </ul>
                  </div>
                </div>

                {/* 1 PM */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="text-lg">🍱</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-600 text-sm">1:00 PM – 2:00 PM</span>
                    </div>
                    <div className="font-bold text-slate-800 text-lg">Lunch Break</div>
                  </div>
                </div>

                {/* 4 PM */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-100 text-amber-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="text-lg">🏆</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border-2 border-amber-200 bg-amber-50 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-amber-700 text-sm">4:00 PM – 5:00 PM</span>
                    </div>
                    <div className="font-bold text-slate-900 text-lg mb-1">Round 2 – Final Pitching</div>
                    <p className="text-sm text-slate-700">
                      Qualifying teams will pitch again before the 8-member judge panel at the MBA Building Auditorium, 2nd Floor.
                    </p>
                  </div>
                </div>

                {/* 5 PM */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-100 text-green-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="text-lg">🎉</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-green-600 text-sm">5:00 PM – 5:30 PM</span>
                    </div>
                    <div className="font-bold text-slate-900 text-lg mb-1">Winner Announcement</div>
                    <p className="text-sm text-slate-600">All teams must be present at the auditorium.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Important Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Round 1 Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                  <h4 className="text-lg font-bold text-slate-900 uppercase">Round 1 Reminder</h4>
                </div>
                <ul className="text-sm text-slate-700 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>First report to your allotted room.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>An E-Cell team member will be present in each room.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Keep your PPT ready in <strong>PPT/PDF format</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Keep your prototype/demo ready, if available.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Send your PPT/prototype through WhatsApp to the assigned E-Cell team member for casting/display.</span>
                  </li>
                </ul>
              </div>

              {/* Round 2 Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🔥</span>
                  <h4 className="text-lg font-bold text-amber-900 uppercase">Round 2</h4>
                </div>
                <div className="space-y-3 text-sm text-amber-800">
                  <p className="font-semibold">
                    Round 2 qualifying teams will be announced on the website after Round 1.
                  </p>
                  <p>
                    Round 2 qualifiers will pitch again in front of the complete 8-judge panel.
                  </p>
                  <div className="pt-2 flex flex-col gap-1.5 border-t border-amber-200/50">
                    <div className="flex items-center gap-2 font-semibold">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>MBA Building, Auditorium – 2nd Floor</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>4:00 PM – 5:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Updates */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <h4 className="text-md font-bold text-blue-900 uppercase">Live Updates</h4>
                </div>
                <p className="text-sm text-blue-800">
                  Round 2 qualifier announcements and important updates will be published here and shared through WhatsApp.
                </p>
              </div>

              {/* Contact Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h4 className="text-md font-bold text-slate-900 mb-2">Need Help?</h4>
                <p className="text-xs text-slate-500 mb-4">
                  For any event-related queries, contact the E-Cell organizing team.
                </p>
                <div className="space-y-2 text-sm font-medium text-slate-700">
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                    <span>JUNED</span>
                    <a href="tel:9642912613" className="text-blue-600 hover:underline">9642912613</a>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                    <span>KRISHNA</span>
                    <a href="tel:+919021683085" className="text-blue-600 hover:underline">+91 90216 83085</a>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                    <span>RAJEEV</span>
                    <a href="tel:+918539002276" className="text-blue-600 hover:underline">+91 85390 02276</a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Closing Message */}
          <div className="text-center pt-8 pb-4 border-t border-slate-100 relative">
            {/* Subtle glow behind closing text */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-blue-400/20 rounded-[100%] blur-xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-lg sm:text-xl font-bold text-slate-800 mb-4 relative z-10">
              <span className="flex items-center gap-2"><span className="text-xl">💡</span> Bring your idea.</span>
              <span className="hidden md:inline text-slate-300">•</span>
              <span className="flex items-center gap-2"><span className="text-xl">🔥</span> Bring your energy.</span>
              <span className="hidden md:inline text-slate-300">•</span>
              <span className="flex items-center gap-2"><span className="text-xl">🚀</span> Own your pitch.</span>
            </div>
            
            <p className="text-2xl font-black text-blue-600 tracking-wide uppercase mt-6 relative z-10 animate-pulse">
              See you at Eureka!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
