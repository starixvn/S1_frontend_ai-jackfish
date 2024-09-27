import { blockIpMiddleware, chain } from 'JF-core/middleware'
import { localeMiddleware } from './middlewares'

// NextJS 官方定義的 config 寫法
// config 寫在外部 import 不會運作，不管用哪種 import 方式都一樣，待解決，先這樣寫
export const config = {
	matcher: [
		'/((?!.*block-ip)(?!api/|img/|_next/|health|favicon.ico|sw.js|site.webmanifest|[^/]+/Cashier/).*)',
	],
}
export default chain([localeMiddleware, blockIpMiddleware])
