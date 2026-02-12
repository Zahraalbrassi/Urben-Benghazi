'use client';

import { CalendarClock, Sparkles, GalleryVerticalEnd, CheckCircle2 } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

const HIGHLIGHT_ICONS = {
  'Conference & Innovation': Sparkles,
  'Exhibition & Executive Review': GalleryVerticalEnd,
  'Final Review of Applications': CheckCircle2,
};

const HIGHLIGHTS = [
  {
    id: 1,
    image: '/images/icons8-conference-50.png',
    label: 'Conference & Innovation',
    subheading: 'Knowledge Exchange and Best Practices',
    description:
      'A high-level conference sets the strategic context for Benghazi. Selected companies, recognized for their most creative, urban, and economically efficient proposals, lead exclusive workshops.',
    dateLabel: 'Sunday, February 8, 2026',
  },
  {
    id: 2,
    image: '/images/icons8-exhibitor-32.png',
    label: 'Exhibition & Executive Review',
    subheading: 'Showcase and Official Vetting',
    description:
      'An International Exhibition opens, displaying all approved solutions from participating firms alongside local youth/startup innovations. Simultaneously, a selected committee conducts private reviews of all elements and meets with key officials from the Fund for Development and Reconstruction of Libya (FDRL) overseeing the Benghazi mandate.',
    dateLabel: 'Monday, February 9, 2026',
  },
  {
    id: 3,
    image: '/images/icons8-file-preview-32.png',
    label: 'Final Review of Applications',
    subheading: 'Individual Presentation Sessions with the FDR',
    description:
      'A full day dedicated to the detailed overview of the best proposals/concepts. This leads directly to the opening of significant opportunities for the best-of-the-best solutions, confirming the path toward project execution.',
    dateLabel: 'Tuesday, February 10, 2026',
  },
];

function HighlightCard({ item }) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const Icon = HIGHLIGHT_ICONS[item.label] || Sparkles;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md animate-pulse h-64" />
    );
  }

  return (
    <div className={`group relative flex flex-col h-full rounded-xl p-6 transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-800 text-white hover:bg-slate-700' 
        : 'bg-white text-gray-800 hover:bg-gray-50'
    } shadow-md hover:shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          theme === 'dark' 
            ? 'bg-slate-700 text-[#a68745]' 
            : 'bg-slate-50 text-{#01354d]'
        } font-bold`}>
          {item.id.toString().padStart(2, '0')}
        </div>
        <div className={`p-2 rounded-lg  ${
          theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'
        }`}>
          <Icon className={`w-5 h-5 ${
            theme === 'dark' ? 'text-[#a68745]' : 'text-[#01354d]'
          }`} />
        </div>
      </div>
      {/* <img alt="" src={item.image} width={70} height={70} className="mb-4 mx-auto" /> */}
      <h3 className={`text-lg font-bold mb-2 ${
        theme === 'dark' ? 'text-[#a68745]' : 'text-[#01354d]'
      }`}>
        {item.label}
      </h3>
      <h4 className="text-xl font-semibold mb-3">{item.subheading}</h4>
      <p className={`text-sm mb-6 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {item.description}
      </p>
      
      <div className="mt-auto">
        <div className={`flex items-center text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <CalendarClock className="w-4 h-4 mr-2" />
          <span>{item.dateLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default function GlobalInitiativeHighlights() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mx-auto mb-4"></h2>
            <p className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mx-auto"></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            The Global Competitive Initiative Highlights
          </h2>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          } max-w-3xl mx-auto`}>
            A three-day sequence that moves from vision and innovation to formal review and execution pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HIGHLIGHTS.map((highlight) => (
            <HighlightCard key={highlight.id} item={highlight} />
          ))}
        </div>
      </div>
    </section>
  );
}