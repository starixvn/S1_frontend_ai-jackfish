import { fetcher, IAxiosResponse } from '../baseApi'
import { IGoToGameArgs } from 'JF-constants'
import { IGoToGamePayload } from './type'
import { tpApiUrl } from './url'

export const useGoToGame = async ({ ...args }: IGoToGameArgs) => {
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
}
