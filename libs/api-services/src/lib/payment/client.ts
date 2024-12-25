'use client'

import dayjs from 'dayjs'
import useSWR from 'swr'
import { IAxiosError, IAxiosResponse, fetcher } from '../baseApi'
import {
	type ICustTpBetRecordDetailListbyGameTypeArgs,
	type ICustTpBetRecordDetailListbyGameTypeData,
	type ICustTpBetRecordListDateRangeArgs,
	type ICustTpBetRecordListDateRangeData,
	type ICustTpBetRecordListOneDayArgs,
	type ICustTpBetRecordListOneDayData,
	type ICustTpBetRecordListbyCategoryIdArgs,
	type ICustTpBetRecordListbyCategoryIdData,
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

export { IAxiosResponse }

export const getCustTpBetRecordListDateRange = async ({
	startDate,
	endDate,
	pageNumber,
	pageSize,
}: ICustTpBetRecordListDateRangeArgs): Promise<
	IAxiosResponse<ICustTpBetRecordListDateRangeData[]>
> => {
	try {
		const response = await fetcher<ICustTpBetRecordListDateRangeData[]>(
			paymentApiUrl.getCustTpBetRecordListDateRange,
			{
				startDate,
				endDate,
				pageNumber,
				pageSize,
			},
		)
		return response // 返回整個 response
	} catch (error) {
		throw error as IAxiosError // 捕捉並拋出錯誤
	}
}

export const getCustTpBetRecordListOneDay = async ({
	selDate,
	pageNumber,
	pageSize,
}: ICustTpBetRecordListOneDayArgs): Promise<
	IAxiosResponse<ICustTpBetRecordListOneDayData[]>
> => {
	try {
		const response = await fetcher<ICustTpBetRecordListOneDayData[]>(
			paymentApiUrl.getGetCustTpBetRecordListOneDay,
			{
				selDate,
				pageNumber,
				pageSize,
			},
		)
		return response
	} catch (error) {
		throw error as IAxiosError
	}
}

export const getCustTpBetRecordListbyCategoryId = async ({
	selDate,
	categoryId,
	pageNumber,
	pageSize,
}: ICustTpBetRecordListbyCategoryIdArgs): Promise<
	IAxiosResponse<ICustTpBetRecordListbyCategoryIdData[]>
> => {
	try {
		const response = await fetcher<ICustTpBetRecordListbyCategoryIdData[]>(
			paymentApiUrl.getCustTpBetRecordListbyCategoryId,
			{
				selDate,
				categoryId,
				pageNumber,
				pageSize,
			},
		)

		return response
	} catch (error) {
		throw error as IAxiosError
	}
}

export const getCustTpBetRecordDetailListbyGameType = async ({
	selDate,
	gameTypeID,
	pageNumber,
	pageSize,
}: ICustTpBetRecordDetailListbyGameTypeArgs): Promise<
	IAxiosResponse<ICustTpBetRecordDetailListbyGameTypeData[]>
> => {
	try {
		const response = await fetcher<ICustTpBetRecordDetailListbyGameTypeData[]>(
			paymentApiUrl.getCustTpBetRecordDetailListbyGameType,
			{
				selDate,
				gameTypeID,
				pageNumber,
				pageSize,
			},
		)
		return response
	} catch (error) {
		throw error as IAxiosError
	}
}

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
