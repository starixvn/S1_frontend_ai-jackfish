import HomeBanner from '@brand01/src/components/home/homeBanner'
import HomeContent from '@brand01/src/components/home/homeContent'
import { lobbyRoutes } from '@brand01/src/data/home/lobbyRoutes'
import { notFound } from 'next/navigation'
import React from 'react'

interface ILobbyProps {
	params: {
		locale: string
		lobby: string
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Lobby: React.FC<ILobbyProps> = ({ params: { locale, lobby } }) => {
	if (!lobbyRoutes.includes(`/${lobby}`)) notFound()
	return (
		<div className='min-h-[80vh] w-full'>
			<HomeBanner />
			<HomeContent />
		</div>
	)
}

export default Lobby
