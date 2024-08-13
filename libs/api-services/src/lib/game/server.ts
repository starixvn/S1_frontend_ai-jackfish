'use server'
import { DeviceTypeEnum } from 'JF-constants'
import { fetcher } from '../baseApi'
import {
	IGetLobbyHeaderPayload,
	IGetSlotPagePayload,
	ISlotsGameData,
	TLobbyHeaderData,
} from './type'
import { gameApiUrl } from './url'

export const getLobbyHeader = async () => {
	try {
		const data = await fetcher<TLobbyHeaderData[], IGetLobbyHeaderPayload>(
			`${gameApiUrl.getLobbyHeader}`,
			{
				siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']),
				currencyId: 4,
			},
		)
		return data?.data
	} catch (e) {
		return []
	}
}

export const getSlotGamePage = async () => {
	try {
		const data = await fetcher<ISlotsGameData, IGetSlotPagePayload>(
			`${gameApiUrl.getSlotGamePage}`,
			{
				currencyId: 4,
				deviceType: DeviceTypeEnum.Desktop,
			},
		)
		return data?.data
	} catch (e) {
		return {}
	}
}
