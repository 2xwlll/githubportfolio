"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { maskAgreement, paintDisc, projectedBicone, type ConeGeometry } from "@/lib/labs";
import FrogGuide from "./FrogGuide";

type ConeCase = {
  id: string; title: string; kind: string; band: string; width: number; height: number;
  imageUrl: string; modelMask: number[]; referenceMask: number[]; referenceLabel: string;
  threshold: number; expectedModelReferenceIoU: number;
  source: { projectUrl: string; observationUrl: string; observationId: string; checkpoint: string; sha256: Record<string, string>; display: string; inference: string; limits: string };
};

export default function ConeLab() {
  const [data, setData] = useState<ConeCase | null>(null);
  const [error, setError] = useState(false);
  const [brush, setBrush] = useState(5);
  const [tool, setTool] = useState<"paint" | "geometry">("paint");
  const [geometry, setGeometry] = useState<ConeGeometry>({ cx: 64, cy: 64, axis: 45, opening: 60, extent: 50 });
  const [mode, setMode] = useState<"paint" | "erase">("paint");
  const [revealed, setRevealed] = useState(false);
  const [showModel, setShowModel] = useState(true);
  const [showVisitor, setShowVisitor] = useState(true);
  const [showClassical, setShowClassical] = useState(false);
  const [painted, setPainted] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const maskRef = useRef(new Uint8Array(0));
  const cursorRef = useRef({ x: 64, y: 64 });
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/labs/cones/ngc1068.json", { signal: controller.signal }).then(r => {
      if (!r.ok) throw new Error("Example unavailable");
      return r.json();
    }).then((example: ConeCase) => {
      if (example.modelMask.length !== example.width * example.height || example.referenceMask.length !== example.modelMask.length) throw new Error("Mismatched pixel grids");
      maskRef.current = new Uint8Array(example.width * example.height);
      const image = new window.Image();
      image.onload = () => { if (!controller.signal.aborted) { imageRef.current = image; setData(example); } };
      image.onerror = () => { if (!controller.signal.aborted) setError(true); };
      image.src = example.imageUrl;
    }).catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !data || !imageRef.current) return;
    context.clearRect(0, 0, data.width, data.height);
    context.drawImage(imageRef.current, 0, 0, data.width, data.height);
    const layer = document.createElement("canvas");
    layer.width = data.width; layer.height = data.height;
    const lc = layer.getContext("2d")!;
    const overlay = lc.createImageData(data.width, data.height);
    for (let i = 0; i < maskRef.current.length; i++) {
      const visitor = showVisitor && maskRef.current[i];
      const model = revealed && showModel && data.modelMask[i];
      const classical = revealed && showClassical && data.referenceMask[i];
      let color: number[] | undefined;
      if (visitor && model) color = [245, 245, 225, 185];
      else if (visitor) color = [251, 146, 60, 155];
      else if (model) color = [34, 211, 238, 150];
      else if (classical) color = [192, 132, 252, 140];
      if (color) overlay.data.set(color, i * 4);
    }
    lc.putImageData(overlay, 0, 0);
    context.drawImage(layer, 0, 0);
    if (cursorVisible && !revealed && tool === "paint") {
      context.strokeStyle = "#fff"; context.lineWidth = .5;
      context.beginPath(); context.arc(cursorRef.current.x, cursorRef.current.y, brush, 0, Math.PI * 2); context.stroke();
    }
  }, [data, revealed, showModel, showVisitor, showClassical, brush, cursorVisible, tool]);

  useEffect(() => { render(); }, [render]);
  const updateCount = () => setPainted(maskRef.current.reduce((total, value) => total + value, 0));
  const applyGeometry = (next: ConeGeometry) => {
    if (!data || revealed) return;
    setGeometry(next);
    maskRef.current = projectedBicone(data.width, data.height, next);
    updateCount();
    render();
  };
  const stroke = (x: number, y: number, value = mode === "paint" ? 1 : 0) => {
    if (!data || revealed) return;
    const from = lastPoint.current ?? { x, y };
    const steps = Math.max(1, Math.ceil(Math.hypot(x - from.x, y - from.y) / Math.max(1, brush / 2)));
    for (let i = 1; i <= steps; i++) paintDisc(maskRef.current, data.width, data.height, from.x + (x - from.x) * i / steps, from.y + (y - from.y) * i / steps, brush, value);
    lastPoint.current = { x, y }; cursorRef.current = { x, y }; render();
  };
  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: Math.max(0, Math.min(data!.width - 1, (event.clientX - rect.left) / rect.width * data!.width)), y: Math.max(0, Math.min(data!.height - 1, (event.clientY - rect.top) / rect.height * data!.height)) };
  };
  const reset = () => {
    maskRef.current.fill(0); setTool("paint"); setMode("paint"); setPainted(0); setRevealed(false); setShowModel(true); setShowVisitor(true); setShowClassical(false); lastPoint.current = null; render();
  };

  if (error) return <div className="rounded-2xl border border-white/10 p-8"><p>The cone example couldn’t load.</p><button onClick={() => window.location.reload()} className="mt-4 rounded-full bg-cyan-200 px-5 py-3 font-bold text-slate-950">Try again</button></div>;
  if (!data) return <p className="rounded-2xl border border-white/10 p-8 text-slate-400" role="status">Opening the observation…</p>;
  const score = maskAgreement(maskRef.current, data.modelMask);
  const geometryControls = (compact: boolean) => <div className={compact ? "grid grid-cols-2 gap-4" : "space-y-4"}>{([
    ["cx", "Center X", 0, data.width - 1, "px"], ["cy", "Center Y", 0, data.height - 1, "px"], ["axis", "Axis angle", 0, 179, "°"], ["opening", "Full opening", 10, 170, "°"], ["extent", "Extent", 5, 90, "px"],
  ] as [keyof ConeGeometry, string, number, number, string][]).map(([key, label, min, max, unit]) => <label key={key} className="block text-sm text-slate-300">{label}: <span className="tabular-nums">{geometry[key]}{unit}</span><input type="range" aria-label={label} min={min} max={max} step={1} value={geometry[key]} onChange={event => applyGeometry({ ...geometry, [key]: Number(event.target.value) })} className="mt-2 block w-full accent-cyan-300" /></label>)}</div>;


  return <div>
    <FrogGuide>{revealed ? "Ribbit! The cyan region is the model’s interpretation. Agreement is interesting; disagreement is a question worth asking. Neither of you gets to declare the sky solved." : "Your turn first. Paint the extended cone-shaped structure you see, then reveal what the model marked. Bright gas and the edge of a cone are not always the same thing."}</FrogGuide>
    {!revealed && <div className="mt-6"><div role="group" aria-label="Cone tracing method" className="mt-6 flex flex-wrap gap-2"><button onClick={() => setTool("paint")} aria-pressed={tool === "paint"} className={`rounded-xl border px-4 py-3 text-sm font-bold ${tool === "paint" ? "border-cyan-200 bg-cyan-200 text-slate-950" : "border-white/20 text-slate-200"}`}>Paint region</button><button onClick={() => { setTool("geometry"); applyGeometry(geometry); }} aria-pressed={tool === "geometry"} className={`rounded-xl border px-4 py-3 text-sm font-bold ${tool === "geometry" ? "border-cyan-200 bg-cyan-200 text-slate-950" : "border-white/20 text-slate-200"}`}>Adjust geometry</button></div></div>}
    <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.2fr_.8fr]">
      <div>
        {!revealed && tool === "geometry" && <div className="mb-5 rounded-2xl border border-white/10 bg-slate-900/70 p-5 lg:hidden">{geometryControls(true)}</div>}
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-black">
          <canvas ref={canvasRef} width={data.width} height={data.height} tabIndex={0} role="application" aria-label="Cone tracing canvas" aria-describedby="cone-instructions" style={{ touchAction: revealed ? "auto" : "none" }} className={`block aspect-square w-full ${revealed ? "cursor-default" : "cursor-crosshair"}`}
            onFocus={() => setCursorVisible(true)} onBlur={() => setCursorVisible(false)}
            onPointerDown={event => { if (revealed || event.button !== 0) return; event.preventDefault(); event.currentTarget.focus(); if (tool === "geometry") { const p = point(event); applyGeometry({ ...geometry, cx: Math.round(p.x), cy: Math.round(p.y) }); return; } event.currentTarget.setPointerCapture(event.pointerId); drawing.current = true; lastPoint.current = null; const p = point(event); stroke(p.x, p.y); updateCount(); }}
            onPointerMove={event => { if (!drawing.current || revealed) return; const p = point(event); stroke(p.x, p.y); }}
            onPointerUp={event => { drawing.current = false; lastPoint.current = null; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); updateCount(); }}
            onPointerCancel={() => { drawing.current = false; lastPoint.current = null; updateCount(); }}
            onKeyDown={event => {
              if (revealed || tool === "geometry") return;
              const directions: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
              if (directions[event.key]) { event.preventDefault(); const [dx, dy] = directions[event.key]; const step = event.shiftKey ? 5 : 1; cursorRef.current = { x: Math.max(0, Math.min(data.width - 1, cursorRef.current.x + dx * step)), y: Math.max(0, Math.min(data.height - 1, cursorRef.current.y + dy * step)) }; render(); }
              else if (event.key === " " || event.key === "Backspace") { event.preventDefault(); lastPoint.current = null; stroke(cursorRef.current.x, cursorRef.current.y, event.key === "Backspace" ? 0 : mode === "paint" ? 1 : 0); lastPoint.current = null; updateCount(); }
            }} />
        </div>
        <p id="cone-instructions" className="mt-4 text-sm leading-6 text-slate-400">{tool === "paint" ? "Drag to paint; use Erase to revise. Keyboard: focus the image, move with arrow keys, press Space to paint or Backspace to erase. Shift moves faster." : "Use the sliders to trace a projected bicone. Click the image to position its center. Axis angle is measured counterclockwise from the image’s horizontal axis; the opening is a full projected angle."}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm"><span className="text-orange-300">Orange: you</span>{revealed && <><span className="text-cyan-300">Cyan: model</span><span className="text-stone-200">Cream: overlap</span>{showClassical && <span className="text-purple-300">Purple: classical extraction</span>}</>}</div>
      </div>
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-300">{data.kind}</p><h2 className="mt-3 text-2xl font-extrabold text-white">{data.title}</h2><p className="mt-3 text-sm leading-7 text-slate-400">{data.band}</p>
          {!revealed ? <>
            {tool === "geometry" ? <div className="mt-5 hidden lg:block">{geometryControls(false)}<p className="mt-4 text-xs leading-6 text-slate-500">This replaces the current trace with a symmetric 2D shape. It is a tracing aid, not a fit to an intrinsic 3D cone. Switch to Paint to refine its pixels.</p></div> : <>
            <div className="mt-6 flex flex-wrap gap-2">{(["paint", "erase"] as const).map(item => <button key={item} onClick={() => setMode(item)} aria-pressed={mode === item} className={`rounded-full border px-5 py-2.5 text-sm font-bold ${mode === item ? "border-cyan-200 bg-cyan-200 text-slate-950" : "border-white/20 text-slate-200"}`}>{item === "paint" ? "Paint" : "Erase"}</button>)}<button onClick={reset} className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-slate-200">Clear</button></div>
            <label className="mt-6 block text-sm text-slate-300">Brush radius: {brush} pixels<input aria-label="Brush radius" type="range" min="1" max="16" value={brush} onChange={e => setBrush(Number(e.target.value))} className="mt-3 block w-full accent-cyan-300" /></label>
            </>}
            <p className="mt-4 text-sm tabular-nums text-slate-500">{painted.toLocaleString()} pixels marked</p>
            <button onClick={() => { updateCount(); setRevealed(true); }} disabled={!painted} className="mt-6 w-full rounded-full bg-cyan-200 px-5 py-3.5 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">Reveal the model</button>
            <button onClick={() => { maskRef.current.fill(0); setPainted(0); setRevealed(true); }} className="mt-4 text-sm font-bold text-cyan-200">My prediction: no cone</button>
          </> : <>
            <div className="mt-6" aria-live="polite"><p className="text-sm text-slate-400">Your overlap with the model</p><p className="mt-2 text-5xl font-black tabular-nums text-cyan-100">{(score.iou * 100).toFixed(1)}<span className="ml-1 text-2xl">%</span></p><p className="mt-3 text-sm leading-7 text-slate-400">Intersection-over-union: shared marked pixels divided by all pixels either of you marked. This measures agreement, not accuracy.</p></div>
            <div className="mt-6 space-y-3 text-sm text-slate-300"><label className="flex items-center gap-3"><input type="checkbox" checked={showVisitor} onChange={e => setShowVisitor(e.target.checked)} className="accent-orange-300" />Your region</label><label className="flex items-center gap-3"><input type="checkbox" checked={showModel} onChange={e => setShowModel(e.target.checked)} className="accent-cyan-300" />Model region</label><label className="flex items-center gap-3"><input type="checkbox" checked={showClassical} onChange={e => setShowClassical(e.target.checked)} className="accent-purple-300" />Classical extraction</label></div>
            <button onClick={reset} className="mt-6 w-full rounded-full border border-cyan-200/50 px-5 py-3 text-sm font-bold text-cyan-100">Try again</button>
          </>}
        </div>
        <details className="rounded-2xl border border-white/10 p-5"><summary className="cursor-pointer text-sm font-bold text-cyan-200">Inspect the evidence</summary><div className="mt-4 space-y-4 break-words text-sm leading-7 text-slate-400"><p>{data.source.inference}</p><p>{data.source.display}</p><p>{data.source.limits}</p><p>{data.referenceLabel}.</p><p>Frozen model/classical overlap: {(data.expectedModelReferenceIoU * 100).toFixed(1)}% IoU.</p><p>Checkpoint: <code className="text-xs">{data.source.checkpoint}</code></p><a href="/labs/cones/ngc1068.json" download className="block font-bold text-cyan-200">Download this example and provenance</a><a href="/labs/cones/reproduce.py" download className="block font-bold text-cyan-200">Download the reproducibility script</a><a href={data.source.projectUrl} target="_blank" rel="noreferrer" className="block font-bold text-cyan-200">Research code</a><a href={data.source.observationUrl} target="_blank" rel="noreferrer" className="block font-bold text-cyan-200">HST data archive (MAST)</a></div></details>
      </div>
    </div>
  </div>;
}
