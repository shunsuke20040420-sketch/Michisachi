/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
          text: 'var(--color-text)',
          subtext: 'var(--color-text-muted)',
          border: 'var(--color-border)',
          primary: 'var(--color-primary)',
          primaryDeep: 'var(--color-primary-deep)',
        },
      },
      borderRadius: {
        control: 'var(--radius-control)',
        panel: 'var(--radius-panel)',
        phone: 'var(--radius-phone)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
      },
      fontFamily: {
        sans: [
          'Noto Sans JP',
          'BIZ UDPGothic',
          'Hiragino Sans',
          'Yu Gothic',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
