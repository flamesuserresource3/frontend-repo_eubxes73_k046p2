import { useState } from "react";
import { Search } from "lucide-react";

export default function QuestionBox({ onAsk, loading = false }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onAsk(v);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          placeholder="Ask a legal question in plain English (e.g., What is the limitation period for contract disputes?)"
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-28 text-slate-800 shadow-sm placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <button
          onClick={submit}
          disabled={loading}
          className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Search className="h-4 w-4" />
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-400">
        Tip: You can ask in multiple languages. Answers include citations to the most relevant sections.
      </p>
    </div>
  );
}
