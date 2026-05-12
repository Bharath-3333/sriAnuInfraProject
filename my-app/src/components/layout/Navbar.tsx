import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useApi';
import logo from '../../assets/project logo.jpeg';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Solar', href: '#why' },
  { label: 'Projects', href: '#projects' },
  { label: 'Net Metering', href: '#netmetering' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = [
  'about',
  'services',
  'why',
  'projects',
  'netmetering',
  'contact',
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);

    const element = document.getElementById(
      href.replace('#', '')
    );

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          border-b border-slate-200/70
          transition-all duration-300
          ${
            scrolled
              ? 'bg-white/95 backdrop-blur-xl shadow-md py-3'
              : 'bg-white/90 backdrop-blur-md py-3'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">

          {/* Logo */}
<button
  onClick={() =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  className="flex items-center gap-4"
>
  {/* LOGO IMAGE (BIGGER) */}
  <img
    src={logo}
    alt="Sri Anu Infrastructure"
    className="w-14 h-14 object-contain"
  />

  {/* TEXT */}
  <div className="flex flex-col leading-tight text-left">
    
    {/* SRI ANU (BIGGER + LEFT) */}
    <span className="text-xl font-bold text-slate-900 leading-none">
      Sri Anu
    </span>

    {/* INFRASTRUCTURE (ALIGNED WIDTH) */}
    <span className="text-[11px] font-semibold tracking-[0.28em] text-brand-green/90 mt-[2px]">
  INFRASTRUCTURE
</span>

  </div>
</button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive =
                activeId === item.href.replace('#', '');

              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className={`
                      relative text-sm font-semibold
                      tracking-wide pb-1
                      transition-all duration-300
                      ${
                        isActive
                          ? 'text-cyan-600'
                          : 'text-slate-700 hover:text-cyan-600'
                      }
                    `}
                  >
                    {item.label}

                    <span
                      className={`
                        absolute left-0 bottom-0
                        h-[2px]
                        rounded-full
                        bg-cyan-500
                        transition-all duration-300
                        ${
                          isActive
                            ? 'w-full'
                            : 'w-0'
                        }
                      `}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-3">

            {/* CTA */}
            <button
              onClick={() => handleNav('#contact')}
              className="
                hidden lg:flex
                items-center justify-center
                px-4 py-2
                rounded-lg
                bg-cyan-600 hover:bg-cyan-700
                text-white text-sm font-semibold
                shadow-sm hover:shadow-lg
                transition-all duration-300
              "
            >
              Get Free Quote
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="
                lg:hidden
                w-9 h-9
                rounded-lg
                border border-slate-200
                bg-white shadow-sm
                flex items-center justify-center
              "
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-slate-800" />
              ) : (
                <Menu className="w-5 h-5 text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 z-40 lg:hidden
          transition-all duration-300
          ${
            menuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }
        `}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`
            absolute top-0 right-0 h-full w-72
            bg-white shadow-2xl
            transition-transform duration-300
            ${
              menuOpen
                ? 'translate-x-0'
                : 'translate-x-full'
            }
          `}
        >
          <div className="p-6 pt-24 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive =
                activeId === item.href.replace('#', '');

              return (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className={`
                    w-full text-left
                    py-3 px-4
                    rounded-xl
                    text-sm font-semibold
                    transition-all duration-300
                    ${
                      isActive
                        ? 'bg-cyan-50 text-cyan-700'
                        : 'text-slate-700 hover:bg-slate-100'
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-200">
              <button
                onClick={() => handleNav('#contact')}
                className="
                  w-full flex items-center justify-center
                  py-3 rounded-xl
                  bg-cyan-600 hover:bg-cyan-700
                  text-white font-semibold
                  transition-all duration-300
                "
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