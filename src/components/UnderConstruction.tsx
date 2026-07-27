import Navbar from "@/components/Navbar";

export default function UnderConstruction() {
  return (
    <main className="grid min-h-screen place-items-center overflow-hidden bg-slate-950 px-5 pt-20">
      <Navbar />
      <img
        src="/images/ronintoadin_underconstruction.png"
        alt="This page is under construction"
        className="max-h-[72vh] w-full max-w-3xl object-contain"
      />
    </main>
  );
}
