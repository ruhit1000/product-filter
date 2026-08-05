export default function ProductCard({ phone }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-4xl bg-white/85 p-4 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.35)] ring-1 ring-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-28px_rgba(14,165,233,0.45)]">
      <div className="relative rounded-3xl bg-linear-to-br from-slate-50 via-white to-sky-50 p-4">
        <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-700 shadow-sm ring-1 ring-sky-100/80">
          {phone.brand}
        </div>
        <img
          src={phone.image}
          alt={phone.name}
          loading="lazy"
          className="h-52 w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-slate-900">{phone.name}</h3>

        <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
          <span className="badge badge-soft badge-primary">{phone.ram} GB RAM</span>
          <span className="badge badge-soft badge-secondary">{phone.internalStorage} GB ROM</span>
          <span className="badge badge-soft badge-accent">{phone.battery} mAh</span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-slate-200/80 pt-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Starting at</p>
            <span className="text-2xl font-semibold text-slate-900">${phone.price}</span>
          </div>
          <button
            type="button"
            className="btn btn-sm rounded-full border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}