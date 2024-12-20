// 所有 withdrawal 會使用到的 queries
import {
	useBankInfoQuery,
	useEWalletInfoQuery,
	useWithdrawalAvailableBalanceQuery,
} from 'JF-api/account/queries'
import {
	useKycStatusQuery,
	useWithdrawalBlockSettingQuery,
	useWithdrawalLimitQuery,
	useWithdrawalRecentInfoQuery,
} from 'JF-api/payment/queries'
import { KycStatusEnum } from 'JF-api/payment/type'
import { useMemo } from 'react'
import { IWithdrawalInfoData } from './type'

const useWithdrawalBasicQueries = () => {
	const kycQuery = useKycStatusQuery()
	const bankQuery = useBankInfoQuery()
	const eWalletQuery = useEWalletInfoQuery()
	const balanceQuery = useWithdrawalAvailableBalanceQuery()
	const limitQuery = useWithdrawalLimitQuery()
	const blockSettingQuery = useWithdrawalBlockSettingQuery()
	const recentInfoQuery = useWithdrawalRecentInfoQuery()

	return {
		kycQuery,
		bankQuery,
		eWalletQuery,
		balanceQuery,
		limitQuery,
		blockSettingQuery,
		recentInfoQuery,
	}
}

const useWithdrawalInfo = (): IWithdrawalInfoData => {
	const {
		kycQuery,
		bankQuery,
		eWalletQuery,
		balanceQuery,
		limitQuery,
		blockSettingQuery,
		recentInfoQuery,
	} = useWithdrawalBasicQueries()

	const queries = [
		kycQuery,
		bankQuery,
		eWalletQuery,
		balanceQuery,
		limitQuery,
		blockSettingQuery,
		recentInfoQuery,
	]

	const isLoading = queries.some(query => query.isFetching)

	const { data: { data: custBankInfo } = {} } = bankQuery
	const { data: { data: custEWalletInfo = [] } = {} } = eWalletQuery

	// bankData 計算
	const bankData = useMemo(() => {
		const {
			bankInfoDetail = [],
			uSDTDetail: usdtDetail = [],
			accountName = '',
		} = custBankInfo ?? {}

		return {
			bankData: {
				bankInfoDetail,
				usdtDetail,
				custEWalletInfo,
			},
			accountName,
		}
	}, [custBankInfo, custEWalletInfo])

	return {
		isLoading,
		kycStatus: kycQuery.data?.data ?? KycStatusEnum.Normal,
		withdrawalBalance: balanceQuery.data?.data,
		withdrawalLimit: limitQuery.data?.data,
		withdrawalBlockSetting: blockSettingQuery.data?.data ?? [],
		...bankData,
	}
}

export { useWithdrawalBasicQueries, useWithdrawalInfo }
