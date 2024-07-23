'use server'

import { AxiosRequestConfig } from 'axios'
import { baseAxios } from '../baseApi'
import { cookies } from 'next/headers'

const authApiUrl = {
	checkSignIn: 'Site/CheckSignIn',
}

export const checkSignIn = async (
	config?: AxiosRequestConfig,
): Promise<boolean> => {
	const cookieStore = cookies()
	const allCookies = cookieStore.getAll()
	const cookieHeader = allCookies
		.map(cookie => `${cookie.name}=${cookie.value}`)
		.join(';')

	try {
		const { data: { errorCode } = {} } = await baseAxios.post(
			authApiUrl.checkSignIn,
			null,
			{
				headers: { cookie: cookieHeader },
				...config,
			},
		)
		return errorCode === 0
	} catch (error) {
		return false
	}
}
