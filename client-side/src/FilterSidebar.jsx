const filterSections = [
  { label: "Brand", key: "brands" },
  { label: "Display Type", key: "displayTypes" },
  { label: "Chipset", key: "chipsets" },
  { label: "RAM (GB)", key: "ram" },
  { label: "Storage (GB)", key: "storage" },
  { label: "Battery (mAh)", key: "battery" },
];

export default function FilterSidebar({
  filterOptions,
  filterQuery,
  onToggleFilter,
  onAvailabilityChange,
  onClearFilters,
  onClose,
}) {
  if (!filterOptions || Object.keys(filterOptions).length === 0) {
    return (
      <aside className="flex h-full w-80 max-w-[86vw] flex-col bg-white/90 p-5 shadow-2xl shadow-slate-300/40 ring-1 ring-slate-200/80 backdrop-blur-xl">
        <div className="flex h-full items-center justify-center text-sm text-slate-500">
          Loading filters...
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex h-full w-80 max-w-[86vw] flex-col border-r border-white/70 bg-white/90 p-5 shadow-2xl shadow-slate-300/40 ring-1 ring-slate-200/80 backdrop-blur-xl lg:sticky lg:top-0 lg:min-h-[calc(100vh-5rem)]">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600/80">Refine results</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-800">Filters</h2>
        </div>
        <button type="button" onClick={onClose} className="btn btn-sm lg:hidden">
          Close
        </button>
      </div>

      <div className="mt-5 rounded-3xl bg-linear-to-br from-sky-50 to-teal-50 p-4 ring-1 ring-sky-100/80">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-800">Quick actions</p>
            <p className="text-xs text-slate-500">Console the selected filter object.</p>
          </div>
          <button type="button" className="btn btn-soft btn-primary btn-sm" onClick={onClearFilters}>
            Clear all
          </button>
        </div>
      </div>

      <div className="mt-5 flex-1 space-y-4 overflow-y-auto pr-1">
        <section className="rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200/70">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Availability</h3>
          <div className="mt-4 grid gap-2">
            {[
              { label: "Any", value: null },
              { label: "Available", value: "available" },
              { label: "Out of stock", value: "unavailable" },
            ].map((option) => (
              <label
                key={option.label}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition-colors ${
                  filterQuery.availability === option.value
                    ? "border-sky-300 bg-sky-50 text-slate-900"
                    : "border-slate-200 bg-slate-50/80 text-slate-600 hover:bg-slate-100/80"
                }`}
              >
                <span className="text-sm font-medium">{option.label}</span>
                <input
                  type="radio"
                  name="availability"
                  className="radio radio-primary radio-sm"
                  checked={filterQuery.availability === option.value}
                  onChange={() => onAvailabilityChange(option.value)}
                />
              </label>
            ))}
          </div>
        </section>

        {filterSections.map(({ label, key }) => (
          <section key={key} className="rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200/70">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</h3>
              <span className="badge badge-soft">{filterOptions[key]?.length ?? 0}</span>
            </div>

            <div className="mt-4 max-h-52 space-y-2 overflow-y-auto pr-1">
              {filterOptions[key]?.map((item) => {
                const isSelected = filterQuery[key]?.some(
                  (selectedValue) => String(selectedValue).toLowerCase() === String(item).toLowerCase(),
                );

                return (
                  <label
                    key={item}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-all ${
                      isSelected
                        ? "border-sky-300 bg-sky-50 shadow-sm"
                        : "border-slate-200 bg-slate-50/80 hover:border-sky-200 hover:bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleFilter(key, item)}
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-700">{item}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}