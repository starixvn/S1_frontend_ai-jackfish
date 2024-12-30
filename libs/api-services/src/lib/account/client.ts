'use client'

import useSWR from 'swr'
import { IAxiosError, IAxiosResponse, fetcher } from '../baseApi'
import {
	ICustBonusWalletData,
	IMainWalletInfoData,
	ISetChangePasswordArgs,
	ITpWalletData,
	ITpWalletInfoData,
	IWalletInfoData,
	TCustBankInfoData,
	TCustVIPProgress,
	TEWalletData,
	TReferralSettingDetailData,
	TReferralSummaryData,
	TWithdrawalAvailableBalanceData,
	TpWalletListTypeEnum,
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

/**
 * @getMainWalletInfo 主錢包 API
 * @getCustBonusWallet Bonus wallet API
 * @getTpWalletList TP Wallet API
 * @getTpWalletInfoByTpId 單一TP Wallet API
 */
export const getMainWalletInfo = async () => {
	try {
		const data = await fetcher<IMainWalletInfoData, null>(
			`${accountApiUrl.getMainWalletInfo}`,
		)
		return data?.data
	} catch (e) {
		return null
	}
}

export const getCustBonusWallet = async () => {
	try {
		const data = await fetcher<ICustBonusWalletData[], null>(
			`${accountApiUrl.getCustBonusWallet}`,
		)
		return data?.data
	} catch (e) {
		return []
	}
}

export const getTpWalletList = async ({
	langId,
	listType,
}: {
	langId: string
	listType: TpWalletListTypeEnum
}) => {
	try {
		const data = await fetcher<ITpWalletData[]>(
			`${accountApiUrl.getTpWalletList}/${langId}`,
			{
				listType,
			},
		)
		return data?.data
	} catch (e) {
		return []
	}
}

export const getTpWalletInfoByTpId = async (tpId: number) => {
	try {
		const data = await fetcher<ITpWalletInfoData>(
			`${accountApiUrl.getTpWalletBalance}`,
			{
				tpId,
			},
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

export const useGetReferralCode = () => {
	const { data, isLoading, error } = useSWR<IAxiosResponse<string>>(
		accountApiUrl.getReferralCode,
		(url: string) => fetcher<string>(url),
	)
	return {
		referralCode: data?.data,
		isLoading,
		error,
	}
}

export const useGetReferralSummary = () => {
	const { data, isLoading, error } = useSWR<
		IAxiosResponse<TReferralSummaryData>
	>(accountApiUrl.getReferralSummary, (url: string) =>
		fetcher<TReferralSummaryData>(url),
	)
	return {
		referralSummary: data?.data,
		isLoading,
		error,
	}
}

export const useGetReferralSettingDetail = () => {
	const { data, isLoading, error } = useSWR<
		IAxiosResponse<TReferralSettingDetailData>
	>(accountApiUrl.getReferralSettingDetail, (url: string) =>
		fetcher<TReferralSettingDetailData>(url),
	)
	return {
		referralSettingDetail: data?.data,
		isLoading,
		error,
	}
}

export const changePassword = async (args: ISetChangePasswordArgs) => {
	try {
		return await fetcher<null, ISetChangePasswordArgs>(
			accountApiUrl.changePassword,
			args,
		)
	} catch (error) {
		throw error as IAxiosError
	}
}

/**
 * 撈取用戶VIP等級資料
 */
export const getCustVIPProgress = async (): Promise<TCustVIPProgress> => {
	try {
		const { data } = await fetcher<TCustVIPProgress>(
			accountApiUrl.getCustVIPProgress,
		)
		return data
	} catch (e) {
		return {} as TCustVIPProgress
	}
}
