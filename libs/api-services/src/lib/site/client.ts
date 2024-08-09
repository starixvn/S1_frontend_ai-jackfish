'use client'
import { paths } from 'JF-constants'
import { useAuthStore } from 'JF-operations'
import { isNumber } from 'lodash-es'
import useSWR from 'swr'
import { fetcher, IAxiosResponse } from '../baseApi'
import {
	BannerActionEnum,
	BannerTypeEnum,
	TBannerData,
	type TTpMaintainData,
} from './type'
import { siteApiUrl } from './url'

export const getTpMaintainList = () => {
	const { data: { data: tpMaintainList } = {}, isLoading } = useSWR<
		IAxiosResponse<TTpMaintainData>
	>(siteApiUrl.getTpMaintainList, (url: string) =>
		fetcher<TTpMaintainData>(url),
	)
	return {
		tpMaintainList: tpMaintainList,
		isLoading,
	}
}

export const getBanner = () => {
	const { userInfo } = useAuthStore()
	const { data, isLoading } = useSWR<IAxiosResponse<TBannerData[]>>(
		userInfo?.langId ? `${siteApiUrl.getBanner}/${userInfo?.langId}` : null,
		(url: string) =>
			fetcher<TBannerData[]>(url, {
				currencyId: userInfo?.currencyId,
				bannerType: BannerTypeEnum.Main,
			}),
	)
	const newBennerData = data?.data.map(
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
	return {
		bannerData: newBennerData,
		isLoading,
	}
}
