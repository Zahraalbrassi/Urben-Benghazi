import Image from 'next/image';
import Link from 'next/link';

const DEFAULT_EVENTS = [
  {
    id: '1',
    imageSrc: '/images/cathedral.jpg',
    imageAlt: 'Cathedral in Benghazi',
    dateLabel: 'Sunday, February 8, 2026',
    title: 'Conference & Innovation',
    description:
      'A high-level opening conference focused on knowledge exchange, best practices, and future-ready urban solutions.',
  },
  {
    id: '2',
    imageSrc: '/images/mosque.jpg',
    imageAlt: 'Mosque in Benghazi',
    dateLabel: 'Monday, February 9, 2026',
    title: 'Exhibition & Executive Review',
    description:
      'An international exhibition showcasing approved concepts, paired with executive review sessions to evaluate proposals.',
  },
  {
    id: '3',
    imageSrc: '/images/lighthouse.jpg',
    imageAlt: 'Lighthouse in Benghazi',
    dateLabel: 'Tuesday, February 10, 2026',
    title: 'Final Review of Applications',
    description:
      'A dedicated day for final presentations and detailed evaluation to identify the most impactful solutions.',
  },
];

function isExternalHref(href) {
  return typeof href === 'string' && /^https?:\/\//i.test(href);
}

function CardWrapper({ href, children }) {
  if (!href) return children;

  const external = isExternalHref(href);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className="block h-full">
      {children}
    </Link>
  );
}

function EventHighlightCard({ event }) {
  return (
    <CardWrapper href={event.href}>
      <article
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-transparent shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg focus-within:ring-2 focus-within:ring-[#a68745]/50 dark:border-slate-700 dark:bg-transparent"
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={event.imageSrc}
            alt={event.imageAlt || event.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 bg-transparent p-5 text-left">
          <div className="text-sm font-semibold tracking-wide text-[#a68745]">
            {event.dateLabel}
          </div>

          <h3 className="text-lg font-bold leading-snug text-[#01354d] dark:text-white">
            {event.title}
          </h3>

          <p className="flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {event.description}
          </p>
        </div>
      </article>
    </CardWrapper>
  );
}

export default function EventHighlights({
  events = DEFAULT_EVENTS,
  title = 'Event Highlights',
  subtitle,
  className = '',
}) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mb-10 text-left">
          <h2 className="text-3xl font-bold text-[#01354d] dark:text-white">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 max-w-3xl text-base text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventHighlightCard key={event.id || event.title} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
