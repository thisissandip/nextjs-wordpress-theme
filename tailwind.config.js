const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./src/components/**/*.js', './pages/**/*.js'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			primary: {
				DEFAULT: '#000000',
				light: '#4b4fc4',
			},
			white: {
				DEFAULT: '#fff',
			},
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.trueGray,
			indigo: colors.indigo,
			red: colors.rose,
			yellow: colors.amber,
			blue: colors.blue,
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
};
