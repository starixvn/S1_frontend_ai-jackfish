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
					0: '#F6F6F6',
					100: '#EDEDED',
					200: '#DCDCDC',
					300: '#CACACA',
					400: '#B9B9B9',
					500: '#A7A7A7',
					600: '#888888',
					700: '#6A6A6A',
					800: '#4B4B4B',
					900: '#2D2D2D',
					1000: '#0E0E0E',
				},
				secondary: {
					0: '#F8F5F0',
					100: '#F1EBE0',
					200: '#E4D7C2',
					300: '#D6C2A3',
					400: '#C9AE85',
					500: '#BB9A66',
					600: '#967B52',
					700: '#705C3D',
					800: '#4B3E29',
					900: '#382E1F',
					1000: '#251F14',
				},
				tertiary: {
					0: '#FFFAF5',
					100: '#FFE0C4',
					200: '#FFC593',
					300: '#FFAB62',
					400: '#FF9031',
					500: '#FF7600',
					600: '#CE5F00',
					700: '#9D4900',
					800: '#6C3200',
					900: '#3B1C00',
					1000: '#0A0500',
				},
				black: '#0C0C0D',
				gray: {
					0: '#F9F9F9',
					100: '#F7F7F7',
					200: '#E7E7E7',
					300: '#CCCCCC',
					400: '#B2B2B2',
					500: '#999999',
					600: '#6F6F6F',
					700: '#585858',
					800: '#414141',
					900: '#1E1F1D',
					1000: '#121311',
				},
				info: {
					0: '#E9F1FF',
					100: '#D4E3FF',
					200: '#A9C8FF',
					300: '#7DACFF',
					400: '#5291FF',
					500: '#2775FF',
					600: '#1F5ECC',
					700: '#174699',
					800: '#102F66',
					900: '#0C234D',
					1000: '#081733',
				},
				success: {
					0: '#EBF7ED',
					100: '#D7F0DA',
					200: '#B0E0B6',
					300: '#88D191',
					400: '#61C16D',
					500: '#39B248',
					600: '#2E8E3A',
					700: '#226B2B',
					800: '#17471D',
					900: '#113516',
					1000: '#0B240E',
				},
				warning: {
					0: '#FFFCE8',
					100: '#FFFAD1',
					200: '#FFF5A3',
					300: '#FFEF74',
					400: '#FFEA46',
					500: '#FFE518',
					600: '#CCB713',
					700: '#99890E',
					800: '#665C0A',
					900: '#4D4507',
					1000: '#332E05',
				},
				danger: {
					0: '#FFFCFC',
					100: '#F5CACA',
					200: '#EC9999',
					300: '#E26767',
					400: '#D93636',
					500: '#CF0404',
					600: '#A60303',
					700: '#7C0202',
					800: '#530202',
					900: '#3E0101',
					1000: '#290101',
				},
			},
			backgroundImage: {
				'layout-bg': `url("${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/bg.jpg")`,
			},
			keyframes: {
				'spin-once': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'animation-logo': {
					from: { 'inset-inline-start': '0', opacity: '0' },
					to: { 'inset-inline-start': '28px', opacity: '1' },
				},
				npc1: {
					from: { 'inset-inline-start': '144px', top: '48px', opacity: '0' },
					to: { 'inset-inline-start': '40px', top: '0', opacity: '1' },
				},
				npc2: {
					from: { 'inset-inline-end': '-200px', opacity: '0' },
					to: { 'inset-inline-end': '-96px', opacity: '1' },
				},
				welcome: {
					from: { bottom: '208px', opacity: '0' },
					to: { bottom: '0', opacity: '1' },
				},
				back: {
					from: { bottom: '-48px', opacity: '0' },
					to: { bottom: '0', opacity: '1' },
				},
			},
			animation: {
				'spin-once': 'spin-once 1s ease-in-out forwards', // Adjust duration and timing function as needed
				'animation-logo': 'animation-logo 1s ease-in-out',
				npc1: 'npc1 1s ease-in-out',
				npc2: 'npc2 1s ease-in-out',
				welcome: 'welcome 1s ease-in-out',
				back: 'back 1s ease-in-out',
			},
		},
		fontFamily: {
			sans: ['Poppins'],
		},
	},
	plugins: [
		function ({ addBase, theme }) {
			addBase({
				'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
					{
						'@apply appearance-none': {},
					},
				'input[type="number"]': {
					'@apply appearance-none': {}, // 適用於 Firefox
				},
				'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':
					{
						boxShadow: '0 0 0px 1000px #fff inset',
						WebkitTextFillColor: theme('colors.primary.700'),
					},
			})
		},
		require('tailwind-scrollbar'),
	],
}
