'use client'

import useSWR from 'swr'
import { IAxiosResponse, fetcher } from '../baseApi'
import { IGetLineUserIdTypeArgs, LineLoginDirectTypeEnum } from './type'
import { lineLoginApiUrl } from './url'

export const lineLoginDirect = async ({
	type,
}: {
	type: LineLoginDirectTypeEnum
}) => {
	try {
		const data = await fetcher<string, { type: LineLoginDirectTypeEnum }>(
			lineLoginApiUrl.lineLoginDirect,
			{ type },
		)
		return data?.data
	} catch (error) {
		return ''
	}
}

export const useGetLineUserId = (args: IGetLineUserIdTypeArgs) => {
	const { data: { data: lineRegisterData } = {}, isLoading } = useSWR<
		IAxiosResponse<{
			type: LineLoginDirectTypeEnum
			userId: string
		}>
	>(lineLoginApiUrl.lineCallback, (url: string) =>
		fetcher<
			{
				type: LineLoginDirectTypeEnum
				userId: string
			},
			IGetLineUserIdTypeArgs
		>(url, args),
	)
	return {
		lineRegisterData,
		isLoading,
	}
}
