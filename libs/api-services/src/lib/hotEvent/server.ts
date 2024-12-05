'use server'

import { AxiosRequestConfig } from 'axios'
import { cookies } from 'next/headers'
import { fetcher } from '../baseApi'
import { THotEventData } from './type'
import { hotEventApiUrl } from './url'

export const getHotEventList = async (
	config?: AxiosRequestConfig,
): Promise<THotEventData[]> => {
	const cookieStore = cookies()
	const langId = cookieStore.get('i18next')?.value
	const allCookies = cookieStore.getAll()
	const cookieHeader = allCookies
		.map(cookie => `${cookie.name}=${cookie.value}`)
		.join(';')
	try {
		const data = await fetcher<THotEventData[]>(
			`${hotEventApiUrl.getHotEventList}/${langId}`,
			config && config,
			'POST',
			null,
			{ cookie: cookieHeader },
		)
		return data?.data
	} catch (error) {
		return []
	}
}
