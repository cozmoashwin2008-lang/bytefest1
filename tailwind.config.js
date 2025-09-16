/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f97316",
        "primary-hover": "#ea580c",
        secondary: "#64748b",
        dark: "#121212",
        orange: {
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
        purple: {
          800: "#6b21a8",
          900: "#581c87",
        },
      },
      spacing: {
        section: "2rem",
        container: "1rem",
      },
      borderRadius: {
        container: "0rem",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      animation: {
        'pixel-glow': 'pixelGlow 0.3s ease-in-out',
        'voxel-float': 'voxelFloat 6s ease-in-out infinite',
        'voxel-bounce': 'voxelBounce 2s infinite',
      },
      keyframes: {
        pixelGlow: {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.5))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 30px rgba(249, 115, 22, 0.8))',
          },
        },
        voxelFloat: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotateX(0deg) rotateY(0deg)',
          },
          '33%': { 
            transform: 'translateY(-20px) rotateX(15deg) rotateY(120deg)',
          },
          '66%': { 
            transform: 'translateY(-10px) rotateX(-10deg) rotateY(240deg)',
          },
        },
        voxelBounce: {
          '0%, 20%, 50%, 80%, 100%': { 
            transform: 'translateX(-50%) translateY(0)',
          },
          '40%': { 
            transform: 'translateX(-50%) translateY(-10px)',
          },
          '60%': { 
            transform: 'translateX(-50%) translateY(-5px)',
          },
        },
      },
    },
  },
  plugins: [],
};
