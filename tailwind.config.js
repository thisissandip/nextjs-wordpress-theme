const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./src/components/**/*.js', './pages/**/*.js'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			primary: {
				DEFAULT: '#212470',
			},
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
};
