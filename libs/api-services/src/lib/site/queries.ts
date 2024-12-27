import { useMutation } from '@tanstack/react-query'
import { fetcher } from 'JF-api/baseApi'
import { ISetForgetPasswordArgs } from './type'
import { siteApiUrl } from './url'

/**
 * 忘記密碼送出
 */
const useForgetPasswordMutation = () => {
	return useMutation({
		mutationFn: (args: ISetForgetPasswordArgs) =>
			fetcher<null, ISetForgetPasswordArgs>(siteApiUrl.forgetPassword, args),
	})
}

export { useForgetPasswordMutation }
