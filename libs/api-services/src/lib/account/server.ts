'use server'

import { fetcher } from 'JF-api/baseApi'
import { IMainWalletInfoData } from './type'
import { accountApiUrl } from './url'

export const getMainWalletInfo = async () => {
	try {
		const data = await fetcher<IMainWalletInfoData, null>(
			`${accountApiUrl.getMainWalletInfo}`,
		)
		return data?.data
	} catch (e) {
		return {}
	}
}
