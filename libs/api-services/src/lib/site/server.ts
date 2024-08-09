'use server'

import { paths } from 'JF-constants'
import { isNumber } from 'lodash-es'
import { cookies } from 'next/headers'
import { fetcher } from '../baseApi'
import {
	BannerActionEnum,
	BannerTypeEnum,
	IGetBannerPayload,
	type TBannerData,
} from './type'
import { siteApiUrl } from './url'

export const getBanner = async () => {
	const cookieStore = cookies()
	const langId = cookieStore.get('i18next')?.value
	const data = await fetcher<TBannerData[], IGetBannerPayload>(
		`${siteApiUrl.getBanner}/${langId}`,
		{
			currencyId: 4,
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
}
