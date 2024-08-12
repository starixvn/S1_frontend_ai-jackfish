'use client'

import useSWR from 'swr'
import { fetcher, IAxiosResponse } from '../baseApi'
import { IGetBankInfoSysListByCurrencyIdArgs, TBankInfoSysData } from './type'
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
