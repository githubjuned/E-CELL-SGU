import React, { useState } from 'react';
import { Menu, X, User, Instagram } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenRegister: () => void;
  onOpenDashboard: () => void;
  hasSubmission: boolean;
  registeredName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenDashboard,
  hasSubmission,
  registeredName,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'structure', label: 'Structure' },
    { id: 'contact', label: 'Contact us' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200/80 shadow-sm py-3 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: E-Cell Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left focus:outline-none group cursor-pointer"
        >
          <img
            src="https://res.cloudinary.com/xabhk9g8/image/upload/v1786124867/logo_dvwylt.webp"
            alt="Logo"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </button>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors cursor-pointer text-[15px] ${
                  isActive
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Instagram Link & Registered Dashboard */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/ecell_sgu_?igsh=MW5lYTlhNXZmY3pkcw=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 rounded-xl text-pink-600 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-all hover:scale-105 shadow-xs"
            title="Follow us on Instagram (@ecell_sgu_)"
          >
            <Instagram className="w-5 h-5" />
          </a>

          {hasSubmission && (
            <button
              onClick={onOpenDashboard}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-semibold text-xs hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Portal ({registeredName || 'Dashboard'})</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeSection === link.id
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {hasSubmission && (
            <div className="pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  onOpenDashboard();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-xs font-bold text-slate-700 hover:text-blue-600 text-center py-2 bg-blue-50 border border-blue-200 rounded-md"
              >
                My Application Portal ({registeredName || 'Dashboard'})
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
