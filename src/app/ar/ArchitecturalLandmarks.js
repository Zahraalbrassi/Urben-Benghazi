'use client';

import { useMemo, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';


export default function ArchitecturalLandmarks() {
    const { theme } = useTheme();
    const reduceMotion = useReducedMotion();
    const shouldAnimate = !reduceMotion;

    const landmarks = useMemo(
        () => [
            {
                title: 'جامعة بنغازي',
                description:
                    'أقدم وأعرق جامعة في ليبيا، تأسست عام 1955. تمثل ركيزة التعليم الليبي الحديث والحياة الفكرية. وتكمن أهميتها المعمارية في كونها نقطة الانطلاق للتعليم العالي الحديث في البلاد، حيث أسهمت في تخريج أجيال من القادة والخبراء الوطنيين.',
                imageSrc: '/images/uob.jpg',
                imageAlt: 'جامعة بنغازي',
            },
            {
                title: 'قصر المنار (قصر الفنار)',
                description:
                    'موقع ذو رمزية كبيرة؛ إذ يُعرف تاريخيًا بأنه المكان الذي أُعلن فيه استقلال ليبيا لأول مرة. كما احتضن بدايات أول جامعة ليبية، مما يؤكد دوره كمنطلق للسيادة السياسية والتميز الأكاديمي.',
                imageSrc: '/images/manar.jpg',
                imageAlt: 'قصر المنار (قصر الفنار)',
            },
            {
                title: 'كاتدرائية بنغازي',
                description:
                    'أحد أبرز المعالم المعمارية الأيقونية في المدينة، وتتميز بقبتها الفريدة المهيبة وتصميمها الأوروبي الكلاسيكي.',
                imageSrc: '/images/cathedral.jpg',
                imageAlt: 'كاتدرائية بنغازي',
            },
            {
                title: 'المسجد العتيق في بنغازي',
                description:
                    'يُعرف بتصميمه المعماري التقليدي، ويعد مركزًا مهمًا للعبادة وشاهدًا على الإرث الإسلامي العريق للمدينة وتقنيات البناء التقليدية.',
                imageSrc: '/images/mosque.jpg',
                imageAlt: 'المسجد العتيق في بنغازي',
            },
            {
                title: 'فنار سيدي أخريبش',
                description:
                    'أحد المعالم البارزة في المدينة، ويُعد رمزًا للواجهة البحرية ومعلَمًا يُسهم في تشكيل صورة بنغازي الساحلية.',
                imageSrc: '/images/lighthouse.jpg',
                imageAlt: 'فنار سيدي أخريبش',
            },
            {
                title: 'مجمع الدعوة الإسلامية',
                description:
                    'مركز مهم للعلم الشرعي والأنشطة الدعوية، ويكمل البنية الروحية والدينية للمدينة.',
                imageSrc: '/images/dawa.jpg',
                imageAlt: 'مجمع الدعوة الإسلامية',
            },
            {
                title: 'ضريح عمر المختار',
                description:
                    'موقع ذو مكانة وطنية وتاريخية كبيرة يخلّد ذكرى البطل الوطني الليبي. ويُعد نقطة محورية للهوية الوطنية والذاكرة التاريخية.',
                imageSrc: '/images/tomb.jpg',
                imageAlt: 'ضريح عمر المختار',
            },
            {
                title: 'الميناء القديم (الميناء العتيق)',
                description:
                    'تاريخيًا كان الميناء القديم البوابة التجارية للمدينة والمنطقة بأكملها. ويُعد موقعه ومرافقه عنصرًا أساسيًا لتعزيز دور بنغازي المخطط لها كمركز عالمي للخدمات اللوجستية والتجارة.',
                imageSrc: '/images/mina.jpg',
                imageAlt: 'الميناء القديم (الميناء العتيق)',
            },
            {
                title: 'سوق الظلام',
                description:
                    'سوق تاريخي مميز اشتهر بالتجارة التقليدية والتفاعل الاجتماعي الحيوي. ولا يزال عنصرًا أساسيًا في الحيوية الثقافية والتجارية للمدينة ويجب الحفاظ عليه.',
                imageSrc: '/images/dhalam.jpg',
                imageAlt: 'سوق الظلام',
            },

        ],
        []
    );
    const [activeIndex, setActiveIndex] = useState(0);
    const active = landmarks[activeIndex];

    const prev = () => {
        setActiveIndex((i) => (i - 1 + landmarks.length) % landmarks.length);
    };

    const next = () => {
        setActiveIndex((i) => (i + 1) % landmarks.length);
    };
    //   deck settings (adjust to taste)
    const V_OFFSET = 14;  // vertical “stack” offset
    const SCALE_STEP = 0.03;
    const MAX_STACK = 3;  // how many cards visible in the deck

    // const sectionBg =
    //     theme === 'dark'
    //         ? 'bg-slate-900 border-slate-800/60'
    //         : 'bg-white border-gray-200/60';

    // const titleColor = theme === 'dark' ? 'text-white' : 'text-[#01354d]';
    // const bodyColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

    return (
        <section id="architectural-landmarks" className="relative py-24 border-y border-gray-200/60 dark:border-slate-800/60 overflow-hidden">
            {/* Background image based on active (top) card */}
            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${active.imageSrc})` }}
                aria-hidden="true"
            />

            {/* Blur + dark overlay for readability */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/70" aria-hidden="true"
            />
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl m-auto lg:-mt-4">
                    <h2 className={`text-3xl md:text-5xl font-bold tracking-tight text-center mt-10  text-white`}>
                        المعالم المعمارية
                    </h2>
                    <div className="mx-auto mt-4 h-0.5 w-24 rounded-full bg-[#a68745]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-8 ">
                    {/* LEFT: title + description (changes with every card) */}
                    <div>


                        <AnimatePresence mode="wait" initial={false}>
                            {shouldAnimate ? (
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                    className="mt-6"
                                >
                                    <h3 className={`text-2xl font-semibold text-white`}>
                                        {active.title}
                                    </h3>
                                    <p className={`mt-3 text-base md:text-lg leading-relaxed text-white `}>
                                        {active.description}
                                    </p>
                                </motion.div>
                            ) : (
                                <div key={activeIndex} className="mt-6">
                                    <h3 className={`text-2xl font-semibold text-white`}>
                                        {active.title}
                                    </h3>
                                    <p className={`mt-3 text-base md:text-lg leading-relaxed text-white`}>
                                        {active.description}
                                    </p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT: deck of cards + arrows */}
                    <div className="lg:justify-self-end w-full max-w-xl mt-8 ">
                        <div className="relative h-[420px]">
                            {landmarks.slice(0, Math.max(landmarks.length, MAX_STACK)).map((_, stackPos) => {
                                const idx = (activeIndex + stackPos) % landmarks.length;
                                const item = landmarks[idx];

                                const isTop = stackPos === 0;
                                const y = stackPos * V_OFFSET;
                                const scale = 1 - stackPos * SCALE_STEP;

                                return (
                                    <motion.article
                                        key={idx}
                                        className={[
                                            'absolute inset-0 rounded-2xl overflow-hidden',
                                            'bg-white dark:bg-slate-900',
                                            'shadow-[0_15px_45px_rgba(0,0,0,0.18)]',
                                            'border border-gray-200/70 dark:border-slate-700/70',
                                            isTop ? 'cursor-pointer' : 'pointer-events-none',
                                        ].join(' ')}
                                        style={{ zIndex: 50 - stackPos }}
                                        animate={
                                            shouldAnimate
                                                ? { y, scale }
                                                : {}
                                        }
                                        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                                        onClick={isTop ? next : undefined}
                                    >
                                        <div className="relative h-full">
                                            <div className="h-full w-full overflow-hidden">
                                                <motion.img
                                                    src={item.imageSrc}
                                                    alt={item.imageAlt || ''}
                                                    className="h-full w-full object-cover"
                                                    animate={isTop && shouldAnimate ? { scale: 1 } : { scale: 1 }}
                                                    whileHover={isTop && shouldAnimate ? { scale: 1.05 } : undefined}
                                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Title overlay on hover (top card only) */}
                                            <div className="absolute inset-x-0 bottom-0 p-5">
                                                <div className="rounded-xl bg-black/45 backdrop-blur-sm px-4 py-3">
                                                    <p className="text-white font-semibold text-lg">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-white/85 text-sm mt-1 line-clamp-2">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>

                        {/* arrows */}
                        <div className="mt-20 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={prev}
                                className={[
                                    'px-5 py-2 rounded-full font-semibold',
                                    'border transition-colors',
                                    theme === 'dark'
                                        ? 'border-slate-700 text-white hover:border-[#a68745]'
                                        : 'border-slate-700 text-white hover:border-[#a68745]',
                                ].join(' ')}
                                aria-label="المعلم السابق"
                            >
                                ←
                            </button>

                            <button
                                type="button"
                                onClick={next}
                                className="px-5 py-2 rounded-full font-semibold bg-[#a68745] text-white hover:bg-[#8c6d2e] transition-colors"
                                aria-label="المعلم التالي"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
