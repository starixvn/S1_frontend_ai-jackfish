import { useMutation, useQuery } from '@tanstack/react-query'
import { fetcher } from 'JF-api/baseApi'
import {
	ICustBonusWalletData,
	IMainWalletInfoData,
	ITpWalletData,
	TCustBankInfoData,
	TEWalletData,
	TWithdrawalAvailableBalanceData,
	TpWalletListTypeEnum,
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

/**
 * @useGetMainWalletInfoQuery 主錢包 API
 * @useGetCustBonusWalletQuery Bonus wallet API
 * @useGetTpWalletListQuery TP Wallet API
 * @useGetTpWalletInfoByTpIdQuery 單一TP Wallet API
 * @useSetHideBalanceMutation 隱藏餘額 API
 */
const useGetMainWalletInfoQuery = () => {
	return useQuery({
		queryKey: ['account', 'mainWalletInfo'],
		queryFn: () =>
			fetcher<IMainWalletInfoData>(accountApiUrl.getMainWalletInfo),
	})
}

const useGetCustBonusWalletQuery = () => {
	return useQuery({
		queryKey: ['account', 'custBonusWallet'],
		queryFn: () =>
			fetcher<ICustBonusWalletData[]>(accountApiUrl.getCustBonusWallet),
	})
}

const useGetTpWalletListQuery = ({
	langId,
	listType,
}: {
	langId: string
	listType: TpWalletListTypeEnum
}) => {
	return useQuery({
		queryKey: ['account', 'tpWalletList'],
		queryFn: () =>
			fetcher<ITpWalletData[]>(`${accountApiUrl.getTpWalletList}/${langId}`, {
				listType,
			}),
	})
}

const useGetTpWalletInfoByTpIdQuery = (tpId: number) => {
	return useQuery({
		queryKey: ['account', 'tpWalletInfo', tpId],
		queryFn: () =>
			fetcher<ITpWalletData>(`${accountApiUrl.getTpWalletBalance}`, { tpId }),
	})
}

const useSetHideBalanceMutation = () => {
	return useMutation({
		mutationFn: (isHide: boolean) =>
			fetcher<null>(
				`${accountApiUrl.setHideBalance}/?value=${isHide}`,
				null,
				'GET',
			),
	})
}

export {
	useBankInfoQuery,
	useEWalletInfoQuery,
	useGetCustBonusWalletQuery,
	useGetMainWalletInfoQuery,
	useGetTpWalletInfoByTpIdQuery,
	useGetTpWalletListQuery,
	useSetHideBalanceMutation,
	useSetLanguageMutation,
	useWithdrawalAvailableBalanceQuery,
}
