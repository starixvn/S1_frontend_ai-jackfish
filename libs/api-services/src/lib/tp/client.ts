'use client'

import { IGoToGameArgs } from 'JF-constants'
import { fetcher, IAxiosError, IAxiosResponse } from '../baseApi'
import { IGoToGamePayload } from './type'
import { tpApiUrl } from './url'

export const useGoToGame = async ({ ...args }: IGoToGameArgs) => {
	try {
		const data = await fetcher<IAxiosResponse<boolean>, IGoToGamePayload>(
			tpApiUrl.gotoGame,
			{
				...args,
				appType: 1,
			},
		)
		return {
			...data,
		}
	} catch (error) {
		throw error as IAxiosError
	}
}
