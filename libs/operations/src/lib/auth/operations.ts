import { useSetHideBalanceMutation } from 'JF-api/account/queries'
import { useForgetPasswordMutation } from 'JF-api/site/queries'

export const useAuthOperations = () => {
	const { mutateAsync: forgetPassword, isPending: isForgetPasswordLoading } =
		useForgetPasswordMutation()
	const { mutateAsync: setHideBalance } = useSetHideBalanceMutation()
	const onSetHideBalance = async (isHide: boolean) => {
		await setHideBalance(isHide)
	}
	return {
		forgetPassword,
		isMutating: isForgetPasswordLoading,
		onSetHideBalance,
	}
}
