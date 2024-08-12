'use client'

import { fetcher } from '../baseApi'
import { TUserInfoData } from './type'
import { accountStrictApiUrl } from './url'

export const getUserInfo = async () => {
	try {
		const data = await fetcher<TUserInfoData>(
			accountStrictApiUrl.getCustProfile,
		)
		return data?.data
	} catch (error) {
		return null
	}
}

// 用 useSWR 封裝，不一定使用得到
// export const useCustProfile = () => {
// 	const { data, isLoading, error } = useSWR<IAxiosResponse<TUserInfoData>>(
// 		accountStrictApiUrl.getCustProfile,
// 		(url: string) => fetcher<TUserInfoData>(url),
// 	)
// 	return {
// 		profile: data?.data,
// 		isLoading,
// 		error,
// 	}
// }
