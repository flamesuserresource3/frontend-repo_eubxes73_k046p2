import { Scale, Search, Shield, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
              <Scale className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">LegalSense</span>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search your library..."
                className="w-64 rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700">
              <Shield className="h-4 w-4" />
              Safe & Private
            </button>
          </div>

          <button className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
