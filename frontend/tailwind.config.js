// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dull': 'var(--color-primary-dull)',
      },
    },
  },
  plugins: [],
}
