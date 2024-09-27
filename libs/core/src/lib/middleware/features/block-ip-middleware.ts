import {
	NextResponse,
	type NextFetchEvent,
	type NextRequest,
} from 'next/server'

import { getIpCountry } from 'JF-api/site/server'
import { paths } from 'JF-constants'
import { CustomMiddleware } from '../chain'

export function blockIpMiddleware(middleware: CustomMiddleware) {
	return async (
		request: NextRequest,
		event: NextFetchEvent,
		response: NextResponse,
	) => {
		const ipCountryResult = (await getIpCountry(request.headers)) || {}
		const { isAccess = true } = ipCountryResult

		if (!isAccess) {
			return NextResponse.redirect(
				new URL(
					// 也可補固定語系路徑 block ip 沒有分語系
					`/${request.nextUrl.pathname.split('/')[1]}/${paths.blockIp.root}`,
					request.url,
				),
			)
		}

		// Call the next middleware and pass the request and response
		return middleware(request, event, response)
	}
}
