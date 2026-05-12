import type { CSSProperties, SyntheticEvent } from 'react';
import { useInView } from '../../hooks/useApi';
import logo from '../../assets/project logo.jpeg';

// Sri Anu Infrastructure logo with transparent background for light and dark use.
const LOGO_SRC = logo;

const VALUES = [
  {
    icon: '🔥',
    title: 'Passion',
    description: 'We embrace failures as lessons and never stop updating our technologies.',
    accent: '#F5A623',
  },
  {
    icon: '🤝',
    title: 'Client Centricity',
    description: 'Matching expectations with efficient, economical solutions backed by proven case studies.',
    accent: '#2ECC71',
  },
  {
    icon: '⏱️',
    title: 'Commitment',
    description: 'We pledge our time to deliver assured quality on schedule — every time.',
    accent: '#F5A623',
  },
  {
    icon: '🛡️',
    title: 'Reliability',
    description: 'Quality workmanship through deep system understanding. No compromise.',
    accent: '#2ECC71',
  },
  {
    icon: '🤲',
    title: 'Team Work',
    description: 'Synergistic collaboration to achieve systematic, excellence-driven results.',
    accent: '#F5A623',
  },
  {
    icon: '🔬',
    title: 'Innovation',
    description: "Continuous R&D — exploring ancient wisdom and modern tech to deliver tomorrow's solutions today.",
    accent: '#2ECC71',
  },
];

const STATS = [
  { number: '19+', label: 'Projects Completed', icon: '⚡' },
  { number: '16 MW', label: 'Capacity Installed', icon: '☀️' },
  { number: '5+', label: 'Years of Excellence', icon: '📅' },
  { number: '100%', label: 'EPC Turnkey', icon: '🏗️' },
];

type Value = {
  icon: string;
  title: string;
  description: string;
  accent: string;
};

