'use client'

import dayjs from 'dayjs'
import useSWR from 'swr'
import { IAxiosError, IAxiosResponse, fetcher } from '../baseApi'
import {
	IGetBankInfoSysListByCurrencyIdArgs,
	ISubmitWithdrawalArgs,
	KycStatusEnum,
	TBankInfoSysData,
	TStatementData,
	TWithdrawalLimitData,
	TWithdrawalRecentInfoData,
	TWithdrawalSetting,
} from './type'
import { paymentApiUrl } from './url'

export const useBankInfoSysListByCurrencyId = ({
	currencyId,
	langId,
}: IGetBankInfoSysListByCurrencyIdArgs) => {
	const { data, isLoading, error } = useSWR<IAxiosResponse<TBankInfoSysData[]>>(
		paymentApiUrl.getBankInfoSysListByCurrencyId,
		(url: string) =>
			fetcher<TBankInfoSysData[], IGetBankInfoSysListByCurrencyIdArgs>(url, {
				currencyId,
				langId,
			}),
	)
	return {
		bankInfoSysListByCurrencyId: data?.data,
		isLoading,
		error,
	}
}

export const getWithdrawalLimit = async (): Promise<
	TWithdrawalLimitData | undefined
> => {
	try {
		const { data } = await fetcher<TWithdrawalLimitData | undefined>(
			paymentApiUrl.getWithdrawalLimit,
		)
		return data
	} catch (e) {
		return undefined
	}
}

/**
 * 用來撈取當前帳戶可用的出金方式選項，從後台可以手動關閉特定出金方式。
 */
export const getWithdrawalBlockSetting = async (): Promise<
	TWithdrawalSetting[]
> => {
	try {
		const { data = [] } = await fetcher<TWithdrawalSetting[]>(
			paymentApiUrl.getWithdrawalBlockSetting,
		)
		return data
	} catch (e) {
		return []
	}
}

/**
 * 送單
 */
export const submitLocalBankWithdrawal = async (
	args: ISubmitWithdrawalArgs,
) => {
	await fetcher<null, ISubmitWithdrawalArgs>(paymentApiUrl.withdrawalReq, args)
}

/**
 * 取得近期提款資料，檢視是否有進行中的存款
 */
export const getWithdrawalRecentInfo = async (): Promise<
	TWithdrawalRecentInfoData[]
> => {
	try {
		const { data = [] } = await fetcher<TWithdrawalRecentInfoData[]>(
			paymentApiUrl.getWithdrawalRecentInfo,
		)

		return data
	} catch (e) {
		return []
	}
}

export const cancelWithdrawalReq = async (transId: string) => {
	await fetcher<{ transId: string }>(paymentApiUrl.setWithdrawalCancel, {
		transId,
	})
}

export const checkKyc = async (): Promise<KycStatusEnum> => {
	try {
		await fetcher(paymentApiUrl.kycCheck)
		return KycStatusEnum.Normal
	} catch (error) {
		const { errorCode } = error as IAxiosError
		if (
			errorCode === KycStatusEnum.KycUpload ||
			errorCode === KycStatusEnum.KycProcessing
		)
			return errorCode

		// 如果是其他異常錯誤統一先回 normal，否則用戶會被卡在 KYC page
		return KycStatusEnum.Normal
	}
}

export const getFinancialLog = async (
	startDate: string,
	endDate: string,
	pageNumber = 1,
): Promise<TStatementData[]> => {
	try {
		// 將日期轉換為秒為單位的 Unix 時間戳
		const startDateTimestamp = dayjs(startDate).unix()
		const endDateTimestamp = dayjs(endDate).unix()
		// payload
		const payload = {
			startDate: startDateTimestamp,
			endDate: endDateTimestamp,
			pageNumber,
		}
		const response = await fetcher<TStatementData[], typeof payload>(
			paymentApiUrl.getStatement,
			payload,
		)
		return response.data || []
	} catch (e) {
		return []
	}
}
