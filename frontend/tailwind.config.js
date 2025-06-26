// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-dull': 'rgb(var(--color-primary-dull) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
