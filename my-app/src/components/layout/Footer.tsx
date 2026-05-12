import * as FaIcons from "react-icons/fa";

const SERVICES = [
  'Rooftop Solar Systems',
  'Ground Mount Solar',
  'Turn-key EPC',
  'Net Metering Setup',
  'O&M Support',
  'Government Approvals',
];

const QUICK_LINKS = [
  { label: 'About Us',     href: '#about'       },
  { label: 'Our Services', href: '#services'    },
  { label: 'Why Solar',    href: '#why'         },
  { label: 'Projects',     href: '#projects'    },
  { label: 'Net Metering', href: '#netmetering' },
  { label: 'Contact',      href: '#contact'     },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (href: string) => {
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-text-primary text-white">
      {/* Top Band */}
      <div className="bg-brand-green py-12 px-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-700 text-white mb-2">
              Ready to Go Solar?
            </h3>
            <p className="text-green-100 font-body text-sm">
              Get a free site assessment and detailed project report — no obligation.
            </p>
          </div>
          <button
            onClick={() => handleNav('#contact')}
            className="inline-flex items-center gap-2 bg-brand-gold text-text-primary
              font-heading font-700 px-7 py-3.5 rounded-lg text-sm tracking-wide uppercase
              transition-all duration-300 hover:bg-white hover:-translate-y-0.5 shadow-gold
              whitespace-nowrap"
          >
            Get Free Quote ✦
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-5 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-green to-brand-green-dark flex items-center justify-center shadow-brand-sm">
                <svg viewBox="0 0 48 48" className="w-6 h-6 text-white">
                  <circle cx="24" cy="24" r="22" fill="currentColor" opacity="0.18" />
                  <path d="M16 28 L24 16 L32 28" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M18 30 L30 30" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="font-heading font-800 text-white text-sm tracking-wide">Sri Anu</div>
                <div className="font-heading font-400 text-green-200 text-2xs tracking-widest uppercase">
                  Solar Infrastructure
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 font-body">
              A team of passionate engineers delivering Turn-key EPC solar solutions across India.
              Rooftop to large-scale — we power the future, cleanly.
            </p>
            <div className="flex gap-3">

              <a href="https://www.linkedin.com/company/sri-anu-infrastructure" target="_blank" rel="noopener noreferrer">
                <FaIcons.FaLinkedinIn size={14} />
              </a>

              <a href="https://www.instagram.com/chittibabugarbhapu?igsh=MW0wcDdtOXhub2s5bA==" target="_blank" rel="noopener noreferrer">
                <FaIcons.FaInstagram size={14} />
              </a>

              <a href="https://www.facebook.com/share/r/17tfbyTVft/" target="_blank" rel="noopener noreferrer">
                <FaIcons.FaFacebookF size={14} />
              </a>

              <a href="https://youtube.com/@solarsystemworkcom?si=_lClvmW9Ql28dfPM" target="_blank" rel="noopener noreferrer">
                <FaIcons.FaYoutube size={14} />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-700 text-xs tracking-widest uppercase text-brand-gold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-gray-400 text-sm font-body hover:text-brand-green-mid
                      transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-green opacity-0
                      group-hover:opacity-100 transition-opacity duration-200" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-700 text-xs tracking-widest uppercase text-brand-gold mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <span className="text-gray-400 text-sm font-body flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-brand-green/50" />
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-700 text-xs tracking-widest uppercase text-brand-gold mb-5">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-green/20 flex items-center
                  justify-center flex-shrink-0 text-brand-green-mid text-sm">
                  📍
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-body leading-relaxed">
                    Visakhapatnam, Andhra Pradesh, India
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-green/20 flex items-center
                  justify-center flex-shrink-0 text-brand-green-mid text-sm">
                  📞
                </div>
                <div>
                  <p className="text-white text-sm font-body">+91 8309227037</p>
                  <p className="text-gray-500 text-xs">Mon – Sat, 9AM – 6PM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-green/20 flex items-center
                  justify-center flex-shrink-0 text-brand-green-mid text-sm">
                  ✉️
                </div>
                <div>
                  <a href="mailto:srianuinfra@gmail.com"
                    className="text-brand-green-mid text-sm hover:text-white transition-colors">
                    srianuinfra@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-5 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center
          justify-between gap-3">
          <p className="text-gray-500 text-xs font-body">
            © {year} Sri Anu Infrastructure. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}