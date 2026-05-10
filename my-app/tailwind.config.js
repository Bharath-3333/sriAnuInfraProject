/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green:      '#2EA84F',
          'green-dark': '#1A7A35',
          'green-light': '#E8F5EC',
          'green-mid': '#3DC465',
          gold:       '#F5A623',
          'gold-light': '#FFF3DC',
          'gold-dark':  '#C97E0A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft:    '#F7F9F7',
          muted:   '#EEF4EF',
          border:  '#D6E8DA',
        },
        text: {
          primary:   '#0F2B18',
          secondary: '#3A5944',
          muted:     '#7A9882',
          inverse:   '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'brand-sm': '0 2px 8px rgba(46,168,79,0.12)',
        'brand':    '0 4px 20px rgba(46,168,79,0.18)',
        'brand-lg': '0 8px 40px rgba(46,168,79,0.22)',
        'gold-sm':  '0 2px 8px rgba(245,166,35,0.15)',
        'gold':     '0 4px 20px rgba(245,166,35,0.25)',
        'card':     '0 1px 4px rgba(15,43,24,0.06), 0 4px 16px rgba(15,43,24,0.08)',
        'card-hover': '0 8px 32px rgba(15,43,24,0.14)',
        'navbar':   '0 2px 20px rgba(15,43,24,0.08)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #F7F9F7 0%, #E8F5EC 50%, #FFF3DC 100%)',
        'section-gradient': 'linear-gradient(180deg, #F7F9F7 0%, #EEF4EF 100%)',
        'green-gradient': 'linear-gradient(135deg, #1A7A35 0%, #2EA84F 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C97E0A 0%, #F5A623 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(46,168,79,0.04) 0%, rgba(245,166,35,0.04) 100%)',
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'float':      'float 4s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
        'count-up':   'countUp 2s ease forwards',
        'spin-slow':  'spin 12s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:    { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        float:     { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        countUp:   { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};