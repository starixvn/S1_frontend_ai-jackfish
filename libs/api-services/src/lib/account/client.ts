'use client'

import { IAxiosError, fetcher } from '../baseApi'
import {
	IWalletInfoData,
	TCustBankInfoData,
	TEWalletData,
	TWithdrawalAvailableBalanceData,
} from './type'
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

export const getCustBankInfo = async (): Promise<TCustBankInfoData> => {
	try {
		const { data } = await fetcher<TCustBankInfoData>(
			accountApiUrl.getCustBankInfo,
		)
		return data
	} catch (e) {
		return {} as TCustBankInfoData
	}
}

/**
 * 用來撈取當前帳戶可用與可出金金額資訊，顯示於 Withdrawal page 上方。
 */
export const getWithdrawalAvailableBalance =
	async (): Promise<TWithdrawalAvailableBalanceData> => {
		try {
			const { data } = await fetcher<TWithdrawalAvailableBalanceData>(
				accountApiUrl.getWithdrawalAvailableBalance,
			)
			return data
		} catch (e) {
			return {} as TWithdrawalAvailableBalanceData
		}
	}

/**
 * 用來撈用戶可用的 EWallet 資料。
 */
export const getCustEWalletInfo = async () => {
	try {
		const { data = [] } = await fetcher<TEWalletData[]>(
			accountApiUrl.getCustEWalletInfo,
		)
		return data
	} catch (e) {
		return []
	}
}
