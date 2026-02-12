'use client';
import React from 'react';
import FAQItem from './FaqItem';
import faqData from '@/data/faqData';

export default function FAQ() {
  return (
    <section
      className="w-full rounded-2xl p-6 shadow-sm text-[var(--foreground)]"
      style={{
        backgroundColor: 'var(--faq-surface)',
        backgroundImage:
          'linear-gradient(180deg, var(--faq-surface-start), var(--faq-surface-end))',
      }}
      aria-label="Frequently asked questions"
    >
      <h2 className="text-2xl font-bold text-[var(--faq-title)] text-center">
        Frequently Asked Questions
      </h2>

      <div className="mt-6 space-y-4" role="list" aria-label="List of frequently asked questions">
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}
