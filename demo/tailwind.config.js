const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{ts,tsx}',
    './layouts/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        interLight: ['Inter_300Light'],
        inter: ['Inter_400Regular'],
        interMedium: ['Inter_500Medium'],
        interSemiBold: ['Inter_600SemiBold'],
        interBold: ['Inter_700Bold'],
        archivoLight: ['Archivo_300Light'],
        archivo: ['Archivo_400Regular'],
        archivoMedium: ['Archivo_500Medium'],
        archivoSemiBold: ['Archivo_600SemiBold'],
        archivoBold: ['Archivo_700Bold'],
        poppinsLight: ['Poppins_300Light'],
        poppins: ['Poppins_400Regular'],
        poppinsMedium: ['Poppins_500Medium'],
        poppinsSemiBold: ['Poppins_600SemiBold'],
        poppinsBold: ['Poppins_700Bold'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      borderRadius: {
        '3xl': 'calc(var(--radius) + 16px)',
        '2xl': 'calc(var(--radius) + 10px)',
        'xl': 'calc(var(--radius) + 4px)',
        'lg': 'var(--radius)',
        'md': 'calc(var(--radius) - 2px)',
        'sm': 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
