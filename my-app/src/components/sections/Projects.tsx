
import { useState, useMemo } from 'react';
import { useInView } from '../../hooks/useApi';

const PROJECTS = [
  { id: 1, client: 'Arette22', kw: 1000, location: 'Narsapur', kwh: 1460000, type: 'Ground Mount' },
  { id: 2, client: 'Sahuwala Cylinders Pvt Ltd', kw: 1000, location: 'Auto Nagar', kwh: 1460000, type: 'Rooftop' },
  { id: 3, client: 'Sparsh Hospital', kw: 3300, location: 'Chitradurga', kwh: 4818000, type: 'Ground Mount' },
  { id: 4, client: 'Don Bosco Inst. of Technology', kw: 470, location: 'Kumbalagudu', kwh: 686200, type: 'Rooftop' },
  { id: 5, client: 'M/s Best Cartons Unit 2', kw: 400, location: 'Mysore', kwh: 584000, type: 'Rooftop' },
  { id: 6, client: 'Ballari Health City', kw: 213, location: 'Ballari', kwh: 310980, type: 'Rooftop' },
  { id: 7, client: 'LENDI Institute of Engg & Tech', kw: 200, location: 'Vizianagaram', kwh: 292000, type: 'Rooftop' },
  { id: 8, client: 'Don Bosco Inst. of Technology', kw: 170, location: 'Bangalore', kwh: 248200, type: 'Rooftop' },
  { id: 9, client: 'Amrutha Sai Cold Storage', kw: 154, location: 'Chitradurga', kwh: 224840, type: 'Rooftop' },
  { id: 10, client: 'M/s Eshwar Foods & Packaging', kw: 150, location: 'Mysore', kwh: 219000, type: 'Rooftop' },
  { id: 11, client: 'M/s OM Hospitals', kw: 90, location: 'Ranebennure', kwh: 131400, type: 'Rooftop' },
  { id: 12, client: 'M/s OM Hospitals', kw: 90, location: 'Haveri', kwh: 131400, type: 'Rooftop' },
  { id: 13, client: 'RMC Bricks', kw: 80, location: 'Chitradurga', kwh: 116800, type: 'Rooftop' },
  { id: 14, client: 'Royal Agro Pipes', kw: 67, location: 'Kudligi', kwh: 97820, type: 'Rooftop' },
  { id: 15, client: 'Jain College Boys Hostel', kw: 60, location: 'Davanagere', kwh: 87600, type: 'Rooftop' },
  { id: 16, client: 'Jain College Boys Hostel', kw: 30, location: 'Davangere', kwh: 43800, type: 'Rooftop' },
  { id: 17, client: 'Rayalsons', kw: 2860, location: 'Kudiligi', kwh: 4175600, type: 'Ground Mount' },
  { id: 18, client: 'Navami', kw: 4500, location: 'Hiruyuru', kwh: 6570000, type: 'Ground Mount' },
  { id: 19, client: 'Rosetta', kw: 520, location: 'Sakleshpura', kwh: 759200, type: 'Rooftop' },
];

const GALLERY = [
  {
    src: '/assets/projects/image.png',
    label: 'Domestic Rooftop',
    caption: 'Residential rooftop solar installation',
    type: 'Rooftop'
  },
  {
    src: '/assets/projects/image2.png',
    label: 'Solar Farm Installation',
    caption: 'Large scale solar farm project',
    type: 'Ground Mount'
  },
  {
    src: '/assets/projects/image3.png',
    label: 'Commercial Solar Plant',
    caption: 'Commercial solar infrastructure setup',
    type: 'Ground Mount'
  },
  {
    src: '/assets/projects/image4.png',
    label: 'Industrial Rooftop',
    caption: 'Industrial rooftop solar project',
    type: 'Rooftop'
  },
  {
    src: '/assets/projects/image5.png',
    label: 'Ground Mount System',
    caption: 'Ground mounted photovoltaic system',
    type: 'Ground Mount'
  },
  {
    src: '/assets/projects/image6.png',
    label: 'Modern Solar Array',
    caption: 'Advanced renewable energy installation',
    type: 'Ground Mount'
  },
];

const MAX_KW = Math.max(...PROJECTS.map((p) => p.kw));
type FilterType = 'All' | 'Rooftop' | 'Ground Mount';
const FILTERS: FilterType[] = ['All', 'Rooftop', 'Ground Mount'];

