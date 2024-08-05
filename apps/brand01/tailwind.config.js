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
					100: 'rgb(var(--color-primary-100) / <alpha-value>)',
					200: 'rgb(var(--color-primary-200) / <alpha-value>)',
					300: 'rgb(var(--color-primary-300) / <alpha-value>)',
					400: 'rgb(var(--color-primary-400) / <alpha-value>)',
					500: 'rgb(var(--color-primary-500) / <alpha-value>)',
				},
				secondary: {
					DEFAULT: 'rgb(var(--color-secondary-300) / <alpha-value>)',
					100: 'rgb(var(--color-secondary-100) / <alpha-value>)',
					200: 'rgb(var(--color-secondary-200) / <alpha-value>)',
					300: 'rgb(var(--color-secondary-300) / <alpha-value>)',
					400: 'rgb(var(--color-secondary-400) / <alpha-value>)',
					500: 'rgb(var(--color-secondary-500) / <alpha-value>)',
				},
				tertiary: {
					DEFAULT: 'rgb(var(--color-tertiary-300) / <alpha-value>)',
					100: 'rgb(var(--color-tertiary-100) / <alpha-value>)',
					200: 'rgb(var(--color-tertiary-200) / <alpha-value>)',
					300: 'rgb(var(--color-tertiary-300) / <alpha-value>)',
					400: 'rgb(var(--color-tertiary-400) / <alpha-value>)',
					500: 'rgb(var(--color-tertiary-500) / <alpha-value>)',
				},
				neutral: {
					DEFAULT: 'rgb(var(--color-neutral-300) / <alpha-value>)',
					100: 'rgb(var(--color-neutral-100) / <alpha-value>)',
					200: 'rgb(var(--color-neutral-200) / <alpha-value>)',
					300: 'rgb(var(--color-neutral-300) / <alpha-value>)',
					400: 'rgb(var(--color-neutral-400) / <alpha-value>)',
					500: 'rgb(var(--color-neutral-500) / <alpha-value>)',
				},
				warning: {
					DEFAULT: 'rgb(var(--color-warning-300) / <alpha-value>)',
					200: 'rgb(var(--color-warning-200) / <alpha-value>)',
					300: 'rgb(var(--color-warning-300) / <alpha-value>)',
				},
				check: {
					DEFAULT: 'rgb(var(--color-check-300) / <alpha-value>)',
					200: 'rgb(var(--color-check-200) / <alpha-value>)',
					300: 'rgb(var(--color-check-300) / <alpha-value>)',
				},
			},
			fontFamily: {
				chakra: ['Chakra Petch'],
			},
			backgroundImage: {
				'layout-bg': `url("${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/bg.jpg")`,
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
	],
}
