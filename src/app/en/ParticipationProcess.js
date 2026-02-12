"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const GOLD = "#a68745";

const steps = [
  {
    id: 1,
    label: "Electronic Registration",
    percent: 5,
    desc: "The first step is for all interested parties—whether large enterprises, joint ventures, self-employed experts, or even start-ups—to formally register their interest through the FDRL’s official platform. This step secures your entry into the competitive pool.",
    deadline: "Thursday, March 26, 2026 – Pre-registration deadline",
  },
  {
    id: 2,
    label: "Approval and Submission",
    percent: 60,
    desc: "Upon registration, all applicants will be subject to a preliminary review. Candidates who meet the required professional track record and qualification standards will be officially contacted for approval to proceed. Approved participants will then receive access to the comprehensive City Dossier and the formal guidelines for submitting their detailed concept plan and urban solutions.",
    deadline: "Sunday, April 26, 2026 – Proposal submission deadline",
  },
  {
    id: 3,
    label: "Evaluation and Selection",
    percent: 100,
    desc: "Following the submission deadline, all proposals will be rigorously evaluated by a multi-disciplinary technical committee. The criteria focus on creativity, cultural responsibility, urban efficiency, and economic viability. The top-ranking proposals will move forward to the three-day Benghazi Event for final review, presentation, and participation in conferences and exhibitions. Exceptional individual proposals will receive support to ensure full integration on the global stage.",
    deadline: null,
  },
];

