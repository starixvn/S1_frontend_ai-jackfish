'use client'
import { toast } from 'react-toastify'
import { IAxiosError, fetcher } from '../baseApi'
import { ISetLangArgs, IWalletInfoData } from './type'
import { accountApiUrl } from './url'

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

export const setLanguage = async (
	{ langId, currencyId }: ISetLangArgs,
	errorMsg: string,
) => {
	try {
		const data = await fetcher<null, ISetLangArgs>(accountApiUrl.setLang, {
			langId,
			currencyId,
		})
		return data.errorCode === 0
	} catch (error) {
		// api出問題時跳出錯誤通知
		toast.error(errorMsg)
		const { errorCode } = error as IAxiosError
		return errorCode
	}
}
