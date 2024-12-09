'use server'

import { envCookieNames } from '@brand01/src/i18n/settings'
import { paths } from 'JF-constants'
import { ISeoData } from 'libs/operations/src/lib/seo/type'
import { isNumber } from 'lodash-es'
import { cookies } from 'next/headers'
import { fetcher } from '../baseApi'
import {
	BannerActionEnum,
	BannerTypeEnum,
	IGetBannerPayload,
	TpMaintainData,
	type TBannerData,
} from './type'
import { siteApiUrl } from './url'

export const getBanner = async () => {
	try {
		const cookieStore = cookies()
		const langId = cookieStore.get(envCookieNames.langId)?.value
		const currencyId = cookieStore.get(envCookieNames.currencyId)?.value
		const data = await fetcher<TBannerData[], IGetBannerPayload>(
			`${siteApiUrl.getBanner}/${langId}`,
			{
				currencyId: Number(currencyId),
				bannerType: BannerTypeEnum.Main,
			},
		)

		return data?.data.map(
			(
				{ actionMode, bonusCode, urlRouter, tpId, tpGameType, gameId, ...rest },
				index,
			) => {
				let redirectLink = null
				if (actionMode === BannerActionEnum.GoToBonus) {
					redirectLink = `${paths.promotion.root}?BonusCode=${bonusCode}`
				} else if (actionMode === BannerActionEnum.RedirectPageOfThisSite) {
					let params = `?tpId=${tpId}`
					if (urlRouter === paths.slots.root) {
						params += isNumber(tpGameType)
							? `&tpGameType=${tpGameType}`
							: '&tpGameType=undefined'
					}
					// * 目前沒有sports頁面
					// else if (urlRouter === paths.sports.root) {
					// 	params += gameId ? `&gameId=${gameId}` : ''
					// }
					redirectLink = `${urlRouter}${params}`
				}

				// * 目前沒有rewards頁面
				// if (redirectLink && redirectLink === paths.rewards.root) {
				// 	redirectLink = `${
				// 		process.env.NODE_ENV === 'production'
				// 			? window.location.origin
				// 			: process.env['NEXT_PUBLIC_OPEN_URL']
				// 	}${redirectLink}`
				// }

				return {
					actionMode,
					bonusCode,
					urlRouter,
					tpId,
					tpGameType,
					gameId,
					...rest,
					redirectLink,
					itemKey: `${index}-${tpGameType}-${tpId}`,
				}
			},
		) as TBannerData[]
	} catch (error) {
		return []
	}
}

export const getTpMaintainList = async () => {
	try {
		const data = await fetcher<TpMaintainData[], null>(
			`${siteApiUrl.getTpMaintainList}`,
		)
		return data?.data
	} catch (e) {
		return []
	}
}

export const getSeo = async () => {
	try {
		const data = await fetcher<ISeoData, null>(`${siteApiUrl.getSeo}`)
		return data?.data
	} catch (e) {
		return {}
	}
}
