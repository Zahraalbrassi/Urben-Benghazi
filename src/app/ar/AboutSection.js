'use client';
import { useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, useInView, useReducedMotion } from 'framer-motion';

function WordReveal({ text, className }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.35 });

  // "reduced motion" preference
  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 } // speed: lower = faster
    }
  };

  const word = {
    hidden: { opacity: 0, y: 6, filter: 'blur(4px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.25, ease: 'easeOut' }
    }
  };

  return (
    <motion.p
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {text.split(/\s+/).map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={word}
          style={{ display: 'inline-block' }}
        >
          {w + '\u00A0'}
        </motion.span>
      ))}
    </motion.p>
  );
}


export default function AboutSection() {
  const { theme } = useTheme();

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <section 
        id="aboutsection" 
        className={`py-24 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}
      >
        <div className="container mx-auto px-6">
          <h2
            className={`text-2xl md:text-6xl font-bold text-center mb-16 tracking-wider animate-fade-in-up ${theme === 'dark' ? 'text-white' : 'text-[#01354d]'
              }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            GCUPI‑B: المبادرة العالمية للتخطيط الحضري التنافسي – بنغازي
          </h2>
          <div className="grid grid-cols-1 gap-12">
            <div
              className={`p-10 rounded-lg border-l-4 border-[#a68745] animate-fade-in-up ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
                }`}
            >
              <WordReveal
                className={`leading-relaxed text-lg md:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                text={
                  "لقد ولّى زمن المبادرات التقليدية، وبدأ عصر جديد من التنمية التنافسية على المستوى العالمي. وتحت إشراف ومتابعة المدير العام لصندوق التنمية وإعادة إعمار ليبيا،\nالمهندس بلقاسم حفتر، وبتكليف من الصندوق، أُطلقت المبادرة العالمية للتخطيط الحضري التنافسي لمدينة بنغازي (GCUPI‑B) لتكون القوة الدافعة نحو تحويل بنغازي إلى عاصمة اقتصادية دولية متكاملة.\nوتُمثل GCUPI‑B أول عملية تنافسية دولية مفتوحة في العالم تُعنى بإنتاج مخططات مفاهيمية واقعية واستشرافية وحلول مبتكرة تُشكل مستقبل بنغازي الحضري."
                }
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}