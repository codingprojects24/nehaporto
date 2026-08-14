import type { Experience } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Pill, Reveal, Section, SectionHeading } from "./shared";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <Section id="experience" className="bg-bg-secondary">
      <SectionHeading
        label="Where I've Worked"
        title="Experience timeline"
        description="Hands-on product work, shipping to real users."
      />

      <div className="relative mt-16">
        <span
          aria-hidden
          className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary to-accent-secondary md:left-1/2 md:-translate-x-1/2"
        />
        <div className="space-y-10">
          {experience.map((item, i) => {
            const right = i % 2 === 1;
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
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.startDate} — {item.current ? "Present" : item.endDate}
                    </span>
                    {item.current ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                        Current
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-lg font-bold">{item.role}</h3>
                  <p className="text-sm font-medium text-primary">{item.company}</p>
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
