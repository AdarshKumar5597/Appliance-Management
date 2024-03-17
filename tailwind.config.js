/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'custom': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      screens: {
        'xs': '480px', // Customize the size as needed
      },
      flex:{
        '1': '1 0 33%',
        '2': '2 0 66%',
        '4': '4 0 25%',
      }
    },
  },
  plugins: [],
};
