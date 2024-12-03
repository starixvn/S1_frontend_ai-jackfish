const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		join(
			__dirname,
			'{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
		),
		...createGlobPatternsForDependencies(__dirname),
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'rgb(var(--color-primary-300) / <alpha-value>)',
					50: 'rgb(var(--color-primary-50) / <alpha-value>)',
					100: 'rgb(var(--color-primary-100) / <alpha-value>)',
					200: 'rgb(var(--color-primary-200) / <alpha-value>)',
					300: 'rgb(var(--color-primary-300) / <alpha-value>)',
					400: 'rgb(var(--color-primary-400) / <alpha-value>)',
					500: 'rgb(var(--color-primary-500) / <alpha-value>)',
					600: 'rgb(var(--color-primary-600) / <alpha-value>)',
					700: 'rgb(var(--color-primary-700) / <alpha-value>)',
					800: 'rgb(var(--color-primary-800) / <alpha-value>)',
					900: 'rgb(var(--color-primary-900) / <alpha-value>)',
				},
				secondary: {
					DEFAULT: 'rgb(var(--color-secondary-300) / <alpha-value>)',
					50: 'rgb(var(--color-secondary-50) / <alpha-value>)',
					100: 'rgb(var(--color-secondary-100) / <alpha-value>)',
					200: 'rgb(var(--color-secondary-200) / <alpha-value>)',
					300: 'rgb(var(--color-secondary-300) / <alpha-value>)',
					400: 'rgb(var(--color-secondary-400) / <alpha-value>)',
					500: 'rgb(var(--color-secondary-500) / <alpha-value>)',
					600: 'rgb(var(--color-secondary-600) / <alpha-value>)',
					700: 'rgb(var(--color-secondary-700) / <alpha-value>)',
					800: 'rgb(var(--color-secondary-800) / <alpha-value>)',
					900: 'rgb(var(--color-secondary-900) / <alpha-value>)',
				},
				tertiary: {
					DEFAULT: 'rgb(var(--color-tertiary-300) / <alpha-value>)',
					50: 'rgb(var(--color-tertiary-50) / <alpha-value>)',
					100: 'rgb(var(--color-tertiary-100) / <alpha-value>)',
					200: 'rgb(var(--color-tertiary-200) / <alpha-value>)',
					300: 'rgb(var(--color-tertiary-300) / <alpha-value>)',
					400: 'rgb(var(--color-tertiary-400) / <alpha-value>)',
					500: 'rgb(var(--color-tertiary-500) / <alpha-value>)',
					600: 'rgb(var(--color-tertiary-600) / <alpha-value>)',
					700: 'rgb(var(--color-tertiary-700) / <alpha-value>)',
					800: 'rgb(var(--color-tertiary-800) / <alpha-value>)',
					900: 'rgb(var(--color-tertiary-900) / <alpha-value>)',
				},
				warning: {
					DEFAULT: 'rgb(var(--color-warning-300) / <alpha-value>)',
					50: 'rgb(var(--color-warning-50) / <alpha-value>)',
					100: 'rgb(var(--color-warning-100) / <alpha-value>)',
					200: 'rgb(var(--color-warning-200) / <alpha-value>)',
					300: 'rgb(var(--color-warning-300) / <alpha-value>)',
					400: 'rgb(var(--color-warning-400) / <alpha-value>)',
					500: 'rgb(var(--color-warning-500) / <alpha-value>)',
					600: 'rgb(var(--color-warning-600) / <alpha-value>)',
					700: 'rgb(var(--color-warning-700) / <alpha-value>)',
					800: 'rgb(var(--color-warning-800) / <alpha-value>)',
					900: 'rgb(var(--color-warning-900) / <alpha-value>)',
				},
				danger: {
					DEFAULT: 'rgb(var(--color-danger-300) / <alpha-value>)',
					50: 'rgb(var(--color-danger-50) / <alpha-value>)',
					100: 'rgb(var(--color-danger-100) / <alpha-value>)',
					200: 'rgb(var(--color-danger-200) / <alpha-value>)',
					300: 'rgb(var(--color-danger-300) / <alpha-value>)',
					400: 'rgb(var(--color-danger-400) / <alpha-value>)',
					500: 'rgb(var(--color-danger-500) / <alpha-value>)',
					600: 'rgb(var(--color-danger-600) / <alpha-value>)',
					700: 'rgb(var(--color-danger-700) / <alpha-value>)',
					800: 'rgb(var(--color-danger-800) / <alpha-value>)',
					900: 'rgb(var(--color-danger-900) / <alpha-value>)',
				},
				info: {
					DEFAULT: 'rgb(var(--color-info-300) / <alpha-value>)',
					50: 'rgb(var(--color-info-50) / <alpha-value>)',
					100: 'rgb(var(--color-info-100) / <alpha-value>)',
					200: 'rgb(var(--color-info-200) / <alpha-value>)',
					300: 'rgb(var(--color-info-300) / <alpha-value>)',
					400: 'rgb(var(--color-info-400) / <alpha-value>)',
					500: 'rgb(var(--color-info-500) / <alpha-value>)',
					600: 'rgb(var(--color-info-600) / <alpha-value>)',
					700: 'rgb(var(--color-info-700) / <alpha-value>)',
					800: 'rgb(var(--color-info-800) / <alpha-value>)',
					900: 'rgb(var(--color-info-900) / <alpha-value>)',
				},
				success: {
					DEFAULT: 'rgb(var(--color-success-300) / <alpha-value>)',
					50: 'rgb(var(--color-success-50) / <alpha-value>)',
					100: 'rgb(var(--color-success-100) / <alpha-value>)',
					200: 'rgb(var(--color-success-200) / <alpha-value>)',
					300: 'rgb(var(--color-success-300) / <alpha-value>)',
					400: 'rgb(var(--color-success-400) / <alpha-value>)',
					500: 'rgb(var(--color-success-500) / <alpha-value>)',
					600: 'rgb(var(--color-success-600) / <alpha-value>)',
					700: 'rgb(var(--color-success-700) / <alpha-value>)',
					800: 'rgb(var(--color-success-800) / <alpha-value>)',
					900: 'rgb(var(--color-success-900) / <alpha-value>)',
				},
				gray: {
					DEFAULT: 'rgb(var(--color-gray-300) / <alpha-value>)',
					50: 'rgb(var(--color-gray-50) / <alpha-value>)',
					100: 'rgb(var(--color-gray-100) / <alpha-value>)',
					200: 'rgb(var(--color-gray-200) / <alpha-value>)',
					300: 'rgb(var(--color-gray-300) / <alpha-value>)',
					400: 'rgb(var(--color-gray-400) / <alpha-value>)',
					500: 'rgb(var(--color-gray-500) / <alpha-value>)',
					600: 'rgb(var(--color-gray-600) / <alpha-value>)',
					700: 'rgb(var(--color-gray-700) / <alpha-value>)',
					800: 'rgb(var(--color-gray-800) / <alpha-value>)',
					900: 'rgb(var(--color-gray-900) / <alpha-value>)',
				},
				black: {
					DEFAULT: 'var(--color-black-300)',
					50: 'var(--color-black-50)',
					100: 'var(--color-black-100)',
					200: 'var(--color-black-200)',
					300: 'var(--color-black-300)',
					400: 'var(--color-black-400)',
					500: 'var(--color-black-500)',
					600: 'var(--color-black-600)',
					700: 'var(--color-black-700)',
					800: 'var(--color-black-800)',
					900: 'var(--color-black-900)',
				},
				white: {
					DEFAULT: 'var(--color-white-300)',
					50: 'var(--color-white-50)',
					100: 'var(--color-white-100)',
					200: 'var(--color-white-200)',
					300: 'var(--color-white-300)',
					400: 'var(--color-white-400)',
					500: 'var(--color-white-500)',
					600: 'var(--color-white-600)',
					700: 'var(--color-white-700)',
					800: 'var(--color-white-800)',
					900: 'var(--color-white-900)',
				},
			},
			fontFamily: {
				chakra: ['Chakra Petch'],
			},
			backgroundImage: {
				'layout-bg': `url("${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/bg.jpg")`,
			},
			keyframes: {
				'spin-once': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
			},
			animation: {
				'spin-once': 'spin-once 1s ease-in-out forwards', // Adjust duration and timing function as needed
			},
		},
	},
	plugins: [
		function ({ addBase }) {
			addBase({
				'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
					{
						'@apply appearance-none': {},
					},
				'input[type="number"]': {
					'@apply appearance-none': {}, // 適用於 Firefox
				},
			})
		},
		require('tailwind-scrollbar'),
	],
}
