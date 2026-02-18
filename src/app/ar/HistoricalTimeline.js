'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

function EventCard({ event, isActive }) {
  return (
    <article
      className={[
        'group rounded-xl border p-6',
        'bg-white dark:bg-slate-700',
        'shadow-sm transition-all duration-400 ease-out',
        'hover:-translate-y-1 hover:shadow-xl',
        isActive
          ? 'border-[#a68745] ring-1 ring-[#a68745]/30'
          : 'border-gray-200 dark:border-slate-700',
      ].join(' ')}
    >
      <header className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg md:text-xl font-semibold text-[#01354d] dark:text-white">
          {event.title}
        </h3>
        <span className="text-sm font-semibold text-[#a68745] whitespace-nowrap">
          {event.year}
        </span>
      </header>

      <p
        className={[
          'mt-3 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300',
          '[display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden',
          'group-hover:[-webkit-line-clamp:unset]',
        ].join(' ')}
      >
        {event.description}
      </p>

      {event.imageSrc ? (
        <div className="mt-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800">
          <img
            src={event.imageSrc}
            alt={event.imageAlt || ''}
            className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      ) : null}
    </article>
  );
}

export default function HistoricalTimeline() {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const shouldAnimate = !reduceMotion;

  // Replace these with your real milestones
  const events = useMemo(
    () => [
      {
        year: '1911',
        title: 'المخطط الاستعماري الإيطالي',
        description:
          'باشرت السلطات الإيطالية أول مخطط عمراني شامل، واضعةً نواة بنغازي الإدارية والتجارية الأولى.',
      },
      {
        year: '1966',
        title: 'مخطط دوكسيادِس (Doxiadis Associates)',
        description:
          'طُرح مخطط متكامل للتنمية الحضرية ركّز على الاستثمار العقاري وتوسعة الخدمات المركزية.',
      },
      {
        year: '1984',
        title: 'تصميم كوستا لمركز المدينة الحديث',
        description:
          'قدّم المعماري كوستا تصورًا حديثًا لمركز المدينة بهدف إعادة تعريف القلب العمراني لمدينة بنغازي.',
      },
      {
        year: '1984',
        title: 'مشروع الكورنيش لكيشو كورُوكَاوَا',
        description:
          'طوّر مكتب كيشو كورُوكَاوَا الياباني مشروع تصميم عمراني للكورنيش لتعزيز الوصول إلى الواجهة الساحلية.',
      },
      {
        year: '1992',
        title: 'مشروع مكتب الاستشارات للمرافق',
        description:
          'اقتُرح مشروع لمركز حضري لإحياء قلب المدينة، إلا أنه بقي إلى حد كبير دون تنفيذ.',
      },
      {
        year: '2009',
        title: 'مخطط الجيل الثالث (العمارة العمارة) – استشاريون',
        description:
          'قدّم الاستشاريون مخططًا استشرافيًا لتوجيه تطور بنغازي حتى عام 2025.',
      },
      {
        year: '2026',
        title: 'خطة رؤية مستقبل مستدام',
        description:
          'يركّز المخطط الرئيسي الجديد على الاستدامة والتقنيات الذكية والمساحات الخضراء، بهدف ترسيخ مكانة بنغازي كمدينة رائدة إقليميًا في التنمية الحضرية الحديثة والمسؤولة بيئيًا.',
      },

    ],
    []
  );

  const itemRefs = useRef([]);
  const timelineWrapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorLineHeight, setIndicatorLineHeight] = useState(0);

  const activeYear = events[activeIndex]?.year;

  // Auto-highlight the “active” year as you scroll
  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

        const idx = Number(visible?.target?.dataset?.idx);
        if (!Number.isNaN(idx)) setActiveIndex(idx);
      },
      { threshold: [0.15, 0.35, 0.6], rootMargin: '-35% 0px -45% 0px' }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [events.length]);

  // Index-based indicator positioning (fixed step between milestones).
  // We measure the first and last dot once to derive a consistent step, then move by index.
  const [indicatorBaseTop, setIndicatorBaseTop] = useState(0);
  const [indicatorBaseCenter, setIndicatorBaseCenter] = useState(0);
  const [indicatorStep, setIndicatorStep] = useState(0);

  useEffect(() => {
    const wrap = timelineWrapRef.current;
    const first = itemRefs.current[0];
    const last = itemRefs.current[events.length - 1];
    if (!wrap || !first || !last) return;

    const update = () => {
      const firstDot = first.querySelector('[data-dot="true"]');
      const lastDot = last.querySelector('[data-dot="true"]');
      if (!firstDot || !lastDot) return;

      const wrapRect = wrap.getBoundingClientRect();
      const firstRect = firstDot.getBoundingClientRect();
      const lastRect = lastDot.getBoundingClientRect();

      const firstTop = firstRect.top - wrapRect.top;
      const firstCenter = firstTop + firstRect.height / 2;
      const lastTop = lastRect.top - wrapRect.top;
      const lastCenter = lastTop + lastRect.height / 2;

      const count = Math.max(1, events.length);
      const step = count > 1 ? (lastCenter - firstCenter) / (count - 1) : 0;

      setIndicatorBaseTop(firstTop);
      setIndicatorBaseCenter(firstCenter);
      setIndicatorStep(step);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [events.length]);

  useEffect(() => {
    const dotTop = indicatorBaseTop + activeIndex * indicatorStep;
    const dotCenter = indicatorBaseCenter + activeIndex * indicatorStep;

    // Head dot goes to the center position computed from index.
    setIndicatorTop(dotCenter);
    // Progress line stops at the TOP edge position computed from index.
    setIndicatorLineHeight(Math.max(0, dotTop - 1));
  }, [activeIndex, indicatorBaseTop, indicatorBaseCenter, indicatorStep]);

  const jumpToIndex = (idx) => {
    const node = itemRefs.current[idx];
    if (!node) return;
    node.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  };

  const sectionBg =
    theme === 'dark'
      ? 'bg-slate-800 border-slate-800/60'
      : 'bg-gradient-to-b from-white via-gray-50 to-white border-gray-200/60';

  return (
    <section id="historical-timeline" className={`py-24 border-y ${sectionBg}`}>
      <div className="container mx-auto px-6">
        <header className="text-center max-w-3xl mx-auto mb-10">
          <h2 className={`text-3xl md:text-5xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#01354d]'}`}>
            الخط الزمني للتطور العمراني التاريخي
          </h2>
          <div className="mx-auto mt-6 h-0.5 w-24 rounded-full bg-[#a68745]" />
        </header>

        {/* Jump-to-year navigation */}
        <nav aria-label="Timeline years" className="mb-10">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {events.map((event, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={`${event.year}-${idx}`}
                  type="button"
                  onClick={() => jumpToIndex(idx)}
                  className={[
                    'px-3 py-1.5 rounded-full text-sm font-semibold',
                    'transition-colors duration-200',
                    isActive
                      ? 'bg-[#a68745] text-white'
                      : 'bg-white/80 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-[#01354d] dark:text-white hover:border-[#a68745]',
                  ].join(' ')}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {event.year}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-px-6">
            {events.map((event, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={`${event.year}-${idx}`}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  data-year={event.year}
                  data-idx={idx}
                  className="snap-center shrink-0 w-[86%]"
                >
                  <AnimatePresence initial={false}>
                    {activeIndex === idx ? (
                      shouldAnimate ? (
                        <motion.div
                          key="card"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                        >
                          <EventCard event={event} isActive={isActive} />
                        </motion.div>
                      ) : (
                        <div key="card">
                          <EventCard event={event} isActive={isActive} />
                        </div>
                      )
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop/tablet: vertical timeline */}
        <div ref={timelineWrapRef} className="relative hidden md:block">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gray-200 dark:bg-slate-700" />

          {/* Progress line that grows as you reach each year */}
          {shouldAnimate ? (
            <>
              <motion.div
                className="absolute left-1/2 top-0 z-10 w-[5px] -translate-x-1/2 rounded-full bg-[#a68745]/70"
                animate={{ height: Math.max(0, indicatorLineHeight) }}
                transition={{ type: 'spring', stiffness: 80, damping: 30 }}
                aria-hidden="true"
              />
              {/* Small head dot at the end of the progress line */}
              <motion.div
                className="absolute left-1/2 z-20 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-6 border-[#a68745] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.25)] dark:bg-slate-750"
                animate={{ top: indicatorTop }}
                transition={{ type: 'spring', stiffness: 90, damping: 32 }}

                aria-hidden="true"
              />
            </>
          ) : null}

          <div className="space-y-10">
            {events.map((event, idx) => {
              const isLeft = idx % 2 === 0;
              const isActive = activeIndex === idx;

              return (
                <div
                  key={`${event.year}-${idx}`}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  data-year={event.year}
                  data-idx={idx}
                  className="grid grid-cols-[1fr,88px,1fr] items-center gap-6"
                >
                  <div className={isLeft ? 'flex justify-end' : ''}>
                    {isLeft ? (
                      <div className="max-w-lg w-full">
                        <AnimatePresence initial={false}>
                          {activeIndex === idx ? (
                            shouldAnimate ? (
                              <motion.div
                                key="card"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 12 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                              >
                                <EventCard event={event} isActive={isActive} />
                              </motion.div>
                            ) : (
                              <div key="card">
                                <EventCard event={event} isActive={isActive} />
                              </div>
                            )
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col items-center">
                    <div
                      data-dot="true"
                      className={[
                        'z-10 h-4 w-4 rounded-full border-4 transition-colors duration-200',
                        isActive
                          ? 'bg-white dark:bg-slate-750 border-[#a68745]'
                          : 'bg-white dark:bg-slate-750 border-gray-300 dark:border-slate-600',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                    <span className={`mt-2 text-sm font-semibold ${isActive ? 'text-[#a68745]' : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {event.year}
                    </span>
                  </div>

                  <div>
                    {!isLeft ? (
                      <div className="max-w-lg w-full">
                        <AnimatePresence initial={false}>
                          {activeIndex === idx ? (
                            shouldAnimate ? (
                              <motion.div
                                key="card"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 12 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                              >
                                <EventCard event={event} isActive={isActive} />
                              </motion.div>
                            ) : (
                              <div key="card">
                                <EventCard event={event} isActive={isActive} />
                              </div>
                            )
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}