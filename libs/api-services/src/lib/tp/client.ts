import { fetcher, IAxiosResponse } from '../baseApi'
import { IGoToGameArgs } from 'JF-constants'
import { IGoToGamePayload } from './type'

const tpApiUrl = {
	gotoGame: 'Tp/GotoGame',
}

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
