'use client'

import dayjs from 'dayjs'
import useSWR from 'swr'
import { IAxiosError, IAxiosResponse, fetcher } from '../baseApi'
import {
	type IDepositBankTransferReqData,
	type IDepositInfoRecentData,
	type IGetBankInfoSysListByCurrencyIdArgs,
	type IPayInfoListAllData,
	type IPostDepositBankTransferReqArgs,
	type IUploadReceiptArgs,
	type TBankInfoSysData,
	type TStatementData,
	type TWithdrawalLimitData,
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
