export default function Philosophy() {
  const pillars = [
    {
      title: "💪 Body",
      subtitle: "Discipline through movement",
      text: "Physical training teaches consistency, resilience, and deliberate practice. Sprinting reminds me that meaningful progress comes from patient repetition, intelligent recovery, and continuous refinement rather than shortcuts.",
    },
    {
      title: "🧠 Mind",
      subtitle: "Curiosity through science",
      text: "Astrophysics, mathematics, and artificial intelligence are how I explore the universe. I enjoy asking difficult questions, building computational tools, and applying critical thinking to uncover patterns hidden within complex data.",
    },
    {
      title: "❤️ Character",
      subtitle: "Stability through perspective",
      text: "Scientific discovery is rarely straightforward. I strive to approach challenges with humility, emotional stability, integrity, and perseverance, believing that good character is just as important as technical ability.",
    },
  ];

  return (
    <section
      id="philosophy"
      className="relative isolate overflow-hidden border-y border-white/10 bg-slate-950 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_88%_18%,rgba(34,211,238,.13),transparent_28%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-4xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
          Philosophy
        </p>

        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Three Pillars
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          I believe meaningful scientific work is built on more than technical
          ability alone. My approach to research—and life—is grounded in three
          complementary disciplines that continually strengthen one another.
        </p>

        <p className="mt-5 leading-8 text-slate-400">
          A healthy <span className="font-semibold text-white">body</span>
          provides the energy and resilience to perform at a high level. A
          disciplined <span className="font-semibold text-white">mind</span>
          develops the curiosity and critical thinking needed for discovery.
          Strong <span className="font-semibold text-white">character</span>
          provides the emotional stability and integrity to navigate setbacks,
          collaborate with others, and pursue long-term goals with purpose.
        </p>

        <p className="mt-5 leading-8 text-slate-400">
          I don't view these as separate pursuits. Progress in one strengthens
          the others, creating a more thoughtful scientist, a better teammate,
          and a more resilient person.
        </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 transition duration-300 hover:-translate-y-1 hover:border-cyan-300"
          >
            <h3 className="text-2xl font-extrabold tracking-tight text-white">
              {pillar.title}
            </h3>

            <p className="mt-2 text-cyan-400 font-medium">
              {pillar.subtitle}
            </p>

            <p className="mt-6 leading-8 text-slate-400">
              {pillar.text}
            </p>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
