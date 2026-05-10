import { useState, useEffect } from 'react';
import { useScrollSpy } from '../../hooks/useApi';
import logo from '../../assets/logo.svg';

const NAV_ITEMS = [
  { label: 'About',       href: '#about'      },
  { label: 'Services',    href: '#services'   },
  { label: 'Why Solar',   href: '#why'        },
  { label: 'Projects',    href: '#projects'   },
  { label: 'Net Metering',href: '#netmetering'},
  { label: 'Contact',     href: '#contact'    },
];

const SECTION_IDS = ['about', 'services', 'why', 'projects', 'netmetering', 'contact'];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-navbar py-3'
            : 'bg-white/90 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#hero"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <div className="w-300 h-12 rounded-3xl flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5 bg-white/0">
            <img
                src={logo}
                alt="Sri Anu Infrastructure"
                className="w-20 h-20 object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="leading-tight">
              <div className="font-heading font-800 text-text-primary text-sm tracking-wide">
                Sri Anu
              </div>
              <div className="font-heading font-500 text-text-muted text-2xs tracking-widest uppercase">
                Infrastructure
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNav(item.href)}
                  className={`nav-link underline-animate font-heading font-600 text-sm pb-0.5
                    ${activeId === item.href.replace('#', '')
                      ? 'text-brand-green'
                      : 'text-text-secondary'
                    }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('#contact')}
              className="hidden lg:inline-flex btn-primary text-xs py-2.5 px-5"
            >
              Get Free Quote
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-0.5 bg-text-primary transition-all duration-300 origin-center
                ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-text-primary transition-all duration-300
                ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-text-primary transition-all duration-300 origin-center
                ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl
            transform transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-24 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className={`w-full text-left py-3 px-4 rounded-lg font-heading font-600 text-sm
                  transition-colors duration-200 ${
                  activeId === item.href.replace('#', '')
                    ? 'bg-brand-green-light text-brand-green'
                    : 'text-text-secondary hover:bg-surface-soft'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 mt-2 border-t border-surface-border">
              <button
                onClick={() => handleNav('#contact')}
                className="btn-primary w-full justify-center text-sm"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}