type ValueCardProps = {
  v: Value;
  delay: number;
  inView: boolean;
};

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" style={styles.section}>
      {/* Decorative background blobs */}
      <div style={styles.blobTopRight} />
      <div style={styles.blobBottomLeft} />

      <div style={styles.container} ref={ref}>

        {/* ── Section Header ── */}
        <div
          style={{
            ...styles.header,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span style={styles.eyebrow}>WHO WE ARE</span>
          <h2 style={styles.sectionTitle}>
            Powering India's Clean&nbsp;
            <span style={styles.titleAccent}>Energy Future</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Sri Anu Infrastructure — Visakhapatnam's leading turnkey EPC solar company,
            delivering engineering excellence from rooftop to multi‑megawatt scale.
          </p>
        </div>

        {/* ── Main Grid ── */}
        <div style={styles.mainGrid}>

          {/* LEFT — Visual Card */}
          <div
            style={{
              ...styles.visualCol,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s',
            }}
          >
            {/* Hero card */}
            <div style={styles.heroCard}>
              {/* Radial glow */}
              <div style={styles.cardGlow} />

              {/* Logo — mix-blend-mode removes white bg without Photoshop */}
              <div style={styles.logoWrap}>
                <img
                  src={LOGO_SRC}
                  alt="Project logo"
                  style={styles.logo}
                  onError={(e: SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <p style={styles.cardTagline}>Engineering · Procurement · Construction</p>

              {/* Stats grid inside card */}
              <div style={styles.statsGrid}>
                {STATS.map((s) => (
                  <div key={s.label} style={styles.statCell}>
                    <span style={styles.statIcon}>{s.icon}</span>
                    <span style={styles.statNumber}>{s.number}</span>
                    <span style={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge — Clean Energy */}
            <div style={styles.badgeClean}>
              <span style={styles.badgeEmoji}>🌿</span>
              <div>
                <div style={styles.badgeTitle}>100% Clean</div>
                <div style={styles.badgeSub}>Renewable Energy</div>
              </div>
            </div>

            {/* Floating badge — R&D */}
            <div style={styles.badgeRD}>
              <span style={{ fontSize: 22 }}>⚗️</span>
              <div>
                <div style={styles.badgeTitle}>R&D Driven</div>
                <div style={styles.badgeSub}>Innovation at Core</div>
              </div>
            </div>
          </div>

          {/* RIGHT — Text + Values */}
          <div
            style={{
              ...styles.textCol,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s',
            }}
          >
            {/* Vision & Mission pills */}
            <div style={styles.pillRow}>
              <div style={styles.pill}>
                <span style={styles.pillDot('#2ECC71')} />
                <span style={styles.pillText}>
                  <b>Vision:</b> Renewable energy as a way of life
                </span>
              </div>
              <div style={styles.pill}>
                <span style={styles.pillDot('#F5A623')} />
                <span style={styles.pillText}>
                  <b>Mission:</b> Quality products · Minimal resources
                </span>
              </div>
            </div>

            <p style={styles.bodyText}>
              Sri Anu Infrastructure is a Visakhapatnam‑based EPC powerhouse built by young,
              passionate engineers who live and breathe electrical technology. We don't just
              install solar — we engineer complete turnkey solutions, from concept to grid
              synchronisation, backed by relentless R&amp;D and a growing portfolio of{' '}
              <b style={{ color: '#F5A623' }}>19+ projects</b> spanning hospitals, colleges,
              cold storages, and large‑scale commercial farms across India.
            </p>
          </div>
        </div>

        {/* ── Core values section ── */}
        <div style={styles.valuesSection}>
          <div style={styles.valuesHeading}>
            <span style={styles.valuesLine} />
            <span style={styles.valuesLabel}>Our Core Values</span>
            <span style={styles.valuesLine} />
          </div>

          <div style={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} v={v} delay={i * 60} inView={inView} />
            ))}
          </div>
        </div>

        {/* ── Bottom Banner ── */}
        <div
          style={{
            ...styles.banner,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
          }}
        >
          <div style={styles.bannerInner}>
            <span style={styles.bannerEmoji}>☀️</span>
            <p style={styles.bannerText}>
              From a single rooftop to a <b>16 MW portfolio</b> — Sri Anu Infrastructure
              is your trusted EPC partner for a cleaner, greener tomorrow.
            </p>
            <a href="#contact" style={styles.bannerBtn}>Get a Free Quote →</a>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── Value Card sub-component ── */
function ValueCard({ v, delay, inView }: ValueCardProps) {
  return (
    <div
      style={{
        ...styles.valueCard,
        borderLeft: `3px solid ${v.accent}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.55s ease ${delay + 350}ms, transform 0.55s ease ${delay + 350}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.10)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
      }}
    >
      <span style={styles.valueIcon}>{v.icon}</span>
      <div style={{ ...styles.valueTitle, color: v.accent }}>{v.title}</div>
      <div style={styles.valueDesc}>{v.description}</div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Inline styles (no Tailwind dependency)
   ──────────────────────────────────────────── */
type AboutStyles = {
  section: CSSProperties;
  blobTopRight: CSSProperties;
  blobBottomLeft: CSSProperties;
  container: CSSProperties;
  header: CSSProperties;
  eyebrow: CSSProperties;
  sectionTitle: CSSProperties;
  titleAccent: CSSProperties;
  sectionSubtitle: CSSProperties;
  mainGrid: CSSProperties;
  visualCol: CSSProperties;
  heroCard: CSSProperties;
  cardGlow: CSSProperties;
  logoWrap: CSSProperties;
  logo: CSSProperties;
  cardTagline: CSSProperties;
  statsGrid: CSSProperties;
  statCell: CSSProperties;
  statIcon: CSSProperties;
  statNumber: CSSProperties;
  statLabel: CSSProperties;
  badgeClean: CSSProperties;
  badgeRD: CSSProperties;
  badgeEmoji: CSSProperties;
  badgeTitle: CSSProperties;
  badgeSub: CSSProperties;
  textCol: CSSProperties;
  pillRow: CSSProperties;
  pill: CSSProperties;
  pillDot: (color: string) => CSSProperties;
  pillText: CSSProperties;
  bodyText: CSSProperties;
  valuesHeading: CSSProperties;
  valuesLine: CSSProperties;
  valuesLabel: CSSProperties;
  valuesSection: CSSProperties;
  valuesGrid: CSSProperties;
  valueCard: CSSProperties;
  valueIcon: CSSProperties;
  valueTitle: CSSProperties;
  valueDesc: CSSProperties;
  banner: CSSProperties;
  bannerInner: CSSProperties;
  bannerEmoji: CSSProperties;
  bannerText: CSSProperties;
  bannerBtn: CSSProperties;
};

const styles: AboutStyles = {
  section: {
    position: 'relative',
    background: 'linear-gradient(160deg, #f8fffe 0%, #f6faf4 48%, #fffef5 100%)',
    padding: '80px 20px 72px',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  },
  blobTopRight: {
    position: 'absolute', top: -100, right: -100,
    width: 360, height: 360, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(46,204,113,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  blobBottomLeft: {
    position: 'absolute', bottom: -100, left: -100,
    width: 380, height: 380, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },

  /* Header */
  header: {
    textAlign: 'center',
    marginBottom: 64,
    maxWidth: 760,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  eyebrow: {
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.18em',
    color: '#2ECC71',
    background: 'rgba(46,204,113,0.10)',
    borderRadius: 28,
    padding: '6px 16px',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 'clamp(26px, 3.6vw, 40px)',
    fontWeight: 800,
    color: '#1a2e1a',
    lineHeight: 1.2,
    margin: '0 0 16px',
  },
  titleAccent: {
    background: 'linear-gradient(90deg, #2ECC71, #27ae60)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#5a7a6a',
    maxWidth: 620,
    margin: '0 auto',
    lineHeight: 1.75,
  },

  /* Main grid */
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 48,
    alignItems: 'start',
    marginBottom: 54,
  },

  /* Visual col */
  visualCol: {
    position: 'relative',
  },
  heroCard: {
    position: 'relative',
    background: 'linear-gradient(135deg, #143925 0%, #0c2416 55%, #071b12 100%)',
    borderRadius: 28,
    padding: '30px 24px',
    color: '#fff',
    overflow: 'visible',
    boxShadow: '0 18px 46px rgba(0,0,0,0.16)',
    border: '1px solid rgba(255,255,255,0.08)',
    maxWidth: 640,
    margin: '0 auto',
  },

  cardGlow: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: '50%',
    background:
      'radial-gradient(circle, rgba(46,204,113,0.18) 0%, transparent 70%)',
    pointerEvents: 'none',
  },

logoWrap: {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 16,
},

logo: {
  width: 80,
  height: 80,
  objectFit: 'contain',
  borderRadius: "50%",
  alignItems:"center",
  backgroundColor: 'transparent',
  padding: 12,
  boxShadow: '0 16px 36px rgba(0,0,0,0.14)',
},

cardTagline: {
  textAlign: 'center',
  fontSize: 14,
  letterSpacing: '0.12em',
  color: 'rgba(255,255,255,0.78)',
  marginBottom: 24,
  marginTop: 10,
},


statsGrid: {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
  marginTop: 10,
},

statCell: {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 22,
  padding: '24px 16px',
  textAlign: 'center',
  backdropFilter: 'blur(10px)',
  minHeight: 120,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  transition: 'all 0.3s ease',
},

statIcon: {
  fontSize: 24,
  marginBottom: 10,
},

statNumber: {
  fontSize: 20,
  fontWeight: 800,
  color: '#FDB52A',
  marginBottom: 6,
},

statLabel: {
  fontSize: 13,
  color: 'rgba(255,255,255,0.74)',
  lineHeight: 1.5,
},

badgeClean: {
  position: 'absolute',
  bottom: -55,
  left: -25,

  background: 'rgba(255,255,255,0.92)',
  backdropFilter: 'blur(18px)',

  borderRadius: 24,
  padding: '16px 22px',

  display: 'flex',
  alignItems: 'center',
  gap: 14,

  border: '1px solid rgba(255,255,255,0.5)',

  boxShadow: '0 20px 45px rgba(0,0,0,0.14)',

  minWidth: 220,

  zIndex: 5,
},

badgeRD: {
  position: 'absolute',
  top: -18,
  right: -24,

  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(18px)',

  borderRadius: 24,
  padding: '16px 22px',

  display: 'flex',
  alignItems: 'center',
  gap: 14,

  border: '1px solid rgba(255,255,255,0.5)',

  boxShadow: '0 20px 45px rgba(0,0,0,0.14)',

  minWidth: 220,
},

badgeEmoji: {
  fontSize: 24,
},

badgeTitle: {
  fontWeight: 700,
  fontSize: 14,
  color: '#173224',
},

badgeSub: {
  fontSize: 12,
  color: '#5f7c6d',
  marginTop: 2,
},

  /* Text col */
  textCol: {},

 pillRow: {
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
  marginBottom: 34,
},

pill: {
  display: 'flex',
  alignItems: 'center',
  gap: 14,

  background: 'rgba(255,255,255,0.92)',
  backdropFilter: 'blur(12px)',

  borderRadius: 20,
  padding: '20px 24px',

  boxShadow: '0 10px 28px rgba(0,0,0,0.06)',
  border: '1px solid rgba(255,255,255,0.7)',

  transition: 'all 0.3s ease',
},

pillDot: (color: any) => ({
  display: 'inline-block',
  width: 12,
  height: 12,
  borderRadius: '50%',
  background: color,
  flexShrink: 0,

  boxShadow: `0 0 12px ${color}`,
}),

pillText: {
  fontSize: 16,
  color: '#365345',
  lineHeight: 1.7,
  fontWeight: 500,
},

bodyText: {
  fontSize: 16,
  color: '#4c685b',
  lineHeight: 2,
  marginBottom: 40,
  fontWeight: 400,
  letterSpacing: '0.2px',
},
  /* Values heading separator */
  valuesHeading: {
    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
  },
  valuesLine: {
    flex: 1, height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(46,204,113,0.3))',
  },
  valuesLabel: {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
    color: '#2ECC71', whiteSpace: 'nowrap',
  },

  /* Values section wrapper */
  valuesSection: {
    marginBottom: 46,
  },

  /* Values grid */
  valuesGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: 14,
},
  valueCard: {
    background: '#fff',
    borderRadius: 14,
    padding: '18px 16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    cursor: 'default',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  },
  valueIcon: { fontSize: 24, display: 'block', marginBottom: 8 },
  valueTitle: { fontWeight: 700, fontSize: 13, marginBottom: 6 },
  valueDesc: { fontSize: 12, color: '#6a8a7a', lineHeight: 1.55 },

  /* Bottom banner */
  banner: {
    background: 'linear-gradient(135deg, #1a4731 0%, #0f2d1e 100%)',
    borderRadius: 24,
    padding: '36px 40px',
    boxShadow: '0 16px 48px rgba(15,45,30,0.25)',
  },
  bannerInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
  },
  bannerEmoji: { fontSize: 38, flexShrink: 0 },
  bannerText: {
    flex: 1,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    lineHeight: 1.6,
    minWidth: 200,
  },
  bannerBtn: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #F5A623, #e6940f)',
    color: '#1a2e1a',
    fontWeight: 700,
    fontSize: 14,
    padding: '12px 26px',
    borderRadius: 50,
    textDecoration: 'none',
    boxShadow: '0 4px 18px rgba(245,166,35,0.35)',
    whiteSpace: 'nowrap',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
};