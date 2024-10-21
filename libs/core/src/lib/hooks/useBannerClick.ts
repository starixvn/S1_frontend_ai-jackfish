'use client'

import { BannerActionEnum, TBannerData } from 'JF-api/site/type'
import { PRODUCTS, paths } from 'JF-constants'
import { useGetPathname } from './useGetPathname'
import { useLocaleRouter } from './useLocaleRouter'
import { useMenuOpen } from './useMenuOpen'

const useBannerClick = () => {
	const router = useLocaleRouter()
	const { onGoToGame, onEnterPage } = useMenuOpen()
	const { locale } = useGetPathname()

	const bannerClick = (item: TBannerData) => {
		const { tpId, gameId, actionMode, bannerLink, tpGameType } = item
		if (Number(tpId) === PRODUCTS.NewPlayTechSlot.tpId) {
			onGoToGame(
				{
					tpId: Number(tpId),
					langId: locale,
					inputs: { gameId, tpGameType, fun: '0', gameType: 'slots' },
				},
				{ loginCallback: () => router.push(paths.login.root) },
			)
		}

		if (actionMode === BannerActionEnum.OpenWindow) {
			window.open(bannerLink, '_blank')
		} else if (actionMode === BannerActionEnum.RedirectPage) {
			window.location.href = bannerLink
		} else if (actionMode === BannerActionEnum.RedirectPageOfThisSite) {
			router.push(paths.login.root)
		} else if (actionMode === BannerActionEnum.GoToGame) {
			onEnterPage(
				{
					langId: locale,
					tpId: Number(tpId),
					gameId: gameId as string,
					tpGameType,
				},
				// { loginCallback: () => router.push(paths.login.root) },
			)
		}
	}
	return { bannerClick }
}

export { useBannerClick }
