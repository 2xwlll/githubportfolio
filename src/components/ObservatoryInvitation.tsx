import Image from "next/image";
import Link from "next/link";

export default function ObservatoryInvitation() {
  return (
    <Link
      href="/observatory"
      prefetch={false}
      aria-label="Click here! Open Professor Ribbit’s observatory"
      className="ribbit-invitation group flex h-14 items-center gap-2 rounded-xl outline-offset-4 focus-visible:outline-2 focus-visible:outline-cyan-200"
    >
      <Image src="/images/observatory/professor-ribbit.svg" alt="" width={44} height={44} className="ribbit-peek h-11 w-11 shrink-0 origin-bottom" />
      <span className="ribbit-magic relative -mt-3 whitespace-nowrap rounded-xl bg-cyan-100 px-2.5 py-1.5 text-xs font-bold text-slate-950 transition-colors group-hover:bg-white before:absolute before:-left-1 before:bottom-2 before:size-2 before:rotate-45 before:bg-inherit before:content-['']">
        Click here!
      </span>
    </Link>
  );
}
