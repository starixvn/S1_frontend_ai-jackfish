// 所有 auth 會使用到的 queries
import {
	useGetCustBonusWalletQuery,
	useGetMainWalletInfoQuery,
	useGetTpWalletListQuery,
} from 'JF-api/account/queries'
import {
	ICustBonusWalletData,
	IMainWalletInfoData,
	ITpWalletData,
	TpWalletListTypeEnum,
} from 'JF-api/account/type'
import { useUserInfoQuery } from 'JF-api/accountStrict/queries'
import { TUserInfoData } from 'JF-api/accountStrict/type'
import { useAuthStore } from 'JF-operations'

const defaultMainWalletInfo = {
	balance: 0,
	lastLoginTime: '',
	lastTransaction: '',
	isHideBalance: false,
}

const defaultCustBonusWallet = [
	{
		bonusId: 0,
		bonus: 0,
		rollover: 0,
		turnover: 0,
		promoCategoryId: 0,
		tpId: 0,
		expiryTime: '',
		status: 0,
		fullFillType: 1,
	},
]

type TAuthInfoData = {
	isLoading: boolean
	userInfo: TUserInfoData
	mainWalletInfo: IMainWalletInfoData
	custBonusWallet: ICustBonusWalletData[]
	tpWalletList: ITpWalletData[]
	refetchAllWallet: () => Promise<void>
}

const defaultUserInfo: TUserInfoData = {
	userName: 'guest',
	langId: String(process.env.NEXT_PUBLIC_DEFAULT_LANG),
	currencyId: Number(process.env.NEXT_PUBLIC_DEFAULT_CURRENCY),
}

interface IUseAuthBasicQueries {
	langId?: string
	listType?: TpWalletListTypeEnum
	tpId?: number
}

const useAuthBasicQueries = ({ langId, listType }: IUseAuthBasicQueries) => {
	const userInfoQuery = useUserInfoQuery()
	const mainWalletInfoQuery = useGetMainWalletInfoQuery()
	const custBonusWalletQuery = useGetCustBonusWalletQuery()
	const tpWalletListQuery = useGetTpWalletListQuery({
		langId: langId || '',
		listType: listType || TpWalletListTypeEnum.All,
	})

	return {
		userInfoQuery,
		mainWalletInfoQuery,
		custBonusWalletQuery,
		tpWalletListQuery,
	}
}

const useAuthInfo = (): TAuthInfoData => {
	const {
		userInfo: { langId },
	} = useAuthStore()
	const {
		userInfoQuery,
		mainWalletInfoQuery,
		custBonusWalletQuery,
		tpWalletListQuery,
	} = useAuthBasicQueries({ langId, listType: TpWalletListTypeEnum.All })

	const queries = [
		userInfoQuery,
		mainWalletInfoQuery,
		custBonusWalletQuery,
		tpWalletListQuery,
	]

	const isLoading = queries.some(query => query.isFetching)

	const { data: { data: mainWalletInfo } = {}, refetch: reftchMainWalletInfo } =
		mainWalletInfoQuery
	const {
		data: { data: custBonusWallet } = {},
		refetch: refetchCustBonusWallet,
	} = custBonusWalletQuery
	const { data: { data: tpWalletList } = {}, refetch: refetchTpWalletList } =
		tpWalletListQuery

	const refetchAllWallet = async () => {
		await Promise.all([
			reftchMainWalletInfo(),
			refetchCustBonusWallet(),
			refetchTpWalletList(),
		])
	}

	return {
		isLoading,
		userInfo: userInfoQuery.data?.data ?? defaultUserInfo,
		mainWalletInfo: mainWalletInfo ?? defaultMainWalletInfo,
		custBonusWallet: custBonusWallet ?? defaultCustBonusWallet,
		tpWalletList: tpWalletList ?? [],
		refetchAllWallet,
	}
}

// const useAuthInfo = () => {
// 	const {
// 		userInfo: { langId },
// 	} = useAuthStore()
// 	const { mainWalletInfoQuery, custBonusWalletQuery, tpWalletListQuery } =
// 		useAuthBasicQueries({ langId, listType: TpWalletListTypeEnum.All })

// 	const queries = [mainWalletInfoQuery, custBonusWalletQuery, tpWalletListQuery]

// 	const isLoading = queries.some(query => query.isFetching)

// 	const { data: { data: mainWalletInfo } = {} } = mainWalletInfoQuery
// 	const { data: { data: custBonusWallet } = {} } = custBonusWalletQuery
// 	const { data: { data: tpWalletList } = {} } = tpWalletListQuery

// 	return {
// 		isLoading,
// 		mainWalletInfo: mainWalletInfo ?? defaultMainWalletInfo,
// 		custBonusWallet: custBonusWallet ?? defaultCustBonusWallet,
// 		tpWalletList: tpWalletList,
// 	}
// }

export { useAuthBasicQueries, useAuthInfo }
