import useSWR from 'swr'
import { fetcher, IAxiosResponse } from '../baseApi'
import { type TTpMaintainData } from './type'

const siteApiUrl = {
	getTpMaintainList: 'Site/GetTpMaintainList',
}

export const getTpMaintainList = () => {
	const { data, isLoading } = useSWR<IAxiosResponse<TTpMaintainData>>(
		siteApiUrl.getTpMaintainList,
		(url: string) => fetcher<TTpMaintainData>(url),
	)
	return {
		tpMaintainList: data?.data,
		isLoading,
	}
}
