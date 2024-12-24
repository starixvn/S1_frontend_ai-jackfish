'use client'

import useSWR from 'swr'
import { IAxiosResponse, fetcher } from '../baseApi'
import type { TCountryListData } from './type'
import { geoIpApiUrl } from './url'

export const useGetCountryList = () => {
	const { data: { data: countryList } = {}, isLoading } = useSWR<
		IAxiosResponse<TCountryListData[]>
	>(geoIpApiUrl.getCountryList, (url: string) =>
		fetcher<TCountryListData[]>(url, null, 'GET'),
	)
	return {
		countryList,
		isLoading,
	}
}
