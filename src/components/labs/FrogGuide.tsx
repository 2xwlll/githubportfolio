import Image from "next/image";

export default function FrogGuide({ children }: { children: React.ReactNode }) {
  return <aside className="flex items-center gap-4 rounded-2xl border border-cyan-200/20 bg-cyan-300/[.045] p-4 sm:gap-6 sm:p-6" aria-label="Professor Ribbit’s field note">
    <Image src="/images/observatory/professor-ribbit.svg" alt="Professor Ribbit, a frog astronomer with glasses and a telescope" width={120} height={120} className="h-20 w-20 shrink-0 sm:h-28 sm:w-28" />
    <div><p className="text-sm font-extrabold text-cyan-200">Professor Ribbit</p><div className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">{children}</div></div>
  </aside>;
}
