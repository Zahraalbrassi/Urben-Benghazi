'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const ACCENT = '#a68745';

function FooterHeading({ children }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/90">
        {children}
      </h3>
      <div className="h-px w-10 bg-gradient-to-r from-[#a68745] to-transparent" aria-hidden="true" />
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className={[
        'group inline-flex items-center gap-1 text-sm text-white/75',
        'transition-colors hover:text-[#a68745]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a68745]/60',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-[#001b28]',
        'dark:focus-visible:ring-offset-slate-950',
      ].join(' ')}
    >
      <span>{children}</span>
      <span
        className="w-0 overflow-hidden opacity-0 transition-[width,opacity] group-hover:w-4 group-hover:opacity-100"
        aria-hidden="true"
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

function SocialIconLink({ href, label, children }) {
  const baseClassName = [
    'inline-flex h-10 w-10 items-center justify-center rounded-full',
    'border border-white/15 bg-white/5 text-white/80',
    'transition-[background-color,border-color,transform,color] duration-200',
    'hover:bg-white/10 hover:border-white/25 hover:text-white hover:-translate-y-0.5',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a68745]/60',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-[#001b28]',
    'dark:focus-visible:ring-offset-slate-950',
  ].join(' ');

  // Prevent opening an empty "#" link in a new tab.
  if (!href || href === '#') {
    return (
      <span
        aria-label={`${label} (coming soon)`}
        title={`${label} (coming soon)`}
        className={`${baseClassName} cursor-not-allowed opacity-50 hover:-translate-y-0 hover:bg-white/5 hover:border-white/15`}
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={baseClassName}
    >
      {children}
    </a>
  );
}

function CtaButton({ href, variant = 'primary', children }) {
  const base = [
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a68745]/60',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-[#001b28]',
    'dark:focus-visible:ring-offset-slate-950',
  ].join(' ');

  const styles =
    variant === 'primary'
      ? 'bg-[#a68745] text-white hover:bg-[#8c6d2e]'
      : 'border border-white/15 bg-white/5 text-white/90 hover:bg-white/10';

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 text-white bg-gradient-to-b from-[#002a3d] via-[#001b28] to-[#001622] dark:from-slate-950 dark:to-slate-950">
      {/* background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-45">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#a68745]/25 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        {/* CTA */}
       
       

        {/* Content */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-5">
            <div className="flex items-center gap-4">
              <Image
                src="/logo pdf-08.png"
                alt="Urban Benghazi"
                width={200}
                height={64}
                sizes="200px"
                className="h-12 w-auto"
                priority={false}
              />
              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold tracking-tight">Urban Benghazi</h2>
                <p className="text-sm text-white/70">GCUPI-B official platform</p>
              </div>
            </div>

            <p className="text-sm leading-6 text-white/75">
              Supporting the Global Competitive Urban Planning Initiative – Benghazi (GCUPI-B) through data,
              collaboration, and forward-looking urban solutions.
            </p>

            <div className="space-y-4 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 text-[color:var(--accent)]"
                  style={{ '--accent': ACCENT }}
                  aria-hidden="true"
                />
                <span>Benghazi, Libya</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 text-[color:var(--accent)]"
                  style={{ '--accent': ACCENT }}
                  aria-hidden="true"
                />
                <a href="tel:+218913267258" className="hover:text-white underline-offset-4 hover:underline">
                  +218 913267258
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-4 w-4 text-[color:var(--accent)]"
                  style={{ '--accent': ACCENT }}
                  aria-hidden="true"
                />
                <a href="mailto:urbanbenghazi@reconstructionly.ly" className="hover:text-white underline-offset-4 hover:underline">
                  urbanbenghazi@reconstructionly.ly
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div className="space-y-4">
              <FooterHeading>Quick Links</FooterHeading>
              <ul className="space-y-2">
                <li><FooterLink href="/en">Home</FooterLink></li>
                <li><FooterLink href="/en#aboutsection">About</FooterLink></li>
                <li><FooterLink href="/en#key-features">Key Features</FooterLink></li>
                <li><FooterLink href="/en#contact">Contact</FooterLink></li>
              </ul>
            </div>

            <div className="space-y-4">
              <FooterHeading>Sections</FooterHeading>
              <ul className="space-y-2">
                <li><FooterLink href="/en#director-message">Director Message</FooterLink></li>
                <li><FooterLink href="/en#historical-timeline">Timeline</FooterLink></li>
                <li><FooterLink href="/en#data-resources">Data Resources</FooterLink></li>
                <li><FooterLink href="/en#architectural-landmarks">Landmarks</FooterLink></li>
              </ul>
            </div>

            <div className="space-y-4">
              <FooterHeading>Connect</FooterHeading>
              <p className="text-sm leading-6 text-white/75">
                Follow updates and announcements.
              </p>

              <div className="flex items-center gap-3">
                <SocialIconLink href="https://www.facebook.com" label="Facebook">
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </SocialIconLink>
                <SocialIconLink href="#" label="Instagram">
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </SocialIconLink>
                <SocialIconLink href="#" label="LinkedIn">
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </SocialIconLink>
              </div>

              <p className="text-xs text-white/60">
                Share official updates from the initiative.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Urban Benghazi. All rights reserved.</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Link href="/en#contact" className="hover:text-white underline-offset-4 hover:underline">
              Contact the team
            </Link>
            <Link href="/en" className="inline-flex items-center gap-2 text-white/70 hover:text-white">
              Back to top <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
