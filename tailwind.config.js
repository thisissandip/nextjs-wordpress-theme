module.exports = {
	purge: ['./src/components/**/*.js', './pages/**/*.js'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
};
