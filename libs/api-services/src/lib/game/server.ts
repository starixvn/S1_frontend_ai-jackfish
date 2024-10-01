'use server'
import { DeviceTypeEnum } from 'JF-constants'
import { fetcher } from '../baseApi'
import {
	IGetHotGameListPayload,
	IGetLobbyHeaderPayload,
	IGetSlotPagePayload,
	ISlotsGameData,
	THotGameData,
	TLobbyHeaderData,
} from './type'
import { gameApiUrl } from './url'

export const getLobbyHeader = async () => {
	try {
		const data = await fetcher<TLobbyHeaderData[], IGetLobbyHeaderPayload>(
			`${gameApiUrl.getLobbyHeader}`,
			{
				siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']),
				currencyId: Number(process.env['NEXT_PUBLIC_DEFAULT_CURRENCY']),
			},
		)
		return data?.data
	} catch (e) {
		return []
	}
}

export const getHotGameList = async () => {
	try {
		const { data } = await fetcher<THotGameData, IGetHotGameListPayload>(
			`${gameApiUrl.getHotGameList}`,
			{
				deviceType: Number(process.env['NEXT_PUBLIC_DEVICE_TYPE']),
				currencyId: Number(process.env['NEXT_PUBLIC_DEFAULT_CURRENCY']),
			},
		)
		return data?.HotGame
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
