import React from 'react';

interface ReadyToLaunchSectionProps {
  onOpenRegister: () => void;
}

export const ReadyToLaunchSection: React.FC<ReadyToLaunchSectionProps> = ({ onOpenRegister }) => {
  return (
    <section className="py-20 sm:py-28 bg-white text-center relative overflow-hidden border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Title */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight leading-tight">
          Ready to Launch Your Startup?
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
          Join thousands of founders who have built, validated, and scaled their startups through Eureka!, Asia's largest startup launchpad programme.
        </p>

        {/* Apply Now Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={onOpenRegister}
            className="px-10 py-4 rounded-xl bg-[#030720] hover:bg-slate-900 text-white font-extrabold text-base tracking-widest uppercase transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
          >
            APPLY NOW
          </button>
        </div>

      </div>
    </section>
  );
};
