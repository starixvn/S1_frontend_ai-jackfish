'use client'

import { fetcher, IAxiosError } from '../baseApi'
import { IWalletInfoData } from './type'
import { accountApiUrl } from './url'

export const onlineCheck = async () => {
	try {
		const data = await fetcher<null>(accountApiUrl.onlineCheck)
		return data
	} catch (error) {
		throw error as IAxiosError
	}
}

export const getWalletInfo = async () => {
	try {
		const data = await fetcher<IWalletInfoData, null>(
			`${accountApiUrl.getWalletInfo}`,
		)
		return data?.data
	} catch (e) {
		return null
	}
}

export const setLanguage = async ({ langId }: { langId: string }) => {
	try {
		const data = await fetcher<null, { langId: string }>(
			accountApiUrl.setLang,
			{ langId },
		)
		return data
	} catch (error) {
		throw error as IAxiosError
	}
}
