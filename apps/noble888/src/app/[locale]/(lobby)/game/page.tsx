'use client'

import { LobbyBanner, LobbyContent } from '@noble888/src/components/lobby'

const GamePage = () => {
	return (
		<>
			<LobbyBanner bannerImgSrc='https://banner.0814media.net/desktop/img/4.0/lobby-games/gamelobby_bn.png' />
			<LobbyContent category='Game' />
		</>
	)
}
export default GamePage
