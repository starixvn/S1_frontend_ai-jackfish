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
					DEFAULT: 'var(--color-primary-300)',
					100: 'var(--color-primary-100)',
					200: 'var(--color-primary-200)',
					300: 'var(--color-primary-300)',
					400: 'var(--color-primary-400)',
					500: 'var(--color-primary-500)',
				},
				secondary: {
					DEFAULT: 'var(--color-secondary-300)',
					100: 'var(--color-secondary-100)',
					200: 'var(--color-secondary-200)',
					300: 'var(--color-secondary-300)',
					400: 'var(--color-secondary-400)',
					500: 'var(--color-secondary-500)',
				},
				tertiary: {
					DEFAULT: 'var(--color-tertiary-300)',
					100: 'var(--color-tertiary-100)',
					200: 'var(--color-tertiary-200)',
					300: 'var(--color-tertiary-300)',
					400: 'var(--color-tertiary-400)',
					500: 'var(--color-tertiary-500)',
				},
				neutral: {
					DEFAULT: 'var(--color-neutral-300)',
					100: 'var(--color-neutral-100)',
					200: 'var(--color-neutral-200)',
					300: 'var(--color-neutral-300)',
					400: 'var(--color-neutral-400)',
					500: 'var(--color-neutral-500)',
				},
				warning: {
					DEFAULT: 'var(--color-warning-300)',
					200: 'var(--color-warning-200)',
					300: 'var(--color-warning-300)',
				},
				check: {
					DEFAULT: 'var(--color-check-300)',
					200: 'var(--color-check-200)',
					300: 'var(--color-check-300)',
				},
			},
		},
	},
	plugins: [],
}
