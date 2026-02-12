"use client";

import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect } from 'react';





export default function DirectorMessage() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="h-64 bg-gray-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4 space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="director-message" className={`py-16 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'
      }`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Director Image */}
          <div className="flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Glow frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-[#a68745] to-transparent opacity-60 group-hover:opacity-100 blur-sm transition" />

              {/* Image card */}
              <div className="relative overflow-hidden rounded-4xl bg-slate-800 border border-[#a68745]/40 shadow-2xl">
                <div className="overflow-hidden">
                  <img
                    src="/general-director.jpeg"
                    alt="General Director portrait"
                    className="w-full h-[540px] object-cover transform transition duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                  />
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition" />

                {/* Name & title overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-5 flex flex-col">
                  <span className="text-xs tracking-[0.35em] uppercase text-gray-300 mb-1">
                    FDRL's General Director.
                  </span>
                  <p className="text-lg font-semibold text-white">
                    Eng. Belkasem Hiftar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Content */}
          <div className="text-white animate-fade-in-up">
            {/* Section title */}
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#01354d]'
              }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              FDRL's General Director Message
            </h2>

            {/* Decorative quotation mark */}
            <div className="text-6xl text-[#a68745] leading-none mb-4">
              &ldquo;
            </div>

            {/* Message body */}
            <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                It is my distinct honor to welcome you to the official
                platform of the Global Competitive Urban Planning Initiative – Benghazi (GCUPI-B).
                This initiative is the keystone of the strategic vision set forth by the Fund for
                Development and Reconstruction of Libya (FDRL).

              </p>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Today, we stand at a pivotal moment in the history of our ancient city.
                We are not simply launching a competition;
                we are initiating a global partnership to integrate ambitious visions
                with the finest international expertise,
                thereby charting a course for a future
                worthy of Benghazi’s deep legacy and strategic importance.
              </p>

            </div>

            {/* Signature & divider */}
            <div className="mt-8 space-y-4">
              <div className={`h-px w-24 ${theme === 'dark'
                  ? 'bg-gradient-to-r from-[#a68745] to-transparent'
                  : 'bg-gradient-to-r from-[#a68745] to-transparent'
                }`} />
              <div className="font-semibold text-lg">
                <span className={`block ${theme === 'dark'
                    ? 'text-white'
                    : 'text-[#01354d]'
                  }`} style={{ fontFamily: '"Segoe Script", "Brush Script MT", cursive' }}>
                  Eng. Belkasem Hiftar
                </span>
                <span className={`text-sm tracking-wide uppercase ${theme === 'dark'
                    ? 'text-gray-400'
                    : 'text-gray-600'
                  }`}>
                  FDRl's General Director.
                </span>
              </div>
            </div>

            {/* READ FULL MESSAGE BUTTON */}
            <div className="mt-10">
              <button
                type="button"
                className={`mt-6 px-6 py-2 rounded-md font-medium transition-colors ${theme === 'dark'
                    ? 'bg-[#a68745] text-white hover:bg-[#8a6d2f]'
                    : 'bg-[#a68745] text-white hover:bg-[#002b3f]'
                  }`}
              >
                Read full message
                <span className="text-xl leading-none">&#8594;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
