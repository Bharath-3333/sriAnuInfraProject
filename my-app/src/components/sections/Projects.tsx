import { useState, useMemo } from 'react';
import { useInView } from '../../hooks/useApi';

// ─── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: 1,  client: 'Arette22',                          kw: 1000,  location: 'Narsapur',      kwh: 1460000,  type: 'Ground Mount' },
  { id: 2,  client: 'Sahuwala Cylinders Pvt Ltd',        kw: 1000,  location: 'Auto Nagar',     kwh: 1460000,  type: 'Rooftop'      },
  { id: 3,  client: 'Sparsh Hospital',                   kw: 3300,  location: 'Chitradurga',    kwh: 4818000,  type: 'Ground Mount' },
  { id: 4,  client: 'Don Bosco Inst. of Technology',     kw: 470,   location: 'Kumbalagudu',    kwh: 686200,   type: 'Rooftop'      },
  { id: 5,  client: 'M/s Best Cartons Unit 2',           kw: 400,   location: 'Mysore',         kwh: 584000,   type: 'Rooftop'      },
  { id: 6,  client: 'Ballari Health City',               kw: 213,   location: 'Ballari',        kwh: 310980,   type: 'Rooftop'      },
  { id: 7,  client: 'LENDI Institute of Engg & Tech',    kw: 200,   location: 'Vizianagaram',   kwh: 292000,   type: 'Rooftop'      },
  { id: 8,  client: 'Don Bosco Inst. of Technology',     kw: 170,   location: 'Bangalore',      kwh: 248200,   type: 'Rooftop'      },
  { id: 9,  client: 'Amrutha Sai Cold Storage',          kw: 154,   location: 'Chitradurga',    kwh: 224840,   type: 'Rooftop'      },
  { id: 10, client: 'M/s Eshwar Foods & Packaging',      kw: 150,   location: 'Mysore',         kwh: 219000,   type: 'Rooftop'      },
  { id: 11, client: 'M/s OM Hospitals',                  kw: 90,    location: 'Ranebennure',    kwh: 131400,   type: 'Rooftop'      },
  { id: 12, client: 'M/s OM Hospitals',                  kw: 90,    location: 'Haveri',         kwh: 131400,   type: 'Rooftop'      },
  { id: 13, client: 'RMC Bricks',                        kw: 80,    location: 'Chitradurga',    kwh: 116800,   type: 'Rooftop'      },
  { id: 14, client: 'Royal Agro Pipes',                  kw: 67,    location: 'Kudligi',        kwh: 97820,    type: 'Rooftop'      },
  { id: 15, client: 'Jain College Boys Hostel',          kw: 60,    location: 'Davanagere',     kwh: 87600,    type: 'Rooftop'      },
  { id: 16, client: 'Jain College Boys Hostel',          kw: 30,    location: 'Davangere',      kwh: 43800,    type: 'Rooftop'      },
  { id: 17, client: 'Rayalsons',                         kw: 2860,  location: 'Kudiligi',       kwh: 4175600,  type: 'Ground Mount' },
  { id: 18, client: 'Navami',                            kw: 4500,  location: 'Hiruyuru',       kwh: 6570000,  type: 'Ground Mount' },
  { id: 19, client: 'Rosetta',                           kw: 520,   location: 'Sakleshpura',    kwh: 759200,   type: 'Rooftop'      },
];

/**
 * Gallery sourced from PDF (pages 5–9).
 * Replace `src` with actual image paths once assets are placed in /public/assets/projects/
 * Filenames must match exactly.
 */
const GALLERY = [
  { src: '/assets/projects/domestic-1.svg',    label: 'Domestic Rooftop',          caption: 'Residential solar panel installation, Visakhapatnam', type: 'Rooftop'      },
  { src: '/assets/projects/domestic-2.svg',    label: 'Solar Pergola',              caption: 'Solar canopy / pergola installation',                  type: 'Rooftop'      },
  { src: '/assets/projects/rooftop-1.svg',     label: 'Hillside Rooftop',           caption: 'On-grid rooftop system with elevated structure',       type: 'Rooftop'      },
  { src: '/assets/projects/rooftop-2.svg',     label: 'Industrial Rooftop',         caption: 'Industrial-scale rooftop mounting structure',          type: 'Rooftop'      },
  { src: '/assets/projects/commercial-1.svg',  label: 'Ground Mount — Phase 1',     caption: 'Large-scale ground-mount array near transmission lines', type: 'Ground Mount' },
  { src: '/assets/projects/commercial-2.svg',  label: 'Ground Mount — Phase 2',     caption: 'Multi-MW open-field solar farm installation',          type: 'Ground Mount' },
];

