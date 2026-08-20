import Link from "next/link";

export default function Philosophy() {
  const pillars = [
    {
      title: "Body",
      subtitle: "Sprinting and coaching",
      text: "I analyze each stride, adjust what is inefficient, and repeat. That habit shapes how I train and how I conduct research.",
      link: "Athletics",
      href: "/athletics",
      image: "/images/athletics/bolt-svgrepo-com.svg",
    },
    {
      title: "Mind",
      subtitle: "Questions and experiments",
      text: "I like learning how a system works, changing one part, and measuring what happens. That applies to astronomy, games, code, and nutrition.",
      link: "Hobbies",
      href: "/hobbies",
      image: "/images/hobbies/card-game-svgrepo-com.svg",
    },
    {
      title: "Character",
      subtitle: "Work, evidence, and people",
      text: "I try to state what I know, admit what I do not, and remain useful to the people around me while we find an answer.",
      link: "Attitude",
      href: "/attitude",
      image: "/images/attitude/attitude-negative-perspective-svgrepo-com.svg",
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
          How I approach my work
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Research is one part of my life. Sprinting teaches me to improve deliberately, curiosity gives me problems to pursue, and coaching reminds me that knowledge matters more when it can be shared.
        </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="motion-card rounded-3xl border border-white/10 bg-slate-900/70 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-300"
          >
            <div className="flex items-start justify-between gap-5">
              <h3 className="text-2xl font-extrabold tracking-tight text-white">
                {pillar.title}
              </h3>
              <span className="floating-icon grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                <img src={pillar.image} alt="" className="h-6 w-6 opacity-85 invert" />
              </span>
            </div>

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
