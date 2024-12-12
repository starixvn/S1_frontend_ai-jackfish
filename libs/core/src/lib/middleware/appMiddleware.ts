import acceptLanguage from 'accept-language'
import { ENV_COOKIE_NAMES } from 'JF-constants'
import { NextRequest, NextResponse } from 'next/server'

export const appMiddleware = ({
	req,
	configs,
}: {
	req: NextRequest
	configs: {
		fallbackLng: string
		languages: string[]
		cookieName: string
	}
}) => {
	// const { languages, cookieName } = configs
	const { fallbackLng, languages, cookieName } = configs
	const res = NextResponse.next()
	// 提供 acceptLanguage 支援的語言
	// acceptLanguage 用於解析用戶瀏覽器語系
	acceptLanguage.languages(languages)
	// 執行 middleware logic
	if (req.nextUrl.pathname.indexOf('chrome') > -1) {
		return res
	}
	// 初始化 cookie，設定 env default value
	if (!req.cookies.has(cookieName)) {
		res.cookies.set(
			ENV_COOKIE_NAMES.langId,
			String(process.env.NEXT_PUBLIC_DEFAULT_LANG),
		)
		res.cookies.set(
			ENV_COOKIE_NAMES.currencyId,
			String(process.env.NEXT_PUBLIC_DEFAULT_CURRENCY),
		)
	}

	// lng 優先順序：accept language(cookie) ->  accept language(瀏覽器資訊) -> 預設
	const lng: string =
		acceptLanguage.get(
			req.cookies.get(cookieName)?.value || req.headers.get('Accept-Language'),
		) || fallbackLng

	// 檢查當前 path 攜帶的 locale 是否支援，若不支援則 redirect
	if (
		!languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
		!req.nextUrl.pathname.startsWith('/_next')
	) {
		const query = req.nextUrl.searchParams.toString()
		return NextResponse.redirect(
			new URL(
				`/${lng}${req.nextUrl.pathname}${query ? `?${query}` : ''}`,
				req.url,
			),
		)
	}

	return res
}
