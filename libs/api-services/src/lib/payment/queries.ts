import { useMutation, useQuery } from '@tanstack/react-query'
import { IAxiosError, IAxiosResponse, fetcher } from 'JF-api/baseApi'
import {
	KycStatusEnum,
	type ISubmitWithdrawalArgs,
	type TWithdrawalLimitData,
	type TWithdrawalRecentInfoData,
	type TWithdrawalSetting,
} from './type'
import { paymentApiUrl } from './url'

const useWithdrawalLimitQuery = () => {
	return useQuery({
		queryKey: ['withdrawal', 'limit'],
		queryFn: () =>
			fetcher<TWithdrawalLimitData | undefined>(
				paymentApiUrl.getWithdrawalLimit,
			),
	})
}

/**
 * 用來撈取當前帳戶可用的出金方式選項，從後台可以手動關閉特定出金方式。
 */
const useWithdrawalBlockSettingQuery = () => {
	return useQuery({
		queryKey: ['withdrawal', 'blockSetting'],
		queryFn: () =>
			fetcher<TWithdrawalSetting[]>(paymentApiUrl.getWithdrawalBlockSetting),
	})
}

/**
 * 取得近期提款資料，檢視是否有進行中的存款
 */
const useWithdrawalRecentInfoQuery = () => {
	return useQuery({
		queryKey: ['withdrawal', 'recentInfo'],
		queryFn: () =>
			fetcher<TWithdrawalRecentInfoData[]>(
				paymentApiUrl.getWithdrawalRecentInfo,
			),
	})
}

const useKycStatusQuery = () => {
	return useQuery({
		queryKey: ['payment', 'kyc'],
		queryFn: async (): Promise<IAxiosResponse<KycStatusEnum>> => {
			try {
				await fetcher(paymentApiUrl.kycCheck)
				// 直接返回符合 IAxiosResponse 格式的對象
				return {
					data: KycStatusEnum.Normal,
					errorCode: 0,
					message: '',
					rawMessage: '',
				}
			} catch (error) {
				const { errorCode } = error as IAxiosError

				const kycStatus =
					errorCode === KycStatusEnum.KycUpload ||
					errorCode === KycStatusEnum.KycProcessing
						? errorCode
						: KycStatusEnum.Normal

				// 直接返回符合 IAxiosResponse 格式的對象
				return {
					data: kycStatus,
					errorCode: 0,
					message: '',
					rawMessage: '',
				}
			}
		},
	})
}

/**
 * 送Local bank 單
 */
const useSubmitLocalBankWithdrawalMutation = () => {
	return useMutation({
		mutationFn: (args: ISubmitWithdrawalArgs) =>
			fetcher<null, ISubmitWithdrawalArgs>(paymentApiUrl.withdrawalReq, args),
	})
}

/**
 * 取消
 */
const useCancelWithdrawalMutation = () => {
	return useMutation({
		mutationFn: (transId: string) =>
			fetcher<null, { transId: string }>(paymentApiUrl.setWithdrawalCancel, {
				transId,
			}),
	})
}

export {
	useCancelWithdrawalMutation,
	useKycStatusQuery,
	useSubmitLocalBankWithdrawalMutation,
	useWithdrawalBlockSettingQuery,
	useWithdrawalLimitQuery,
	useWithdrawalRecentInfoQuery,
}
