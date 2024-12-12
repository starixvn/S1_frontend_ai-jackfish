import { langId, LangId } from '../data/country'

export const languages: LangId[] = [langId.en, langId.ar, langId.th, langId.vn]

export const fallbackLng = languages[0]

const defaultNS = process.env.NEXT_PUBLIC_SITE_NAME
const commonNS = 'common'

export function getOptions(
	lng: string = fallbackLng,
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
