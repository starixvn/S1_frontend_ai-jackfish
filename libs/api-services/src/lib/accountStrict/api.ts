import useSWR from 'swr'
import { fetcher, IAxiosResponse } from '../baseApi'
import { IUserInfoData } from './type'
import { accountStrictApiUrl } from './url'

export const getUserInfo = async () => {
	return await fetcher<IUserInfoData>(accountStrictApiUrl.getCustProfile)
}

// 用 useSWR 封裝，不一定使用得到
export const useCustProfile = () => {
	const { data, isLoading } = useSWR<IAxiosResponse<IUserInfoData>>(
		accountStrictApiUrl.getCustProfile,
		(url: string) => fetcher<IUserInfoData>(url),
	)
	return {
		profile: data?.data,
		isLoading,
	}
}
