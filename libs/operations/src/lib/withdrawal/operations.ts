import { useQueryClient } from '@tanstack/react-query'
import { IAxiosError } from 'JF-api/baseApi'
import {
	useCancelWithdrawalMutation,
	useSubmitLocalBankWithdrawalMutation,
} from 'JF-api/payment/queries'
import { isConvert } from 'JF-core'
import { useAuthStore } from '../auth'
import { useWithdrawalStore } from './store'

export const useWithdrawalOperations = () => {
	const queryClient = useQueryClient()
	const {
		userInfo: { currencyId },
	} = useAuthStore()
	const { selectedBankItem } = useWithdrawalStore()

	const {
		mutateAsync: submitLocalBankWithdrawal,
		isPending: isSubmitWithdrawalLoading,
	} = useSubmitLocalBankWithdrawalMutation()

	const { mutateAsync: cancelWithdrawalReq, isPending: isCancelReqLoading } =
		useCancelWithdrawalMutation()

	const submitWithdrawalRequest = async (amount: number) => {
		if (!selectedBankItem) {
			throw new Error('No bank selected')
		}

		const { accountNo, sysId, ifscCode } = selectedBankItem
		const realAmount = isConvert(currencyId)
			? Number(amount) * 1000
			: Number(amount)

		try {
			await submitLocalBankWithdrawal({
				amount: realAmount,
				accountNo,
				ifscCode,
				sysId,
			})

			// reFetch data
			await queryClient.invalidateQueries({
				queryKey: [['withdrawal'], ['payment']],
			})
		} catch (error) {
			// errorCode : 2 也被視為成功
			if ((error as IAxiosError).errorCode !== 2) {
				throw error
			}
			// errorCode === 2 , reFetch data
			await queryClient.invalidateQueries({
				queryKey: [['withdrawal'], ['payment']],
			})
		}
	}

	const cancelWithdrawalRequest = async (transId: string) => {
		await cancelWithdrawalReq(transId)
		// reFetch data
		await queryClient.invalidateQueries({
			queryKey: [['withdrawal'], ['payment']],
		})
	}

	return {
		submitWithdrawalRequest,
		cancelWithdrawalRequest,
		isMutating: isSubmitWithdrawalLoading || isCancelReqLoading,
	}
}
