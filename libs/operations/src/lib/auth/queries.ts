// 所有 auth 會使用到的 queries
import { useUserInfoQuery } from 'JF-api/accountStrict/queries'
import { TUserInfoData } from 'JF-api/accountStrict/type'

type TAuthInfoData = {
	isLoading: boolean
	userInfo: TUserInfoData
}

const defaultUserInfo: TUserInfoData = {
	userName: 'guest',
	langId: String(process.env.NEXT_PUBLIC_DEFAULT_LANG),
	currencyId: Number(process.env.NEXT_PUBLIC_DEFAULT_CURRENCY),
}

const useAuthBasicQueries = () => {
	const userInfoQuery = useUserInfoQuery()

	return {
		userInfoQuery,
	}
}

const useAuthInfo = (): TAuthInfoData => {
	const { userInfoQuery } = useAuthBasicQueries()

	const queries = [userInfoQuery]

	const isLoading = queries.some(query => query.isFetching)

	return {
		isLoading,
		userInfo: userInfoQuery.data?.data ?? defaultUserInfo,
	}
}

export { useAuthBasicQueries, useAuthInfo }
