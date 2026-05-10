import { useInView } from '../../hooks/useApi';

const FLOW_STEPS = [
  { icon: '☀️', label: 'Solar Panels',        sub: 'Generates DC power',         highlight: true  },
  { icon: '⚡', label: 'Inverter',             sub: 'DC → AC conversion',         highlight: false },
  { icon: '📊', label: 'Generation Meter',     sub: 'Measures total output',      highlight: false },
  { icon: '🔌', label: 'LT Distribution Panel',sub: 'Power distribution hub',     highlight: false },
  { icon: '↔️', label: 'Bidirectional Meter',  sub: 'Tracks import & export',     highlight: true  },
  { icon: '🏠', label: 'Own Loads / Grid',     sub: 'Self-use + grid export',     highlight: false },
];

const FEATURES = [
  {
    letter: 'A',
    title:  'Self-Consumption First',
    text:   'Solar power is consumed for own use first. Only surplus power is exported to the ESCOM grid.',
  },
  {
    letter: 'B',
    title:  'Bidirectional Metering',
    text:   'A bidirectional meter replaces your existing meter to accurately track both import and export units.',
  },
  {
    letter: 'C',
    title:  'Monthly Net Billing',
    text:   'Your bill is based on net import (units imported minus units exported). Pay only the difference.',
  },
  {
    letter: 'D',
    title:  'Annual Settlement',
    text:   'Any surplus export credit is settled annually by the ESCOM at the applicable feed-in tariff rate.',
  },
];

const STEPS = [
  { num: '01', title: 'Site Survey',         text: 'Free on-site assessment of your roof area, shadow analysis, and load profiling.' },
  { num: '02', title: 'System Design',       text: 'Engineering design with optimal panel layout, inverter sizing, and yield projections.' },
  { num: '03', title: 'ESCOM Application',   text: 'We handle all paperwork — ESCOM forms, NOC, net metering application, and approvals.' },
  { num: '04', title: 'Installation',        text: 'Professional installation by certified engineers with quality materials and workmanship.' },
  { num: '05', title: 'Meter Installation',  text: 'ESCOM installs the bidirectional net meter. Your system goes live.' },
  { num: '06', title: 'Enjoy Savings',       text: 'Monitor your generation, track your savings, and watch your payback accumulate.' },
];

export default function NetMetering() {
  const { ref, inView } = useInView();

  return (
    <section id="netmetering" className="bg-surface-soft py-24 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={ref} className={`mb-14 transition-all duration-700
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="section-tag">How It Works</span>
          <h2 className="section-title">Net Metering System</h2>
          <p className="section-body">
            Net metering lets you sell excess solar power back to the grid,
            dramatically reducing — or even eliminating — your electricity bills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Flow diagram */}
          <div className="bg-white rounded-3xl p-8 shadow-card border border-surface-border">
            <h3 className="font-heading font-700 text-text-muted text-xs tracking-widest uppercase mb-8">
              System Flow Diagram
            </h3>
            <div className="flex flex-col items-center gap-0">
              {FLOW_STEPS.map((step, i) => (
                <div key={step.label} className="w-full">
                  <div
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200
                      ${step.highlight
                        ? 'bg-green-gradient text-white shadow-brand-sm'
                        : 'bg-surface-soft border border-surface-border'
                      }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0
                        ${step.highlight ? 'bg-white/20' : 'bg-brand-green-light'}`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <div className={`font-heading font-700 text-sm
                        ${step.highlight ? 'text-white' : 'text-text-primary'}`}>
                        {step.label}
                      </div>
                      <div className={`text-xs font-body mt-0.5
                        ${step.highlight ? 'text-green-100' : 'text-text-muted'}`}>
                        {step.sub}
                      </div>
                    </div>
                    {step.highlight && (
                      <div className="ml-auto">
                        <span className="badge bg-white/20 text-white text-2xs">Key</span>
                      </div>
                    )}
                  </div>
                  {i < FLOW_STEPS.length - 1 && (
                    <div className="flex justify-center my-1">
                      <div className="w-px h-5 bg-brand-green/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Features list */}
          <div className="flex flex-col gap-5">
            <h3 className="font-heading font-700 text-xs tracking-widest uppercase text-text-muted mb-1">
              How Net Billing Works
            </h3>
            {FEATURES.map((f) => (
              <div
                key={f.letter}
                className="flex gap-4 bg-white rounded-xl p-5 shadow-card border-l-4
                  border-l-brand-green hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-full bg-brand-green flex items-center
                  justify-center font-display font-700 text-white text-sm flex-shrink-0">
                  {f.letter}
                </div>
                <div>
                  <h4 className="font-heading font-700 text-text-primary text-sm mb-1">
                    {f.title}
                  </h4>
                  <p className="text-text-muted text-xs leading-relaxed font-body">
                    {f.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-20">
          <h3 className="font-display text-2xl font-700 text-text-primary text-center mb-10">
            Our Installation Process
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 shadow-card border border-surface-border
                  relative overflow-hidden group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="absolute top-3 right-4 font-display text-5xl font-800
                  text-brand-green/8 leading-none">
                  {step.num}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-brand-green text-white
                    font-heading font-800 text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h4 className="font-heading font-700 text-text-primary text-sm">
                    {step.title}
                  </h4>
                </div>
                <p className="text-text-muted text-xs leading-relaxed font-body">
                  {step.text}
                </p>
                <div className="h-0.5 w-0 group-hover:w-full bg-brand-green mt-4
                  transition-all duration-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}