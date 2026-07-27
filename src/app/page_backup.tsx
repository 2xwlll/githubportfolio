"use client";

import { useEffect, useState } from "react";

type Card = { title: string; text: string; image?: string; label?: string };

const research: Card[] = [
  {
    title: "Little Red Dots & AGN",
    image: "/images/research/lrd.jpg",
    text:
      "Investigating the nature of JWST-discovered Little Red Dots using mid-infrared spectroscopy, ionization cones, and AGN feedback models."
  },
  {
    title: "AI for Astronomy",
    image: "/images/research/ai.jpg",
    text:
      "Developing machine learning tools for astronomical imaging, spectral analysis, and next-generation telescope pipelines."
  },
  {
    title: "Technosignature Searches",
    image: "/images/research/seti.jpg",
    text:
      "Applying signal-processing and machine learning methods to search for narrowband drifting signals in radio astronomy data."
  },
  {
    title: "JWST Mid-Infrared Science",
    image: "/images/research/jwst.jpg",
    text:
      "Studying dusty environments around active galaxies using JWST MIRI observations."
  }
];

const taglines = [
"I use AI to uncover hidden structures in astronomical data.",
"I study galaxies, exoplanets, and signals hidden in cosmic noise.",
"I combine astrophysics, machine learning, and instrumentation."
];

const initiatives: Card[] = [
  {
    title: "AI Identification of AGN Ionization Cones",
    label: "Machine Learning + JWST",
    text:
      "Developing deep learning models to identify ionization cones in active galactic nuclei using JWST and optical emission-line observations."
  },
  {
    title: "Little Red Dots & Active Galactic Nuclei",
    label: "JWST Mid-Infrared Astronomy",
    text:
      "Investigating the physical nature of JWST-discovered Little Red Dots through spectroscopy, dust modeling, and AGN feedback studies."
  },
  {
    title: "BLISS Technosignature Pipeline",
    label: "Breakthrough Listen",
    text:
      "Analyzing radio astronomy data with advanced signal-processing techniques to search for narrowband drifting extraterrestrial signals."
  },
];

const group: Card[] = [
  { title: "Ce Sui", image: "/images/group/ce-sui.webp", text: "The Ohio State University · CASPER Fellow" },
  { title: "Bill Yingtian Chen", image: "/images/group/bill-yingtian-chen.webp", text: "The Ohio State University · CCAPP Fellow" },
  { title: "Milan Pesta", image: "/images/group/milan-pesta.webp", text: "The Ohio State University" },
  { title: "Xiaosheng Zhao", image: "/images/group/xiaosheng-zhao.webp", text: "Johns Hopkins University" },
  { title: "Jiadong Li", image: "/images/group/jiadong-li.webp", text: "The Ohio State University" },
  { title: "Yuwei Yang", image: "/images/group/yuwei-yang.webp", text: "Australian National University" },
  { title: "Lucas Pinheiro", image: "/images/group/lucas-pinheiro.webp", text: "The Ohio State University" },
  { title: "Blaise Tayese", image: "/images/group/blaise-tayese.webp", text: "The Ohio State University" },
];

const columns: Card[] = [
  { title: "Is Superintelligence Really Coming?", image: "/images/Op-Ed_2026b_July_1020x770.png", text: "Sin Chew Daily" },
  { title: "Is AI a Bubble? Start With a Plate of Fried Rice", image: "/images/Op-Ed_2026_July_540x492.png", text: "Sin Chew Daily" },
  { title: "When AI Hallucinates, Who Actually Pays?", image: "/images/Op-Ed_2026b_June_708x724.png", text: "Sin Chew Daily" },
  { title: "AI Can Answer Questions, But It Cannot Ask Them for You", image: "/images/Op-Ed_2026_June_1292x1324.png", text: "Sin Chew Daily" },
  { title: "AI Has Entered the Second Half. Are You Ready?", image: "/images/Op-Ed_2026_May_2012x1590.png", text: "Sin Chew Daily" },
  { title: "Unpacking AI: Where Opportunity Meets Responsibility", image: "/images/Op-Ed_2023b_October_1440x1220.jpg", text: "Sin Chew Daily" },
];

const press: Card[] = [
  { title: "From Malaysia to the Stars: How AI Is Transforming Science", image: "/images/press/OSU_Scholar_Feature_2025.png", text: "Ohio State Scholar" },
  { title: "At Least One in a Dozen Stars Shows Evidence of Planetary Ingestion", image: "/images/Nature_2024_Publication.jpg", text: "Nature" },
  { title: "Planet Cannibalism is Common, Says Cosmic ‘Twin Study’", image: "/images/Nature_2024_The_Conversation.jpg", text: "The Conversation" },
  { title: "Don’t Panic, But A Lot of Stars Seem to Eat Their Own Planets", image: "/images/Nature_2024_Scientific_American.jpg", text: "Scientific American" },
];

