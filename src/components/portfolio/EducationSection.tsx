import { GraduationCap } from "lucide-react";

import type { Education } from "@/lib/types";

import { Pill, Reveal, Section, SectionHeading } from "./shared";

const DEFAULT_EDUCATION: Education[] = [
  {
    id: "btech",
    degree: "B.Tech — Machine Learning",
    institution: "KIET Womens Engineering College",
    period: "2024 – 2028",
    description:
      "Focused coursework in machine learning, artificial intelligence, data science, statistics and programming, with hands-on experience through projects and practical applications.",
    order: 1,
  },
  {
    id: "inter",
    degree: "Intermediate — MPC",
    institution: "Sri Chaitanya Girls Junior College",
    period: "2021 – 2023",
    description: "Mathematics, Physics and Chemistry with a focus on analytical problem solving.",
    order: 2,
  },
  {
    id: "school",
    degree: "Secondary Education",
    institution: "VVS High School",
    period: "2021",
    description: "Completed secondary schooling with distinction in mathematics and science.",
    order: 3,
  },
];

export function EducationSection({ items }: { items: Education[] }) {
  const activeItems =
    items &&
    items.length > 0 &&
    !items.some(
      (e) =>
        e.institution === "KIET Engineering College" ||
        e.institution === "Dr. KKR's Gowtham School",
    )
      ? items
      : DEFAULT_EDUCATION;

  return (
    <Section id="education" className="bg-bg-tertiary">
      <SectionHeading
        label="Academics"
        title="Education"
        description="Formal grounding in machine learning, mathematics and engineering."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {activeItems.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08}>
            <article className="lift h-full rounded-2xl border border-border bg-surface p-7 hover:border-primary">
              <div className="flex items-center justify-between">
                <GraduationCap className="size-7 text-primary" aria-hidden />
                <Pill tone="accent">{item.period}</Pill>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{item.institution}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">{item.degree}</p>
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
