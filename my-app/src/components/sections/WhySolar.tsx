import { useInView } from '../../hooks/useApi';

const WHY_POINTS = [
  {
    icon: '🌫️',
    title: 'Fossil Fuels Pollute',
    text: 'Combustion of hydrocarbon fuels emits CO₂, CO, SOₓ, and NOₓ — key drivers of climate change and environmental degradation.',
  },
  {
    icon: '♾️',
    title: 'Inexhaustible Source',
    text: 'Solar, wind, and water are essentially unlimited — unlike fossil fuels, they replenish naturally every single day.',
  },
  {
    icon: '🌿',
    title: 'Zero Harmful Emissions',
    text: 'Renewable energy can be harnessed without releasing any harmful pollutants into the environment.',
  },
  {
    icon: '💰',
    title: 'Massive Cost Savings',
    text: 'Solar installations typically pay back in 3–5 years, then generate free electricity for 25+ years.',
  },
];

const BENEFITS = [
  { icon: '📉', label: 'Up to 90%', sub: 'Reduction in electricity bills' },
  { icon: '🌱', label: '0 Tons', sub: 'CO₂ emissions per year' },
  { icon: '📅', label: '25 Years', sub: 'Guaranteed panel performance' },
  { icon: '🏛️', label: 'Subsidies', sub: 'Central & State Government' },
];

export default function WhySolar() {
  const { ref, inView } = useInView();

  return (
    <section id="why" className="bg-surface-muted py-24 px-5 relative overflow-hidden">
      {/* Decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none
          select-none overflow-hidden"
      >
        <span className="font-display text-[20vw] font-800 text-brand-green/4
          whitespace-nowrap tracking-wider">
          RENEWABLE
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start
            transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >

          {/* Left: Why points */}
          <div>
            <span className="section-tag">Why It Matters</span>
            <h2 className="section-title">
              The Case For Renewable Energy
            </h2>
            <p className="section-body mb-10">
              Fossil fuels are finite, polluting, and increasingly expensive.
              Solar energy is the smart, sustainable choice for India's growing power needs.
            </p>

            <div className="flex flex-col gap-4">
              {WHY_POINTS.map((p) => (
                <div
                  key={p.title}
                  className="flex gap-4 bg-white rounded-xl p-5 shadow-card
                    border-l-4 border-l-brand-green hover:shadow-card-hover
                    transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-green-light flex items-center
                    justify-center text-lg flex-shrink-0">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="font-heading font-700 text-text-primary text-sm mb-1">
                      {p.title}
                    </h4>
                    <p className="text-text-muted text-xs leading-relaxed font-body">
                      {p.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Vision / CTA box */}
          <div className="flex flex-col gap-6">

            {/* Vision card */}
            <div className="bg-green-gradient rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-dot-pattern opacity-20" />
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative z-10">
                <div className="text-4xl mb-4">🌞</div>
                <h3 className="font-display text-2xl font-700 mb-3">
                  Our <span className="text-brand-gold">Vision</span>
                </h3>
                <p className="text-green-100 text-sm leading-relaxed mb-4 font-body">
                  To make renewable energy a part of everyday life — deriving clean,
                  efficient power directly from nature for a sustainable future.
                </p>
                <p className="text-green-100 text-sm leading-relaxed font-body">
                  <strong className="text-white font-heading font-700">Our Mission:</strong>{' '}
                  Serve every customer with quality products and efficient system service
                  using minimal resources.
                </p>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-6 inline-flex items-center gap-2 bg-brand-gold text-text-primary
                    font-heading font-700 px-5 py-3 rounded-lg text-sm tracking-wide uppercase
                    transition-all duration-300 hover:bg-white hover:-translate-y-0.5"
                >
                  Start Your Solar Journey →
                </button>
              </div>
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-2 gap-4">
              {BENEFITS.map((b) => (
                <div
                  key={b.label}
                  className="bg-white rounded-2xl p-5 shadow-card border border-surface-border
                    text-center hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="text-2xl mb-2">{b.icon}</div>
                  <div className="font-display font-700 text-brand-green text-xl mb-0.5">
                    {b.label}
                  </div>
                  <div className="text-text-muted text-xs font-heading font-500 leading-tight">
                    {b.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}