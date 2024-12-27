import { useMutation, useQuery } from '@tanstack/react-query'
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

const useSetLanguageMutation = () => {
	return useMutation({
		mutationFn: (langId: string) =>
			fetcher<null, { langId: string }>(accountApiUrl.setLang, { langId }),
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
	useSetLanguageMutation,
	useWithdrawalAvailableBalanceQuery,
}
