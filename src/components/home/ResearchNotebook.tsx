import Link from "next/link";
import notebook from "@/content/research-notebook.json";

type Entry = {
  date: string;
  topic: string;
  title: string;
  summary: string;
  link?: { label: string; url: string };
};

const entries: Entry[] = [...notebook].sort((a, b) => b.date.localeCompare(a.date));
const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });

function NotebookEntry({ entry }: { entry: Entry }) {
  return (
    <li className="border-t border-white/10 py-5">
      <p className="text-sm text-slate-400">
        <time dateTime={entry.date}>{dateFormat.format(new Date(entry.date))}</time>
        {" · "}{entry.topic}
      </p>
      <h3 className="mt-2 text-xl font-bold text-white">{entry.title}</h3>
      <p className="mt-2 max-w-3xl leading-7 text-slate-300">{entry.summary}</p>
      {entry.link && (
        <Link href={entry.link.url} prefetch={false} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-cyan-200 underline decoration-cyan-200/40 underline-offset-4 hover:text-white">
          {entry.link.label}
        </Link>
      )}
    </li>
  );
}

export default function ResearchNotebook() {
  const [latest, ...older] = entries;
  if (!latest) return null;

  return (
    <section id="research-notebook" aria-labelledby="research-notebook-title" className="scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-24">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-8">
        <h2 id="research-notebook-title" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Research notebook</h2>
        <p className="mt-2 text-slate-300">Short updates on what I’m testing and learning.</p>
        <ul className="mt-5"><NotebookEntry entry={latest} /></ul>
        {older.length > 0 && (
          <details className="border-t border-white/10 pt-3">
            <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold text-cyan-200">Older entries ({older.length})</summary>
            <ul className="mt-2">
              {older.map(entry => <NotebookEntry key={`${entry.date}-${entry.title}`} entry={entry} />)}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}
