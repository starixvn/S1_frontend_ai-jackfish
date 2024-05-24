import { NextResponse, NextRequest } from 'next/server'
import acceptLanguage from 'accept-language'

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
	const { fallbackLng, languages, cookieName } = configs
	// 提供 acceptLanguage 支援的語言
	// acceptLanguage 用於解析用戶瀏覽器語系
	acceptLanguage.languages(languages)

	// 執行 middleware logic
	if (
		req.nextUrl.pathname.indexOf('icon') > -1 ||
		req.nextUrl.pathname.indexOf('chrome') > -1
	) {
		return NextResponse.next()
	}

	let lng: string | undefined | null = null
	// cookie
	if (req.cookies.has(cookieName)) {
		lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
	}
	// accept language (瀏覽器資訊)
	if (!lng) {
		lng = acceptLanguage.get(req.headers.get('Accept-Language'))
	}
	// 預設
	if (!lng) {
		lng = fallbackLng
	}

	// 檢查當前 path 攜帶的 locale 是否支援，若不支援則 redirect
	if (
		!languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
		!req.nextUrl.pathname.startsWith('/_next')
	) {
		return NextResponse.redirect(
			new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
		)
	}

	// 根據網頁 referer (prePage)，判斷用戶偏好的瀏覽器 locale , 我們不一定需要此邏輯，先註解保留
	// if (req.headers.has('referer')) {
	//   const refererUrl = new URL(req.headers.get('referer') || '');
	//   const lngInReferer = languages.find(l =>
	//     refererUrl.pathname.startsWith(`/${l}`)
	//   );
	//   const response = NextResponse.next();
	//   if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
	//   return response;
	// }

	return NextResponse.next()
}
