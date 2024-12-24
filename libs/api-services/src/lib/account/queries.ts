import { useQuery } from '@tanstack/react-query'
import { fetcher } from 'JF-api/baseApi'
import {
	TCustBankInfoData,
	TEWalletData,
	TWithdrawalAvailableBalanceData,
} from './type'
import { accountApiUrl } from './url'

const useBankInfoQuery = () => {
	return useQuery({
		queryKey: ['payment', 'bankInfo'],
		queryFn: () => fetcher<TCustBankInfoData>(accountApiUrl.getCustBankInfo),
	})
}

const useEWalletInfoQuery = () => {
	return useQuery({
		queryKey: ['withdrawal', 'eWallet'],
		queryFn: () => fetcher<TEWalletData[]>(accountApiUrl.getCustEWalletInfo),
	})
}

const useWithdrawalAvailableBalanceQuery = () => {
	return useQuery({
		queryKey: ['withdrawal', 'balance'],
		queryFn: () =>
			fetcher<TWithdrawalAvailableBalanceData>(
				accountApiUrl.getWithdrawalAvailableBalance,
			),
	})
}

export {
	useBankInfoQuery,
	useEWalletInfoQuery,
	useWithdrawalAvailableBalanceQuery,
}
