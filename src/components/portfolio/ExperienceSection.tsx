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
  const activeExperience =
    experience &&
    experience.length > 0 &&
    !experience.some((e) => e.id === "dream-team" || e.company.includes("Dream Team"))
      ? experience
      : DEFAULT_EXPERIENCE;

  return (
    <Section id="experience" className="bg-bg-secondary">
      <SectionHeading
        label="Where I've Worked"
        title="Experience Timeline"
        description="Hackathons, virtual internships, and hands-on technical collaborations."
      />

      <div className="relative mt-16">
        <span
          aria-hidden
          className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary to-accent-secondary md:left-1/2 md:-translate-x-1/2"
        />
        <div className="space-y-10">
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
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[9px] top-6 size-4 rounded-full border-2 border-surface bg-primary",
                    right ? "md:-left-2" : "md:-right-2 md:left-auto",
                  )}
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
                </span>
                <article className="lift rounded-2xl border border-border bg-surface p-6 text-left hover:border-primary">
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
                  <h3 className="mt-3 text-lg font-bold">{item.role}</h3>
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
