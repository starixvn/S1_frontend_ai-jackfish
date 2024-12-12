export const fallbackLng = 'en'
export const languages = [
	fallbackLng,
	'th',
	// 'bd',
	// 'ch',
	// 'cs',
	// 'gb',
	// 'id',
	// 'in',
	// 'kh',
	// 'vn',
]

const defaultNS = process.env.NEXT_PUBLIC_SITE_NAME
const commonNS = 'common'

export function getOptions(
	lng = fallbackLng,
	ns: string | string[] = defaultNS ? [defaultNS, commonNS] : commonNS,
) {
	return {
		// debug: true,
		supportedLngs: languages,
		// preload: languages,
		lng,
		ns,
		defaultNS,
		fallbackNS: commonNS,
		fallbackLng,
	}
}
