import { trim } from 'lodash-es'
import { AxiosRequestConfig } from 'axios'

import { ISignInArgs } from './type'
import { baseAxios } from '../baseApi'

export const authApiUrl = {
	checkSignIn: 'Site/CheckSignIn',
	signIn: 'Site/SignIn',
	signOut: 'Account/SignOut',
}

export const signIn = async ({
	userName,
	userpwd,
	...rest
}: ISignInArgs): Promise<boolean> => {
	try {
		const response = await baseAxios.post(authApiUrl.signIn, {
			userName: trim(userName),
			userpwd: trim(userpwd),
			...rest,
		})
		return response.data.errorCode === 0
	} catch (error) {
		console.error('signIn error:', error)
		return false
	}
}

export const signOut = async (): Promise<boolean> => {
	try {
		const response = await baseAxios.post(authApiUrl.signOut)
		return response.data.errorCode === 0
	} catch (error) {
		console.error('signOut error:', error)
		return false
	}
}

export const checkSignIn = async (
	config?: AxiosRequestConfig
): Promise<boolean> => {
	try {
		const { data: { errorCode } = {} } = await baseAxios.post(
			authApiUrl.checkSignIn,
			null,
			config
		)
		return errorCode === 0
	} catch (error) {
		return false
	}
}
