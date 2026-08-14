import { Award, ExternalLink } from "lucide-react";

import { optimizedImage } from "@/lib/cloudinary";
import type { Certification } from "@/lib/types";

import { Reveal, Section, SectionHeading } from "./shared";

const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    id: "quizoff-2026",
    title: "QuizOff 2026: India's Biggest AI Quiz",
    issuer: "CampusCrew · Unstop",
    date: "2026",
    credentialUrl: "",
    description:
      "Participated in QuizOff 2026, India’s Biggest AI Quiz, competing among students from institutions across the globe.",
    order: 1,
  },
  {
    id: "ai-hackathon-2026",
    title: "AI Hackathon 2026",
    issuer: "X Factor",
    date: "2026",
    credentialUrl: "",
    description:
      "Successfully completed and actively participated in a 2-day AI Hackathon, building and deploying an AI-powered project using modern AI-assisted development platforms.",
    order: 2,
  },
  {
    id: "ai-skills-passport",
    title: "AI Skills Passport",
    issuer: "EY & Microsoft",
    date: "2026",
    credentialUrl: "",
    description:
      "Completed the AI Skills Passport course, covering AI concepts, technology applications, employability skills, and the impact of AI across business and technology.",
    order: 3,
  },
  {
    id: "ai-for-beginners",
    title: "AI for Beginners",
    issuer: "HP LIFE · HP Foundation",
    date: "2026",
    credentialUrl: "",
    description:
      "Completed the AI for Beginners course, gaining a foundational understanding of artificial intelligence, data, business applications, and AI ethics.",
    order: 4,
  },
];

export function CertificationsSection({ items }: { items: Certification[] }) {
  const activeItems =
    items &&
    items.length > 0 &&
    !items.some((c) => c.id === "cert-ds" || c.id === "cert-tf" || c.id === "cert-be10x")
      ? items
      : DEFAULT_CERTIFICATIONS;

  return (
    <Section id="certifications">
      <SectionHeading
        label="Credentials"
        title="Certifications"
        description="Programmes, hackathons and certifications that sharpened my technical skills."
      />

      <div className="mt-14 flex snap-x gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
        {activeItems.map((cert, i) => (
          <Reveal
            key={cert.id}
            delay={i * 0.07}
            className="min-w-[80%] snap-center sm:min-w-[55%] md:min-w-0"
          >
            <article className="lift flex h-full flex-col rounded-2xl border border-border border-l-4 border-l-primary bg-surface p-6 transition-all duration-200 hover:shadow-float">
              {cert.badgeImageUrl ? (
                <img
                  src={optimizedImage(cert.badgeImageUrl, 200)}
                  alt={`${cert.title} badge`}
                  loading="lazy"
                  className="size-12 rounded-lg object-cover"
                />
              ) : (
                <Award className="size-10 text-primary" aria-hidden />
              )}
              <h3 className="mt-4 text-base font-bold leading-snug">{cert.title}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">{cert.issuer}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{cert.date}</p>
              {cert.description ? (
                <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                  {cert.description}
                </p>
              ) : null}
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  View Certificate <ExternalLink className="size-3.5" aria-hidden />
                </a>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
