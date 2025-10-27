module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nesting'), // <-- add this BEFORE tailwind
    require('tailwindcss'),
    require('autoprefixer'),
    {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    }
  ],
};
