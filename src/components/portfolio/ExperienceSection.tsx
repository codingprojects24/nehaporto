import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import type { Experience } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Pill, Reveal, Section, SectionHeading } from "./shared";

const DEFAULT_EXPERIENCE: Experience[] = [
  {
    id: "ai-hackathon-x-factor",
    company: "X Factor",
    role: "AI Hackathon Participant",
    type: "Hackathon",
    startDate: "2 Days",
    endDate: "",
    current: false,
    description:
      "Participated in a 2-day AI hackathon, collaborating on an AI-focused project and developing practical solutions within a fast-paced team environment.",
    order: 1,
  },
  {
    id: "nextgen-internship",
    company: "NextGen",
    role: "Full Stack Development Intern",
    type: "Virtual Internship",
    startDate: "Jun 2026",
    endDate: "Aug 2026",
    current: false,
    description:
      "Completed a 3-month virtual internship focused on full-stack development, gaining hands-on experience in building web applications and working with frontend and backend technologies.",
    order: 2,
  },
];

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const activeExperience =
    experience &&
    experience.length > 0 &&
    !experience.some((e) => e.id === "dream-team" || e.company.includes("Dream Team"))
      ? experience
      : DEFAULT_EXPERIENCE;

  // Scroll tracking for the timeline track and traveling indicator
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 50%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 28,
    restDelta: 0.001,
  });

  const dotTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="experience" className="bg-bg-secondary">
      <SectionHeading
        label="Where I've Worked"
        title="Experience Timeline"
        description="Hackathons, virtual internships, and hands-on technical collaborations."
      />

      <div ref={containerRef} className="relative mt-16 pb-6">
        {/* Base Timeline Track */}
        <div
          aria-hidden="true"
          className="absolute left-4 top-0 bottom-0 w-0.5 rounded-full bg-slate-200 md:left-1/2 md:-translate-x-1/2"
        />

        {/* Scroll Progress Active Gradient Line */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY: smoothProgress, transformOrigin: "top" }}
          className="absolute left-4 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-600 md:left-1/2 md:-translate-x-1/2"
        />

        {/* Dynamic Scroll-Linked Floating Marker Dot (moves up/down on scroll) */}
        <motion.div
          aria-hidden="true"
          style={{ top: dotTop }}
          className="pointer-events-none absolute left-4 z-20 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
        >
          <div className="relative flex size-6 items-center justify-center">
            {/* Outer Glowing Ripple */}
            <span className="absolute size-6 animate-ping rounded-full bg-blue-500/40 opacity-75" />
            {/* Main Glowing Dot Ring */}
            <span className="relative flex size-5 items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-[0_0_14px_rgba(37,99,235,0.75)]">
              {/* Inner Bright Core */}
              <span className="size-2 rounded-full bg-white shadow-sm" />
            </span>
          </div>
        </motion.div>

        <div className="space-y-12">
          {activeExperience.map((item, i) => {
            const right = i % 2 === 1;
            const dateLabel = item.current
              ? `${item.startDate} — Present`
              : item.endDate
                ? `${item.startDate} – ${item.endDate}`
                : item.startDate;

            return (
              <Reveal
                key={item.id}
                x={right ? 40 : -40}
                y={0}
                className={cn(
                  "relative pl-12 md:w-1/2 md:pl-0",
                  right ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right",
                )}
              >
                {/* Node Station Anchor Dot */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-[9px] top-6 z-10 size-3.5 rounded-full border-2 border-white bg-blue-600 shadow-sm transition-transform duration-200 hover:scale-125",
                    right ? "md:-left-[7px]" : "md:-right-[7px] md:left-auto",
                  )}
                >
                  <span className="absolute -inset-1 animate-pulse rounded-full bg-blue-400/30" />
                </span>

                <article className="lift rounded-2xl border border-border bg-surface p-6 text-left shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="accent">{item.type}</Pill>
                    <span className="font-mono text-xs text-muted-foreground">{dateLabel}</span>
                    {item.current ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                        Current
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{item.role}</h3>
                  <p className="text-sm font-semibold text-primary">{item.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
