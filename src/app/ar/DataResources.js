'use client';

import { useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, useReducedMotion } from 'framer-motion';
import { Database, Map, FileText, BarChart3, Globe, Layers } from 'lucide-react';
import InteractiveMap from './InteractiveMap';




export default function DataResources() {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const shouldAnimate = !reduceMotion;





  return (
    <section id="data-resources" className={`grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 px-6 bg-gray-50 dark:bg-slate-900 transition-colors duration-300 
    ${theme==="dark" ? 'bg-slate-900' : 'bg-[#002a3d]'}`}>
   <div className={`flex flex-col justify-center items-center ${theme === "dark" ? 'text-white': 'text-gray-900'}`}>
   <h2 className='text-3xl font-bold text-center mb-5'> مصادر بيانات بنغازي الحضرية </h2>
   <p className='text-center'>حزمة تفصيلية من بيانات بنغازي الحضرية ومعلوماتها الخلفية.
    سيحصل المتقدمون المقبولون على إمكانية الوصول إلى هذا الملف لدعم البحث وتصميم المشاريع
    وإعداد المقترحات.</p>
    <button className={`mt-8 px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
      theme === "dark"
        ? "bg-[#a68745] hover:bg-[#8c6d2e] text-white"
        : "bg-[#01354d] hover:bg-[#002a3d] text-white"
    }`}> <a href=''>
      سجل الآن
      </a>
    </button>
    </div>
     <InteractiveMap />

    </section>
    );
}
