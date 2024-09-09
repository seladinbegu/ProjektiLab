/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        tilt: {
          '0%': { transform: 'rotateY(0) rotateX(0)' },
          '50%': { transform: 'rotateY(10deg) rotateX(10deg)' },
          '100%': { transform: 'rotateY(0) rotateX(0)' },
        },
        tiltZ: {
          '0%': { transform: 'rotateY(0) rotateX(0) scale(1)' },
          '50%': { transform: 'rotateY(15deg) rotateX(15deg) scale(1.05)' },
          '100%': { transform: 'rotateY(0) rotateX(0) scale(1)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        tilt: 'tilt 0.8s ease-in-out',
        tiltZ: 'tiltZ 0.8s ease-in-out',
        slideIn: 'slideIn 0.5s ease-out',
      },
      colors: {
        'cookie-consent-bg': '#000', // Black background for the banner
        'cookie-consent-text': '#fff', // White text for the banner
        'cookie-consent-accept': '#4CAF50', // Bright green for accept button
        'cookie-consent-decline': '#f44336', // Bright red for decline button
      },
    },
  },
  plugins: [],
};
