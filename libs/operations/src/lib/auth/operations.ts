import { useForgetPasswordMutation } from 'JF-api/site/queries'

export const useAuthOperations = () => {
	const { mutateAsync: forgetPassword, isPending: isForgetPasswordLoading } =
		useForgetPasswordMutation()

	return {
		forgetPassword,
		isMutating: isForgetPasswordLoading,
	}
}
