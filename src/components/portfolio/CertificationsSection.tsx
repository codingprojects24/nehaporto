import { Award, ExternalLink } from "lucide-react";

import { optimizedImage } from "@/lib/cloudinary";
import type { Certification } from "@/lib/types";

import { Reveal, Section, SectionHeading } from "./shared";

export function CertificationsSection({ items }: { items: Certification[] }) {
  return (
    <Section id="certifications">
      <SectionHeading
        label="Credentials"
        title="Certifications"
        description="Programmes and internships that sharpened the toolkit."
      />

      <div className="mt-14 flex snap-x gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
        {items.map((cert, i) => (
          <Reveal
            key={cert.id}
            delay={i * 0.07}
            className="min-w-[80%] snap-center sm:min-w-[55%] md:min-w-0"
          >
            <article className="h-full rounded-2xl border border-border border-l-4 border-l-primary bg-surface p-6 transition-all duration-200 hover:rotate-2 hover:shadow-float">
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
              <p className="mt-1 text-sm text-text-secondary">{cert.issuer}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{cert.date}</p>
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
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
