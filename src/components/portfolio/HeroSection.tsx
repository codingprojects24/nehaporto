import { ArrowDown, Github, Instagram, Linkedin, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import profileFallback from "@/assets/profile-fallback.jpg";
import { optimizedImage } from "@/lib/cloudinary";
import type { Profile } from "@/lib/types";

const ROLES = [
  "Web Application Builder",
  "Gen AI Full Stack Developer",
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
    const delay = done ? 2000 : cleared ? 200 : deleting ? 35 : 75;

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
    <span className="font-mono text-blue-600">
      {text}
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse bg-blue-600 align-middle" />
    </span>
  );
}

export function HeroSection({ profile }: { profile: Profile }) {
  const image = profile.profileImageUrl
    ? optimizedImage(profile.profileImageUrl, 900)
    : profileFallback;

  return (
    <section
      id="home"
      className="relative min-h-[75vh] overflow-hidden pt-10 pb-10 sm:pt-12 md:pt-14 md:pb-14"
    >
      {/* Subtle Dot Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1.2px, transparent 1.2px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Atmospheric Soft Gradient Blooms */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-20 size-[500px] rounded-full bg-blue-400/10 blur-[120px]" />
        <div className="absolute top-1/4 -right-20 size-[600px] rounded-full bg-indigo-400/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          {/* Left Column: Headlines & Call to Action */}
          <div>
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm"
            >
              <span aria-hidden="true">👋</span>
              <span>Hey there, I&apos;m</span>
            </motion.div>

            {/* Main Headline with dual-color name and orange dot */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-3.5"
            >
              <h1
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-[48px] font-extrabold tracking-tight text-slate-950 leading-[1.12]"
              >
                <span className="text-slate-950">Satya</span>
                <span className="text-blue-600">narayana</span>
                <br />
                <span className="text-slate-950">Chodisetti</span>
                <span className="text-orange-500 font-bold">.</span>
              </h1>
            </motion.div>

            {/* Typewriter Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-5 flex items-center gap-2 font-mono text-sm sm:text-base text-slate-600"
            >
              <Sparkles className="size-4 text-orange-400" />
              <span>I&apos;m a</span>
              <Typewriter />
            </motion.div>

            {/* Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600"
            >
              {profile.heroSubtext ||
                "I craft fast, intelligent and beautifully engineered products — blending modern web stacks with Generative AI to ship experiences that feel inevitable."}
            </motion.p>

            {/* Buttons & Socials Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              {/* Primary CTA */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 active:scale-95"
              >
                <span>View My Work</span>
                <ArrowDown className="size-4" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300/90 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition-all duration-150 hover:border-slate-400 hover:bg-white active:scale-95"
              >
                Get In Touch
              </a>

              {/* Social Buttons */}
              <div className="flex items-center gap-2">
                {[
                  { href: profile.github, Icon: Github, label: "GitHub" },
                  { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
                  { href: profile.instagram, Icon: Instagram, label: "Instagram" },
                ]
                  .filter((s) => s.href)
                  .map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-sm transition-all duration-150 hover:scale-110 hover:border-blue-500 hover:text-blue-600"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mx-auto flex w-full max-w-[290px] sm:max-w-[320px] lg:max-w-[340px] items-center justify-center"
          >
            {/* Curved dashed background line accent framing */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 sm:-inset-4 -rotate-3 rounded-[34px] sm:rounded-[40px] border-2 border-dashed border-blue-300/50"
            />

            {/* Portrait Image Card */}
            <div className="relative w-full overflow-hidden rounded-[26px] sm:rounded-[32px] border border-slate-200/80 bg-gradient-to-b from-slate-100 to-slate-200 shadow-xl">
              <img
                src={image}
                alt={profile.name}
                className="aspect-[4/4.5] w-full object-cover object-top"
              />

              {/* Status Pill Badge at bottom left */}
              <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1.5 text-[11px] font-bold text-slate-900 shadow-md backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span>Open to Opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlight Stats Row */}
        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {profile.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 text-center shadow-sm backdrop-blur-sm"
            >
              <p className="font-display text-3xl font-extrabold text-blue-600 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