const MAX_KW = Math.max(...PROJECTS.map((p) => p.kw));
type FilterType = 'All' | 'Rooftop' | 'Ground Mount';
const FILTERS: FilterType[] = ['All', 'Rooftop', 'Ground Mount'];

function fmt(n: number) { return n.toLocaleString('en-IN'); }

// ─── Icons ─────────────────────────────────────────────────────────────────────
function IconGrid() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  );
}
function IconBolt() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  );
}
function IconSun() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4"/>
      <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/>
    </svg>
  );
}

/** Sri Anu circular logo mark — mirrors the gear/sun badge from the company PDF */
function SriAnuLogoMark({ size = 44 }: { size?: number }) {
  return (
    <div
      className="rounded-full bg-[#0f1a10] flex items-center justify-center shrink-0 border border-brand-green/30"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.68} height={size * 0.68} viewBox="0 0 48 48" fill="none">
        {/* Outer tick marks — gear effect */}
        {Array.from({ length: 16 }).map((_, i) => {
          const rad = ((i * 360) / 16) * (Math.PI / 180);
          return (
            <line key={i}
              x1={24 + 19 * Math.cos(rad)} y1={24 + 19 * Math.sin(rad)}
              x2={24 + 23 * Math.cos(rad)} y2={24 + 23 * Math.sin(rad)}
              stroke="#22c55e" strokeWidth="2" strokeLinecap="round"
            />
          );
        })}
        <circle cx="24" cy="24" r="16" stroke="#22c55e" strokeWidth="0.8" fill="none" />
        {/* Sun rays */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = ((i * 45) - 22.5) * (Math.PI / 180);
          return (
            <line key={i}
              x1={24 + 9 * Math.cos(a)} y1={24 + 9 * Math.sin(a)}
              x2={24 + 13 * Math.cos(a)} y2={24 + 13 * Math.sin(a)}
              stroke="#facc15" strokeWidth="1.5" strokeLinecap="round"
            />
          );
        })}
        <circle cx="24" cy="24" r="7" fill="#22c55e" opacity="0.15" />
        <circle cx="24" cy="24" r="4.5" fill="#facc15" opacity="0.88" />
        <circle cx="24" cy="24" r="2" fill="#fff" />
      </svg>
    </div>
  );
}

