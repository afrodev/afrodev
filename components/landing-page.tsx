"use client";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100">
      {/* Hero — Issue #2: strong headline + slide 0, crowd/support vibe */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-16 pt-24 pb-20"
      >
        <p className="text-sm font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-4">
          AI software · Internet infrastructure · Impact
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1]">
          Afrodev — AI Software consultancy, Internet That Saves Lives
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
          We build agentic AI for Norwegian businesses at the speed of Silicon Valley,
          and reinvest in building internet across Africa. From villages to cities —
          we deploy networks that save lives and grow local economies.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-3 transition-colors"
          >
            Get in touch
          </a>
          <a
            href="#why-us"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium px-6 py-3 transition-colors"
          >
            Why us
          </a>
        </div>
      </section>
    </div>
  );
}
