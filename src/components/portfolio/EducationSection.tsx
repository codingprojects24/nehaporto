import { GraduationCap } from "lucide-react";

import type { Education } from "@/lib/types";

import { Pill, Reveal, Section, SectionHeading } from "./shared";

export function EducationSection({ items }: { items: Education[] }) {
  return (
    <Section id="education" className="bg-bg-tertiary">
      <SectionHeading
        label="Academics"
        title="Education"
        description="Formal grounding in data science, mathematics and engineering."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08}>
            <article className="lift h-full rounded-2xl border border-border bg-surface p-7 hover:border-primary">
              <div className="flex items-center justify-between">
                <GraduationCap className="size-7 text-primary" aria-hidden />
                <Pill tone="accent">{item.period}</Pill>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{item.institution}</h3>
              <p className="mt-1 text-sm font-medium text-text-secondary">{item.degree}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
