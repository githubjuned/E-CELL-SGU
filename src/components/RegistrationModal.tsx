import React, { useState, useEffect } from 'react';
import { TrackId, PitchSubmission, TeamMember } from '../types';
import { TRACKS_DATA } from '../data/eurekaData';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, Upload, Plus, Trash2, Loader2, AlertTriangle, Copy, Check, ExternalLink, ShieldAlert } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackId?: TrackId;
  onSubmitSuccess: (submission: PitchSubmission) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialTrackId = 'business',
  onSubmitSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [submittedSubmissionData, setSubmittedSubmissionData] = useState<PitchSubmission | null>(null);

  // Step 1 State: Email Entry
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Step 2 State: Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    gender: 'Select Gender',
    countryCode: 'Select or search country code',
    phone: '',
    country: 'India',
    professionalStatus: 'Select Status',
    institute: '',
  });

  // Additional Team Members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Step 3 State: Startup Information
  const [startupDetails, setStartupDetails] = useState({
    teamName: '',
    startupName: '',
    trackId: initialTrackId,
    oneLiner: '',
    stage: 'Prototype/MVP' as 'Idea' | 'Prototype/MVP' | 'Early Traction' | 'Revenue Generating',
  });

  // Step 4 State: Startup Details
  const [questionnaire, setQuestionnaire] = useState({
    problemStatement: '',
    solution: '',
    targetMarket: '',
    revenueModel: '',
    deckName: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [step2Error, setStep2Error] = useState('');
  const [step3Error, setStep3Error] = useState('');

  const handleClose = () => {
    setIsSubmittedSuccessfully(false);
    setSubmittedSubmissionData(null);
    setStep2Error('');
    setStep3Error('');
    setStep(1);
    onClose();
  };

  useEffect(() => {
    if (initialTrackId) {
      setStartupDetails((prev) => ({ ...prev, trackId: initialTrackId }));
    }
    if (!isOpen) {
      setIsSubmittedSuccessfully(false);
      setSubmittedSubmissionData(null);
      setStep2Error('');
      setStep3Error('');
      setStep(1);
    }
  }, [initialTrackId, isOpen]);

  // Auto-initialize minimum 1 team member row when entering Step 2
  useEffect(() => {
    if (step === 2 && teamMembers.length === 0) {
      setTeamMembers([{ name: '', email: '', role: 'Co-Founder / CTO', phone: '' }]);
    }
  }, [step]);

  if (!isOpen) return null;



  const handleAddMember = () => {
    // Maximum 4 entries including Team Leader (1 leader + 3 members max)
    if (teamMembers.length >= 3) {
      setStep2Error('Maximum team size reached (4 members total including Team Leader).');
      return;
    }
    setTeamMembers([...teamMembers, { name: '', email: '', role: 'Co-Founder / CTO', phone: '' }]);
    setStep2Error('');
  };

  const handleRemoveMember = (idx: number) => {
    const updated = teamMembers.filter((_, i) => i !== idx);
    setTeamMembers(updated);
    if (updated.length < 1) {
      setStep2Error('At least 1 Co-founder / Team Member entry is required.');
    } else {
      setStep2Error('');
    }
  };

  const handleMemberChange = (idx: number, field: keyof TeamMember, val: string) => {
    const updated = [...teamMembers];
    updated[idx][field] = val;
    setTeamMembers(updated);
    setStep2Error('');
  };

  const handleStep2Next = () => {
    setStep2Error('');

    if (
      !personalInfo.firstName.trim() ||
      !personalInfo.lastName.trim() ||
      !personalInfo.phone.trim() ||
      !personalInfo.country.trim() ||
      !personalInfo.institute.trim() ||
      personalInfo.gender === 'Select Gender' ||
      personalInfo.countryCode === 'Select or search country code' ||
      personalInfo.professionalStatus === 'Select Status'
    ) {
      setStep2Error('Please fill in all required personal information fields (*)');
      return;
    }

    if (teamMembers.length < 1) {
      setStep2Error('Please add at least 1 Co-founder / Team Member before proceeding to the next step.');
      return;
    }

    const hasIncomplete = teamMembers.some((m) => !m.name.trim() || !m.email.trim());
    if (hasIncomplete) {
      setStep2Error('Please fill in both Name and Email for all team members.');
      return;
    }

    setStep(3);
  };

  const handleStep3Next = () => {
    setStep3Error('');

    if (!startupDetails.teamName.trim()) {
      setStep3Error('Please enter your Team Name before proceeding.');
      return;
    }

    if (!startupDetails.startupName.trim()) {
      setStep3Error('Please enter your Startup / Idea Name before proceeding.');
      return;
    }

    if (!startupDetails.oneLiner.trim()) {
      setStep3Error('Please enter your One-Liner Elevator Pitch before proceeding.');
      return;
    }

    setStep(4);
  };

  const handleDeckUploadSimulation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setQuestionnaire({ ...questionnaire, deckName: e.target.files[0].name });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    


    if (!questionnaire.problemStatement.trim() || !questionnaire.solution.trim()) {
      setSubmitError('Please fill in both Problem Statement and Proposed Solution before submitting.');
      return;
    }

    setIsSubmitting(true);

    const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || 'Innovator';

    const registrationData = {
      teamName: startupDetails.teamName.trim() || startupDetails.startupName || 'Innovative Venture',
      leaderName: fullName,
      email: email || 'user@example.com',
      phone: personalInfo.phone || '+91 98765 43210',
      country: personalInfo.country || 'India',
      professionalStatus: personalInfo.professionalStatus || 'Student',
      college: personalInfo.institute || 'IIT Bombay',
      track: startupDetails.trackId,
      stage: startupDetails.stage,
      oneLiner: startupDetails.oneLiner,
      problemStatement: questionnaire.problemStatement,
      solution: questionnaire.solution,
      targetMarket: questionnaire.targetMarket,
      revenueModel: questionnaire.revenueModel,
      teamSize: 1 + teamMembers.length,
      teamMembers: teamMembers,
      deckName: questionnaire.deckName || 'Eureka_PitchDeck_v1.pdf',
      createdAt: serverTimestamp(),
      submittedAtFormatted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Under Review',
    };

    let docId = `EUREKA-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // Save directly to Firestore "registrations" collection
      const docRef = await addDoc(collection(db, 'registrations'), registrationData);
      docId = docRef.id;
    } catch (err: any) {
      console.error('Error saving to Firestore registrations collection:', err);
      setSubmitError('Failed to save registration: ' + err.message);
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);

    const submission: PitchSubmission = {
      id: docId,
      startupName: registrationData.teamName,
      trackId: startupDetails.trackId,
      oneLiner: registrationData.oneLiner,
      problemStatement: registrationData.problemStatement,
      solution: registrationData.solution,
      targetMarket: registrationData.targetMarket,
      revenueModel: registrationData.revenueModel,
      stage: startupDetails.stage,
      teamLead: {
        name: fullName,
        email: registrationData.email,
        phone: registrationData.phone,
        role: 'Founder / CEO',
        institute: registrationData.college,
      },
      teamMembers,
      deckName: registrationData.deckName,
      submittedAt: registrationData.submittedAtFormatted,
      status: 'Under Review',
    };

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#3b82f6', '#10b981', '#f59e0b'],
      });
    } catch (err) {
      // ignore
    }

    setSubmittedSubmissionData(submission);
    setIsSubmittedSuccessfully(true);
    onSubmitSuccess(submission);
  };

  if (isSubmittedSuccessfully && submittedSubmissionData) {
    const trackInfo = TRACKS_DATA.find((t) => t.id === submittedSubmissionData.trackId);
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
            onClick={handleClose}
            id="close-registration-success-btn"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer shadow-md"
          >
            <span>Close Form</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Registration Success Card Container */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center">
          
          {/* Solid Black Container - Matched to website dark theme aesthetics */}
          <div className="bg-black text-white p-8 sm:p-12 rounded-2xl w-full max-w-2xl shadow-2xl relative border border-slate-950 text-center space-y-6 animate-scaleUp">
            
            {/* Green Right Mark / Checkmark Icon with Glowing Green Aura */}
            <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse"></div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-950/90 border-2 border-emerald-500/60 flex items-center justify-center shadow-2xl shadow-emerald-900/50 text-emerald-400">
                <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-500 stroke-[2.5]" />
              </div>
            </div>

            {/* Application Submitted Tag & Title */}
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-600/60 text-emerald-400 text-xs font-black uppercase tracking-wider shadow-sm">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Registration Submitted</span>
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
                Registration Submitted!
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-medium leading-relaxed">
                Thank you for registering for <strong className="text-white">Eureka! 2026</strong>. Your application has been successfully submitted and is under review.
              </p>
            </div>

            {/* Submission Reference & Details Box */}
            <div className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-xl text-left space-y-3.5 max-w-xl mx-auto shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Team Reference Code</span>
                  <span className="text-amber-400 font-mono font-black text-base tracking-wider">{submittedSubmissionData.id}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Under Review</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Startup / Venture</span>
                  <span className="text-white font-extrabold">{submittedSubmissionData.startupName}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Assigned Track</span>
                  <span className="text-blue-400 font-extrabold">{trackInfo?.name || 'Flagship Business Track'}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Team Lead</span>
                  <span className="text-slate-200 font-semibold">{submittedSubmissionData.teamLead.name}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Submission Date</span>
                  <span className="text-slate-300 font-medium">{submittedSubmissionData.submittedAt}</span>
                </div>
              </div>
            </div>

            {/* Information Note */}
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Our evaluation panel is reviewing your pitch deck submission. We will contact you via your registered email address with updates.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleClose}
                id="done-registration-btn"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Done</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    );
  }

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
          onClick={handleClose}
          id="close-registration-page-btn"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer shadow-md"
        >
          <span>Close Form</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Registration Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center">
        
        {/* Giant REGISTER Title - Pixel Perfect match to Screenshot */}
        <h1 className="text-5xl sm:text-7xl font-black text-black tracking-tight text-center mb-10 uppercase">
          REGISTER
        </h1>

        {/* Solid Black Step Container - Pixel Perfect match */}
        <div className="bg-black text-white p-6 sm:p-12 rounded-2xl w-full max-w-4xl shadow-2xl relative border border-slate-950">
          
          {/* Stepper Steps */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-10 pb-6 border-b border-slate-800 relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full font-extrabold text-sm flex items-center justify-center transition-colors ${
                  step > 1
                    ? 'bg-emerald-600 text-white'
                    : step === 1
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-[#1e293b] text-slate-400'
                }`}
              >
                1
              </div>
              <span
                className={`mt-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                  step > 1
                    ? 'text-emerald-500'
                    : step === 1
                    ? 'text-[#2563eb]'
                    : 'text-slate-400'
                }`}
              >
                EMAIL ENTRY
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full font-extrabold text-sm flex items-center justify-center transition-colors ${
                  step > 2
                    ? 'bg-emerald-600 text-white'
                    : step === 2
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-[#1e293b] text-slate-400'
                }`}
              >
                2
              </div>
              <span
                className={`mt-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                  step > 2
                    ? 'text-emerald-500'
                    : step === 2
                    ? 'text-[#2563eb]'
                    : 'text-slate-400'
                }`}
              >
                PERSONAL INFORMATION
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full font-extrabold text-sm flex items-center justify-center transition-colors ${
                  step > 3
                    ? 'bg-emerald-600 text-white'
                    : step === 3
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-[#1e293b] text-slate-400'
                }`}
              >
                3
              </div>
              <span
                className={`mt-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                  step > 3
                    ? 'text-emerald-500'
                    : step === 3
                    ? 'text-[#2563eb]'
                    : 'text-slate-400'
                }`}
              >
                STARTUP INFORMATION
              </span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full font-extrabold text-sm flex items-center justify-center transition-colors ${
                  step === 4
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-[#1e293b] text-slate-400'
                }`}
              >
                4
              </div>
              <span
                className={`mt-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                  step === 4 ? 'text-[#2563eb]' : 'text-slate-400'
                }`}
              >
                STARTUP DETAILS
              </span>
            </div>

          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: EMAIL ENTRY */}
            {step === 1 && (
              <div className="space-y-6 pt-2 animate-fadeIn">
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Primary Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    className="w-full bg-[#f8fafc] text-slate-900 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {emailError && (
                    <p className="mt-2 text-red-400 text-xs font-semibold">
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="pt-6 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
                        setEmailError('Please enter a valid email address.');
                        return;
                      }
                      setStep(2);
                    }}
                    className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors cursor-pointer shadow-lg shadow-blue-600/30 flex items-center gap-2"
                  >
                    <span>Next Step →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PERSONAL INFORMATION */}
            {step === 2 && (
              <div className="space-y-6 pt-2 animate-fadeIn">
                
                {/* Row 1: First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      className="w-full bg-[#f8fafc] text-slate-900 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      className="w-full bg-[#f8fafc] text-slate-900 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Row 2: Gender, Country Code, Contact Number */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={personalInfo.gender}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                      className="w-full bg-[#f8fafc] text-slate-900 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="Select Gender" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">
                      Country Code <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={personalInfo.countryCode}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, countryCode: e.target.value })}
                      className="w-full bg-[#f8fafc] text-slate-900 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="Select or search country code" disabled>Select or search country code</option>
                      <option value="+91">+91 (India)</option>
                      <option value="+1">+1 (USA / Canada)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="+65">+65 (Singapore)</option>
                      <option value="+61">+61 (Australia)</option>
                      <option value="+49">+49 (Germany)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contact Number"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className="w-full bg-[#f8fafc] text-slate-900 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Row 3: Country */}
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. India"
                    value={personalInfo.country}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, country: e.target.value })}
                    className="w-full bg-[#f8fafc] text-slate-900 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Row 4: Current Professional Status */}
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    Current Professional Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={personalInfo.professionalStatus}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, professionalStatus: e.target.value })}
                    className="w-full bg-[#f8fafc] text-slate-900 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="Select Status" disabled>Select Status</option>
                    <option value="Student">Student</option>
                    <option value="Working Professional / Corporate">Working Professional / Corporate</option>
                    <option value="Full-time Founder / Entrepreneur">Full-time Founder / Entrepreneur</option>
                    <option value="Researcher / Academician">Researcher / Academician</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Row 5: College / Institution / Organization */}
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">
                    College / Institution / Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IIT Bombay"
                    value={personalInfo.institute}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, institute: e.target.value })}
                    className="w-full bg-[#f8fafc] text-slate-900 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Additional Team Members - Minimum 1 Entry Required, Maximum 4 Total Including Team Leader */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                        <span>Co-founders & Team Members</span>
                        <span className="text-red-500">*</span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal block">
                        Minimum 1 team member required (Max 4 members total including Team Leader)
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 shrink-0">
                        {1 + teamMembers.length}/4 Total Team Size
                      </span>
                      {teamMembers.length < 3 && (
                        <button
                          type="button"
                          onClick={handleAddMember}
                          className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 cursor-pointer bg-blue-950/60 px-3 py-1 rounded-lg border border-blue-800/60 transition-colors shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Member</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center gap-3">
                      <input
                        type="text"
                        required
                        placeholder={`Team Member ${idx + 1} Name *`}
                        value={member.name}
                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                        className="flex-1 bg-[#f8fafc] text-slate-900 rounded-md px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        required
                        placeholder={`Team Member ${idx + 1} Email *`}
                        value={member.email}
                        onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                        className="flex-1 bg-[#f8fafc] text-slate-900 rounded-md px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        title="Remove member"
                        className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {step2Error && (
                    <p className="text-red-400 text-xs font-semibold bg-red-950/70 p-3 rounded-lg border border-red-900/60 animate-fadeIn">
                      {step2Error}
                    </p>
                  )}
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-[#334155] hover:bg-slate-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleStep2Next}
                    className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors cursor-pointer shadow-lg shadow-blue-600/30 flex items-center gap-2"
                  >
                    <span>Next Step →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: STARTUP INFORMATION */}
            {step === 3 && (
              <div className="space-y-6 pt-2 animate-fadeIn">
                <div className="space-y-4">
                  {/* Team Name */}
                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">
                      Team Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Team Apex Innovators"
                      value={startupDetails.teamName}
                      onChange={(e) => {
                        setStartupDetails({ ...startupDetails, teamName: e.target.value });
                        setStep3Error('');
                      }}
                      className="w-full bg-[#f8fafc] text-slate-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  {/* Startup / Idea Name */}
                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">
                      Startup / Idea Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AeroClean Technologies"
                      value={startupDetails.startupName}
                      onChange={(e) => {
                        setStartupDetails({ ...startupDetails, startupName: e.target.value });
                        setStep3Error('');
                      }}
                      className="w-full bg-[#f8fafc] text-slate-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  {/* One-Liner Elevator Pitch */}
                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">
                      One-Liner Elevator Pitch <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AI-powered robotics for solar farm efficiency reducing water usage by 90%."
                      value={startupDetails.oneLiner}
                      onChange={(e) => {
                        setStartupDetails({ ...startupDetails, oneLiner: e.target.value });
                        setStep3Error('');
                      }}
                      className="w-full bg-[#f8fafc] text-slate-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  {/* Development Stage */}
                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">
                      Development Stage <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Idea', 'Prototype/MVP', 'Early Traction', 'Revenue Generating'].map((stg) => (
                        <button
                          type="button"
                          key={stg}
                          onClick={() => {
                            setStartupDetails({ ...startupDetails, stage: stg as any });
                            setStep3Error('');
                          }}
                          className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            startupDetails.stage === stg
                              ? 'bg-[#2563eb] text-white border-blue-500'
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {stg}
                        </button>
                      ))}
                    </div>
                  </div>

                  {step3Error && (
                    <p className="text-red-400 text-xs font-semibold bg-red-950/70 p-3 rounded-lg border border-red-900/60 animate-fadeIn">
                      {step3Error}
                    </p>
                  )}
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-[#334155] hover:bg-slate-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleStep3Next}
                    className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors cursor-pointer shadow-lg shadow-blue-600/30 flex items-center gap-2"
                  >
                    <span>Next Step →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: STARTUP DETAILS & PITCH DECK */}
            {step === 4 && (
              <div className="space-y-6 pt-2 animate-fadeIn">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">
                      Problem Statement <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="What core problem are you solving?"
                      value={questionnaire.problemStatement}
                      onChange={(e) => setQuestionnaire({ ...questionnaire, problemStatement: e.target.value })}
                      className="w-full bg-[#f8fafc] text-slate-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">
                      Proposed Solution <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="How does your technology/product uniquely solve this?"
                      value={questionnaire.solution}
                      onChange={(e) => setQuestionnaire({ ...questionnaire, solution: e.target.value })}
                      className="w-full bg-[#f8fafc] text-slate-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white mb-2">Target Market / TAM</label>
                      <input
                        type="text"
                        placeholder="e.g. Commercial solar utilities ($3B TAM)"
                        value={questionnaire.targetMarket}
                        onChange={(e) => setQuestionnaire({ ...questionnaire, targetMarket: e.target.value })}
                        className="w-full bg-[#f8fafc] text-slate-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white mb-2">Revenue Model</label>
                      <input
                        type="text"
                        placeholder="e.g. Hardware sale + Annual SaaS contract"
                        value={questionnaire.revenueModel}
                        onChange={(e) => setQuestionnaire({ ...questionnaire, revenueModel: e.target.value })}
                        className="w-full bg-[#f8fafc] text-slate-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Pitch Deck Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">
                      Pitch Deck Upload (PDF or PPT)
                    </label>
                    <div className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-4 text-center space-y-2 bg-slate-900/60 transition-colors">
                      <Upload className="w-6 h-6 text-blue-400 mx-auto" />
                      <div className="text-xs text-slate-300 font-medium">
                        {questionnaire.deckName ? (
                          <span className="text-emerald-400 font-bold">✓ Attached: {questionnaire.deckName}</span>
                        ) : (
                          <span>Upload PDF or PPT presentation (Max 20MB)</span>
                        )}
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.ppt,.pptx"
                        onChange={handleDeckUploadSimulation}
                        className="hidden"
                        id="deck-file-input"
                      />
                      <label
                        htmlFor="deck-file-input"
                        className="inline-block px-4 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-red-400 text-xs font-semibold bg-red-950/70 p-3 rounded-lg border border-red-900/60 animate-fadeIn">
                      {submitError}
                    </p>
                  )}
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-[#334155] hover:bg-slate-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                  >
                    Previous
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="final-submit-application-btn"
                    className="bg-[#2563eb] hover:bg-blue-700 disabled:bg-blue-800 text-white font-black px-8 py-3.5 rounded-lg text-sm uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-blue-600/30 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Saving to Firebase...</span>
                      </>
                    ) : (
                      <span>Submit Application</span>
                    )}
                  </button>
                </div>
              </div>
            )}

          </form>

        </div>

      </div>

    </div>
  );
};
