import { useEffect, useState } from "react";

export type Quote = { content: string; author: string };

const FALLBACK: Quote = {
  content: "The best way to predict the future is to build it.",
  author: "Alan Kay",
};

export function useMotivationalQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("https://api.quotable.io/random?tags=technology,inspirational");
        if (!res.ok) throw new Error("quote fetch failed");
        const data = (await res.json()) as { content?: string; author?: string };
        if (active && data.content) {
          setQuote({ content: data.content, author: data.author ?? "Unknown" });
          return;
        }
        throw new Error("empty quote");
      } catch {
        try {
          const res = await fetch("https://zenquotes.io/api/random");
          const data = (await res.json()) as Array<{ q?: string; a?: string }>;
          if (active && data?.[0]?.q) {
            setQuote({ content: data[0].q, author: data[0].a ?? "Unknown" });
            return;
          }
          throw new Error("empty quote");
        } catch {
          if (active) setQuote(FALLBACK);
        }
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, []);

  return quote;
}
