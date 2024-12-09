import { LangId, langId } from 'JF-constants'

export const languages: LangId[] = [langId.en, langId.ar]

export const fallbackLng = languages[0]

export const envCookieNames = {
	langId: `${process.env['NEXT_PUBLIC_SITE_NAME']}LangId`,
	currencyId: `${process.env['NEXT_PUBLIC_SITE_NAME']}_currencyId`,
	LineUserId: `${process.env['NEXT_PUBLIC_SITE_NAME']}_lineUserId`,
	AppDownloadHint: `${process.env['NEXT_PUBLIC_SITE_NAME']}_AppDownloadHint`,
}

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
