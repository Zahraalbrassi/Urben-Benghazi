'use client';
import React from 'react';
import { Mail, MapPin, Phone, User, MessageSquare, Send } from 'lucide-react';

const ACCENT = '#a68745';

function Field({ id, label, icon: Icon, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-slate-700 text-right"
      >
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        {children}
      </div>
    </div>
  );
}

export default function ContactForm() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-20">
      {/* Decorative background (works in light + dark) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'var(--contact-blob-1)' }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'var(--contact-blob-2)' }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--contact-hero-title)] sm:text-4xl text-right">
            تواصل معنا
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--contact-hero-muted)] text-right">
            أرسل لنا رسالة وسنعاود التواصل معك في أقرب وقت ممكن.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-5">
          {/* Contact Info Card */}
          <aside className="lg:col-span-2">
            <div className="rounded-2xl border p-6 shadow-sm backdrop-blur-md sm:p-8 bg-[var(--contact-card-bg)] border-[color:var(--contact-card-border)]">
              <div className="flex items-center justify-between gap-6">
                <h3 className="text-lg font-semibold text-[#01354d]">ابقَ على تواصل</h3>
                <span
                  className="h-2 w-16 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, #01354d)` }}
                />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[var(--contact-muted)] text-right">
                هل تفضّل البريد الإلكتروني أو الهاتف؟ استخدم التفاصيل أدناه.
              </p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3 rounded-xl border border-transparent p-3 transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5">
                  <MapPin className="mt-0.5 h-5 w-5 text-[color:var(--contact-accent,#a68745)]" style={{ color: ACCENT }} />
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">الموقع</p>
                    <p className="text-sm text-slate-600">بنغازي، ليبيا</p>
                  </div>
                </li>

                <li className="flex items-start gap-3 rounded-xl border border-transparent p-3 transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5">
                  <Mail className="mt-0.5 h-5 w-5" style={{ color: ACCENT }} />
                  <div className="min-w-0 text-right">
                    <p className="text-sm font-semibold text-slate-900">البريد الإلكتروني</p>
                    <a
                      href="mailto:info@economicplatform.ly"
                      className="block truncate text-sm text-slate-600 hover:underline"
                    >
                      urbanbenghazi@reconstructionly.ly
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3 rounded-xl border border-transparent p-3 transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5">
                  <Phone className="mt-0.5 h-5 w-5" style={{ color: ACCENT }} />
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">الهاتف</p>
                    <a
                      href="tel:+218912345678"
                      className="text-sm text-slate-600 hover:underline"
                    >
                      +218 913267258
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-7 rounded-xl border p-4 text-xs shadow-sm bg-[var(--contact-card-soft-bg)] border-[color:var(--contact-card-border)] text-[var(--contact-muted)] text-right">
                عادةً نرد خلال 24–48 ساعة.
              </div>
            </div>
          </aside>

          {/* Form Card */}
          <div className="lg:col-span-3">
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="rounded-2xl border p-6 shadow-sm backdrop-blur-md sm:p-8 bg-[var(--contact-card-bg)] border-[color:var(--contact-card-border)]"
              aria-label="نموذج التواصل"
            >
              {/* Web3Forms config */}
              <input type="hidden" name="access_key" value="6a0c9e69-29ab-451f-ab22-94e0490e96f0" />
              <input type="hidden" name="subject" value="رسالة جديدة من نموذج تواصل أوربن بنغازي" />
              <input type="hidden" name="from_name" value="موقع أوربن بنغازي" />

              <div className="flex items-center justify-between gap-6">
                <h3 className="text-lg font-semibold text-[#01354d]">أرسل رسالة</h3>
                <span className="text-xs text-[var(--contact-muted)]">جميع الحقول مطلوبة</span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field id="contact-name" label="الاسم" icon={User}>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="اسمك"
                    className="w-full rounded-xl border py-2.5 pr-10 pl-4 shadow-sm outline-none transition placeholder:text-slate-400 text-slate-900 bg-[var(--contact-input-bg)] border-[color:var(--contact-input-border)] focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)/.25]"
                    style={{ ['--accent']: ACCENT }}
                  />
                </Field>

                <Field id="contact-email" label="البريد الإلكتروني" icon={Mail}>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border py-2.5 pr-10 pl-4 shadow-sm outline-none transition placeholder:text-slate-400 text-slate-900 bg-[var(--contact-input-bg)] border-[color:var(--contact-input-border)] focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)/.25]"
                    style={{ ['--accent']: ACCENT }}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-slate-700 text-right"
                >
                  الرسالة
                </label>
                <div className="relative">
                  <MessageSquare className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-400" />
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="اكتب رسالتك..."
                    rows={6}
                    className="w-full resize-none rounded-xl border py-2.5 pr-10 pl-4 shadow-sm outline-none transition placeholder:text-slate-400 text-slate-900 bg-[var(--contact-input-bg)] border-[color:var(--contact-input-border)] focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)/.25]"
                    style={{ ['--accent']: ACCENT }}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[var(--contact-muted)] text-right">
                  بإرسال النموذج، فإنك توافق على التواصل معك بخصوص استفسارك.
                </p>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-sm transition sm:w-auto"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, #01354d)` }}
                >
                  <Send className="h-4 w-4" />
                  إرسال الرسالة
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

