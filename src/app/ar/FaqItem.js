'use client';
import React from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const reactId = React.useId();
  const buttonId = `${reactId}-button`;
  const panelId = `${reactId}-panel`;

  return (
    <div
      className={[
        'w-full rounded-xl border shadow-sm',
        'bg-[var(--faq-card-bg)] hover:bg-[var(--faq-card-bg-hover)]',
        'border-[color:var(--faq-card-border)]',
        'transition-colors transition-shadow duration-200',
        isOpen ? 'shadow-md' : '',
      ].join(' ')}
    >
      <button
        id={buttonId}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={[
'flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-right',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70',
        ].join(' ')}
      >
        <span className="text-base font-semibold text-[var(--foreground)] sm:text-lg">
          {question}
        </span>

        {/* Plus / Minus Icon */}
        <span
          aria-hidden="true"
          className={[
            'relative h-5 w-5 shrink-0',
            'transition-transform duration-300',
            isOpen ? 'rotate-180' : '',
          ].join(' ')}
        >
          <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded bg-[var(--faq-icon)]" />
          <span
            className={[
              'absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded bg-[var(--faq-icon)]',
              'transition-transform duration-200 ease-in-out',
              isOpen ? 'scale-y-0' : 'scale-y-100',
            ].join(' ')}
          />
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className={[
          'px-5 overflow-hidden',
          'transition-[max-height,opacity] duration-300 ease-in-out',
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="pb-4 text-sm leading-relaxed text-[var(--faq-answer)]">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
