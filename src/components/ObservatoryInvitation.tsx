import Image from "next/image";
import Link from "next/link";

export default function ObservatoryInvitation() {
  return <Link href="/observatory" prefetch={false} aria-label="Come learn with Professor Ribbit: open the interactive observatory labs" className="ribbit-invitation pointer-events-auto group relative flex w-40 shrink-0 items-center gap-1 rounded-2xl border border-cyan-200/25 bg-slate-950/85 px-2 py-2 outline-offset-8 transition-colors hover:border-cyan-200/70 focus-visible:outline-2 focus-visible:outline-cyan-200 sm:w-[22rem] sm:gap-2 sm:px-3 sm:pb-0 sm:pt-3">
    <div className="relative -ml-2 w-16 shrink-0 overflow-hidden sm:-mb-2 sm:-ml-0 sm:-mt-7 sm:w-32 sm:pt-2">
      <Image src="/images/observatory/professor-ribbit.svg" alt="" width={144} height={144} className="ribbit-peek h-16 w-16 origin-bottom sm:h-32 sm:w-32" />
    </div>
    <div className="min-w-0 sm:pb-4 sm:pt-1">
      <span className="hidden text-xs font-bold tracking-wide text-cyan-200 sm:block">Professor Ribbit says…</span>
      <span className="block text-lg font-black leading-tight text-white sm:mt-1 sm:text-2xl">Come learn!</span>
      <span className="ribbit-magic mt-2 inline-block text-sm font-bold leading-snug text-amber-200"><span aria-hidden="true">✦ </span>Click the frog<span aria-hidden="true"> ✧</span></span>
      <span className="mt-1 hidden text-xs text-slate-300 sm:block">Two little astronomy labs</span>
    </div>
  </Link>;
}
