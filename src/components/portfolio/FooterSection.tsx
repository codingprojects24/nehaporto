import { ArrowUp, Github, Linkedin } from "lucide-react";

import { useMotivationalQuote } from "@/hooks/useMotivationalQuote";
import type { Profile } from "@/lib/types";

const LINKS = ["about", "skills", "projects", "experience", "education", "contact"];

export function FooterSection({ profile }: { profile: Profile }) {
  const quote = useMotivationalQuote();
  const socials = [
    { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { href: profile.github, Icon: Github, label: "GitHub" },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="font-display text-2xl font-extrabold">
              Neha<span className="text-primary">.</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
              {profile.tagline} — building web products with Generative AI at the core.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Quick Links</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-text-secondary">
              {LINKS.map((link) => (
                <li key={link}>
                  <a href={`#${link}`} className="capitalize transition-colors hover:text-primary">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Connect</h3>
            <div className="mt-4 flex gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-border-strong to-transparent" />

        <div className="flex flex-col items-center gap-6 text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} Neha satya sridevi vadige. {profile.footerQuotePrefix}
          </p>
          <p className="max-w-md text-center italic">
            {quote ? (
              <>
                “{quote.content}” — <span className="not-italic font-medium">{quote.author}</span>
              </>
            ) : (
              <span className="mx-auto block h-4 w-56 animate-pulse rounded bg-border" />
            )}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 transition-colors hover:border-primary hover:text-primary"
          >
            Back to Top <ArrowUp className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