function fmt(n: number) {
  return n.toLocaleString('en-IN');
}

function FilterBtn({
  f,
  active,
  onClick,
}: {
  f: FilterType;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-150
        ${active
          ? f === 'All'
            ? 'bg-green-600 text-white border-green-600'
            : f === 'Rooftop'
              ? 'bg-green-100 text-green-800 border-green-300'
              : 'bg-amber-100 text-amber-800 border-amber-300'
          : 'bg-white text-gray-600 border-gray-200 hover:bg-green-50 hover:text-green-700'
        }`}
    >
      {f}
    </button>
  );
}

export default function Projects() {
  const { ref, inView } = useInView();

  const [tableFilter, setTableFilter] = useState<FilterType>('All');
  const [galleryFilter, setGalleryFilter] = useState<FilterType>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchType = tableFilter === 'All' || p.type === tableFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.client.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);

      return matchType && matchSearch;
    });
  }, [tableFilter, search]);

  const visibleGallery =
    galleryFilter === 'All'
      ? GALLERY
      : GALLERY.filter((g) => g.type === galleryFilter);

  const totalKW = filtered.reduce((s, p) => s + p.kw, 0);
  const totalKWH = filtered.reduce((s, p) => s + p.kwh, 0);

  return (
    <section id="projects" className="bg-white py-24 px-5">
      <div className="max-w-7xl mx-auto">

        <div
          ref={ref}
          className={`mb-10 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-green-600 font-semibold uppercase tracking-widest text-xs">
            Track Record
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Completed Projects
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl text-sm leading-relaxed">
            From hospitals and educational institutions to industrial units and
            large-scale solar farms.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
            <p className="text-sm text-gray-500">Projects</p>
            <h3 className="text-3xl font-bold text-green-700 mt-2">
              {filtered.length}
            </h3>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <p className="text-sm text-gray-500">Total Capacity</p>
            <h3 className="text-3xl font-bold text-amber-700 mt-2">
              {(totalKW / 1000).toFixed(2)} MW
            </h3>
          </div>

          <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100">
            <p className="text-sm text-gray-500">Annual Generation</p>
            <h3 className="text-3xl font-bold text-sky-700 mt-2">
              {(totalKWH / 1000000).toFixed(2)} M
            </h3>
          </div>

          <div className="bg-violet-50 rounded-2xl p-5 border border-violet-100">
            <p className="text-sm text-gray-500">Max Capacity</p>
            <h3 className="text-3xl font-bold text-violet-700 mt-2">
              {MAX_KW} kW
            </h3>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search client or location..."
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm w-full md:w-80 focus:outline-none focus:border-green-500"
          />

          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <FilterBtn
                key={f}
                f={f}
                active={tableFilter === f}
                onClick={() => setTableFilter(f)}
              />
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-20">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">S.No</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-right">Capacity</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-right">Annual Gen.</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p, index) => {
                const isGM = p.type === 'Ground Mount';

                return (
                  <tr
                    key={p.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-4">{index + 1}</td>

                    <td className="px-4 py-4 font-semibold text-gray-800">
                      {p.client}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          isGM
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {p.type}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-right font-bold text-green-700">
                      {fmt(p.kw)}
                    </td>

                    <td className="px-4 py-4 text-gray-600">{p.location}</td>

                    <td className="px-4 py-4 text-right text-gray-700">
                      {fmt(p.kwh)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-green-600 font-semibold uppercase tracking-widest text-xs">
                Site Photography
              </span>

              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                Project Gallery
              </h3>
            </div>

            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <FilterBtn
                  key={f}
                  f={f}
                  active={galleryFilter === f}
                  onClick={() => setGalleryFilter(f)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleGallery.map((photo, i) => {
              const isGM = photo.type === 'Ground Mount';

              return (
                <div
                  key={i}
                  className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div
                    className="relative h-80 bg-cover bg-center"
                    style={{ backgroundImage: `url(${photo.src})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm
                        ${
                          isGM
                            ? 'bg-amber-900/70 text-amber-100'
                            : 'bg-green-900/70 text-white'
                        }`}
                      >
                        {photo.type}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
                      <h4 className="text-xl font-bold mb-2">
                        {photo.label}
                      </h4>

                      <p className="text-sm text-white/90 leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-12">
          All figures represent completed and commissioned projects.
        </p>
      </div>
    </section>
  );
}
