/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'black-hole': '#0D0D0D',
        'galaxy-purple': '#6C63FF',
        'neon-pink': '#FF007F',
        'star-yellow': '#FFE81F',
      },
      fontFamily: {
        glitch: ['"Press Start 2P"', 'cursive'],
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        ship: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        glitch1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-2px, 2px)' },
        },
        glitch2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(2px, -2px)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3s infinite ease-in-out',
        float: 'float 4s infinite ease-in-out',
        ship: 'ship 3s infinite ease-in-out',
        glitch1: 'glitch1 2s infinite',
        glitch2: 'glitch2 2s infinite',
      },
    },
  },
  plugins: [],
};