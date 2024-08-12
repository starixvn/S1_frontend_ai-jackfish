'use server'

import { AxiosRequestConfig } from 'axios'
import { cookies } from 'next/headers'
import { fetcher } from '../baseApi'
import { authApiUrl } from './url'

export const checkSignIn = async (
	config?: AxiosRequestConfig,
): Promise<boolean> => {
	const cookieStore = cookies()
	const allCookies = cookieStore.getAll()
	const cookieHeader = allCookies
		.map(cookie => `${cookie.name}=${cookie.value}`)
		.join(';')
	try {
		const data = await fetcher<null>(
			authApiUrl.checkSignIn,
			config && config,
			'POST',
			null,
			{ cookie: cookieHeader },
		)
		return data.errorCode === 0
	} catch (error) {
		return false
	}
}
