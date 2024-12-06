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
					50: '#F1F5FD',
					100: '#E3ECFC',
					200: '#C8D9F9',
					300: '#ACC6F6',
					400: '#91B4F3',
					500: '#648DD6',
					600: '#4C72B6',
					700: '#355896',
					800: '#142A52',
					900: '#0A1B38',
				},
				secondary: {
					50: '#FFF1E6',
					100: '#FFE4CC',
					200: '#FFC899',
					300: '#FFAD66',
					400: '#FF9133',
					500: '#FF7600',
					600: '#CC5E00',
					700: '#994700',
					800: '#662F00',
					900: '#331800',
				},
				tertiary: {
					50: '#FBF8F5',
					100: '#F7F1EB',
					200: '#F0E4D7',
					300: '#E8D6C3',
					400: '#E1C9AF',
					500: '#D9BB9B',
					600: '#B79C80',
					700: '#957D64',
					800: '#745F49',
					900: '#52402D',
				},
				warning: {
					50: '#FFFBE2',
					100: '#FFF9CB',
					200: '#FFF49E',
					300: '#FFEF72',
					400: '#FFEA45',
					500: '#FFE518',
					600: '#D7C113',
					700: '#AF9D0E',
					800: '#87780A',
					900: '#5F5405',
				},
				danger: {
					50: '#FAE3E3',
					100: '#F5CACA',
					200: '#EC9999',
					300: '#E26767',
					400: '#D93636',
					500: '#CF0404',
					600: '#A60303',
					700: '#7C0202',
					800: '#530202',
					900: '#290101',
				},
				info: {
					50: '#E9F1FF',
					100: '#D4E3FF',
					200: '#B3C3FE',
					300: '#7DACFF',
					400: '#5291FF',
					500: '#2775FF',
					600: '#1F62D8',
					700: '#174FB1',
					800: '#103B89',
					900: '#082862',
				},
				success: {
					50: '#BBE8C1',
					100: '#ACE2B3',
					200: '#8FD698',
					300: '#73CA7E',
					400: '#56BE63',
					500: '#39B248',
					600: '#2F933B',
					700: '#25742F',
					800: '#1C5522',
					900: '#123616',
				},
				gray: {
					50: '#F6F6F6',
					100: '#EDEDED',
					200: '#DCDCDC',
					300: '#CACACA',
					400: '#B9B9B9',
					500: '#A7A7A7',
					600: '#8D8D8D',
					700: '#747474',
					800: '#5A5A5A',
					900: '#414141',
				},
				black: '#0c0c0d',
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
