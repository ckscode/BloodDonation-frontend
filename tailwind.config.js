/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
         'primary':'#d13636'
         
      } 
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false
  }
}

