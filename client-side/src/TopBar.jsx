export default function TopBar({ onOpenFilters, searchQuery, onSearchChange }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-linear-to-r from-sky-50 via-white to-teal-50/80 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenFilters}
            className="btn btn-circle lg:hidden"
            aria-label="Open filters"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5h18M6 12h12M10 19h4" />
            </svg>
          </button>
          <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-sky-600 text-lg font-bold text-white shadow-lg shadow-cyan-200/60">
            P
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600/80">Products Filter</p>
            <h1 className="text-xl font-semibold text-slate-800">PhoneFinder</h1>
          </div>
        </div>
        </div>

        <label className="input input-bordered flex h-12 w-full items-center gap-3 rounded-2xl border-white/70 bg-white/80 px-4 shadow-sm shadow-slate-200/60 focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-200/70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m21 21-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search mobiles, brands, chipsets..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="btn btn-ghost btn-xs rounded-full text-slate-500"
              aria-label="Clear search"
            >
              Clear
            </button>
          ) : null}
        </label>
      </div>
    </header>
  );
}