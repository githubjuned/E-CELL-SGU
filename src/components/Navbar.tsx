import React, { useState } from 'react';
import { Menu, X, User, Instagram, LogOut, LogIn } from 'lucide-react';
import { User as FirebaseUser, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenRegister: () => void;
  authUser?: FirebaseUser | null;
  onSignOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenRegister,
  authUser,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'structure', label: 'Structure' },
    { id: 'contact', label: 'Contact us' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleNavbarGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
        onOpenRegister();
      }
    } catch (error: any) {
      console.error('[Auth Sign In ERROR]:', {
        code: error?.code,
        message: error?.message,
        customData: error?.customData,
        cause: error?.cause,
        fullError: error
      });
      onOpenRegister();
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200/80 shadow-sm py-3 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: E-Cell Logo & Brand Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <img
            src="https://res.cloudinary.com/xabhk9g8/image/upload/v1786130806/E-Cell_Logo-Black_qdscmy.png"
            alt="E-CELL SGU Logo"
            className="h-10 sm:h-12 w-auto object-contain"
          />
          <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight">
            E-CELL SGU
          </span>
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

        {/* Right Actions: Instagram, Realtime Firebase Auth & Register/Portal */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://www.instagram.com/ecell_sgu_?igsh=MW5lYTlhNXZmY3pkcw=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 rounded-xl text-pink-600 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-all hover:scale-105 shadow-xs"
            title="Follow us on Instagram (@ecell_sgu_)"
          >
            <Instagram className="w-5 h-5" />
          </a>

          {/* Realtime Firebase User Status */}
          {authUser ? (
            <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-white rounded-full pl-1.5 pr-3 py-1 border border-slate-800 shadow-sm text-xs font-semibold">
              {authUser.photoURL ? (
                <img
                  src={authUser.photoURL}
                  alt={authUser.displayName || 'User'}
                  className="w-6 h-6 rounded-full border border-blue-400 object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {authUser.email?.[0].toUpperCase() || 'U'}
                </div>
              )}
              <span className="max-w-[120px] truncate text-slate-200">
                {authUser.displayName || authUser.email?.split('@')[0]}
              </span>
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  title="Sign Out"
                  className="text-slate-400 hover:text-red-400 transition-colors ml-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={handleNavbarGoogleSignIn}
              disabled={isSigningIn}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs shadow-xs transition-all cursor-pointer hover:scale-[1.02]"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{isSigningIn ? 'Connecting...' : 'Sign In'}</span>
            </button>
          )}

          <button
            onClick={onOpenRegister}
            className="hidden sm:flex items-center gap-1 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer hover:scale-[1.02]"
          >
            <span>Register Now</span>
          </button>
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

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            {authUser ? (
              <div className="flex items-center justify-between p-2.5 bg-slate-900 text-white rounded-lg text-xs">
                <div className="flex items-center gap-2 truncate">
                  {authUser.photoURL && (
                    <img src={authUser.photoURL} alt="User" className="w-6 h-6 rounded-full border border-blue-400" />
                  )}
                  <span className="truncate">{authUser.displayName || authUser.email}</span>
                </div>
                {onSignOut && (
                  <button onClick={onSignOut} className="text-red-400 text-xs font-bold pl-2">
                    Sign Out
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={handleNavbarGoogleSignIn}
                className="w-full text-xs font-bold text-slate-800 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-blue-600" />
                <span>Sign in with Google</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenRegister();
                setMobileMenuOpen(false);
              }}
              className="w-full text-xs font-bold text-white text-center py-2 bg-blue-600 rounded-md"
            >
              Register Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
