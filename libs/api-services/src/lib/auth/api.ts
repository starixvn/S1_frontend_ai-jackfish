import { mutate } from 'swr'
import { trim } from 'lodash-es'
import { AxiosRequestConfig } from 'axios'

import { ISignInArgs } from './type'
import { baseAxios, fetcher } from '../baseApi'
import { accountStrictApiUrl } from '../accountStrict/api'

const authApiUrl = {
	checkSignIn: 'Site/CheckSignIn',
	signIn: 'Site/SignIn',
	signOut: 'Account/SignOut',
}

export const signIn = async ({ userName, userpwd, ...rest }: ISignInArgs) => {
	const data = await fetcher<null, ISignInArgs>(authApiUrl.signIn, {
		userName: trim(userName),
		userpwd: trim(userpwd),
		...rest,
	})
	if (data.errorCode === 0) {
		await mutate(accountStrictApiUrl.getCustProfile) // Revalidate
		return true
	}
	return false
}

export const signOut = async () => {
	const data = await fetcher(authApiUrl.signOut)
	return data.errorCode === 0
}

export const checkSignIn = async (
	config?: AxiosRequestConfig,
): Promise<boolean> => {
	try {
		const { data: { errorCode } = {} } = await baseAxios.post(
			authApiUrl.checkSignIn,
			null,
			config,
		)
		return errorCode === 0
	} catch (error) {
		return false
	}
}
