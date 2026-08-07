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
    name: 'Guruprasad Godamgave',
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
    name: 'Aniket Salunke',
    role: 'TREASURER',
    email: 'aniketsalunke1441@gmail.com',
    phone: '+91 9356456218',
    linkedIn: 'https://www.linkedin.com/in/aniket-salunke-625293372?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    whatsapp: 'https://wa.me/919356456218',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786127482/WhatsApp_Image_2026-08-08_at_00.00.59_sms9ps.jpg',
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
    name: 'Yashraj Patil',
    role: 'Technical Head',
    email: 'yashrajpatil12005@gmail.com',
    phone: '+91 9529729997',
    linkedIn: 'https://www.linkedin.com/in/yashraj-patil-1a0a3b370?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/919529729997',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786127296/WhatsApp_Image_2026-08-07_at_23.17.39_qaywqg.jpg',
  },
  {
    name: 'Krushna Jalindar Gadhe',
    role: 'INCUBATION & STARTUP LEAD',
    email: 'krishnagadhe5@gmail.com',
    phone: '+91 9021683085',
    linkedIn: 'https://www.linkedin.com/in/krishna-gadhe-410677374?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/919021683085',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786127930/WhatsApp_Image_2026-08-08_at_00.08.21_p8rzvf.jpg',
  },
  {
    name: 'Rajeev Rana',
    role: 'INCUBATION & STARTUP LEAD',
    email: 'info.rajeevrana2005@gmail.com',
    phone: '+91 8539002276',
    linkedIn: 'https://www.linkedin.com/in/rajeev-rana-5a3b6736a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_ap',
    whatsapp: 'https://wa.me/918539002276',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786128078/WhatsApp_Image_2026-08-08_at_00.10.55_kzhz5w.jpg',
  },
  {
    name: 'Sanika Jadhav',
    role: 'SPONSORSHIP & PARTNERSHIP HEAD',
    email: 'sanikajadhav352@gmail.com',
    phone: '+91 8867810503',
    linkedIn: 'https://www.linkedin.com/in/sanika-jadhav-b4111b377?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/918867810503',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786128255/WhatsApp_Image_2026-08-07_at_23.06.27_s73egz.jpg',
  },
  {
    name: 'Vaishnav Musmade',
    role: 'EVENT LEAD',
    email: 'musmadevaishnav123@gmail.com ',
    phone: '+91 8421678465',
    linkedIn: ' https://www.linkedin.com/in/vaishnav-musmade-1745aa373?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/918421678465',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786128450/WhatsApp_Image_2026-08-07_at_23.17.39_cmj6pb.jpg',
  },
  {
    name: 'Mahesh Yadav',
    role: 'WORKSHOP LEAD',
    email: 'mmahesh.yadav2030@gmail.com ',
    phone: '+91 7208585519',
    linkedIn: 'https://www.linkedin.com/in/mahesh-yadav-36270233a?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/917208585519',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786128600/WhatsApp_Image_2026-08-07_at_23.05.50_jlwuy5.jpg',
  },
  {
    name: 'Tejas Patel',
    role: 'WORKSHOP LEAD',
    email: 'tejasp5052@gmail.com ',
    phone: '+91 8050523134',
    linkedIn: 'https://www.linkedin.com/in/tejasp5052',
    whatsapp: 'https://wa.me/918050523134',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786128722/WhatsApp_Image_2026-08-07_at_23.06.27_bvifu8.jpg',
  },
];

const SPONSORSHIP_CONTACTS: ContactPerson[] = [
  {
    name: 'Tanishka Zagade',
    role: 'MARKETING & BRANDING HEAD',
    email: 'tanishkazagade7686@gmail.com ',
    phone: '+91 7620187587',
    linkedIn: 'https://www.linkedin.com/in/tanishka-zagade-703388370?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/917620187587',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786128896/WhatsApp_Image_2026-08-07_at_23.12.12_uedgce.jpg',
  },
  {
    name: 'Yuvraj Deshmukh',
    role: 'COORDINATOR',
    email: 'yuvrajdeshmukh237@gmail.com',
    phone: '+91 9075548751',
    linkedIn: 'https://www.linkedin.com/in/yuvraj-deshmukh-612b10380?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/919075548751',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786129150/WhatsApp_Image_2026-08-07_at_23.17.39_d2gtca.jpg',
  },
  {
    name: 'Khushi Vishwakarma',
    role: 'MARKETING & BRANDING MANAGERS',
    email: 'k03847576@gmail.com',
    phone: '+91 7899124880',
    linkedIn: 'https://www.linkedin.com/in/khushi-vishwakarma-442752375?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/917899124880',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786129334/WhatsApp_Image_2026-08-07_at_23.12.12_mvk2tk.jpg',
  },
  {
    name: 'Manogna Reddy',
    role: 'MARKETING & BRANDING MANAGERS',
    email: 'srimanogna234@gmail.com',
    phone: '+91 6301666123',
    linkedIn: 'https://www.linkedin.com/in/sri-manogna-9454b8384/',
    whatsapp: 'https://wa.me/916301666123',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786129480/WhatsApp_Image_2026-08-07_at_23.12.12_ujcjtt.jpg',
  },
  {
    name: 'Pritam Patil',
    role: 'DIRECTOR OF PHOTOGRAPHY (DOP)',
    email: 'pritampatil5676@gmail.com',
    phone: '+91 8237427271',
    linkedIn: 'https://www.linkedin.com/in/pritam-patil-238940375?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/918237427271',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786132536/WhatsApp_Image_2026-08-08_at_01.24.32_nzteo7.jpg',
  },
  {
    name: 'Nirbhay Gawad',
    role: 'MEDIA HEAD',
    email: 'nirbhaygawad1234@gmail.com',
    phone: '+91 95031 41289',
    linkedIn: 'https://www.linkedin.com/in/nirbhay-gawad-495b82370?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/919503141289',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786129669/WhatsApp_Image_2026-08-07_at_23.17.40_zi0ni3.jpg',
  },
  {
    name: 'Yugank',
    role: 'EDITOR',
    email: 'vachannoubade@gmail.com',
    phone: '+91 9008269956',
    linkedIn: 'https://www.linkedin.com/in/yugank-noubade-6740893ba?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    whatsapp: 'https://wa.me/919008269956',
    image: 'https://res.cloudinary.com/xabhk9g8/image/upload/v1786130297/WhatsApp_Image_2026-08-07_at_23.17.40_rpb3ez.jpg',
  },
];

export const ContactSection: React.FC = () => {
  const renderContactCard = (person: ContactPerson, idx: number) => (
    <div
      key={idx}
      className="bg-black rounded-2xl p-3 sm:p-4 relative flex flex-col justify-between shadow-xl border border-slate-900 group hover:scale-[1.03] transition-all duration-300 w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-18px)] max-w-[320px]"
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

        {/* Section 1: ALL TEAM CONTACTS */}
        <div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black uppercase text-[#0c2340] tracking-wider text-center mb-8 sm:mb-10">
            FOR COMPETITION AND MENTORING RELATED QUERIES
          </h2>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-7xl mx-auto">
            {[...COMPETITION_CONTACTS, ...SPONSORSHIP_CONTACTS].map((person, idx) => renderContactCard(person, idx))}
          </div>
        </div>

      </div>
    </section>
  );
};

