'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const participationPaths = [
  {
    id: 'competitive',
    title: 'المسار التنافسي',
    description: 'انضم إلى المنافسة لتكون مشاركًا أساسيًا في المبادرة.',
    image: '/images/compatitive.png',
  },
  {
    id: 'strategic',
    title: 'زائر استراتيجي',
    description: 'كن شريكًا للمبادرة عبر تعاون واستثمار طويل الأمد.',
    image: '/images/visitorpic.png',
  },
];

export default function ParticipationRoadmap() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-4">
      
      {/* 1. VIDEO BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/videos/benghazi-bg.mp4" type="video/mp4" />
        </video>
        {/* Theme-aware overlay */}
        <div className={`absolute inset-0 transition-all duration-700 ${
          isDark ? 'bg-slate-950/85 backdrop-blur-[2px]' : 'bg-white/70 backdrop-blur-[1px]'
        }`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Header */}
        <div className="mb-20 space-y-4">
          <h2 className={`text-xl md:text-6xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#01354d]'}`}>
            خارطة طريق المشاركة
          </h2>
          <p className={`max-w-2xl mx-auto text-lg md:text-xl font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            اكتشف كيف يمكن للخبراء والمستثمرين والشركاء الحكوميين الانضمام إلى مبادرة بنغازي الحضرية.
          </p>
        </div>

        {/* 2. ENHANCED CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {participationPaths.map((item) => {
            // Dynamic Shadow & Border Logic
            const cardStyles = isDark 
              ? item.id === 'competitive' 
                ? 'shadow-[0_0_50px_-12px_rgba(1,53,77,0.6)] border-amber-500/20 bg-white/5' 
                : 'shadow-[0_0_50px_-12px_rgba(166,135,69,0.5)] border-amber-500/20 bg-white/5'
              : 'shadow-2xl shadow-slate-300/50 border-white/40 bg-white/40';

            const buttonStyles = isDark 
              ? 'bg-[#a68745] hover:bg-[#c4a65e] text-white shadow-amber-900/40' 
              : 'bg-[#01354d] hover:bg-[#012a3d] text-white shadow-amber-900/40';

            return (
              <div
                key={item.id}
                className={`group relative p-10 rounded-[2.5rem] border backdrop-blur-2xl transition-all duration-500 
                  hover:-translate-y-4 ${cardStyles}`}
              >
                {/* Image with Drop Shadow */}
                <div className="relative h-72 w-full flex justify-center items-center mb-10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-64 h-64 md:w-80 md:h-80 object-contain transition-transform duration-700 
                               group-hover:scale-110 drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)]"
                  />
                </div>

                <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-base md:text-lg mb-10 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.description}
                </p>

                {/* Theme-Dynamic Button */}
                <button className={`
                  inline-flex items-center justify-center px-12 py-4 rounded-full 
                  font-bold text-lg transition-all duration-300 transform active:scale-95
                  ${buttonStyles}
                `}>
                  اقرأ المزيد
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}