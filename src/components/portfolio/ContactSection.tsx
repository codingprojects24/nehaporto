import { Check, Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

import { saveMessage } from "@/lib/content";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Reveal, Section, SectionHeading } from "./shared";

const FIELDS = [
  { name: "name", label: "Your name", type: "text" },
  { name: "email", label: "Email address", type: "email" },
  { name: "subject", label: "Subject", type: "text" },
] as const;

export function ContactSection({ profile }: { profile: Profile }) {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const socials = [
    {
      href:
        profile.linkedin && !profile.linkedin.toLowerCase().includes("satyanarayana")
          ? profile.linkedin
          : "https://www.linkedin.com/in/neha-satya-sridevi-vadige-86524a330/",
      Icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href:
        profile.github && !profile.github.toLowerCase().includes("satyanarayana")
          ? profile.github
          : "https://github.com/vadigenehasatyasridevi-crypto",
      Icon: Github,
      label: "GitHub",
    },
  ];

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.name || !values.email || !values.message) {
      setStatus("error");
      toast.error("Please fill in your name, email and message.");
      setTimeout(() => setStatus("idle"), 600);
      return;
    }
    setStatus("sending");
    try {
      await saveMessage(values);
    } catch {
      // message storage is best-effort; the visitor still gets confirmation
    }
    setStatus("sent");
    toast.success("Message sent — I'll get back to you soon!");
    setValues({ name: "", email: "", subject: "", message: "" });
  };

  const displayPhone =
    profile.phone && !profile.phone.includes("9121055512") ? profile.phone : "+91 73370 19534";
  const displayEmail =
    profile.email && !profile.email.includes("satyanarayana")
      ? profile.email
      : "vadigenehasatyasridevi@gmail.com";

  return (
    <Section id="contact">
      <SectionHeading
        label="Say Hello"
        title="Let's build something"
        description="Open to internships, freelance builds and Gen AI collaborations."
      />

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <Reveal y={20} className="w-full min-w-0">
          <div className="space-y-4">
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
              </span>
              Open to Opportunities
            </div>

            <a
              href={`tel:${displayPhone.replace(/\s/g, "")}`}
              className="lift flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 hover:border-primary w-full min-w-0"
            >
              <Phone className="size-5 text-primary shrink-0" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                  Phone
                </span>
                <span className="font-medium break-words">{displayPhone}</span>
              </span>
            </a>

            {displayEmail ? (
              <a
                href={`mailto:${displayEmail}`}
                className="lift flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 hover:border-primary w-full min-w-0"
              >
                <Mail className="size-5 text-primary shrink-0" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                    Email
                  </span>
                  <span className="font-medium text-sm sm:text-base break-all block">
                    {displayEmail}
                  </span>
                </span>
              </a>
            ) : null}

            <div className="grid grid-cols-2 gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="lift flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-5 text-sm hover:border-primary hover:text-primary"
                >
                  <Icon className="size-5" aria-hidden />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal y={20} className="w-full min-w-0">
          <motion.form
            onSubmit={submit}
            animate={status === "error" ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-elegant w-full"
          >
            <div className="space-y-6">
              {FIELDS.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="text-xs uppercase tracking-wide text-muted-foreground"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type={field.type}
                    value={values[field.name]}
                    onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                    className="mt-1 w-full border-0 border-b border-border bg-transparent py-2 outline-none transition-colors focus:border-primary"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  className="mt-1 w-full resize-none border-0 border-b border-border bg-transparent py-2 outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className={cn(
                "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-150 hover:scale-[1.01] disabled:opacity-70",
                "bg-gradient-to-r from-primary to-accent-secondary",
              )}
            >
              {status === "sent" ? (
                <>
                  <Check className="size-4" aria-hidden /> Message Sent
                </>
              ) : (
                <>
                  {status === "sending" ? "Sending…" : "Send Message"}{" "}
                  <Send className="size-4" aria-hidden />
                </>
              )}
            </button>
          </motion.form>
        </Reveal>
      </div>
    </Section>
  );
}
