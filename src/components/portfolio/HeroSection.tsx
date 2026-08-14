import { ArrowRight, Github, Instagram, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import profileFallback from "@/assets/profile-fallback.jpg";
import { optimizedImage } from "@/lib/cloudinary";
import type { Profile } from "@/lib/types";

const ROLES = [
  "Gen AI Full Stack Developer",
  "Web Application Builder",
  "AI Integration Specialist",
];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[index % ROLES.length]!;
    const done = !deleting && text === full;
    const cleared = deleting && text === "";
    const delay = done ? 1600 : cleared ? 200 : deleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (done) return setDeleting(true);
      if (cleared) {
        setDeleting(false);
        setIndex((i) => i + 1);
        return;
      }
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span className="font-display text-primary">
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-0.5 animate-pulse bg-primary align-middle" />
    </span>
  );
}

function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="animate-blob absolute -left-24 top-24 size-80 rounded-full bg-primary/20 blur-[80px]" />
      <span
        className="animate-blob absolute right-0 top-0 size-96 rounded-full bg-accent-warm/15 blur-[90px]"
        style={{ animationDelay: "2s" }}
      />
      <span
        className="animate-blob absolute bottom-0 left-1/3 size-72 rounded-full bg-accent-secondary/25 blur-[80px]"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}

export function HeroSection({ profile }: { profile: Profile }) {
  const image = profile.profileImageUrl
    ? optimizedImage(profile.profileImageUrl, 900)
    : profileFallback;

  return (
    <section id="home" className="hero-mesh relative overflow-hidden pb-16 pt-32 md:pt-40">
      <Blobs />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 md:grid-cols-[3fr_2fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-text-secondary shadow-elegant"
            >
              <span aria-hidden>👋</span> Hey there, I&apos;m
            </motion.p>

            <h1 className="mt-5 text-[clamp(2.6rem,7vw,5rem)] font-extrabold leading-[1.02]">
              {profile.name.split(" ").map((word, i) => (
                <motion.span
                  key={word}
                  className="mr-4 inline-block"
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.7 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 text-xl font-medium sm:text-2xl"
            >
              <Typewriter />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary"
            >
              {profile.heroSubtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform duration-150 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                View My Work <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                Get In Touch
              </a>
            </motion.div>

            <div className="mt-8 flex gap-3">
              {[
                { href: profile.github, Icon: Github, label: "GitHub" },
                { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: profile.instagram, Icon: Instagram, label: "Instagram" },
              ]
                .filter((s) => s.href)
                .map(({ href, Icon, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + i * 0.1 }}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-all duration-150 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="size-5" aria-hidden />
                  </motion.a>
                ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <span
              aria-hidden
              className="absolute -inset-6 rounded-full bg-bg-tertiary"
              style={{ filter: "blur(2px)" }}
            />
            <span
              aria-hidden
              className="animate-slow-spin absolute -inset-3 rounded-[2rem] border-2 border-dashed border-border-strong"
            />
            <img
              src={image}
              alt={`${profile.name} — ${profile.tagline}`}
              width={1024}
              height={1024}
              className="relative aspect-square w-full rotate-2 rounded-[1.75rem] object-cover shadow-float"
            />
            <div className="glass absolute -bottom-5 -left-4 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
              </span>
              Available for Opportunities
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {profile.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <p className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
