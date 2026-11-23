"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FrogGuide from "./FrogGuide";
import { voyagerTutorial } from "@/lib/labs";

type Waterfall = {
  label: string; width: number; height: number; pixels: number[];
  timeSeconds: number[]; frequencyMHz: number[];
  nativeFrequencyResolutionHz: number; nativeTimeResolutionSeconds: number; displayTimeStepSeconds: number; sourceFileBytes: number; rawCutoutSha256: string; referenceMethod: string;
  referenceColumns: number[]; sourceUrl: string; fileName: string;
  preprocessing: string; limits: string;
};
type VoyagerData = { datasets: { fine: Waterfall; mid: Waterfall }; title: string; observationMjd: number; exportedUtc: string; expectedCarrierMHz: number };
type Mode = "fine" | "mid";
type Choice = { column: number; row: number; revealed: boolean };
const palette = [[5, 8, 26], [39, 29, 85], [35, 97, 133], [54, 171, 160], [185, 218, 103], [255, 241, 173]];

export function waterfallColor(value: number, contrast: number) {
  const scaled = Math.max(0, Math.min(1, (value / 255 - .5) * contrast + .5)) * (palette.length - 1);
  const index = Math.min(palette.length - 2, Math.floor(scaled));
  const fraction = scaled - index;
  return palette[index].map((channel, i) => Math.round(channel + (palette[index + 1][i] - channel) * fraction));
}

