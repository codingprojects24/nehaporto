import { ArrowDown, Github, Linkedin, Sparkles } from "lucide-react";
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
      className="relative min-h-[85vh] w-full overflow-hidden pt-20 pb-16 sm:pt-24 md:pt-28 md:pb-20"
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

      {/* Atmospheric Soft Ambient Gradient Blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-20 size-[400px] sm:size-[500px] rounded-full bg-blue-600/14 blur-[100px] sm:blur-[120px]" />
        <div className="absolute top-1/4 -right-20 size-[450px] sm:size-[600px] rounded-full bg-rose-500/12 blur-[120px] sm:blur-[140px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          {/* Left Column: Headlines & Call to Action */}
          <div className="w-full min-w-0">
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm"
            >
              <span aria-hidden="true">👋</span>
              <span>Hey there, I&apos;m</span>
            </motion.div>

            {/* Main Headline with dual-color name and orange dot */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-4"
            >
              <h1
                style={{ fontFamily: "'Poppins', sans-serif" }}
                className="text-[42px] sm:text-[54px] md:text-[62px] lg:text-[68px] font-extrabold tracking-tight text-slate-950 leading-[1.1] break-words"
              >
                <span className="text-slate-950">Neha</span>{" "}
                <span className="text-blue-600">satya</span>
                <br />
                <span className="text-slate-950">sridevi vadige</span>
                <span className="text-orange-500 font-bold">.</span>
              </h1>
            </motion.div>

            {/* Typewriter Line - Stacked on mobile, inline on desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-6 flex flex-col items-start gap-1 font-mono text-[17px] text-slate-700 sm:flex-row sm:items-center sm:gap-2.5 sm:text-lg"
            >
              <div className="flex items-center gap-2 shrink-0">
                <Sparkles className="size-5 text-orange-400" />
                <span>I&apos;m a</span>
              </div>
              <div className="pl-7 sm:pl-0">
                <Typewriter />
              </div>
            </motion.div>

            {/* Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-slate-600 sm:text-lg"
            >
              {profile.heroSubtext ||
                "I craft fast, intelligent and beautifully engineered products — blending modern web stacks with Generative AI to ship experiences that feel inevitable."}
            </motion.p>

            {/* Buttons & Socials Row - Stacked on mobile, single row on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-8 flex flex-col items-start gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5"
            >
              {/* CTAs - Side-by-side on mobile, inline on desktop */}
              <div className="flex w-full items-center gap-2.5 sm:w-auto sm:gap-3.5">
                {/* Primary CTA */}
                <a
                  href="#projects"
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-blue-600 px-4.5 py-3.5 sm:px-7 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-md shadow-blue-500/25 transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 active:scale-95 whitespace-nowrap"
                >
                  <span>View My Work</span>
                  <ArrowDown className="size-3.5 sm:size-4" />
                </a>

                {/* Secondary CTA */}
                <a
                  href="#contact"
                  className="inline-flex flex-1 sm:flex-none items-center justify-center rounded-full border border-slate-300/90 bg-white/90 px-4.5 py-3.5 sm:px-7 sm:py-3.5 text-sm sm:text-base font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition-all duration-150 hover:border-slate-400 hover:bg-white active:scale-95 whitespace-nowrap"
                >
                  Get In Touch
                </a>
              </div>

              {/* Social Buttons - Below on mobile, same row on desktop */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {[
                  {
                    href:
                      profile.github && !profile.github.toLowerCase().includes("satyanarayana")
                        ? profile.github
                        : "https://github.com/vadigenehasatyasridevi-crypto",
                    Icon: Github,
                    label: "GitHub",
                  },
                  {
                    href:
                      profile.linkedin && !profile.linkedin.toLowerCase().includes("satyanarayana")
                        ? profile.linkedin
                        : "https://www.linkedin.com/in/neha-satya-sridevi-vadige-86524a330/",
                    Icon: Linkedin,
                    label: "LinkedIn",
                  },
                ]
                  .filter((s) => s.href)
                  .map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="inline-flex size-9 sm:size-12 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-sm transition-all duration-150 hover:scale-110 hover:border-blue-500 hover:text-blue-600"
                    >
                      <Icon className="size-4 sm:size-5" />
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
          {(profile.stats &&
            profile.stats.length > 0 &&
            !profile.stats.some(
              (s) =>
                s.value === "1+" ||
                s.value === "5+" ||
                s.label?.toLowerCase().includes("year of experience"),
            )
            ? profile.stats
            : [
              { value: "6+", label: "Months of Experience" },
              { value: "2+", label: "Projects Built" },
              { value: "∞", label: "Always Improving" },
              { value: "100%", label: "Dedication" },
            ]
          ).map((stat, i) => (
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
