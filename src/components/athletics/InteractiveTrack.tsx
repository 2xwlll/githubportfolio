"use client";

import { useState } from "react";
import { bestResult, formatMark, trackEventIds, trackEvents, type TrackEventId } from "@/lib/athletics";

const positions: Record<TrackEventId, { left: string; top: string; label: string; description: string; path?: string }> = {
  "100m": { left: "48%", top: "82%", label: "100m", description: "Down the home straight.", path: "M220 335 H580" },
  "200m": { left: "14%", top: "34%", label: "200m", description: "A bend, then the home straight.", path: "M220 105 A115 115 0 0 0 220 335 H580" },
  "400m": { left: "87%", top: "48%", label: "400m", description: "One full lap of the track.", path: "M580 335 A115 115 0 0 0 580 105 H220 A115 115 0 0 0 220 335 H580" },
  "long-jump": { left: "38%", top: "48%", label: "Long jump", description: "A sprint down the runway, a takeoff, and a landing in the sand." },
  "triple-jump": { left: "65%", top: "48%", label: "Triple jump", description: "Hop, step, jump. Three phases into the sandpit." },
};

function resultDate(date: string) {
  const parsed = new Date(`${date}T12:00:00Z`);
  return Number.isNaN(parsed.valueOf()) ? date : parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function InteractiveTrack() {
  const [activeId, setActiveId] = useState<TrackEventId>("100m");
  const active = trackEvents[activeId];
  const result = bestResult(active);

  return (
    <section id="track" aria-labelledby="track-heading" className="mt-14 scroll-mt-24 overflow-hidden rounded-3xl border border-cyan-200/20 bg-slate-900/70">
      <div className="px-5 pt-7 sm:px-8 sm:pt-8">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Track &amp; field</p>
        <h2 id="track-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-white">A lap around my events.</h2>
        <p className="mt-4 leading-7 text-slate-400">Hover over an event to explore my marks. You can also tap or use Tab to move around the track.</p>
      </div>

      <div className="relative mx-2 mt-5 sm:mx-4">
        <svg viewBox="0 0 800 460" className="block h-auto w-full" aria-hidden="true">
          <defs>
            <pattern id="track-sand" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="1" fill="#8a663c" opacity=".4" /><circle cx="9" cy="8" r=".7" fill="#8a663c" opacity=".3" /></pattern>
            <pattern id="track-finish" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#e2e8f0" /><path d="M0 0h6v6H0zM6 6h6v6H6z" fill="#0f172a" /></pattern>
          </defs>
          <rect x="44" y="44" width="712" height="352" rx="176" fill="#020617" />
          <rect x="50" y="50" width="700" height="340" rx="170" fill="#985549" />
          {[0, 1, 2, 3, 4, 5, 6].map((lane) => <rect key={lane} x={50 + lane * 10} y={50 + lane * 10} width={700 - lane * 20} height={340 - lane * 20} rx={170 - lane * 10} fill="none" stroke="#fbe4d5" strokeWidth="1.5" opacity=".65" />)}
          <rect x="120" y="120" width="560" height="200" rx="100" fill="#153c36" />
          <rect x="132" y="132" width="536" height="176" rx="88" fill="none" stroke="#6ee7b7" strokeDasharray="4 8" opacity=".15" />
          {[{ id: "long-jump", x: 248 }, { id: "triple-jump", x: 460 }].map((pit) => <g key={pit.id}>
            <rect x={pit.x} y="174" width="13" height="102" rx="3" fill={activeId === pit.id ? "#67e8f9" : "#6b8d80"} />
            <rect x={pit.x - 22} y="267" width="57" height="36" rx="4" fill={activeId === pit.id ? "#fde68a" : "#bfa77c"} />
            <rect x={pit.x - 22} y="267" width="57" height="36" rx="4" fill="url(#track-sand)" />
            <path d={`M${pit.x - 4} 257h21`} stroke="white" strokeWidth="4" />
          </g>)}
          <rect x="582" y="324" width="12" height="66" fill="url(#track-finish)" />
          <text x="620" y="418" textAnchor="middle" fill="#94a3b8" fontSize="15" letterSpacing="2">FINISH</text>
          {positions[activeId].path && <path d={positions[activeId].path} fill="none" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" />}
          {positions[activeId].path && <circle cx="580" cy="335" r="7" fill="#ecfeff" stroke="#22d3ee" strokeWidth="3" />}
        </svg>
        <div role="group" aria-label="Choose a track or field event">
          {trackEventIds.map((id) => <button key={id} type="button" style={{ left: positions[id].left, top: positions[id].top }} onMouseEnter={() => setActiveId(id)} onFocus={() => setActiveId(id)} onClick={() => setActiveId(id)} aria-pressed={activeId === id} aria-controls="event-details" aria-label={`${trackEvents[id].label}: ${formatMark(trackEvents[id])}`} className={`absolute z-10 min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 rounded-xl border px-2 py-2 text-xs font-bold shadow-lg transition-colors sm:px-4 sm:text-sm ${activeId === id ? "border-cyan-200 bg-cyan-200 text-slate-950" : "border-white/20 bg-slate-950/90 text-white hover:border-cyan-200 hover:text-cyan-200"}`}>
            {id === "long-jump" || id === "triple-jump" ? <><span className="sm:hidden">{id === "long-jump" ? "LJ" : "TJ"}</span><span className="hidden sm:inline">{positions[id].label}</span></> : positions[id].label}
            {activeId === id && <span aria-hidden="true" className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-cyan-200/40 bg-slate-950 px-3 py-1.5 text-sm font-black tabular-nums text-cyan-100 shadow-lg">{formatMark(trackEvents[id])}</span>}
          </button>)}
        </div>
      </div>
      <p className="mx-5 mb-4 text-xs text-slate-400 sm:hidden">LJ = long jump · TJ = triple jump</p>

      <div id="event-details" aria-live="polite" aria-atomic="true" className="mx-5 mb-6 grid min-h-64 gap-5 rounded-2xl border border-cyan-300/20 bg-slate-950/80 p-5 sm:mx-8 sm:min-h-44 sm:grid-cols-[1fr_auto] sm:p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-300">{active.unit === "s" ? "On the track" : "In the field"}</p>
          <h3 className="mt-2 text-2xl font-extrabold text-white">{active.label}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{positions[activeId].description}</p>
          {active.notes && <p className="mt-2 text-sm text-cyan-100">{active.notes}</p>}
          {result && (result.meet || result.venue || result.date) && <p className="mt-3 text-sm text-slate-400">{[result.meet, result.venue, result.date ? resultDate(result.date) : null].filter(Boolean).join(" · ")}</p>}
          {result?.sourceUrl?.startsWith("https://") && <a href={result.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-bold text-cyan-200">Meet results</a>}
        </div>
        <div className="sm:text-right"><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-500">My mark</p><p className="mt-2 text-5xl font-black tabular-nums tracking-tight text-cyan-100">{result ? <>{result.mark}<span className="ml-2 text-xl font-semibold text-cyan-300">{active.unit}</span></> : <span className="text-xl">No mark yet</span>}</p></div>
      </div>
      <p className="mx-5 mb-6 text-xs leading-5 text-slate-500 sm:mx-8">Self-reported marks · Course illustration is not to scale · Jumps are listed in decimal feet.</p>

      <details className="border-t border-white/10 px-5 py-5 sm:px-8">
        <summary className="cursor-pointer text-sm font-bold text-cyan-200">All marks</summary>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-slate-500"><tr><th className="py-3 pr-4 font-medium" scope="col">Event</th><th className="py-3 pr-4 font-medium" scope="col">Mark</th><th className="py-3 font-medium" scope="col">Meet / notes</th></tr></thead>
            <tbody>{trackEventIds.flatMap((id) => trackEvents[id].results.map((entry, index) => <tr key={`${id}-${index}`} className="border-b border-white/5"><th scope="row" className="py-4 pr-4 font-bold text-white">{trackEvents[id].label}</th><td className="whitespace-nowrap py-4 pr-4 font-bold tabular-nums text-cyan-200">{formatMark(trackEvents[id], entry)}</td><td className="py-4 text-slate-400">{[entry.meet, entry.venue, entry.date ? resultDate(entry.date) : null, trackEvents[id].notes].filter(Boolean).join(" · ") || "—"}</td></tr>))}</tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
