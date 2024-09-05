'use server'

import { envCookieNames } from '@brand01/src/i18n/settings'
import { DeviceTypeEnum } from 'JF-constants'
import { cookies } from 'next/headers'
import { getPromotionListV3 } from './client'

const deviceType = DeviceTypeEnum.Desktop

const getLangId = () =>
	String(cookies().get(envCookieNames.langId)?.value ?? 'en')

const getCurrencyId = () =>
	Number(cookies().get(envCookieNames.currencyId)?.value ?? 4)

export const getPromotionListOnServer = () =>
	getPromotionListV3({
		langId: getLangId(),
		currencyId: getCurrencyId(),
		deviceType,
	})
