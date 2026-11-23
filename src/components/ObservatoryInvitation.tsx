import Image from "next/image";
import Link from "next/link";

export default function ObservatoryInvitation() {
  return <Link href="/observatory" prefetch={false} aria-label="Come learn with Professor Ribbit: open the interactive observatory labs" className="ribbit-invitation group relative flex w-full max-w-xs items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3 outline-offset-8 transition-colors hover:border-cyan-200/50 focus-visible:outline-2 focus-visible:outline-cyan-200">
    <div className="relative -mt-4 w-24 shrink-0 overflow-hidden pt-1">
      <Image src="/images/observatory/professor-ribbit.svg" alt="" width={96} height={96} className="ribbit-peek h-24 w-24 origin-bottom" />
    </div>
    <div className="min-w-0">
      <span className="block text-xs font-semibold text-slate-400">Professor Ribbit</span>
      <span className="mt-1 block text-xl font-bold leading-tight text-white">Come learn!</span>
      <span className="ribbit-magic mt-2 inline-block text-sm font-semibold leading-snug text-cyan-200"><span aria-hidden="true">✦ </span>Click the frog<span aria-hidden="true"> ✧</span></span>
      <span className="mt-1 block text-xs text-slate-400">Two little astronomy labs</span>
    </div>
  </Link>;
}
