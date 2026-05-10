import { useEffect, useRef, useCallback } from 'react';
import { useCountUp } from '../../hooks/useApi';

const LOGO_SRC = '/assets/logo.png';

/**
 * Props for the StatCard component.
 */
interface StatCardProps {
  target: number;
  suffix: string;
  label: string;
  delay: string;
  start: boolean;
}

/**
 * A component that displays animated statistics with a count-up effect.
 */
function StatCard({ target, suffix, label, delay, start }: StatCardProps) {
  const count = useCountUp(target, 2000, start);
  const display = count.toString();

  return (
    <div
      className={`animate-fade-up opacity-0-start ${delay} text-center sm:text-left`}
      style={{ animationFillMode: 'both' }}
    >
      <div className="stat-number">
        {display}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/**
 * The Hero section component with parallax background and animated content.
 */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  /**
   * Handles the parallax scroll effect for the background.
   */
  const handleScroll = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const bg = hero.querySelector<HTMLElement>('.hero-bg-parallax');
    if (bg) {
      const y = window.scrollY;
      bg.style.transform = `translateY(${y * 0.3}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /**
   * Scrolls smoothly to the contact section.
   */
  const scrollToContact = useCallback(() => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  /**
   * Scrolls smoothly to the projects section.
   */
  const scrollToProjects = useCallback(() => {
    const projectsElement = document.getElementById('projects');
    if (projectsElement) {
      projectsElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient"
    >
      {/* ── Background layer ── */}
      <div className="hero-bg-parallax absolute inset-0">
        <div className="absolute inset-0 bg-dot-pattern opacity-40" />

        {/* Ambient glows */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full
          bg-brand-green-light opacity-60 blur-3xl" />
        <div className="absolute -bottom-48 -left-24 w-[500px] h-[500px] rounded-full
          bg-brand-gold-light opacity-50 blur-3xl" />

        {/* Animated sun ring — desktop only */}
        <div className="absolute top-20 right-[8%] hidden lg:block">
          <div className="relative w-72 h-72 opacity-20">
            <div className="absolute inset-0 rounded-full border-4 border-brand-green animate-spin-slow" />
            <div
              className="absolute inset-6 rounded-full border-2 border-brand-gold animate-spin-slow"
              style={{ animationDirection: 'reverse', animationDuration: '18s' }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-8xl animate-float">
              ☀️
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 w-full pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Text */}
          <div className="max-w-2xl">

            {/* Location tag */}
            <div
              className="animate-fade-up opacity-0-start animate-delay-100 inline-flex
                items-center gap-3 bg-white/80 backdrop-blur-sm border border-brand-green/20
                px-4 py-2 rounded-full mb-7 shadow-brand-sm"
              style={{ animationFillMode: 'both' }}
            >
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse-soft" />
              <span className="font-heading font-600 text-brand-green text-xs tracking-widest uppercase">
                Visakhapatnam · EPC Power Solutions
              </span>
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up opacity-0-start animate-delay-200 font-display
                text-5xl sm:text-6xl lg:text-7xl font-700 text-text-primary leading-[1.05] mb-5"
              style={{ animationFillMode: 'both' }}
            >
              Powering India With{' '}
              <span className="text-brand-green relative inline-block">
                Clean Solar
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 8 Q75 2 150 8 Q225 14 300 8"
                    stroke="#F5A623"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              {' '}Energy
            </h1>

            {/* Subtitle */}
            <p
              className="animate-fade-up opacity-0-start animate-delay-300 section-body
                text-lg mb-8"
              style={{ animationFillMode: 'both' }}
            >
              A team of passionate engineers delivering Turn-key EPC solar solutions —
              from residential rooftops to multi-megawatt commercial installations.
              Quality, commitment, and innovation at every step.
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-up opacity-0-start animate-delay-400
                flex flex-wrap gap-4 mb-14"
              style={{ animationFillMode: 'both' }}
            >
              <button onClick={scrollToContact} className="btn-primary px-7 py-3.5">
                Get Free Quote ✦
              </button>
              <button onClick={scrollToProjects} className="btn-outline px-7 py-3.5">
                View Projects →
              </button>
            </div>

            {/* Stats row */}
            <div
              className="animate-fade-up opacity-0-start animate-delay-500
                pt-8 border-t border-brand-green/15"
              style={{ animationFillMode: 'both' }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
                <StatCard target={19} suffix="+"   label="Projects Delivered" delay="animate-delay-500" start={true} />
                <StatCard target={16} suffix=" MW"  label="Total Capacity"    delay="animate-delay-500" start={true} />
                <StatCard target={22} suffix="M+"   label="kWh / Year"        delay="animate-delay-500" start={true} />
                <StatCard target={25} suffix=" yr"  label="PPA Duration"      delay="animate-delay-500" start={true} />
              </div>
            </div>
          </div>

          {/* RIGHT — Logo card (desktop) */}
          <div
            className="hidden lg:flex flex-col items-center justify-center
              animate-fade-up opacity-0-start animate-delay-300"
            style={{ animationFillMode: 'both' }}
          >
            {/* Dark card identical in style to About's heroCard */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-brand-lg w-full max-w-sm"
              style={{
                background: 'linear-gradient(145deg, #1a4731 0%, #0f2d1e 60%, #1a3320 100%)',
                padding: '44px 36px 36px',
              }}
            >
              {/* Radial glow inside card */}
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(46,204,113,0.25) 0%, transparent 70%)',
                }}
              />
              {/* Second glow bottom-left */}
              <div
                className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)',
                }}
              />

              {/* Logo — mix-blend-mode:screen strips white bg */}
              <div className="relative z-10 flex justify-center mb-3">
                <img
                  src={LOGO_SRC}
                  alt="Sri Anu Infrastructure"
                  className="w-52 h-auto"
                  style={{ mixBlendMode: 'screen', filter: 'brightness(1.15)' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>

              {/* Tagline under logo */}
              <p
                className="relative z-10 text-center font-heading font-500 tracking-widest uppercase mb-8"
                style={{ fontSize: 10, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.16em' }}
              >
                Engineering · Procurement · Construction
              </p>

              {/* 2×2 stat cells — same as About */}
              <div className="relative z-10 grid grid-cols-2 gap-3">
                {[
                  { icon: '⚡', num: '19+',   lbl: 'Projects Completed' },
                  { icon: '☀️', num: '16 MW', lbl: 'Capacity Installed'  },
                  { icon: '📅', num: '5+',    lbl: 'Years of Excellence' },
                  { icon: '🏗️', num: '100%',  lbl: 'EPC Turnkey'         },
                ].map((s) => (
                  <div
                    key={s.lbl}
                    className="flex flex-col items-center text-center rounded-xl py-3 px-2"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span className="text-lg mb-1">{s.icon}</span>
                    <span
                      className="font-display font-800 leading-none mb-1"
                      style={{ fontSize: 20, color: '#F5A623' }}
                    >
                      {s.num}
                    </span>
                    <span
                      className="font-heading font-500 leading-snug"
                      style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em' }}
                    >
                      {s.lbl}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge — Clean Energy (mirrors About) */}
            <div
              className="absolute flex items-center gap-3 bg-white rounded-2xl shadow-card-hover px-4 py-3"
              style={{
                bottom: '12%', left: '4%',
                border: '1px solid rgba(46,204,113,0.20)',
              }}
            >
              <span className="text-2xl">🌿</span>
              <div>
                <div className="font-heading font-700 text-text-primary text-sm">100% Clean</div>
                <div className="font-heading font-500 text-text-muted text-xs">Renewable Energy</div>
              </div>
            </div>

            {/* Floating badge — R&D */}
            <div
              className="absolute flex items-center gap-3 bg-white rounded-2xl shadow-card-hover px-4 py-3"
              style={{
                top: '10%', right: '2%',
                border: '1px solid rgba(245,166,35,0.20)',
              }}
            >
              <span className="text-2xl">⚗️</span>
              <div>
                <div className="font-heading font-700 text-text-primary text-sm">R&D Driven</div>
                <div className="font-heading font-500 text-text-muted text-xs">Innovation at Core</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col
        items-center gap-2 animate-bounce">
        <span className="font-heading font-600 text-text-muted text-2xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-brand-green to-transparent" />
      </div>
    </section>
  );
}