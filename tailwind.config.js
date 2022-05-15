module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        columns: 'calc(100vh - 267px)',
      },
      gridTemplateRows: {
        columns: 'max-content'
      }
    },
  },
  plugins: [],
};
