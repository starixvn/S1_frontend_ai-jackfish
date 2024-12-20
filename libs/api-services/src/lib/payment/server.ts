'use server'

import { baseAxios } from 'JF-api/baseApi'
import { IPayInfoListAllData } from 'JF-api/payment/type'
import { paymentApiUrl } from 'JF-api/payment/url'
import { AxiosRequestConfig } from 'axios'
import { cookies } from 'next/headers'
export async function getPayInfoListAll(
	config?: AxiosRequestConfig,
): Promise<IPayInfoListAllData | null> {
	const cookieStore = cookies()
	const allCookies = cookieStore.getAll()
	const cookieHeader = allCookies
		.map(cookie => `${cookie.name}=${cookie.value}`)
		.join(';')

	try {
		const response = await baseAxios.post(
			paymentApiUrl.getPayInfoListAll,
			null,
			{
				headers: { cookie: cookieHeader },
				...config,
			},
		)

		return response?.data?.data
	} catch (error) {
		return null
	}
}
