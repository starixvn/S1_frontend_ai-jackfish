'use client'

import useSWR from 'swr'
import { IAxiosError, IAxiosResponse, fetcher } from '../baseApi'
import {
	KycStatusEnum,
	type IDepositBankTransferReqData,
	type IDepositInfoRecentData,
	type IGetBankInfoSysListByCurrencyIdArgs,
	type IPayInfoListAllData,
	type IPostDepositBankTransferReqArgs,
	type ISubmitWithdrawalArgs,
	type IUploadReceiptArgs,
	type TBankInfoSysData,
	type TWithdrawalLimitData,
	type TWithdrawalRecentInfoData,
	type TWithdrawalSetting,
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

export const getPayInfoListAll = async () => {
	try {
		const { data } = await fetcher<IPayInfoListAllData, null>(
			paymentApiUrl.getPayInfoListAll,
		)
		return data
	} catch (e) {
		return null
	}
}

export const postDepositBankTransferReq = async ({
	...args
}: IPostDepositBankTransferReqArgs) => {
	try {
		return await fetcher<
			IDepositBankTransferReqData,
			IPostDepositBankTransferReqArgs
		>(paymentApiUrl.postDepositBankTransferReq, args)
	} catch (error) {
		throw error as IAxiosError
	}
}

export const postUploadReceipt = async ({ ...args }: IUploadReceiptArgs) => {
	try {
		return await fetcher<null, IUploadReceiptArgs>(
			paymentApiUrl.uploadReceipt,
			args,
		)
	} catch (error) {
		throw error as IAxiosError
	}
}

export const checkDepositSpecialCode = async ({
	specialCode,
}: {
	specialCode: string
}) => {
	try {
		return await fetcher<{ bonusCode: string }, { specialCode: string }>(
			paymentApiUrl.checkDepositSpecialCode,
			{ specialCode },
		)
	} catch (error) {
		throw error as IAxiosError
	}
}

export const getDepositInfoRecentList = async () => {
	try {
		const { data } = await fetcher<Array<IDepositInfoRecentData>, void>(
			paymentApiUrl.getDepositInfoRecentList,
		)

		return data
	} catch (error) {
		throw error as IAxiosError
	}
}
