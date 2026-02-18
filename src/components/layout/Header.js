'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

import { Menu, X, ChevronDown, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header({ variant = 'default' }) {
  const pathname = usePathname() || '/en';
  const currentLocale = pathname.startsWith('/ar') ? 'ar' : 'en';
  const base = `/${currentLocale}`;

  const localized = (path = '') => `${base}${path}`;
  const switchLocaleHref = (() => {
    if (pathname.startsWith('/en')) return pathname.replace(/^\/en(?=\/|$)/, '/ar');
    if (pathname.startsWith('/ar')) return pathname.replace(/^\/ar(?=\/|$)/, '/en');
    return currentLocale === 'en' ? '/ar' : '/en';
  })();
  const switchLocaleLabel = currentLocale === 'en' ? 'العربية' : 'English';

  // Locale-specific static assets live in public/en and public/ar
  const logoScrolledSrc = `/${currentLocale}/logo pdf-06.png`;
  const logoDefaultSrc = `/${currentLocale}/logo pdf-08.png`;

  const labels =
    currentLocale === 'ar'
      ? {
          home: 'الرئيسية',
          about: 'حول',
          history: 'التاريخ',
          mission: 'الرسالة',
          directorMessage: 'رسالة المدير العام',
          initiative: 'المبادرة',
          section1: 'القسم 1',
          section2: 'القسم 2',
          participation: 'المشاركة',
          visitorRegistration: 'تسجيل الزوار',
          investorRegistration: 'تسجيل المستثمرين',
          exhibit: 'المعرض',
          registerNow: 'سجل الآن',
        }
      : {
          home: 'Home',
          about: 'About',
          history: 'History',
          mission: 'Mission',
          directorMessage: "FDRL's General Director Message",
          initiative: 'Initiative',
          section1: 'Section 1',
          section2: 'Section 2',
          participation: 'Participation',
          visitorRegistration: 'Visitor Registration',
          investorRegistration: 'Investor Registration',
          exhibit: 'Exhibit',
          registerNow: 'Register Now',
        };

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
            <Link href={localized('')} className="flex items-center">
              {isScrolled ? (
                <img src={logoScrolledSrc} alt="Urban Benghazi" className="h-45 w-auto" />
              ) : (
                <img src={logoDefaultSrc} alt="Urban Benghazi" className="h-45 w-auto" />
              )}
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href={localized('')} className="hover:text-[#a68745] transition-colors">{labels.home}</Link>

              <div className="relative">
                <button
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  className="hover:text-[#a68745] transition-colors flex items-center"
                >
                  {labels.about} <ChevronDown size={14} className="ml-1" />
                </button>
                {isAboutOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    <Link href={localized('/about/history')} className="block px-4 py-2 text-sm text-[#01354d] hover:bg-gray-100">{labels.history}</Link>
                    <Link href={localized('/about/mission')} className="block px-4 py-2 text-sm text-[#01354d] hover:bg-gray-100">{labels.mission}</Link>
                  </div>
                )}
              </div>

              <Link href={localized('/director-message')} className="hover:text-[#a68745] transition-colors">{labels.directorMessage}</Link>

              <div className="relative">
                <button
                  onClick={() => setIsInitiativeOpen(!isInitiativeOpen)}
                  className="hover:text-[#a68745] transition-colors flex items-center"
                >
                  {labels.initiative} <ChevronDown size={14} className="ml-1" />
                </button>
                {isInitiativeOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    <Link href={localized('/initiative/section1')} className="block px-4 py-2 text-sm text-[#01354d] hover:bg-gray-100">{labels.section1}</Link>
                    <Link href={localized('/initiative/section2')} className="block px-4 py-2 text-sm text-[#01354d] hover:bg-gray-100">{labels.section2}</Link>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsParticipationOpen(!isParticipationOpen)}
                  className="hover:text-[#a68745] transition-colors flex items-center"
                >
                  {labels.participation} <ChevronDown size={14} className="ml-1" />
                </button>
                {isParticipationOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
                    <Link href={localized('/participation/visitor')} className="block px-4 py-2 text-sm text-[#01354d] hover:bg-gray-100">{labels.visitorRegistration}</Link>
                    <Link href={localized('/participation/investor')} className="block px-4 py-2 text-sm text-[#01354d] hover:bg-gray-100">{labels.investorRegistration}</Link>
                  </div>
                )}
              </div>

              <Link href={localized('/exhibit')} className="hover:text-[#a68745] transition-colors">{labels.exhibit}</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href={switchLocaleHref}
                className="hidden md:inline-flex items-center gap-2 rounded-md border border-gray-300/60 dark:border-white/20 px-3 py-2 text-sm hover:text-[#a68745] transition-colors"
              >
                <Languages size={16} />
                <span>{switchLocaleLabel}</span>
              </Link>
              <ThemeToggle />
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-[#a68745] text-white px-4 py-2 rounded-md hover:bg-[#01354d] transition-colors">
                {labels.registerNow}
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
                <Link href={localized('')} className="py-2 hover:text-[#a68745] transition-colors">{labels.home}</Link>
                <Link href={localized('/about')} className="py-2 hover:text-[#a68745] transition-colors">{labels.about}</Link>
                <Link href={localized('/director-message')} className="py-2 hover:text-[#a68745] transition-colors">{labels.directorMessage}</Link>
                <Link href={localized('/initiative')} className="py-2 hover:text-[#a68745] transition-colors">{labels.initiative}</Link>
                <Link href={localized('/participation')} className="py-2 hover:text-[#a68745] transition-colors">{labels.participation}</Link>
                <Link href={localized('/exhibit')} className="py-2 hover:text-[#a68745] transition-colors">{labels.exhibit}</Link>
                <Link href={switchLocaleHref} className="py-2 hover:text-[#a68745] transition-colors flex items-center gap-2">
                  <Languages size={18} />
                  {switchLocaleLabel}
                </Link>
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