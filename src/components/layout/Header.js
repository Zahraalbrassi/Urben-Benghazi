'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header({ variant = 'default' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isInitiativeOpen, setIsInitiativeOpen] = useState(false);
  const [isParticipationOpen, setIsParticipationOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
  

      <header className={`w-full border-b transition-colors duration-300 ${
  variant === 'overlay' 
    ? `fixed top-0 left-0 right-0 z-50 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-[#01354d] dark:text-white border-gray-200/70 dark:border-slate-700/70' 
          : 'bg-black/35 backdrop-blur-md text-white border-white/10'
      }` 
    : `sticky top-0 z-50 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-[#01354d] dark:text-white border-gray-200/70 dark:border-slate-700/70' 
          : 'bg-white/70 dark:bg-slate-950/35 backdrop-blur-md text-[#01354d] dark:text-white border-gray-200/30 dark:border-white/10'
      }` 
}`}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/en" className="flex items-center">
              {isScrolled ? (
                <img src="/logo pdf-06.png" alt="Urban Benghazi" className="h-45 w-auto" />
              ) : (
                <img src="/logo pdf-08.png" alt="Urban Benghazi" className="h-45 w-auto" />
              )}
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/en" className="hover:text-[#a68745] transition-colors">Home</Link>

              <div className="relative">
                <button
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  className="hover:text-[#a68745] transition-colors flex items-center"
                >
                  About <ChevronDown size={14} className="ml-1" />
                </button>
                {isAboutOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    <Link href="/en/about/history" className="block px-4 py-2 text-sm text-[#01354d] hover:bg-gray-100">History</Link>
                    <Link href="/en/about/mission" className="block px-4 py-2 text-sm text-[#01354d] hover:bg-gray-100">Mission</Link>
                  </div>
                )}
              </div>

              <Link href="/en/director-message" className="hover:text-[#a68745] transition-colors">FDRL's General Director Message</Link>

              <div className="relative">
                <button
                  onClick={() => setIsInitiativeOpen(!isInitiativeOpen)}
                  className="hover:text-[#a68745] transition-colors flex items-center"
                >
                  Initiative <ChevronDown size={14} className="ml-1" />
                </button>
                {isInitiativeOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    <Link href="/en/initiative/section1" className="block px-4 py-2 text-sm text-[#01354d] hover:bg-gray-100">Section 1</Link>
                    <Link href="/en/initiative/section2" className="block px-4 py-2 text-sm text-[#01354d] hover:bg-gray-100">Section 2</Link>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsParticipationOpen(!isParticipationOpen)}
                  className="hover:text-[#a68745] transition-colors flex items-center"
                >
                  Participation <ChevronDown size={14} className="ml-1" />
                </button>
                {isParticipationOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    <Link href="/en/participation/visitor" className="block px-4 py-2 text-sm text-[#01354d] hover:bg-gray-100">Visitor Registration</Link>
                    <Link href="/en/participation/investor" className="block px-4 py-2 text-sm text-[#01354d] hover:bg-gray-100">Investor Registration</Link>
                  </div>
                )}
              </div>

              <Link href="/en/exhibit" className="hover:text-[#a68745] transition-colors">Exhibit</Link>
            </nav>
            <ThemeToggle />

            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-[#a68745] text-white px-4 py-2 rounded-md hover:bg-[#01354d] transition-colors">
                Register Now
              </button>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden pb-4">
              <nav className="flex flex-col space-y-2">
                <Link href="/en" className="py-2 hover:text-[#a68745] transition-colors">Home</Link>
                <Link href="/en/about" className="py-2 hover:text-[#a68745] transition-colors">About</Link>
                <Link href="/en/director-message" className="py-2 hover:text-[#a68745] transition-colors">FDRL's General Director Message</Link>
                <Link href="/en/initiative" className="py-2 hover:text-[#a68745] transition-colors">Initiative</Link>
                <Link href="/en/participation" className="py-2 hover:text-[#a68745] transition-colors">Participation</Link>
                <Link href="/en/exhibit" className="py-2 hover:text-[#a68745] transition-colors">Exhibit</Link>
                <div className="py-2">
                  <ThemeToggle />
                </div>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-[#3b5998]"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  فيسبوك
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}