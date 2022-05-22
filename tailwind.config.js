module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      '2xs': '320px',
      xs: '480px',
      sm: '640px',
      md: '780px',
      l: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      width: {
        'board-xs': 'calc((100% - 16px * (1 - 1)) / 1)',
        'board-s': 'calc((100% - 16px * (2 - 1)) / 2)',
        'board-m': 'calc((100% - 16px * (3 - 1)) / 3)',
        'board-l': 'calc((100% - 16px * (4 - 1)) / 4)',
        'board-xl': 'calc((100% - 16px * (5 - 1)) / 5)',
      },
      minWidth: {
        '2xs': '320px',
        xs: '480px',
        sm: '640px',
        md: '780px',
        l: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      maxWidth: {
        'board-xs': 'calc((100% - 16px * (1 - 1)) / 1)',
        'board-s': 'calc((100% - 16px * (2 - 1)) / 2)',
        'board-m': 'calc((100% - 16px * (3 - 1)) / 3)',
        'board-l': 'calc((100% - 16px * (4 - 1)) / 4)',
        'board-xl': 'calc((100% - 16px * (5 - 1)) / 5)',
      },
      height: {
        columns: 'calc(100vh - 174px)',
      },
      gridTemplateRows: {
        columns: 'max-content',
      },
      colors: {
        black: '#14142B',
        grey: '#AFB0B9',
        primaryBlue: '#096CFE',
        primaryGreen: '#1AD993',
        primaryPurple: '#503AE7',
        purple: '#AA9BFF',
        'off-white': '#F4F2FF',
        red: '#FF3D3D',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['Nunito', 'Arial'],
      },
      fontSize: {
        xs: '1rem',
        s: '1.125rem',
        m: '1.25rem',
        l: '1.5rem',
        '2xl': [
          '3rem',
          {
            lineHeight: '3.5rem',
          },
        ],
        '3xl': [
          '4rem',
          {
            lineHeight: '5rem',
          },
        ],
        logo: [
          '2.75rem',
          {
            lineHeight: '2.75rem',
          },
        ],
      },
      boxShadow: {
        footer: '0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        DEFAULT: '24px',
      },
    },
  },
  plugins: [],
};
