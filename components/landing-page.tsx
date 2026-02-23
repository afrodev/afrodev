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

      {/* Services — Issue #3 */}
      <section
        id="services"
        className="py-24 px-6 sm:px-10 md:px-16 border-t border-zinc-200 dark:border-zinc-800"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          What we do
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mb-16">
          We build AI software for Norwegian businesses. Agentic orchestration, SaaS, and Silicon Valley–grade workflows — so your product is smarter, your users get a seamless experience, and your data works for you.
        </p>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 bg-zinc-50/50 dark:bg-zinc-900/30">
            <h3 className="font-semibold text-lg mb-2">Agentic AI & orchestration</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              We use agentic workflows to make your software more efficient and user-focused. From automation to intelligent assistants — built for real business outcomes.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 bg-zinc-50/50 dark:bg-zinc-900/30">
            <h3 className="font-semibold text-lg mb-2">Software as a service</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              End-to-end SaaS: design, build, deploy, and iterate. We track usage and data so you can predict user needs and scale with confidence.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 bg-zinc-50/50 dark:bg-zinc-900/30 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-lg mb-2">Norway-first, impact-next</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              We serve Norwegian companies first. Revenue from that work funds internet and infrastructure in Africa — so our expertise and capital compound where they’re needed most.
            </p>
          </div>
        </div>
      </section>

      {/* What are we doing with the money? — Issue #4 */}
      <section
        id="what-we-do-with-the-money"
        className="py-24 px-6 sm:px-10 md:px-16 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          What are we doing with the money?
        </h2>
        <div className="max-w-2xl space-y-4 text-zinc-600 dark:text-zinc-400 text-lg">
          <p>
            We build AI software for Norwegian companies. That revenue doesn’t sit in a vault — it funds the next phase.
          </p>
          <p>
            We reinvest into building internet in Congo and across Africa: villages, cities, microgrids, and education on the ground so people can grow their economies and businesses.
          </p>
          <p>
            Our network uses a cross-subsidizing model so locals can afford it while we stay profitable. The goal: save lives, promote education, build schools, and boost local business. From Norway to Africa, and back.
          </p>
        </div>
      </section>
    </div>
  );
}
