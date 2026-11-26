import { coneArt, voyagerArt } from "./asciiIllustrations";

const illustrations = {
  voyager: {
    art: voyagerArt,
    caption: "ASCII sketch of Voyager’s antenna dish and instrument booms",
    color: "text-cyan-200",
  },
  cone: {
    art: coneArt,
    caption: "ASCII sketch of a galaxy with two ionization cones",
    color: "text-lime-200",
  },
};

export default function LabAsciiArt({ subject }: { subject: keyof typeof illustrations }) {
  const { art, caption, color } = illustrations[subject];

  return (
    <figure className="w-full min-w-0 max-w-sm overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 p-3">
      <div className="[container-type:inline-size]">
        <pre
          aria-hidden="true"
          translate="no"
          className={`select-none whitespace-pre font-mono text-[1.39cqw] leading-[1.15] [font-variant-ligatures:none] ${color}`}
        >
          {art}
        </pre>
      </div>
      <figcaption className="mt-2 text-xs leading-5 text-slate-400">{caption}</figcaption>
    </figure>
  );
}
