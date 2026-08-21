import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyEurekaSection } from './components/WhyEurekaSection';
import { EurekaJourneySection } from './components/EurekaJourneySection';
import { CommunityPhotoSection } from './components/CommunityPhotoSection';
import { ReadyToLaunchSection } from './components/ReadyToLaunchSection';
import { AboutSection } from './components/AboutSection';
import { TracksSection } from './components/TracksSection';
import { IncentivesSection } from './components/IncentivesSection';
import { TimelineSection } from './components/TimelineSection';
import { WallOfFameSection } from './components/WallOfFameSection';
import { SponsorsSection } from './components/SponsorsSection';
import { MediaPresenceSection } from './components/MediaPresenceSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EventUpdatesModal } from './components/EventUpdatesModal';
import { TeaserModal } from './components/TeaserModal';
import { AdminDashboard } from './components/AdminDashboard';
import { TrackId, PitchSubmission } from './types';
import { auth } from './lib/firebase';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isEventUpdatesOpen, setIsEventUpdatesOpen] = useState<boolean>(false);
  const [isTeaserOpen, setIsTeaserOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEventUpdates = () => {
    setIsEventUpdatesOpen(true);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero
              onOpenEventUpdates={() => handleOpenEventUpdates()}
              onExploreTracks={() => handleOpenEventUpdates()}
              onOpenTeaserModal={() => setIsTeaserOpen(true)}
            />
            <WhyEurekaSection />
            <EurekaJourneySection />
            <CommunityPhotoSection />
            <ReadyToLaunchSection onOpenEventUpdates={() => handleOpenEventUpdates()} />
          </>
        );
      case 'structure':
        return (
          <div className="pt-16">
            <AboutSection />
            <TimelineSection onOpenEventUpdates={() => handleOpenEventUpdates()} />
            <FAQSection />
          </div>
        );
      case 'contact':
        return (
          <div className="pt-16">
            <ContactSection />
          </div>
        );
      default:
        return (
          <>
            <Hero
              onOpenEventUpdates={() => handleOpenEventUpdates()}
              onExploreTracks={() => handleOpenEventUpdates()}
              onOpenTeaserModal={() => setIsTeaserOpen(true)}
            />
            <WhyEurekaSection />
            <EurekaJourneySection />
            <CommunityPhotoSection />
            <ReadyToLaunchSection onOpenEventUpdates={() => handleOpenEventUpdates()} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      
      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenEventUpdates={handleOpenEventUpdates}
      />

      {/* Main Content Area based on active navigation tab */}
      <main className="flex-grow">
        {renderActiveSection()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEventUpdates={() => handleOpenEventUpdates()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Interactive Modals */}
      <EventUpdatesModal
        isOpen={isEventUpdatesOpen}
        onClose={() => setIsEventUpdatesOpen(false)}
      />

      <TeaserModal
        isOpen={isTeaserOpen}
        onClose={() => setIsTeaserOpen(false)}
        onOpenEventUpdates={() => handleOpenEventUpdates()}
      />

      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />

    </div>
  );
}
