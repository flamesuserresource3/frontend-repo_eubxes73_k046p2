import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import UploadSection from "./components/UploadSection.jsx";
import QuestionBox from "./components/QuestionBox.jsx";
import ResultsPanel from "./components/ResultsPanel.jsx";

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  const sizes = ["B", "KB", "MB", "GB"]; 
  const i = Math.min(Math.floor(Math.log(bytes || 1) / Math.log(1024)), sizes.length - 1);
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val > 10 || i === 0 ? 0 : 1)} ${sizes[i]}`;
}

function App() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);

  const starterLibrary = useMemo(
    () => [
      {
        title: "Indian Contract Act, 1872 — Section 73",
        snippet:
          "Compensation for loss or damage caused by breach of contract may be claimed. The party suffering is entitled to such compensation...",
        link: "#",
      },
      {
        title: "Limitation Act, 1963 — Article 55",
        snippet:
          "Three-year limitation period for suits relating to compensation for the breach of any contract...",
        link: "#",
      },
      {
        title: "ABC Pvt. Ltd. v. XYZ Traders (2021)",
        snippet:
          "The Court reiterated that the limitation period starts when the breach occurs and not when the damage is fully realized...",
        link: "#",
      },
    ],
    []
  );

  const handleFilesAdded = (files) => {
    const mapped = Array.from(files).map((f) => ({
      name: f.name,
      size: formatSize(f.size),
    }));
    setDocuments((prev) => [...mapped, ...prev]);
  };

  const ask = (question) => {
    setLoading(true);
    // Simple mock: pick up to 3 sources from uploaded docs, else starter library
    const localSources = documents.slice(0, 3).map((d) => ({
      title: d.name,
      snippet: "Relevant paragraph matched from your document.",
      link: "#",
    }));

    const chosen = (localSources.length > 0 ? localSources : starterLibrary).slice(0, 3);

    const citedTitles = chosen.map((s) => `“${s.title}”`).join(", ");

    const generated = `Based on the materials retrieved, the typical limitation period for general contract claims in India is three years from the date of breach (see ${citedTitles}). Specific statutes or contractual terms may alter this. Always consider when the cause of action arose and whether any acknowledgements/part-payments extended limitation.`;

    // Simulate latency
    setTimeout(() => {
      setAnswer(generated);
      setSources(chosen);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-8 grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              AI-powered legal research, simplified
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Upload judgments, contracts, or statutes and ask questions in natural language. Get grounded answers with citations to the exact
              sections.
            </p>

            <div className="mt-6 space-y-4">
              <QuestionBox onAsk={ask} loading={loading} />
              <ResultsPanel answer={answer} sources={sources} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <UploadSection onFilesAdded={handleFilesAdded} documents={documents} />
          </div>
        </section>

        {/* Library preview (if any) */}
        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Sample Library
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {starterLibrary.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="mt-1 line-clamp-3 text-xs text-slate-500">{item.snippet}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/60 bg-white/70 py-6 text-center text-sm text-slate-500">
        Built for rapid legal insight • Answers include citations • Your data stays private
      </footer>
    </div>
  );
}

export default App;