const nav = ["About", "Research", "Initiatives", "Teaching", "Talks", "Group", "Outreach", "Resume", "Contact"];

function SectionTitle({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return <div className="mx-auto mb-12 max-w-3xl text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-indigo-400">{eyebrow ?? "Exploration"}</p><h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>{copy && <p className="mt-5 leading-relaxed text-slate-400">{copy}</p>}</div>;
}

function ImageGrid({ cards, compact = false }: { cards: Card[]; compact?: boolean }) {
  return <div className={`grid gap-6 sm:grid-cols-2 ${compact ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>{cards.map((card) => <article key={card.title} className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 transition hover:border-indigo-500/60 hover:bg-slate-900"><div className={compact ? "relative aspect-[4/3] overflow-hidden" : "relative aspect-[16/10] overflow-hidden"}>{card.image && <img src={card.image} alt={card.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}</div><div className="p-5"><p className="text-xs font-semibold uppercase tracking-wide text-indigo-400">{card.text}</p><h3 className="mt-2 text-base font-semibold leading-snug text-white transition group-hover:text-indigo-400">{card.title}</h3></div></article>)}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const taglines = ["I build statistical models to tell signal from noise.", "I use AI to rethink how science is done.", "I study the Milky Way, stars, and discovery."];
  const [tagline, setTagline] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setTagline((value) => (value + 1) % taglines.length), 3500); return () => window.clearInterval(timer); }, [taglines.length]);
  return <main className="overflow-hidden bg-slate-950 text-slate-100">
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-slate-950/20 backdrop-blur-sm"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><a className="text-xl font-semibold tracking-tight text-indigo-400" href="#top">Yuan-Sen Ting（丁源森）</a><div className="hidden items-center gap-8 md:flex">{nav.map((item) => <a key={item} className="text-sm font-medium text-slate-300 transition hover:text-indigo-400" href={`#${item.toLowerCase()}`}>{item}</a>)}</div><button onClick={() => setMenuOpen(!menuOpen)} className="rounded-md p-2 text-white md:hidden" aria-label="Toggle menu"><span className="text-2xl">☰</span></button></div>{menuOpen && <div className="border-t border-slate-800 bg-slate-950 px-6 py-5 md:hidden">{nav.map((item) => <a onClick={() => setMenuOpen(false)} key={item} href={`#${item.toLowerCase()}`} className="block py-2 text-sm text-slate-300">{item}</a>)}</div>}</nav>
    <section id="top" className="relative flex min-h-screen items-center justify-center"><img src="/images/generated/hero-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-slate-950/45" /><div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950" /><div className="relative z-10 mx-auto max-w-4xl px-6 pt-20 text-center"><img src="/images/Profile_Yuan-Sen_Ting.jpg" alt="Yuan-Sen Ting" className="mx-auto mb-8 h-32 w-32 rounded-full border-4 border-white/20 object-cover object-[center_20%] shadow-2xl" /><h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">Yuan-Sen Ting</h1><p className="mt-5 min-h-14 text-xl font-light text-indigo-300 md:text-2xl">{taglines[tagline]}</p><p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">Science stands at an inflection point—AI is rewriting the rules faster than consensus can form. Our work bridges rigorous statistical foundations with the pulse of the AI frontier.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><a className="rounded-full bg-indigo-600 px-7 py-4 font-semibold text-white transition hover:bg-indigo-500" href="#about">Learn More</a><a className="rounded-full border border-slate-500 px-7 py-4 font-semibold text-white transition hover:border-indigo-400" href="#resume">Download CV</a><a className="rounded-full border border-slate-500 px-7 py-4 font-semibold text-white transition hover:border-indigo-400" href="#research">Publications & AI Guides</a></div></div></section>
    <section id="about" className="bg-slate-900 py-24"><div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_.9fr]"><div><p className="text-xs font-bold uppercase tracking-[.28em] text-indigo-400">About</p><h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">Short Bio</h2><div className="mt-7 space-y-5 leading-relaxed text-slate-300"><p>I am an Associate Professor of Astronomy at The Ohio State University. My research sits at the intersection of astrophysics, machine learning, and statistical inference.</p><p>I build methods that turn massive astronomical surveys into physical understanding, from precision stellar spectroscopy and galactic archaeology to agentic AI systems for scientific discovery.</p><p>My group is interested in both what artificial intelligence can discover and what it means for scientific reasoning when AI becomes a participant in the process.</p></div></div><div className="grid grid-cols-2 gap-4">{[["Ohio State", "Associate Professor"], ["AI + Astronomy", "Research frontier"], ["Harvard", "PhD"], ["Malaysia", "Born & raised"]].map(([top, bottom]) => <div key={top} className="rounded-2xl border border-slate-700 bg-slate-800/70 p-6"><p className="text-lg font-bold text-white">{top}</p><p className="mt-2 text-sm text-slate-400">{bottom}</p></div>)}</div></div></section>
    <section id="research" className="py-24"><div className="mx-auto max-w-6xl px-6"><SectionTitle eyebrow="Research" title="Research Goals" copy="Building scientific understanding at the boundary of data, physics, and AI." /><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{research.map((card) => <article key={card.title} className="group relative min-h-80 overflow-hidden rounded-2xl border border-slate-800"><img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/10" /><div className="relative flex min-h-80 flex-col justify-end p-6"><h3 className="text-lg font-bold text-white">{card.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-300">{card.text}</p><span className="mt-5 text-sm font-semibold text-indigo-400">Explore →</span></div></article>)}</div></div></section>
    <section className="border-y border-slate-800 bg-slate-900 py-24"><div className="mx-auto max-w-6xl px-6"><SectionTitle eyebrow="Selected work" title="Annotated Paper Highlights" copy="An ongoing experiment: making selected papers more accessible with carefully developed AI annotations." /><div className="grid overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 md:grid-cols-2"><img src="/images/papers/saad-ting-2026-wide-binaries-gravity-first-page.jpg" alt="Annotated paper first page" className="h-full max-h-[540px] w-full object-cover object-top" /><div className="flex flex-col justify-center p-8 md:p-12"><p className="text-sm font-semibold text-indigo-400">2026 · Wide binaries</p><h3 className="mt-3 text-2xl font-bold text-white">Gravitational Anomaly Measurement in Wide Binaries is Sensitive to Orbital Modeling</h3><p className="mt-5 leading-relaxed text-slate-400">A guided reading experience for a paper on robust orbital modeling and tests of gravity using wide stellar binaries.</p><button className="mt-7 w-fit rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold">Read annotations</button></div></div></div></section>
    <section id="initiatives" className="py-24"><div className="mx-auto max-w-6xl px-6"><SectionTitle title="Frontier Collaborations" copy="Public research platforms and collaborations spanning AI-for-science, scientific reasoning, and precision stellar astrophysics." /><div className="grid gap-6 md:grid-cols-3">{initiatives.map((card) => <article key={card.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-7"><p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">{card.label}</p><h3 className="mt-4 text-2xl font-bold text-white">{card.title}</h3><p className="mt-4 text-sm leading-relaxed text-slate-400">{card.text}</p><span className="mt-6 block font-semibold text-indigo-400">Visit project →</span></article>)}</div></div></section>
    <section className="bg-slate-900 py-24"><div className="mx-auto max-w-6xl px-6"><SectionTitle eyebrow="Experiment" title="The Severed Floor" copy="A playful, deployed exploration of multi-agent scientific discourse, epistemic identity, and the daily arXiv." /><div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-800"><img className="w-full" src="/images/previews/severed-floor-mobile-preview.png" alt="The Severed Floor preview" /><div className="p-6 text-center"><p className="font-semibold text-white">The Severed Floor</p><p className="mt-2 text-sm text-slate-400">AI agents discussing the daily arXiv in a pixel-art simulation.</p></div></div></div></section>
    <section id="teaching" className="relative py-24"><img src="/images/generated/bg-teaching.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" /><div className="relative mx-auto max-w-6xl px-6"><SectionTitle eyebrow="Teaching" title="Teaching & Textbooks" copy="Data analysis and machine learning, from introductory coding to statistical inference and AI research agents." /><div className="grid gap-5 md:grid-cols-2">{["Statistical Machine Learning for Astronomy", "Deep Learning for Astrophysics", "Coding Essentials for Astronomers", "LLMs as Agents"].map((title) => <article className="rounded-xl border border-slate-700 bg-slate-900/80 p-6" key={title}><h3 className="text-xl font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-400">A hands-on, research-grounded learning experience for scientists working with modern data and artificial intelligence.</p><span className="mt-5 block text-sm font-semibold text-indigo-400">Explore course →</span></article>)}</div></div></section>
    <section id="talks" className="bg-slate-900 py-24"><div className="mx-auto max-w-6xl px-6"><SectionTitle eyebrow="Ideas in public" title="Recent Talks" copy="Research colloquia and public lectures on agentic AI, astronomy, and why fundamental science matters." /><div className="grid gap-6 md:grid-cols-2">{["Expediting Astronomical Discovery with AI Agents", "The Usefulness of the Useless (无用之用)"].map((title, index) => <article key={title} className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-indigo-500/20 text-3xl text-indigo-300">▶</div><h3 className="mt-6 text-lg font-semibold text-indigo-400">{title}</h3><p className="mt-4 text-sm text-slate-400">{index === 0 ? "A research colloquium on AI agents for astronomical discovery." : "A public lecture on science, culture, and the future of AI."}</p></article>)}</div></div></section>
    <section id="group" className="py-24"><div className="mx-auto max-w-6xl px-6"><SectionTitle eyebrow="People" title="Research Group" copy="Students, fellows, and collaborators pursuing a more precise and more capable astronomy." /><ImageGrid cards={group} compact /></div></section>
    <section id="outreach" className="relative bg-slate-900 py-24"><img src="/images/generated/bg-outreach-cosmic.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" /><div className="relative mx-auto max-w-6xl px-6"><SectionTitle eyebrow="Public engagement" title="Sharing Science" copy="Educational animations, podcasts, and public talks making science accessible to communities around the world." /><div className="grid gap-5 md:grid-cols-3">{[["Educational Animation", "How do we study the stars? · 0.9M views"], ["Podcasts", "TEDx 启动一刻 Podcast · OSU Voices of Excellence"], ["Public Talks", "Seeing Humanity through Dystopian AI · How Is AI Changing Science?"]].map(([title, text]) => <article key={title} className="rounded-2xl border border-slate-700 bg-slate-950/75 p-7"><h3 className="text-xl font-bold text-white">{title}</h3><p className="mt-4 text-sm leading-relaxed text-slate-400">{text}</p></article>)}</div></div></section>
    <section id="columns" className="py-24"><div className="mx-auto max-w-6xl px-6"><SectionTitle eyebrow="Writing" title="Columns" copy="Monthly columns for Sin Chew Daily exploring science, AI, and their broader implications." /><ImageGrid cards={columns} /></div></section>
    <section id="press" className="bg-slate-900 py-24"><div className="mx-auto max-w-6xl px-6"><SectionTitle eyebrow="In the news" title="Press Coverage" copy="Selected media coverage and interviews, including features in Nature, Scientific American, and international press." /><ImageGrid cards={press} compact /></div></section>
    <section id="resume" className="py-24"><div className="mx-auto max-w-4xl px-6"><SectionTitle eyebrow="Career" title="Resume" /><div className="grid gap-8 md:grid-cols-2"><div><h3 className="mb-5 text-xl font-semibold text-white">Professional Appointments</h3><div className="space-y-4 border-l border-indigo-500/50 pl-5 text-sm text-slate-400"><p><strong className="block text-white">Associate Professor of Astronomy</strong>The Ohio State University</p><p><strong className="block text-white">Research Fellow</strong>Center for Cosmology and AstroParticle Physics</p></div></div><div><h3 className="mb-5 text-xl font-semibold text-white">Education</h3><div className="space-y-4 border-l border-indigo-500/50 pl-5 text-sm text-slate-400"><p><strong className="block text-white">Ph.D., Astronomy</strong>Harvard University</p><p><strong className="block text-white">B.Sc., Physics</strong>University of Melbourne</p></div></div></div></div></section>
    <section id="contact" className="relative overflow-hidden py-40"><img src="/images/Contact_Background.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-slate-950/75" /><div className="relative mx-auto max-w-3xl px-6 text-center"><p className="text-xs font-bold uppercase tracking-[.28em] text-indigo-400">Get in touch</p><h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">Contact</h2><p className="mt-6 text-lg leading-relaxed text-slate-300">For research inquiries, speaking engagements, and collaborations, please reach out.</p><a href="mailto:ting.74@osu.edu" className="mt-8 inline-block rounded-full bg-indigo-600 px-7 py-4 font-semibold text-white transition hover:bg-indigo-500">ting.74@osu.edu</a><div className="mt-8 flex justify-center gap-5 text-sm font-semibold text-slate-300"><a href="https://github.com/tingyuansen">GitHub</a><a href="https://www.linkedin.com/in/ting-astro">LinkedIn</a><a href="https://twitter.com/TingAstro">X / Twitter</a></div></div></section>
    <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-500">© 2026 Yuan-Sen Ting. All rights reserved.</footer><button className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-violet-500 px-4 py-3 text-sm font-medium text-white shadow-2xl shadow-violet-500/30 transition hover:bg-violet-400 sm:bottom-6 sm:right-6" aria-label="Open voice chat about Yuan-Sen"><span>♩</span><span className="hidden sm:inline">Chat with AI about me</span></button>
  </main>;
}
