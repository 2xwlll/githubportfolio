import { coneArt, voyagerArt } from "./asciiIllustrations";

const illustrations = {
  voyager: {
    art: voyagerArt,
    color: "text-cyan-200",
  },
  cone: {
    art: coneArt,
    color: "text-lime-200",
  },
};

export default function LabAsciiArt({ subject }: { subject: keyof typeof illustrations }) {
  const { art, color } = illustrations[subject];

  return (
    <div aria-hidden="true" className="w-full min-w-0 max-w-[22.5rem] justify-self-end [container-type:inline-size]">
      <pre
        translate="no"
        className={`select-none whitespace-pre font-mono text-[1.39cqw] leading-[1.15] [font-variant-ligatures:none] ${color}`}
      >
        {art}
      </pre>
    </div>
  );
}
