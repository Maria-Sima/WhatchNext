/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/app/components/**/*.html",
    "./src/app/components/**/*.ts",
    "./src/app/components/form/**/*.html",
    "./src/app/components/form/**/*.ts",
  ],
  prefix: '',
  purge: {
    enabled: true,
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

