'use client';

import { useTheme } from '@/context/ThemeContext';
import {
    Globe,
    Building2,
    Handshake,
    ChartColumnBig,
    Recycle,
    Brain,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const FEATURES = [
    {
        title: 'التعاون والشراكات الدولية',
        description:
            'بناء تحالفات عالمية قوية لتعزيز الابتكار والنمو والدبلوماسية الاقتصادية.',
        Icon: Globe,
    },
    {
        title: 'تحول اقتصادي استراتيجي',
        description:
            'دفع التطور الحضري عبر التنمية المستدامة والإدارة المسؤولة للموارد.',
        Icon: ChartColumnBig,
    },
    {
        title: 'تنمية مستدامة ومسؤولة',
        description:
            'تطوير المدينة من خلال ممارسات مستدامة وإدارة فعّالة للموارد.',
        Icon: Recycle,
    },

    {
        title: 'حلول حضرية ذكية ومبتكرة',
        description:
            'تسخير الإبداع والتقنيات المتقدمة لبناء مدن جاهزة للمستقبل.',
        Icon: Brain,
    },
    {
        title: 'حيوية ثقافية وتمكين مجتمعي',
        description:
            'إثراء الحياة الحضرية بالاحتفاء بهوية المدينة الثقافية وتمكين سكانها.',
        Icon: Handshake,
    },
   {
        title: 'بنية تحتية ورؤية إرث مستدام',
        description:
            'تطوير الأنظمة عبر استراتيجيات جريئة واستشرافية تضمن أثرًا طويل الأمد.',
        Icon: Building2,
    },
];

export default function KeyFeaturesSection() {
    const { theme } = useTheme();

    const sectionBg =
        theme === 'dark'
            ? 'bg-slate-900 border-slate-800/60'
            : 'bg-gradient-to-b from-gray-50 via-white to-gray-50 border-gray-200/60';
    const titleColor = theme === 'dark' ? 'text-white' : 'text-[#01354d]';

    const cardBase =
        theme === 'dark'
            ? 'bg-slate-900/60 backdrop-blur border-slate-700/60 shadow-black/30'
            : 'bg-white/90 border-gray-200 shadow-black/5';

    const reduceMotion = useReducedMotion();
    const shouldAnimate = !reduceMotion;

    const containerVariants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
    };
    return (
        <section id="key-features" className={`py-24 border-y ${sectionBg}`}>
            <div className="container mx-auto px-6">
                <header className="text-center max-w-3xl mx-auto mb-14">
                    <h2 className={`text-3xl md:text-5xl font-bold tracking-tight ${titleColor}`}>
                        أبرز مميزات المبادرة
                    </h2>
                    <div className="mx-auto mt-6 h-0.5 w-25 rounded-full bg-[#a68745]" />
                </header>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={shouldAnimate ? containerVariants : undefined}
                    initial={shouldAnimate ? 'hidden' : false}
                    whileInView={shouldAnimate ? 'show' : undefined}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {FEATURES.map(({ title, description, Icon }) => (
                        <motion.article
                            key={title}
                            variants={shouldAnimate ? itemVariants : undefined}
                            className={[
                                'group',
                                'relative overflow-hidden',
                                'h-full',
                                'rounded-lg border',
                                'p-8',
                                'min-h-[260px]',
                                'flex flex-col items-center text-center',
                                'shadow-sm',
                                'transition-[transform,box-shadow,border-color] duration-300 ease-out',
                                'hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.01]',
                                'hover:border-[#a68745]',
                                "before:content-['']",
                                'before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[#a68745]',
                                'before:opacity-0 before:transition-opacity before:duration-300',
                                'group-hover:before:opacity-100',
                                cardBase,
                            ].join(' ')}
                        >
                            <div
                                className={[
                                    'mb-5',
                                    'inline-flex items-center justify-center',
                                    'h-16 w-16 rounded-2xl',
                                    'ring-1 ring-[#a68745]/25',
                                    theme === 'dark' ? 'bg-white/5' : 'bg-[#a68745]/10',
                                    'transition-[background-color,box-shadow] duration-300',
                                    'group-hover:bg-[#a68745]/15',
                                    'group-hover:ring-[#a68745]/40',
                                ].join(' ')}
                                aria-hidden="true"
                            >
                                <Icon
                                    className={[
                                        'h-7 w-7',
                                        'text-[#a68745]',
                                        'transition-colors duration-300',
                                        'group-hover:text-[#a68745]',
                                    ].join(' ')}
                                />
                            </div>

                            <h3 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {title}
                            </h3>

                            <p className={`mt-3 text-sm md:text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                {description}
                            </p>
                        </motion.article>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}