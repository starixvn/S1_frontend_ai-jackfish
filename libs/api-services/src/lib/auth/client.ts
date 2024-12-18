'use client'

import { trim } from 'lodash-es'
import { fetcher, IAxiosError } from '../baseApi'
import { ISignInPhoneArgs, ISignInUserNameArgs } from './type'
import { authApiUrl } from './url'

export const signInUserName = async ({
	userName,
	userpwd,
	...rest
}: ISignInUserNameArgs) => {
	try {
		const data = await fetcher<null, ISignInUserNameArgs>(
			authApiUrl.signInUserName,
			{
				userName: trim(userName),
				userpwd: trim(userpwd),
				...rest,
			},
		)
		return data
	} catch (error) {
		throw error as IAxiosError
	}
}

export const signInPhone = async ({
	phoneNo,
	userpwd,
	...rest
}: ISignInPhoneArgs) => {
	try {
		const data = await fetcher<null, ISignInPhoneArgs>(authApiUrl.signInPhone, {
			phoneNo: trim(phoneNo),
			userpwd: trim(userpwd),
			...rest,
		})
		return data
	} catch (error) {
		throw error as IAxiosError
	}
}

export const signOut = async () => {
	try {
		const data = await fetcher<null>(authApiUrl.signOut)
		return data
	} catch (error) {
		throw error as IAxiosError
	}
}
