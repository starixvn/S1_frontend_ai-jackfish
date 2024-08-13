import { fetcher, IAxiosResponse } from '../baseApi'
import { TLobbyHeaderData, IGetLobbyHeaderPayload } from './type'
import { gameApiUrl } from './url'

export const useGetLobbyHeader = async () => {
	try {
		const data = await fetcher<
			IAxiosResponse<TLobbyHeaderData[]>,
			IGetLobbyHeaderPayload
		>(gameApiUrl.getLobbyHeader, {
			siteId: 1,
			currencyId: 4,
		})
		return {
			...data,
		}
	} catch (e) {
		return []
	}
}
