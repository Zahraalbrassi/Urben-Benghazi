'use client';
import React from 'react';
import FAQItem from './FaqItem';
import faqDataAr from '@/data/faqDataAr';

export default function FAQ() {
  return (
    <section
      className="w-full rounded-2xl p-6 shadow-sm text-[var(--foreground)]"
      style={{
        backgroundColor: 'var(--faq-surface)',
        backgroundImage:
          'linear-gradient(180deg, var(--faq-surface-start), var(--faq-surface-end))',
      }}
      aria-label="الأسئلة الشائعة"
    >
      <h2 className="text-2xl font-bold text-[var(--faq-title)] text-center">
        الأسئلة الشائعة
      </h2>

      <div className="mt-6 space-y-4" role="list" aria-label="قائمة الأسئلة الشائعة">
        {faqDataAr.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}
