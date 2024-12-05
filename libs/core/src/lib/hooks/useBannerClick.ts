'use client'

import { BannerActionEnum, TBannerData } from 'JF-api/site/type'
import { PRODUCTS } from 'JF-constants'
import { useGetPathname } from './useGetPathname'
import { useMenuOpen } from './useMenuOpen'

const useBannerClick = () => {
	// const router = useLocaleRouter()
	const { onGoToGame, onEnterPage } = useMenuOpen({})
	const { locale } = useGetPathname()

	const bannerClick = (
		{ tpId, gameId, actionMode, bannerLink, tpGameType }: TBannerData,
		{ loginCallback }: { loginCallback: () => void },
	) => {
		if (actionMode === BannerActionEnum.OpenWindow) {
			window.open(bannerLink, '_blank')
		} else if (actionMode === BannerActionEnum.RedirectPage) {
			window.location.href = bannerLink
		} else if (actionMode === BannerActionEnum.RedirectPageOfThisSite) {
			loginCallback()
		} else if (actionMode === BannerActionEnum.GoToGame) {
			if (Number(tpId) === PRODUCTS.NewPlayTechSlot.tpId) {
				onGoToGame(
					{
						tpId: Number(tpId),
						langId: locale,
						inputs: { gameId, tpGameType, fun: '0', gameType: '' },
					},
					{ loginCallback },
				)
				// TODO 待確認 sport 路徑的 router，以及TUK是否會受影響，以及裝置問題
				// } else if (
				// 	Number(tpId) === PRODUCTS.Soccer.tpId
				// 	// && deviceType === DeviceTypeEnum.Desktop
				// ) {
				// 	window.location.href = `${window.location.origin}/${locale}/sports?provider=Soccer`
			} else {
				onEnterPage(
					{
						langId: locale,
						tpId: Number(tpId),
						gameId: gameId as string,
						tpGameType,
					},
					{ loginCallback },
				)
			}
		}
	}
	return { bannerClick }
}

export { useBannerClick }
