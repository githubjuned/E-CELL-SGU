export type TrackId = 
  | 'business'
  | 'social'
  | 'greentech'
  | 'fintech'
  | 'deeptech'
  | 'healthtech'
  | 'gcc'
  | 'junior';

export interface Track {
  id: TrackId;
  name: string;
  tagline: string;
  sponsor: string;
  sponsorLogo?: string;
  prizePool: string;
  description: string;
  eligibility: string[];
  keyPerks: string[];
  category: 'Flagship' | 'Specialized' | 'Global' | 'School';
  iconName: string;
  accentColor: string;
}

export interface PerkItem {
  id: string;
  title: string;
  provider: string;
  value: string;
  stage: 'All Participants' | 'Zonalists' | 'Semi-Finalists' | 'Winners';
  category: 'Cloud & Tech' | 'SaaS & Productivity' | 'Cash & Equity' | 'Incubation & Legal';
  description: string;
  logo: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  domain: string[];
  linkedin?: string;
  bio: string;
}

export interface PastWinner {
  id: string;
  name: string;
  track: string;
  year: string;
  founder: string;
  tagline: string;
  fundingRaised: string;
  description: string;
  logo: string;
  quote?: string;
}

export interface TimelineStage {
  stepNumber: number;
  title: string;
  dateRange: string;
  status: 'Completed' | 'Active' | 'Upcoming';
  description: string;
  deliverables: string[];
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Eligibility' | 'Confidentiality' | 'Tracks & Prizes' | 'Mentorship';
  question: string;
  answer: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'Title Sponsor' | 'Associate Title' | 'Track Partner' | 'VC Partner' | 'Ecosystem Partner';
  logo: string;
  website: string;
}

export interface TeamMember {
  name: string;
  email: string;
  role: string;
  phone: string;
  institute?: string;
}

export interface PitchSubmission {
  id: string;
  startupName: string;
  trackId: TrackId;
  oneLiner: string;
  problemStatement: string;
  solution: string;
  targetMarket: string;
  revenueModel: string;
  stage: 'Idea' | 'Prototype/MVP' | 'Early Traction' | 'Revenue Generating';
  teamLead: TeamMember;
  teamMembers: TeamMember[];
  deckName?: string;
  submittedAt: string;
  status: 'Under Review' | 'Zonal Selected' | 'Semi-Finalist' | 'Winner';
}