/** Filter pill button — shared by table & gallery */
function FilterBtn({
  f, active, onClick,
}: { f: FilterType; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs font-heading font-600 border transition-all duration-150
        ${active
          ? f === 'All'
            ? 'bg-brand-green text-white border-brand-green shadow-sm'
            : f === 'Rooftop'
              ? 'bg-brand-green-light text-brand-green-dark border-brand-green/40'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          : 'bg-surface-soft text-text-secondary border-surface-border hover:bg-brand-green-light hover:text-brand-green'
        }`}
    >
      {f}
    </button>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Projects() {
  const { ref, inView } = useInView();

  const [tableFilter, setTableFilter]   = useState<FilterType>('All');
  const [search, setSearch]             = useState('');
  const [galleryFilter, setGalleryFilter] = useState<FilterType>('All');

  const filterCount: Record<FilterType, number> = {
    All:            PROJECTS.length,
    Rooftop:        PROJECTS.filter((p) => p.type === 'Rooftop').length,
    'Ground Mount': PROJECTS.filter((p) => p.type === 'Ground Mount').length,
  };

  // Filtered rows — always in original id order (1–19)
  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchType   = tableFilter === 'All' || p.type === tableFilter;
      const q           = search.toLowerCase();
      const matchSearch = !q || p.client.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      return matchType && matchSearch;
    });
  }, [tableFilter, search]);

  const totalKW          = filtered.reduce((s, p) => s + p.kw,  0);
  const totalKWH         = filtered.reduce((s, p) => s + p.kwh, 0);
  const rooftopCount     = filtered.filter((p) => p.type === 'Rooftop').length;
  const groundMountCount = filtered.filter((p) => p.type === 'Ground Mount').length;

  const visibleGallery =
    galleryFilter === 'All' ? GALLERY : GALLERY.filter((g) => g.type === galleryFilter);

  const stats = [
    { icon: <IconGrid />,     label: 'Projects',          value: String(filtered.length), sub: `of ${PROJECTS.length} total`,  accent: 'text-brand-green', iconBg: 'bg-brand-green-light', bg: 'from-brand-green/5 to-brand-green/10', border: 'border-brand-green/20', bar: 'bg-brand-green' },
    { icon: <IconBolt />,     label: 'Total Capacity',    value: `${(totalKW / 1000).toFixed(2)}`,           sub: 'MW installed',          accent: 'text-amber-600',    iconBg: 'bg-amber-50',          bg: 'from-amber-50 to-yellow-50',         border: 'border-amber-200',      bar: 'bg-amber-400'   },
    { icon: <IconSun />,      label: 'Annual Generation', value: `${(totalKWH / 1_000_000).toFixed(2)}`,     sub: 'Million kWh / yr',      accent: 'text-sky-600',      iconBg: 'bg-sky-50',            bg: 'from-sky-50 to-blue-50',             border: 'border-sky-200',        bar: 'bg-sky-400'     },
    { icon: <IconBuilding />, label: 'Installation Mix',  value: `${rooftopCount} / ${groundMountCount}`,    sub: 'Rooftop / Ground',      accent: 'text-violet-600',   iconBg: 'bg-violet-50',         bg: 'from-violet-50 to-purple-50',        border: 'border-violet-200',     bar: 'bg-violet-400'  },
  ];

  return (
    <section id="projects" className="bg-white py-24 px-5">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header with logo ── */}
        <div
          ref={ref}
          className={`mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <SriAnuLogoMark size={48} />
            <div>
              <span className="section-tag block mb-0.5">Track Record</span>
              <h2 className="section-title mb-0">Completed Projects</h2>
            </div>
          </div>
          <p className="section-body text-sm max-w-2xl ml-[60px]">
            From hospitals and educational institutions to industrial units and large-scale
            ground-mount farms — our portfolio speaks for itself.
          </p>
        </div>

        {/* ── Stats cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map(({ icon, label, value, sub, accent, iconBg, bg, border, bar }) => (
            <div
              key={label}
              className={`relative rounded-2xl border ${border} bg-gradient-to-br ${bg} px-5 py-5 flex flex-col gap-3 overflow-hidden`}
            >
              {/* Icon chip + label row */}
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg} ${accent}`}>
                  {icon}
                </div>
                <p className={`text-[9px] font-heading font-700 uppercase tracking-widest ${accent} opacity-60 text-right leading-tight max-w-[60px]`}>
                  {label}
                </p>
              </div>

              {/* Big value */}
              <div>
                <p className={`font-display font-800 text-3xl leading-none ${accent}`}>{value}</p>
                <p className="text-[11px] text-text-muted mt-1.5 font-body leading-tight">{sub}</p>
              </div>

              {/* Bottom accent bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${bar} opacity-40`} />
              {/* Decorative circle */}
              <div className={`absolute -right-5 -bottom-5 w-20 h-20 rounded-full opacity-[0.07] ${bar} bg-current pointer-events-none`} />
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search client or location…"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-surface-border bg-white text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-green transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <FilterBtn key={f} f={f} active={tableFilter === f} onClick={() => setTableFilter(f)} />
            ))}
            <span className="px-3 py-2 text-xs text-text-muted font-body self-center">
              ({filterCount[tableFilter]} shown)
            </span>
          </div>
        </div>

        {/* ── Projects table ── */}
        <div className="rounded-2xl border border-surface-border overflow-hidden shadow-card mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-surface-soft border-b border-surface-border">
                  {[
                    { label: 'S.No',              align: 'left'  },
                    { label: 'Client / Project',  align: 'left'  },
                    { label: 'Type',              align: 'left'  },
                    { label: 'Capacity (kW)',     align: 'right' },
                    { label: 'Location',          align: 'left'  },
                    { label: 'Annual Gen. (kWh)', align: 'right' },
                  ].map(({ label, align }) => (
                    <th
                      key={label}
                      className={`px-4 py-3 text-[10px] font-heading font-700 uppercase tracking-widest text-text-muted whitespace-nowrap
                        ${align === 'right' ? 'text-right' : 'text-left'}`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-surface-border">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-text-muted text-sm">
                      No projects match your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p, index) => {
                    const isGM = p.type === 'Ground Mount';
                    const pct  = Math.round((p.kw / MAX_KW) * 100);
                    return (
                      <tr key={p.id} className="hover:bg-surface-soft/60 transition-colors">
                        {/* S.No — sequential in display order */}
                        <td className="px-4 py-3 font-heading font-700 text-[11px] text-text-muted w-12 tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </td>
                        {/* Client */}
                        <td className="px-4 py-3 font-heading font-600 text-text-primary max-w-[220px]">
                          {p.client}
                        </td>
                        {/* Type badge */}
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 text-[11px] font-heading font-600 px-2.5 py-1 rounded-full border
                            ${isGM
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-brand-green-light text-brand-green-dark border-brand-green/30'
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isGM ? 'bg-amber-500' : 'bg-brand-green'}`} />
                            {isGM ? 'Ground mount' : 'Rooftop'}
                          </span>
                        </td>
                        {/* Capacity + mini bar */}
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-1 rounded-full bg-surface-border overflow-hidden hidden sm:block">
                              <div
                                className={`h-full rounded-full ${isGM ? 'bg-amber-400' : 'bg-brand-green'}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="font-display font-700 text-brand-green tabular-nums">{fmt(p.kw)}</span>
                          </div>
                        </td>
                        {/* Location */}
                        <td className="px-4 py-3 text-text-secondary text-[12px]">{p.location}</td>
                        {/* Annual kWh */}
                        <td className="px-4 py-3 text-right font-heading font-600 text-text-secondary tabular-nums text-[12px]">
                          {fmt(p.kwh)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>

              <tfoot>
                <tr className="bg-brand-green-light border-t-2 border-brand-green/20">
                  <td colSpan={3} className="px-4 py-3 font-heading font-800 text-brand-green-dark text-[10px] tracking-widest uppercase">
                    Total — {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                  </td>
                  <td className="px-4 py-3 text-right font-display font-800 text-brand-green text-lg tabular-nums">{fmt(totalKW)}</td>
                  <td />
                  <td className="px-4 py-3 text-right font-heading font-700 text-brand-green-dark tabular-nums">{fmt(totalKWH)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ── Photo Gallery ─────────────────────────────────────────────────── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="section-tag">Site Photography</span>
              <h3 className="font-display font-700 text-2xl text-text-primary mt-1">Project Gallery</h3>
              <p className="text-text-muted text-sm font-body mt-1">
                Real installations — domestic rooftops to commercial ground-mount farms.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <FilterBtn key={f} f={f} active={galleryFilter === f} onClick={() => setGalleryFilter(f)} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleGallery.map((photo, i) => {
              const isGM = photo.type === 'Ground Mount';
              return (
                <div
                  key={i}
                  className="group rounded-2xl overflow-hidden border border-surface-border shadow-card
                    hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  {/* Image with fallback */}
                  <div className="relative h-52 overflow-hidden bg-surface-soft">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        img.style.display = 'none';
                        const fb = img.nextElementSibling as HTMLElement | null;
                        if (fb) fb.style.display = 'flex';
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div
                      className={`absolute inset-0 flex-col items-center justify-center gap-2
                        ${isGM ? 'bg-amber-50' : 'bg-brand-green-light'}`}
                      style={{ display: 'none' }}
                    >
                      <span className="text-4xl">{isGM ? '🌿' : '🏠'}</span>
                      <span className={`text-xs font-heading font-600 ${isGM ? 'text-amber-700' : 'text-brand-green-dark'}`}>
                        {photo.label}
                      </span>
                      <span className="text-[10px] text-text-muted font-body text-center px-4">{photo.caption}</span>
                    </div>

                    {/* Type badge overlay */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-heading font-700 px-2 py-1 rounded-full backdrop-blur-sm
                        ${isGM
                          ? 'bg-amber-900/75 text-amber-100'
                          : 'bg-[#0f5c2e]/80 text-white'
                        }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                        {isGM ? 'Ground mount' : 'Rooftop'}
                      </span>
                    </div>

                    {/* Photo index */}
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm
                      flex items-center justify-center">
                      <span className="text-white text-[10px] font-heading font-700">{i + 1}</span>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="px-4 py-3">
                    <p className="font-heading font-700 text-text-primary text-sm">{photo.label}</p>
                    <p className="text-text-muted text-xs mt-0.5 font-body leading-relaxed">{photo.caption}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dev note */}
          <div className="mt-6 rounded-xl border border-dashed border-surface-border px-5 py-4 bg-surface-soft/50 text-center">
            <p className="text-text-muted text-xs font-body">
              📸 Place project photos in{' '}
              <code className="bg-white border border-surface-border rounded px-1.5 py-0.5 text-[10px] font-mono text-text-secondary">
                /public/assets/projects/
              </code>
              {' '}with filenames matching the <code className="bg-white border border-surface-border rounded px-1.5 py-0.5 text-[10px] font-mono text-text-secondary">GALLERY</code> array.
              The{' '}
              <span className="text-brand-green font-heading font-600">6 images</span>
              {' '}from the company profile PDF map to: domestic-1, domestic-2, rooftop-1, rooftop-2, commercial-1, commercial-2.
            </p>
          </div>
        </div>

        <p className="text-text-muted text-xs text-center mt-8 font-body">
          All figures represent completed and commissioned projects. Annual generation calculated at 1,460 kWh/kWp/year.
        </p>
      </div>
    </section>
  );
}