'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const VISIBLE_CARDS = 3;
const SLICE_WORDS = 20;

const topics = [
  {
    id: 1,
    image: '/images/vistor.png',
    label: 'Featured Topic',
    title: 'You can participate in the global conference as a visitor!',
    description:
      'Whether you are a private investor, an expert, or simply interested in urban development, you are welcome to participate and register as a visitor to attend the International Conference events, taking place over three days — February 8, 9, and 10 / 2026.',
  },
  {
    id: 2,
    image: '/images/Artboard 1 copy 8.png',
    label: 'Featured Topic',
    title: 'GCUPI-B Final Event Extended to February 2026!',
    description:
      'Responding to the global demand for competitive quality, the Fund for Development and Reconstruction of Libya has announced an extension for the GCUPI-B Final Event.',
  },
  {
    id: 3,
    image: '/images/image (2).png',
    label: 'Featured Topic',
    title: 'Deadline Extension!',
    description:
      'Due to high demand, the registration deadline has been extended to January 16, 2026 while the submission deadline remains January 30.',
  },
  {
    id: 4,
    image: '/images/image (3).png',
    label: 'Featured Topic',
    title: 'February Event Calendar',
    description:
      'February marks one of the most historic weeks in Benghazi featuring international forums and the Global Competitive Urban Planning Initiative.',
  },
  {
    id: 5,
    image: '/images/image (4).png',
    label: 'Featured Topic',
    title: 'Chance to sign MOUs!',
    description:
      'Participating companies will have the opportunity to sign MOUs with the Fund for Development and Reconstruction of Libya.',
  },
  {
    id: 6,
    image: '/images/image (5).png',
    label: 'Featured Topic',
    title: 'VIP Meetings Available',
    description:
      'VIP attendees can book exclusive one-on-one meetings with the General Director of FDRL during the initiative.',
  },
  {
    id: 7,
    image: '/images/image (6).png',
    label: 'Featured Topic',
    title: 'B2B Meetings – Day 3',
    description:
      'B2B meetings will be available for all participants to strengthen cooperation and partnerships.',
  },
  {
    id: 8,
    image: '/images/image (7).png',
    label: 'Featured Topic',
    title: 'VIP MOU Signing Access',
    description:
      'VIP attendees will attend official MOU signing ceremonies on Day 3 of the initiative.',
  },
  {
    id: 9,
    image: '/images/image (8).png',
    label: 'Featured Topic',
    title: 'Joint Ventures Registration',
    description:
      'Joint ventures can register under one unified profile to showcase combined strengths.',
  },
  {
    id: 10,
    image: '/images/image (9).png',
    label: 'Featured Topic',
    title: 'Start-ups Are Welcome!',
    description:
      'Start-ups are invited to participate and showcase innovative solutions supporting development and reconstruction.',
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
        Featured Topics
      </h2>

      <div
        className="relative max-w-6xl mx-auto overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* SLIDER */}
        <div
          className="flex gap-6 transition-transform duration-700 ease-out"
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
                      {expanded[topic.id] ? 'Show Less' : 'Show More'}
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
              prev <= 0 ? topics.length - VISIBLE_CARDS : prev - 1
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-[#a68745]"
        >
          ‹
        </button>

        <button
          onClick={() =>
            setIndex((prev) =>
              prev >= topics.length - VISIBLE_CARDS ? 0 : prev + 1
            )
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-[#a68745]"
        >
          ›
        </button>
      </div>
    </section>
  );
}
