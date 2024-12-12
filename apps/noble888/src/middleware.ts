import { ENV_COOKIE_NAMES } from 'JF-constants'
import { appMiddleware } from 'JF-core/middleware'
import { NextRequest } from 'next/server'
import { fallbackLng, languages } from './i18n/settings'

// NextJS 官方定義的 config 寫法
// config 寫在外部 import 不會運作，不管用哪種 import 方式都一樣，待解決，先這樣寫
export const config = {
	matcher: [
		'/((?!api/|img/|tp|_next/|health|favicon.ico|sw.js|site.webmanifest|[^/]+/Cashier/|block-ip).*)',
	],
}

export function middleware(req: NextRequest) {
	return appMiddleware({
		req,
		configs: {
			fallbackLng,
			languages,
			cookieName: ENV_COOKIE_NAMES.langId,
		},
	})
}
