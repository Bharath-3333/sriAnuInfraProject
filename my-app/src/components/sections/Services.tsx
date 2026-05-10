import { useInView } from '../../hooks/useApi';

const SERVICES = [
  {
    number: '01',
    icon: '🏠',
    title: 'Rooftop Solar Systems',
    description:
      'On-grid rooftop installations for homes and institutions with full net metering setup and ESCOM integration.',
    features: ['Design & Engineering', 'Grid Connection', 'Net Metering', 'ESCOM Approval'],
    accent: 'brand-green',
  },
  {
    number: '02',
    icon: '🏭',
    title: 'Ground Mount Solar',
    description:
      'Large-scale ground-mounted solar plants for commercial and industrial clients, from design to commissioning.',
    features: ['Site Assessment', 'Structure Design', 'Grid Evacuation', 'Commissioning'],
    accent: 'brand-gold',
  },
  {
    number: '03',
    icon: '⚙️',
    title: 'Turn-key EPC',
    description:
      'Complete Engineering, Procurement, and Construction services — single point of accountability.',
    features: ['Engineering', 'Procurement', 'Construction', 'Quality Assurance'],
    accent: 'brand-green',
  },
  {
    number: '04',
    icon: '🔬',
    title: 'R&D & Innovation',
    description:
      'Continuous research into emerging energy technologies to bring future-ready solutions today.',
    features: ['Tech Research', 'Pilot Projects', 'Performance Analytics', 'Innovation Lab'],
    accent: 'brand-gold',
  },
  {
    number: '05',
    icon: '🔧',
    title: 'O&M Support',
    description:
      'Ongoing Operations & Maintenance ensuring your solar plant performs at peak efficiency year after year.',
    features: ['Annual Maintenance', 'Performance Reports', 'Remote Monitoring', 'Emergency Support'],
    accent: 'brand-green',
  },
  {
    number: '06',
    icon: '📋',
    title: 'Government Approvals',
    description:
      'Complete documentation and liaison for government approvals, ESCOM registration, and net-metering compliance.',
    features: ['ESCOM Registration', 'Net Metering Docs', 'Subsidy Processing', 'Compliance'],
    accent: 'brand-gold',
  },
];

function ServiceCard({ service, index }: { service: (typeof SERVICES)[0]; index: number }) {
  const isGreen = service.accent === 'brand-green';

  return (
    <div
      className="group bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover
        border border-surface-border hover:border-brand-green/30
        transition-all duration-300 hover:-translate-y-1 flex flex-col gap-5"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl
            ${isGreen ? 'bg-brand-green-light' : 'bg-brand-gold-light'}
            transition-transform duration-300 group-hover:scale-110`}
        >
          {service.icon}
        </div>
        <span
          className={`font-display text-4xl font-700 leading-none
            ${isGreen ? 'text-brand-green/10' : 'text-brand-gold/15'}
            group-hover:${isGreen ? 'text-brand-green/20' : 'text-brand-gold/25'}
            transition-colors duration-300`}
        >
          {service.number}
        </span>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-heading font-700 text-text-primary text-lg mb-2 leading-snug">
          {service.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed font-body">
          {service.description}
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {service.features.map((f) => (
          <span
            key={f}
            className={`text-xs font-heading font-600 px-2.5 py-1 rounded-full
              ${isGreen
                ? 'bg-brand-green-light text-brand-green-dark'
                : 'bg-brand-gold-light text-brand-gold-dark'
              }`}
          >
            {f}
          </span>
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        className={`h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full
          ${isGreen ? 'bg-brand-green' : 'bg-brand-gold'}`}
      />
    </div>
  );
}

export default function Services() {
  const { ref, inView } = useInView();

  return (
    <section id="services" className="bg-white py-24 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          ref={ref}
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14
            transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div>
            <span className="section-tag">What We Do</span>
            <h2 className="section-title mb-0">Our Services</h2>
          </div>
          <p className="text-text-muted text-sm leading-relaxed font-body max-w-sm lg:text-right">
            End-to-end renewable energy solutions for homes, institutions, industries,
            and large commercial facilities across India.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-text-muted text-sm mb-4 font-body">
            Not sure which service you need?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            Talk to Our Engineers →
          </button>
        </div>
      </div>
    </section>
  );
}