module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      rhd: ['Red Hat Display', 'sans-serif'],
    },
    extend: {
      colors: {
        base: '#1a374d',
        primary: '#406882',
        secondary: {
          one: '#6998AB',
          two: '#B1D0E0',
        },
      },
    },
  },
  plugins: [],
};
