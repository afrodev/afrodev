"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function LandingSkeleton() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Top nav */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.span
            className="text-xl font-bold tracking-tight font-title"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.4 }}
          >
            Your Brand
          </motion.span>
          <nav className="flex items-center gap-6">
            <a href="#features" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#cta" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors">
              Get started
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight font-title lowercase"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            One line that says what you do
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A short supporting line. Replace with your value prop or tagline.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#cta"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-fuchsia text-white font-medium hover:opacity-90 transition-opacity"
            >
              Primary CTA
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Secondary
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features / sections placeholder */}
      <section id="features" className="py-24 px-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-bold tracking-tight font-title lowercase mb-12 text-center"
            initial={fadeUp.initial}
            whileInView={fadeUp.animate}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
          >
            Why us
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Feature one", desc: "Short description. Swap with real copy." },
              { title: "Feature two", desc: "Short description. Swap with real copy." },
              { title: "Feature three", desc: "Short description. Swap with real copy." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50"
                initial={fadeUp.initial}
                whileInView={fadeUp.animate}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <h3 className="font-semibold font-title lowercase mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24 px-6 bg-zinc-100 dark:bg-zinc-900/50">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <motion.h2
            className="text-2xl md:text-3xl font-bold tracking-tight font-title lowercase"
            initial={fadeUp.initial}
            whileInView={fadeUp.animate}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            className="text-zinc-600 dark:text-zinc-400"
            initial={fadeUp.initial}
            whileInView={fadeUp.animate}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            One more line of encouragement or next step.
          </motion.p>
          <motion.a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-fuchsia text-white font-medium hover:opacity-90 transition-opacity"
            initial={fadeUp.initial}
            whileInView={fadeUp.animate}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            CTA button
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-zinc-500">© {new Date().getFullYear()} Your Brand</span>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
