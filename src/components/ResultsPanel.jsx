import { BookOpen, FileText } from "lucide-react";

export default function ResultsPanel({ answer, sources = [] }) {
  if (!answer && sources.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/60 p-8 text-center text-slate-500 shadow-sm">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
          <BookOpen className="h-6 w-6" />
        </div>
        <p className="text-sm">
          Ask a question to see AI-generated, citation-backed answers here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {answer && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Answer
          </h3>
          <div className="prose prose-slate max-w-none text-slate-800">
            <p>{answer}</p>
          </div>
        </div>
      )}

      {sources.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Sources
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {sources.map((s, idx) => (
              <a
                key={idx}
                href={s.link || "#"}
                target={s.link ? "_blank" : undefined}
                rel={s.link ? "noreferrer" : undefined}
                className="group flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 text-left shadow-sm transition hover:border-blue-300 hover:bg-white"
              >
                <FileText className="mt-0.5 h-5 w-5 text-blue-600" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800 group-hover:text-blue-700">
                    {s.title}
                  </p>
                  <p className="mt-1 line-clamp-3 text-xs text-slate-500">{s.snippet}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
