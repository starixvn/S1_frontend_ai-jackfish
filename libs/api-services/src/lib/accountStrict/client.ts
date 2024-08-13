'use client'

import { fetcher } from '../baseApi'
import { TUserInfoData } from './type'
import { accountStrictApiUrl } from './url'

export const getUserInfo = async () => {
	try {
		const data = await fetcher<TUserInfoData>(
			accountStrictApiUrl.getCustProfile,
		)
		return data?.data
	} catch (error) {
		return null
	}
}

export const uploadCustPhoto = async (file: File) => {
	const formData = new FormData()
	formData.append('PhotoId', file)
	await fetcher<null, FormData>(accountStrictApiUrl.uploadCustPhoto, formData)
}
