import Link from "next/link";

export default function Philosophy() {
  const pillars = [
    {
      title: "Body",
      subtitle: "Discipline through movement",
      text: "Physical training keeps me consistent, resilient, and ready for difficult work.",
      link: "Athletics",
      href: "/athletics",
    },
    {
      title: "Mind",
      subtitle: "Curiosity through science",
      text: "Science, mathematics, and AI give me a way to explore hard questions with curiosity.",
      link: "Hobbies",
      href: "/hobbies",
    },
    {
      title: "Character",
      subtitle: "Stability through perspective",
      text: "Integrity, humility, and perseverance shape how I approach setbacks and collaboration.",
      link: "Attitude",
      href: "/attitude",
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

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          A strong body, a curious mind, and steady character create the foundation for meaningful work.
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

            <Link
              href={pillar.href}
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 transition hover:gap-3"
            >
              Explore {pillar.link} <span aria-hidden="true">→</span>
            </Link>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
