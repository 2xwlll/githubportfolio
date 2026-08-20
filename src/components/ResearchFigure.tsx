"use client";

import { useState } from "react";
import Image from "next/image";

const panels = [
  { label: "Observation", detail: "The [O III] emission map supplied to the model. Brightness is structured, irregular, and partially obscured." },
  { label: "Probability", detail: "The U-Net assigns each pixel a probability of belonging to an ionization cone." },
  { label: "Prediction", detail: "Applying the decision threshold turns the probability map into a binary segmentation mask." },
  { label: "Measurement", detail: "The predicted boundary is placed back on the observation so position angle and opening angle can be measured." },
  { label: "Comparison", detail: "A classical two-component fit provides a useful baseline and exposes differences between the methods." },
];

export default function ResearchFigure() {
  const [panel, setPanel] = useState(0);
  return <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24"><p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-300">Inspect the result</p><h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">From observation to physical measurement.</h2><p className="mt-5 max-w-3xl leading-8 text-slate-300">Select a stage to see what the pipeline receives, predicts, and measures for NGC 1068.</p><div className="mt-9 overflow-hidden rounded-3xl border border-white/10 bg-black"><div className="aspect-[1.04/1] overflow-hidden sm:aspect-[1.75/1]"><Image src="/images/research/ngc1068_prediction.png" width={2048} height={480} alt={`NGC 1068 analysis: ${panels[panel].label}`} className="h-full max-w-none object-cover transition-transform duration-700 ease-out" style={{ width: "500%", transform: `translateX(-${panel * 20}%)` }} /></div><div className="border-t border-white/10 bg-slate-950 p-5 sm:p-6"><div className="flex flex-wrap gap-2" role="tablist" aria-label="NGC 1068 analysis stages">{panels.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={panel === index} onClick={() => setPanel(index)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${panel === index ? "bg-cyan-300 text-slate-950" : "border border-white/15 text-slate-300 hover:border-cyan-200/60 hover:text-white"}`}>{item.label}</button>)}</div><p className="mt-5 min-h-14 leading-7 text-slate-300" aria-live="polite">{panels[panel].detail}</p></div></div></section>;
}
