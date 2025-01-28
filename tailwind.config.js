/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}", "./navigations/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    

    fontFamily:{
      magRegular: ['Magra-Regular', 'sans-serif'],
      magBold:['Magra-Bold', 'sans-serif'],
      fitBlack:['Outfit-Black', 'sans-serif'],
      fitBold:['Outfit-Bold', 'sans-serif'],
      fitExtraBold:['Outfit-ExtraBold', 'sans-serif'],	
      fitExtraLight:['Outfit-ExtraLight', 'sans-serif'],
      fitLight:['Outfit-Light', 'sans-serif'],
      fitMedium:['Outfit-Medium', 'sans-serif'],
      fitRegular:['Outfit-Regular', 'sans-serif'],
      fitSemiBold:['Outfit-SemiBold', 'sans-serif'],
      fitThin:['Outfit-Thin', 'sans-serif'],

    },

    extend: {
      colors: {
        'primary': '#0064AB',
        'secondary':'#D0DDFF',
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6'
      },

      backgroundOpacity: {
        '10': '0.1',
        '20': '0.2',
        '30': '0.3',
        // Add more as needed
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      fontSize:{
        'small': '16px',
        'medium': '30px',
        'large': '43px',
      }
    },
  },
  plugins: [],
}

