import { useQuery } from '@tanstack/react-query'
import { fetcher } from 'JF-api/baseApi'
import type { TUserInfoData } from './type'
import { accountStrictApiUrl } from './url'

/**
 * 取得用戶資料
 */
const useUserInfoQuery = () => {
	return useQuery({
		queryKey: ['accountStrict', 'userInfo'],
		queryFn: () => fetcher<TUserInfoData>(accountStrictApiUrl.getCustProfile),
	})
}

export { useUserInfoQuery }