export default function ParticipationProcess() {
  const scrollRef = useRef(null);
  const stepEls = useRef([]);
  const [activeStep, setActiveStep] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // % animation
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  // Ring animation
  const radius = 170;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(
    count,
    (v) => circumference * (1 - Math.max(0, Math.min(100, v)) / 100)
  );

  useEffect(() => {
    const controls = animate(count, steps[activeStep].percent, {
      duration: 1.0,
      ease: "circOut",
    });
    return () => controls.stop();
  }, [activeStep, count]);

  const scrollToStep = useCallback((index) => {
    const root = scrollRef.current;
    const el = stepEls.current[index];
    if (!root || !el) return;

    root.scrollTo({
      top: el.offsetTop,
      behavior: "smooth",
    });
  }, []);

  // Snap-scrolling panels drive the active step (like Vision 2030 scrollytelling)
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const els = stepEls.current.filter(Boolean);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible.length === 0) return;
        const idx = Number(visible[0].target.getAttribute("data-step-index"));
        if (!Number.isNaN(idx)) setActiveStep(idx);
      },
      {
        root,
        threshold: [0.45, 0.6, 0.75],
      }
    );

    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Make each wheel gesture go exactly to the next/previous step
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const clamp = (v) => Math.max(0, Math.min(steps.length - 1, v));

    let wheelAccum = 0;
    let wheelTimer = null;
    let locked = false;

    const go = (dir) => {
      if (locked) return;
      locked = true;
      window.setTimeout(() => {
        locked = false;
      }, 650);

      setActiveStep((s) => {
        const next = clamp(s + dir);
        // scroll after state updates
        window.requestAnimationFrame(() => scrollToStep(next));
        return next;
      });
    };

    const onWheel = (e) => {
      // Only vertical
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();

      wheelAccum += e.deltaY;
      if (wheelTimer) window.clearTimeout(wheelTimer);

      wheelTimer = window.setTimeout(() => {
        const threshold = 40;
        if (wheelAccum > threshold) go(1);
        if (wheelAccum < -threshold) go(-1);
        wheelAccum = 0;
      }, 40);
    };

    let touchStartY = null;
    const onTouchStart = (e) => {
      touchStartY = e.touches?.[0]?.clientY ?? null;
    };

    const onTouchEnd = (e) => {
      if (touchStartY == null) return;
      const endY = e.changedTouches?.[0]?.clientY;
      if (endY == null) return;

      const dy = endY - touchStartY;
      const threshold = 45;

      if (dy < -threshold) go(1);
      if (dy > threshold) go(-1);

      touchStartY = null;
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      if (wheelTimer) window.clearTimeout(wheelTimer);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchend", onTouchEnd);
    };
  }, [scrollToStep]);

  const overlayClass = isDark
    ? "bg-black/70 backdrop-blur-[1px]"
    : "bg-black/55 backdrop-blur-[1px]";

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src="/images/uob.jpg" alt="Benghazi Background" playsInline className="w-full h-full object-cover"/> 
        <div className={`absolute inset-0 ${overlayClass}`} />
      </div>

      {/* Scroll driver */}
      <div className="relative z-10 h-screen">
        <div
          ref={scrollRef}
          className="hide-scrollbar h-screen overflow-y-auto overscroll-contain snap-y snap-mandatory"
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              data-step-index={index}
              ref={(el) => {
                stepEls.current[index] = el;
              }}
              className="h-screen snap-start"
            />
          ))}
        </div>

        {/* Sticky / fixed UI */}
        <div className="pointer-events-none absolute inset-0">
          {/* Top sticky header bar */}
          <div className="pointer-events-auto fixed left-0 right-0 top-0 z-[999]">
            <div className="absolute inset-0 bg-black/45 backdrop-blur-md border-b border-white/10" />
            <div className="relative mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
              <div className="text-white font-semibold tracking-wide">
                Participation Process
              </div>
              <button
                type="button"
                onClick={() => scrollToStep(0)}
                className="text-xs font-semibold tracking-[0.22em] uppercase text-white/80 hover:text-white transition"
              >
                Back to start
              </button>
            </div>
          </div>

          <div className="h-full grid grid-cols-[80px_1fr] lg:grid-cols-[110px_1fr_520px]">
            {/* Left step numbers */}
            <div className="pointer-events-auto flex flex-col items-center justify-center gap-3">
              {steps.map((step, idx) => {
                const isActive = idx === activeStep;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => scrollToStep(idx)}
                    className="flex items-center gap-3 select-none"
                  >
                    <span
                      className="inline-block h-[6px] w-[6px] rounded-full"
                      style={{ backgroundColor: isActive ? GOLD : "rgba(255,255,255,0.25)" }}
                    />
                    <span
                      className="text-xs tracking-[0.25em]"
                      style={{
                        color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
                        fontWeight: isActive ? 700 : 500,
                      }}
                    > step 
                      {String(step.id).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Center ring */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <svg
                  width="520"
                  height="520"
                  viewBox="0 0 520 520"
                  aria-hidden="true"
                >
                  <g transform="rotate(-90 260 260)">
                    <circle
                      cx="260"
                      cy="260"
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="260"
                      cy="260"
                      r={radius}
                      fill="none"
                      stroke= {GOLD}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      style={{ strokeDashoffset }}
                    />
                  </g>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="flex items-baseline gap-1 text-white">
                    <span className="text-4xl opacity-80">%</span>
                    <motion.span className="text-7xl sm:text-8xl font-light tracking-tight">
                      {rounded}
                    </motion.span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="mt-4 text-sm text-white/70 tracking-wide text-center max-w-[300px]"
                    >
                      {steps[activeStep].label}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="hidden lg:flex items-center">
              <div className="pointer-events-auto max-w-[520px] pr-10">
                <div className="h-px w-20 bg-white/25 mb-6" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <h3 className="text-3xl font-semibold text-white leading-tight">
                      {steps[activeStep].label}
                    </h3>
                    <p className="mt-5 text-base leading-relaxed text-white/70">
                      {steps[activeStep].desc}
                    </p>
                    {steps[activeStep].deadline && (
                      <p className="mt-6 text-sm font-semibold text-white">
                        {steps[activeStep].deadline}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-10 flex items-center gap-4">
                  <button
                    type="button"
                    className="px-7 py-3 rounded-full font-semibold text-sm"
                    style={{ backgroundColor: GOLD, color: "#ffffff" }}
                  >
                    Register Now
                  </button>
                  <div className="text-xs text-white/60 tracking-[0.22em] uppercase">
                    Scroll to continue
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile bottom sheet for text */}
          <div className="lg:hidden pointer-events-auto absolute left-0 right-0 bottom-0 p-5">
            <div className="rounded-2xl border border-white/15 bg-black/45 backdrop-blur-md p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                    Step {steps[activeStep].id}
                  </div>
                  <div className="mt-2 text-xl font-semibold text-white">
                    {steps[activeStep].label}
                  </div>
                  <div className="mt-3 text-sm text-white/70 leading-relaxed">
                    {steps[activeStep].desc}
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                className="mt-5 w-full px-7 py-3 rounded-full font-semibold"
                style={{ backgroundColor: GOLD, color: "#ffff" }}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
