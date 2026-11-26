import Image from "next/image";
import Link from "next/link";

export default function ObservatoryInvitation() {
  return <Link href="/observatory" prefetch={false} aria-label="Come learn with Professor Ribbit: open the interactive observatory labs" className="ribbit-invitation flex h-14 items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/50 px-2.5 outline-offset-4 transition-colors hover:border-cyan-200/50 focus-visible:outline-2 focus-visible:outline-cyan-200">
    <Image src="/images/observatory/professor-ribbit.svg" alt="" width={44} height={44} className="ribbit-peek h-11 w-11 shrink-0 origin-bottom" />
    <span className="ribbit-magic text-sm font-semibold text-cyan-200">Come learn!</span>
  </Link>;
}
