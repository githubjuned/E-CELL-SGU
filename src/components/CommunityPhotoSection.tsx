import React from 'react';
import { Users } from 'lucide-react';

const COMMUNITY_PHOTO_URL = 'https://res.cloudinary.com/dyvmqkxok/image/upload/v1786113830/Untitled_design_2_on6mqm.png';

export const CommunityPhotoSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-widest mb-4 border border-blue-200">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Our E-Cell SGU Family</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            The Community Behind Eureka!
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Driven by passion, innovation, and teamwork — our vibrant student organizers, mentors, and student entrepreneurs leading the change at E-Cell SGU.
          </p>
        </div>

        {/* Image Frame Card */}
        <div className="relative group max-w-5xl mx-auto rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-2xl transition-all duration-300 hover:shadow-blue-900/20">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
            <img
              src={COMMUNITY_PHOTO_URL}
              alt="E-Cell SGU Community Group Photo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent pointer-events-none" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex items-end justify-between text-white">
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-wide text-white">
                  Empowering Tomorrow's Founders
                </h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
