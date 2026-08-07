import React from 'react';
import { Mail, Linkedin, MessageCircle, Instagram } from 'lucide-react';

interface ContactPerson {
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedIn: string;
  whatsapp: string;
  image: string;
}

const COMPETITION_CONTACTS: ContactPerson[] = [
  {
    name: 'GURUPRASAD GODAMGAVE',
    role: 'President',
    email: 'guruprasadgodamgave400@gmail.com',
    phone: '+91 99752 02821',
    linkedIn: 'https://www.linkedin.com/in/guruprasad-godamgave-b6ba21314?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/919975202821',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786124406/WhatsApp_Image_2026-08-07_at_23.05.50_xxsw9s.jpg',
  },
  {
    name: 'Soham Zade',
    role: 'Vice President',
    email: 'sohamkzade@gmail.com',
    phone: '+91 70204 53391',
    linkedIn: 'https://www.linkedin.com/in/soham-zade-0377a336b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/917020453391',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786124596/WhatsApp_Image_2026-08-07_at_23.05.49_scasxe.jpg',
  },
  {
    name: 'Om Ajinath Khade',
    role: 'GENERAL SECRETARY',
    email: 'khade8915@gmail.com',
    phone: '+91 75880 21256',
    linkedIn: 'http://linkedin.com/in/om-khade-596295372',
    whatsapp: 'https://wa.me/917588021256',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786124981/WhatsApp_Image_2026-08-07_at_23.17.25_ngbyew.jpg',
  },
  {
    name: 'Tanvi Kulkarni',
    role: 'Tech & AI Track Lead',
    email: 'tanvi@ecell.in',
    phone: '+91 95432 10987',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/919543210987',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'K JUNED',
    role: 'Technical Head',
    email: 'kj1201577@gmail.com',
    phone: '+91 96429 12613',
    linkedIn: 'https://www.linkedin.com/in/juned-karji-713397268/',
    whatsapp: 'https://wa.me/919642912613',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786123997/WhatsApp_Image_2026-08-07_at_22.42.17_vhttwh.jpg',
  },
  {
    name: 'Riya Kapoor',
    role: 'Social Track Coordinator',
    email: 'riya@ecell.in',
    phone: '+91 93210 98765',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/919321098765',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Devansh Joshi',
    role: 'GreenTech Lead',
    email: 'devansh@ecell.in',
    phone: '+91 92109 87654',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/919210987654',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Meera Patel',
    role: 'GCC & Global Relations',
    email: 'meera@ecell.in',
    phone: '+91 91098 76543',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/919109876543',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Yash Vardhan',
    role: 'Eureka! Junior Lead',
    email: 'yash@ecell.in',
    phone: '+91 90987 65432',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/919098765432',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Sanya Malhotra',
    role: 'SINE Incubation Manager',
    email: 'sanya@ecell.in',
    phone: '+91 89876 54321',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/918987654321',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Aditya Roy',
    role: 'VC & Investor Relations',
    email: 'aditya@ecell.in',
    phone: '+91 88765 43210',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/918876543210',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Neha Kulkarni',
    role: 'Mentorship Logistics Lead',
    email: 'neha@ecell.in',
    phone: '+91 87654 32109',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/918765432109',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
  },
];

const SPONSORSHIP_CONTACTS: ContactPerson[] = [
  {
    name: 'Rohan Deshmukh',
    role: 'Corporate Relations Lead',
    email: 'rohan.d@ecell.in',
    phone: '+91 98123 45678',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/919812345678',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Priya Mehta',
    role: 'Strategic Partnerships',
    email: 'priya.m@ecell.in',
    phone: '+91 95432 10987',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/919543210987',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Kabir Singhania',
    role: 'Brand & Media Lead',
    email: 'kabir@ecell.in',
    phone: '+91 86543 21098',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/918654321098',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Natasha Rao',
    role: 'Ecosystem Alliances',
    email: 'natasha@ecell.in',
    phone: '+91 85432 10987',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/918543210987',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Varun Aggarwal',
    role: 'Finance & Grants Manager',
    email: 'varun@ecell.in',
    phone: '+91 84321 09876',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/918432109876',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Simran Kaur',
    role: 'Hospitality & Logistics',
    email: 'simran@ecell.in',
    phone: '+91 83210 98765',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/918321098765',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Arjun Saxena',
    role: 'Alumni Network Lead',
    email: 'arjun@ecell.in',
    phone: '+91 82109 87654',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/918210987654',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Sneha Reddy',
    role: 'Public Relations Lead',
    email: 'sneha@ecell.in',
    phone: '+91 81098 76543',
    linkedIn: 'https://linkedin.com',
    whatsapp: 'https://wa.me/918109876543',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
  },
];

export const ContactSection: React.FC = () => {
  const renderContactCard = (person: ContactPerson, idx: number) => (
    <div
      key={idx}
      className="bg-black rounded-2xl p-3 sm:p-4 relative flex flex-col justify-between shadow-xl border border-slate-900 group hover:scale-[1.03] transition-all duration-300"
    >
      {/* Compact Photo Container */}
      <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-slate-900 mb-3 flex items-center justify-center">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Right floating action icon buttons */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          <a
            href={`mailto:${person.email}`}
            title="Send Email"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-slate-900 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-md hover:scale-110"
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
          <a
            href={person.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-slate-900 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center shadow-md hover:scale-110"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
          <a
            href={person.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-slate-900 hover:bg-blue-700 hover:text-white transition-all flex items-center justify-center shadow-md hover:scale-110"
          >
            <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>

      {/* Person details */}
      <div className="text-center space-y-0.5">
        <h4 className="text-white font-black text-sm sm:text-base tracking-tight truncate">
          {person.name}
        </h4>
        <p className="text-blue-400 font-bold text-[10px] sm:text-xs uppercase tracking-wide truncate">
          {person.role}
        </p>
      </div>
    </div>
  );

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#a4c5e4] text-slate-900 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Title matching image */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#0c2340] tracking-tight uppercase">
            CONTACT US
          </h1>
        </div>

        {/* Section 1: COMPETITION AND MENTORING QUERIES (12 Members) */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase text-[#0c2340] tracking-wider text-center mb-8 sm:mb-10">
            FOR COMPETITION AND MENTORING RELATED QUERIES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {COMPETITION_CONTACTS.map((person, idx) => renderContactCard(person, idx))}
          </div>
        </div>

        {/* Section 2: SPONSORSHIP QUERIES (8 Members) */}
        <div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase text-[#0c2340] tracking-wider text-center mb-8 sm:mb-10">
            FOR SPONSORSHIP QUERIES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {SPONSORSHIP_CONTACTS.map((person, idx) => renderContactCard(person, idx))}
          </div>
        </div>

      </div>
    </section>
  );
};

