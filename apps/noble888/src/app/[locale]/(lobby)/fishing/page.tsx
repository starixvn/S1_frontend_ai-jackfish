'use client'

import { LobbyBanner, LobbyContent } from '@noble888/src/components/lobby'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'

const FishingPage = () => {

	const isSmallScreen = useMediaQuery('(max-width: 1024px)')
	const router = useRouter()

	useEffect(() => {
		if (isSmallScreen) {
			router.push('/') 
		}
	}, [isSmallScreen, router])

	return (
		<>
			<LobbyBanner bannerImgSrc='https://banner.0814media.net/desktop/img/4.0/lobby-fishing/fishlobby-bn.png' />
			<LobbyContent category='Fishing' />
		</>
	)
}
export default FishingPage
