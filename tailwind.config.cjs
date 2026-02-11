module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#ebf8ff',
          100: '#d1f3ff',
          400: '#0ea5b7',
          600: '#075985'
        },
        sand: {
          50: '#fdfcf9',
          100: '#f6f3ee'
        }
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(2,6,23,0.08)',
        'soft-md': '0 12px 34px rgba(2,6,23,0.10)'
      }
    }
  },
  plugins: []
}
