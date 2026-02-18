'use client';

import React from 'react';
import { Globe, BarChart3, Rocket, Handshake } from 'lucide-react';

const benefits = [
  {
    title: 'وصول مباشر وتأثير',
    desc: 'المساهمة بشكل مباشر في توجيه مسارات التعاقد واستدامة الخدمات على المدى الطويل.',
    Icon: Rocket,
  },
  {
    title: 'مسار شراكات التوريد',
    desc: 'الانخراط المباشر في قيادة تجديد المدينة ضمن مسارات التطوير الاستراتيجي للمشروع.',
    Icon: Globe,
  },
  {
    title: 'بناء تحالفات استراتيجية',
    desc: 'تعاون دولي مع أصحاب المصلحة الرئيسيين لدعم التنمية الإقليمية.',
    Icon: Handshake,
  },
  {
    title: 'تعزيز العلامة التجارية عالميًا',
    desc: 'إبراز التميز وتوسيع فرص التوسع نحو أسواق ومشروعات جديدة.',
    Icon: BarChart3,
  },
];

const InitiativeSection = () => {
  return (
    <section className="relative min-h-[600px] px-6 py-20 overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover "
      >
        <source src="/ar/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#0a192f]/80" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
          لماذا تنضم إلى المبادرة؟
        </h2>

        <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto mb-16 leading-relaxed">
          إن المشاركة في GCUPI‑B قرارٌ استراتيجي يضع مؤسستك في قلب مشروع وطني محوري
          يركز على إعادة تأهيل بنغازي وتجديدها بصورة استراتيجية.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-right">
          {benefits.map(({ title, desc, Icon }, index) => (
            <div key={index} className="flex gap-4 group">
              <div className="flex-shrink-0 mt-1 p-3 rounded-lg bg-[#a68745]/10 group-hover:bg-[#a68745]/20 transition-colors">
                <Icon className="w-6 h-6 text-[#a68745]" />
              </div>

              <div>
                <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-[#a68745] transition-colors">
                  {title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InitiativeSection;
