'use server'

import { DeviceTypeEnum, ENV_COOKIE_NAMES } from 'JF-constants'
import { cookies } from 'next/headers'
import { getPromotionListV3 } from './client'

const deviceType = DeviceTypeEnum.Desktop

const getLangId = () =>
	String(cookies().get(ENV_COOKIE_NAMES.langId)?.value ?? 'en')

const getCurrencyId = () =>
	Number(cookies().get(ENV_COOKIE_NAMES.currencyId)?.value ?? 4)

export const getPromotionListOnServer = async () => {
	try {
		const data = await getPromotionListV3({
			langId: getLangId(),
			currencyId: getCurrencyId(),
			deviceType,
		})
		return data?.data
	} catch (error) {
		return []
	}
}
