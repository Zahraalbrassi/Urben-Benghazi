'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const VISIBLE_CARDS = 3;
const SLICE_WORDS = 20;
const IS_RTL = true;

const topics = [
  {
    id: 1,
    image: '/images/vistor.png',
    label: 'موضوع مميز',
    title: 'يمكنك المشاركة في المؤتمر العالمي كزائر!',
    description:
      'سواء كنت مستثمرًا خاصًا أو خبيرًا أو مهتمًا بالتنمية الحضرية، يمكنك المشاركة والتسجيل كزائر لحضور فعاليات المؤتمر الدولي التي تقام على مدى ثلاثة أيام: 8 و9 و10 فبراير 2026.',
  },
  {
    id: 2,
    image: '/images/Artboard 1 copy 8.png',
    label: 'موضوع مميز',
    title: 'تمديد الفعالية الختامية لـ GCUPI‑B حتى فبراير 2026!',
    description:
      'استجابةً للطلب العالمي على جودة تنافسية عالية، أعلن صندوق التنمية وإعادة إعمار ليبيا عن تمديد موعد الفعالية الختامية لمبادرة GCUPI‑B.',
  },
  {
    id: 3,
    image: '/images/image (2).png',
    label: 'موضوع مميز',
    title: 'تمديد المواعيد النهائية!',
    description:
      'نظرًا للإقبال الكبير، تم تمديد موعد التسجيل حتى 16 يناير 2026، بينما يبقى موعد تسليم المشاركات في 30 يناير.',
  },
  {
    id: 4,
    image: '/images/image (3).png',
    label: 'موضوع مميز',
    title: 'جدول فعاليات شهر فبراير',
    description:
      'يشهد شهر فبراير أحد أكثر الأسابيع التاريخية في بنغازي، بما يتضمن منتديات دولية وفعاليات المبادرة العالمية للتخطيط الحضري التنافسي.',
  },
  {
    id: 5,
    image: '/images/image (4).png',
    label: 'موضوع مميز',
    title: 'فرصة لتوقيع مذكرات تفاهم!',
    description:
      'ستتاح للشركات المشاركة فرصة توقيع مذكرات تفاهم مع صندوق التنمية وإعادة إعمار ليبيا.',
  },
  {
    id: 6,
    image: '/images/image (5).png',
    label: 'موضوع مميز',
    title: 'اجتماعات كبار الشخصيات متاحة',
    description:
      'يمكن لكبار الشخصيات حجز اجتماعات خاصة فردية مع المدير العام للصندوق خلال فترة المبادرة.',
  },
  {
    id: 7,
    image: '/images/image (6).png',
    label: 'موضوع مميز',
    title: 'اجتماعات الأعمال (B2B) — اليوم الثالث',
    description:
      'ستكون اجتماعات الأعمال (B2B) متاحة لجميع المشاركين لتعزيز التعاون وبناء الشراكات.',
  },
  {
    id: 8,
    image: '/images/image (7).png',
    label: 'موضوع مميز',
    title: 'حضور مراسم توقيع مذكرات التفاهم لكبار الشخصيات',
    description:
      'سيحضر كبار الشخصيات مراسم توقيع مذكرات التفاهم الرسمية في اليوم الثالث من المبادرة.',
  },
  {
    id: 9,
    image: '/images/image (8).png',
    label: 'موضوع مميز',
    title: 'تسجيل المشاريع المشتركة',
    description:
      'يمكن للمشاريع المشتركة التسجيل تحت ملف موحد لإبراز نقاط القوة المشتركة.',
  },
  {
    id: 10,
    image: '/images/image (9).png',
    label: 'موضوع مميز',
    title: 'الشركات الناشئة مرحّب بها!',
    description:
      'ندعو الشركات الناشئة للمشاركة وعرض حلول مبتكرة تدعم التنمية وإعادة الإعمار.',
  },
];

export default function FeaturedTopics() {
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();

  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState({});

  /* AUTO SLIDE */
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) =>
        prev >= topics.length - VISIBLE_CARDS ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  const sliceText = (text) => {
    const words = text.split(' ');
    if (words.length <= SLICE_WORDS) return text;
    return words.slice(0, SLICE_WORDS).join(' ') + '...';
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className={`py-16 transition-colors duration-300 ${
  theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
}`}>
      <h2 className={`text-3xl font-bold text-center mb-12 ${
  theme === 'dark' ? 'text-white' : 'text-gray-900'
}`}>
        مواضيع مميزة
      </h2>

      <div
        className="relative max-w-6xl mx-auto overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* SLIDER */}
        <div
          className={`flex gap-6 transition-transform duration-700 ease-out ${
            IS_RTL ? 'flex-row-reverse' : ''
          }`}
          style={{
            transform: `translateX(-${index * (100 / VISIBLE_CARDS)}%)`,
          }}
        >
          {topics.map((topic) => (
            <div key={topic.id} className="w-1/3 flex-shrink-0 px-2">
              <div className="group relative h-[420px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                  {/* LABEL */}
                  <span className="text-[#a68745] text-xs font-bold uppercase tracking-wider mb-2">
                    {topic.label}
                  </span>

                  {/* TITLE */}
                  <h3 className="text-white text-lg font-bold mb-3">
                    {topic.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {expanded[topic.id]
                      ? topic.description
                      : sliceText(topic.description)}
                  </p>

                  {/* SHOW MORE */}
                  {topic.description.split(' ').length > SLICE_WORDS && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(topic.id);
                      }}
                      className="mt-3 self-start bg-black/70 text-[#a68745] hover:bg-[#a68745] hover:text-black text-xs font-bold uppercase px-4 py-1.5 rounded-md transition"
                    >
                      {expanded[topic.id] ? 'عرض أقل' : 'عرض المزيد'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CONTROLS */}
        <button
          onClick={() =>
            setIndex((prev) =>
              IS_RTL
                ? prev >= topics.length - VISIBLE_CARDS
                  ? 0
                  : prev + 1
                : prev <= 0
                  ? topics.length - VISIBLE_CARDS
                  : prev - 1
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-[#a68745]"
          aria-label={IS_RTL ? 'التالي' : 'Previous'}
        >
          {IS_RTL ? '›' : '‹'}
        </button>

        <button
          onClick={() =>
            setIndex((prev) =>
              IS_RTL
                ? prev <= 0
                  ? topics.length - VISIBLE_CARDS
                  : prev - 1
                : prev >= topics.length - VISIBLE_CARDS
                  ? 0
                  : prev + 1
            )
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-[#a68745]"
          aria-label={IS_RTL ? 'السابق' : 'Next'}
        >
          {IS_RTL ? '‹' : '›'}
        </button>
      </div>
    </section>
  );
}
