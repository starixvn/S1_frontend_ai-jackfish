import { NextFetchEvent, type NextRequest } from 'next/server'

import {
	envCookieNames,
	fallbackLng,
	languages,
} from '@brand01/src/i18n/settings'
import { localesMiddleware, type CustomMiddleware } from 'JF-core/middleware'

export function localeMiddleware(middleware: CustomMiddleware) {
	return async (request: NextRequest, event: NextFetchEvent) => {
		// Call the next middleware and pass the request and response
		return localesMiddleware({
			middleware,
			event,
			req: request,
			configs: {
				fallbackLng,
				languages,
				cookieName: envCookieNames.langId,
			},
		})
	}
}
