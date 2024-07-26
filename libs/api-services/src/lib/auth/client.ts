import { trim } from 'lodash-es'
import { ISignInArgs } from './type'
import { fetcher } from '../baseApi'
import { authApiUrl } from './url'

export const signIn = async ({ userName, userpwd, ...rest }: ISignInArgs) => {
	const data = await fetcher<null, ISignInArgs>(authApiUrl.signIn, {
		userName: trim(userName),
		userpwd: trim(userpwd),
		...rest,
	})
	return data.errorCode === 0
}

export const signOut = async () => {
	const data = await fetcher(authApiUrl.signOut)
	return data.errorCode === 0
}