export default function VoyagerLab() {
  const [data, setData] = useState<VoyagerData | null>(null);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState<Mode>("fine");
  const [contrast, setContrast] = useState(1);
  const [choices, setChoices] = useState<Partial<Record<Mode, Choice>>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const active = data?.datasets[mode];
  const choice = choices[mode];

  useEffect(() => {
    const controller = new AbortController();
    fetch("/labs/voyager/waterfalls.json", { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error("Example unavailable");
      return response.json();
    }).then((example: VoyagerData) => {
      for (const resolution of [example.datasets?.fine, example.datasets?.mid]) {
        if (!resolution || resolution.pixels.length !== resolution.width * resolution.height || resolution.frequencyMHz.length !== resolution.width || resolution.timeSeconds.length !== resolution.height || resolution.referenceColumns.length !== resolution.height) throw new Error("Mismatched waterfall axes");
      }
      setData(example);
    }).catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !active) return;
    const layer = document.createElement("canvas");
    layer.width = active.width; layer.height = active.height;
    const lc = layer.getContext("2d")!;
    const image = lc.createImageData(active.width, active.height);
    for (let i = 0; i < active.pixels.length; i++) {
      const color = waterfallColor(active.pixels[i], contrast);
      image.data.set([...color, 255], i * 4);
    }
    lc.putImageData(image, 0, 0);
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(layer, 0, 0, canvas.width, canvas.height);
    if (choice) {
      const x = (choice.column + .5) / active.width * canvas.width;
      const y = (choice.row + .5) / active.height * canvas.height;
      context.strokeStyle = "#fb923c"; context.lineWidth = 2;
      context.setLineDash([5, 5]); context.beginPath(); context.moveTo(x, 0); context.lineTo(x, canvas.height); context.stroke(); context.setLineDash([]);
      context.strokeStyle = "#fdba74"; context.lineWidth = 2; context.beginPath(); context.arc(x, y, 6, 0, Math.PI * 2); context.stroke();
      if (choice.revealed) {
        context.strokeStyle = "#a5f3fc"; context.lineWidth = 3; context.beginPath();
        active.referenceColumns.forEach((column, row) => { const xx = (column + .5) / active.width * canvas.width; const yy = (row + .5) / active.height * canvas.height; if (row === 0) context.moveTo(xx, yy); else context.lineTo(xx, yy); });
        context.stroke();
      }
    }
  }, [active, choice, contrast]);
  useEffect(() => { render(); }, [render]);

  if (error) return <div className="rounded-2xl border border-white/10 p-8"><p>The Voyager cutouts couldn’t load.</p><button onClick={() => window.location.reload()} className="mt-4 rounded-full bg-cyan-200 px-5 py-3 font-bold text-slate-950">Try again</button></div>;
  if (!active || !data) return <p role="status" className="rounded-2xl border border-white/10 p-8 text-slate-400">Tuning in to Voyager…</p>;
  const reference = choice ? active.referenceColumns[choice.row] : 0;
  const distance = choice ? Math.abs(choice.column - reference) : 0;
  const matched = distance <= (mode === "mid" ? 0 : 1);
  const selectedFrequency = active.frequencyMHz[choice?.column ?? Math.floor(active.width / 2)];
  const range = active.frequencyMHz;
  const nativeHz = active.nativeFrequencyResolutionHz;
  const setChoice = (column: number, row: number) => setChoices(current => ({ ...current, [mode]: { column, row, revealed: false } }));

  return <div>
    <FrogGuide>{choices.fine?.revealed && choices.mid?.revealed ? "You’ve inspected both views. Same spacecraft, different sampling. The full tutorial takes the next step: checking whether a candidate follows the ON/OFF observing pattern." : choice?.revealed ? mode === "mid" ? "A wide channel can contain the carrier without resolving its detailed drift. A zero-drift search result is not proof that the physical signal has exactly zero drift." : "That narrow trace is the carrier reference. A bright line is a useful beginning; a careful search also needs controls and candidate validation." : "Somewhere in this waterfall is a spacecraft calling home. In the fine view, find the narrow drifting trace. In the mid view, use the expected carrier frequency: brighter neighboring stripes can be sidebands. Try both resolutions."}</FrogGuide>
    <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.25fr_.75fr]">
      <div>
        <div className="mb-5 flex flex-wrap gap-3" role="group" aria-label="Spectral resolution">{(["fine", "mid"] as const).map(resolution => <button key={resolution} aria-pressed={mode === resolution} onClick={() => { setMode(resolution); setContrast(1); }} className={`rounded-full border px-5 py-3 text-sm font-bold ${mode === resolution ? "border-cyan-200 bg-cyan-200 text-slate-950" : "border-white/20 text-slate-200"}`}>{resolution === "fine" ? "Fine resolution" : "Mid resolution"}{choices[resolution]?.revealed ? " · explored" : ""}</button>)}</div>
        <p className="mb-3 text-sm text-slate-400">Time increases down the image · Frequency increases to the right</p>
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-black"><canvas ref={canvasRef} width={640} height={360} role="img" aria-label={`${active.label} Voyager waterfall. Select a frequency using the slider below, or click a feature in the image.`} className="block aspect-[16/9] w-full cursor-crosshair" onPointerDown={event => {
          if (choice?.revealed) return;
          const rect = event.currentTarget.getBoundingClientRect();
          setChoice(Math.max(0, Math.min(active.width - 1, Math.floor((event.clientX - rect.left) / rect.width * active.width))), Math.max(0, Math.min(active.height - 1, Math.floor((event.clientY - rect.top) / rect.height * active.height))));
        }} /></div>
        <div className="mt-4 space-y-3 lg:hidden">
          {mode === "mid" && <p className="text-sm leading-7 text-cyan-100">Expected carrier: about {data.expectedCarrierMHz.toFixed(4)} MHz. Brighter neighboring stripes can be sidebands.</p>}
          <label className="block text-sm text-slate-300">Select a frequency channel<input type="range" aria-label="Select a frequency channel" min="0" max={active.width - 1} step="1" disabled={choice?.revealed} value={choice?.column ?? Math.floor(active.width / 2)} onChange={e => setChoice(Number(e.target.value), Math.floor(active.height / 2))} className="mt-2 block w-full accent-orange-300" /></label>
          <div className="grid grid-cols-[auto_1fr_auto] gap-3"><button aria-label="Previous frequency channel" disabled={choice?.revealed} onClick={() => setChoice(Math.max(0, (choice?.column ?? Math.floor(active.width / 2)) - 1), choice?.row ?? Math.floor(active.height / 2))} className="min-h-11 min-w-11 rounded-xl border border-white/20 px-3 text-lg text-white disabled:opacity-40">−</button>{!choice?.revealed ? <button aria-label="Reveal the carrier" disabled={!choice} onClick={() => setChoices(current => ({ ...current, [mode]: { ...choice!, revealed: true } }))} className="min-h-11 rounded-xl bg-cyan-200 px-3 text-sm font-bold text-slate-950 disabled:opacity-40">Reveal carrier</button> : <button aria-label="Try this view again" onClick={() => setChoices(current => ({ ...current, [mode]: undefined }))} className="min-h-11 rounded-xl border border-cyan-200/40 px-3 text-sm font-bold text-cyan-200">Try again</button>}<button aria-label="Next frequency channel" disabled={choice?.revealed} onClick={() => setChoice(Math.min(active.width - 1, (choice?.column ?? Math.floor(active.width / 2)) + 1), choice?.row ?? Math.floor(active.height / 2))} className="min-h-11 min-w-11 rounded-xl border border-white/20 px-3 text-lg text-white disabled:opacity-40">+</button></div>
          <p className="text-xs tabular-nums text-orange-200">{choice ? `Channel center: ${selectedFrequency.toFixed(6)} MHz` : "Tap the image or choose a channel."}</p>
        </div>
        <div className="mt-3 flex justify-between gap-3 text-xs tabular-nums text-slate-500"><span>{range[0].toFixed(6)}</span><span>Frequency (MHz)</span><span>{range[range.length - 1].toFixed(6)}</span></div>
        <p className="mt-2 text-xs tabular-nums text-slate-500">Time range: {active.timeSeconds[0].toFixed(1)}–{active.timeSeconds[active.height - 1].toFixed(1)} seconds from scan start</p>
        <label className="mt-6 block text-sm text-slate-300">Display contrast: {contrast.toFixed(1)}<input type="range" aria-label="Display contrast" min=".5" max="2.5" step=".1" value={contrast} onChange={e => setContrast(Number(e.target.value))} className="mt-3 block w-full accent-cyan-300" /></label>
        <p className="mt-3 text-xs leading-6 text-slate-500">Contrast changes the colors, not the observations. The views use different frequency windows; read each axis when comparing them. Mid-resolution channels remain visibly coarse.</p>
        {choice?.revealed && <div className="mt-4 flex flex-wrap gap-4 text-sm"><span className="text-orange-300">Orange: your selection</span><span className="text-cyan-200">Cyan: carrier reference</span></div>}
      </div>
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-300">{active.label}</p><h2 className="mt-3 text-2xl font-extrabold text-white">Find the carrier.</h2><p className="mt-4 text-sm leading-7 text-slate-400">Choose a point on the persistent signal. The slider offers the same frequency selection with a keyboard, using the middle of the scan.</p>
          {mode === "mid" && <p className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-300/5 p-3 text-sm leading-7 text-cyan-100">Expected carrier: about {data.expectedCarrierMHz.toFixed(4)} MHz. Find the coarse channel containing that frequency; it need not be the brightest stripe.</p>}
          <label className="mt-6 hidden text-sm text-slate-300 lg:block">Select a frequency channel<input type="range" aria-label="Select a frequency channel" min="0" max={active.width - 1} step="1" disabled={choice?.revealed} value={choice?.column ?? Math.floor(active.width / 2)} onChange={e => setChoice(Number(e.target.value), Math.floor(active.height / 2))} className="mt-3 block w-full accent-orange-300" /></label>
          <div className="mt-3 hidden gap-3 lg:flex"><button type="button" aria-label="Previous frequency channel" disabled={choice?.revealed} onClick={() => setChoice(Math.max(0, (choice?.column ?? Math.floor(active.width / 2)) - 1), choice?.row ?? Math.floor(active.height / 2))} className="min-h-11 flex-1 rounded-xl border border-white/20 px-3 py-2 text-sm font-bold text-slate-200 disabled:opacity-40">− Channel</button><button type="button" aria-label="Next frequency channel" disabled={choice?.revealed} onClick={() => setChoice(Math.min(active.width - 1, (choice?.column ?? Math.floor(active.width / 2)) + 1), choice?.row ?? Math.floor(active.height / 2))} className="min-h-11 flex-1 rounded-xl border border-white/20 px-3 py-2 text-sm font-bold text-slate-200 disabled:opacity-40">Channel +</button></div>
          <p className="mt-3 break-words text-sm tabular-nums text-orange-200">{choice ? `Channel center: ${selectedFrequency.toFixed(6)} MHz at ${active.timeSeconds[choice.row].toFixed(1)} s` : "No selection yet"}</p>
          {mode === "mid" && choice && <p className="mt-2 text-xs leading-6 tabular-nums text-slate-500">Selected channel spans approximately {(selectedFrequency - nativeHz / 2e6).toFixed(6)}–{(selectedFrequency + nativeHz / 2e6).toFixed(6)} MHz.</p>}
          {!choice?.revealed ? <button disabled={!choice} onClick={() => setChoices(current => ({ ...current, [mode]: { ...choice!, revealed: true } }))} className="mt-6 hidden w-full rounded-full bg-cyan-200 lg:block px-5 py-3.5 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">Reveal the carrier</button> : <div className="mt-6" aria-live="polite"><p className="text-xl font-bold text-cyan-100">{matched ? "You found its channel." : "Look a little closer."}</p><p className="mt-3 text-sm leading-7 text-slate-400">Your selection is {distance} displayed {distance === 1 ? "channel" : "channels"} from the reference at that time. {mode === "mid" ? "At mid resolution, the goal is to identify the occupied coarse channel." : "The fine view accepts a selection within one displayed channel of the reference."}</p><button onClick={() => setChoices(current => ({ ...current, [mode]: undefined }))} className="mt-5 hidden rounded-full border border-cyan-200/40 lg:inline-flex px-5 py-3 text-sm font-bold text-cyan-200">Try this view again</button></div>}
          <dl className="mt-7 space-y-3 border-t border-white/10 pt-5 text-sm"><div><dt className="text-slate-500">Native channel width</dt><dd className="mt-1 font-bold tabular-nums text-slate-200">{nativeHz.toLocaleString("en-US", { maximumFractionDigits: 3 })} Hz</dd></div><div><dt className="text-slate-500">Native integration time</dt><dd className="mt-1 font-bold tabular-nums text-slate-200">{active.nativeTimeResolutionSeconds.toLocaleString("en-US", { maximumFractionDigits: 6 })} s</dd></div><div><dt className="text-slate-500">Displayed time step</dt><dd className="mt-1 font-bold tabular-nums text-slate-200">{active.displayTimeStepSeconds.toLocaleString("en-US", { maximumFractionDigits: 6 })} s</dd></div><div><dt className="text-slate-500">Displayed grid</dt><dd className="mt-1 text-slate-200">{active.width} channels × {active.height} time samples</dd></div></dl>
        </div>
        <a href={voyagerTutorial} target="_blank" rel="noreferrer" className="block rounded-2xl border border-cyan-200/30 bg-cyan-300/10 p-5 transition hover:bg-cyan-300/20"><span className="font-bold text-cyan-100">Continue in my Voyager Colab tutorial</span><span className="mt-2 block text-sm leading-6 text-slate-400">Explore the full cadence, preprocessing, candidate searches, and injection tests.</span></a>
      </div>
    </div>
    <details className="mt-8 rounded-2xl border border-white/10 p-6"><summary className="cursor-pointer font-bold text-cyan-200">Data, preparation, and limits</summary><div className="mt-5 max-w-4xl space-y-4 break-words text-sm leading-7 text-slate-400"><p>Both crops are from the same ON-target Voyager 1 scan (0011), starting at MJD {data.observationMjd}. This one scan does not provide an ON/OFF validation; the full Colab tutorial covers the cadence.</p><p>{active.referenceMethod}. This is a guided reference around a known spacecraft transmission, not a blind technosignature detection.</p><p>{active.preprocessing}</p><p>{active.limits}</p><p>Source file: <code className="text-xs">{active.fileName}</code></p><p>Linear-power samples SHA-256 (little-endian float32, row-major): <code className="text-xs">{active.rawCutoutSha256}</code></p><p>Prepared snapshot: {data.exportedUtc.slice(0, 10)}.</p><a href={active.sourceUrl} target="_blank" rel="noreferrer" className="block font-bold text-cyan-200">Original HDF5 observation ({(active.sourceFileBytes / 1e9).toFixed(2)} GB download)</a><a href="https://bldata.berkeley.edu/voyager_2020/" target="_blank" rel="noreferrer" className="block font-bold text-cyan-200">Voyager public data collection</a><a href="/labs/voyager/waterfalls.json" download className="block font-bold text-cyan-200">Download the prepared examples</a><a href={`/labs/voyager/${mode}-cutout.npz`} download className="block font-bold text-cyan-200">Download this view’s linear-power cutout (NumPy)</a><a href="/labs/voyager/reproduce.py" download className="block font-bold text-cyan-200">Download the preparation check script</a><p>To check both views, save the JSON, both NumPy cutouts, and the script in one folder. Run the script with Python and NumPy. It checks the sample hashes, display values, and guided references.</p></div></details>
  </div>;
}
