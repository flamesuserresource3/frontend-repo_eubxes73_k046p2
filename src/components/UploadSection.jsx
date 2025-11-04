import { useRef, useState } from "react";
import { Upload, FileText, Plus } from "lucide-react";

export default function UploadSection({ onFilesAdded, documents = [] }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files) => {
    const valid = Array.from(files).filter((f) =>
      [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ].includes(f.type) || [".pdf", ".docx", ".txt"].some((ext) => f.name.toLowerCase().endsWith(ext))
    );
    if (valid.length > 0) onFilesAdded(valid);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
      <div
        className={`${isDragging ? "ring-2 ring-blue-400" : ""} relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300/80 bg-slate-50/60 px-6 py-10 text-center transition`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
          <Upload className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-slate-600">
            Drag & drop judgments, contracts, or statutes here
          </p>
          <p className="mt-1 text-xs text-slate-400">PDF, DOCX, or TXT</p>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Documents
          </button>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/0 via-white/0 to-white/40"></div>
      </div>

      {documents.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-slate-700 shadow-sm"
            >
              <FileText className="h-5 w-5 text-blue-600" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-slate-400">{doc.size}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
