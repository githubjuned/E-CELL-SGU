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
import { RegistrationModal } from './components/RegistrationModal';
import { TeaserModal } from './components/TeaserModal';
import { TrackId, PitchSubmission } from './types';
import { auth } from './lib/firebase';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [selectedTrackId, setSelectedTrackId] = useState<TrackId>('business');
  const [isTeaserOpen, setIsTeaserOpen] = useState<boolean>(false);

  // Persistence for user registration submission
  const [mySubmission, setMySubmission] = useState<PitchSubmission | null>(() => {
    try {
      const saved = localStorage.getItem('eureka_pitch_submission');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegister = (trackId?: TrackId) => {
    if (trackId) {
      setSelectedTrackId(trackId);
    }
    setIsRegisterOpen(true);
  };

  const handleSubmissionSuccess = (submission: PitchSubmission) => {
    setMySubmission(submission);
    try {
      localStorage.setItem('eureka_pitch_submission', JSON.stringify(submission));
    } catch (e) {
      // ignore
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero
              onOpenRegister={() => handleOpenRegister()}
              onExploreTracks={() => handleOpenRegister()}
              onOpenTeaserModal={() => setIsTeaserOpen(true)}
            />
            <WhyEurekaSection />
            <EurekaJourneySection />
            <CommunityPhotoSection />
            <ReadyToLaunchSection onOpenRegister={() => handleOpenRegister()} />
          </>
        );
      case 'structure':
        return (
          <div className="pt-16">
            <AboutSection />
            <TimelineSection onOpenRegister={() => handleOpenRegister()} />
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
              onOpenRegister={() => handleOpenRegister()}
              onExploreTracks={() => handleOpenRegister()}
              onOpenTeaserModal={() => setIsTeaserOpen(true)}
            />
            <WhyEurekaSection />
            <EurekaJourneySection />
            <CommunityPhotoSection />
            <ReadyToLaunchSection onOpenRegister={() => handleOpenRegister()} />
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
        onOpenRegister={handleOpenRegister}
      />

      {/* Main Content Area based on active navigation tab */}
      <main className="flex-grow">
        {renderActiveSection()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenRegister={() => handleOpenRegister()}
      />

      {/* Interactive Modals */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialTrackId={selectedTrackId}
        onSubmitSuccess={handleSubmissionSuccess}
      />

      <TeaserModal
        isOpen={isTeaserOpen}
        onClose={() => setIsTeaserOpen(false)}
        onOpenRegister={() => handleOpenRegister()}
      />

    </div>
  );
}
