'use client'

import { paths, PRODUCTS } from 'JF-constants'
import { BannerActionEnum, TBannerData } from 'JF-api/site/type'
import { useMenuOpen } from './useMenuOpen'
import { useGetPathname } from './useGetPathname'
import { useRouter } from 'next/navigation'

const useBannerClick = ({
	tpId,
	gameId,
	actionMode,
	bannerLink,
	tpGameType,
}: TBannerData) => {
	const router = useRouter()
	const { onGoToGame, onEnterPage } = useMenuOpen()
	const { locale } = useGetPathname()
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
			{ loginCallback: () => router.push(paths.login.root) },
		)
	}
}

export { useBannerClick }
