import React from 'react'
import HomeBanner from '@brand01/src/components/home/homeBanneer'
import HomeMenu from '@brand01/src/components/home/homeMenu'
import HomeContent from '@brand01/src/components/home/homeContent'
interface IHomeProps {
	locale: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home: React.FC<IHomeProps> = ({ locale }) => {
	return (
		<div className='min-h-[80vh] w-full'>
			<div className='grid grid-cols-12 gap-4 lg:grid-flow-col'>
				<HomeBanner />
				<HomeMenu />
				<HomeContent />
			</div>
		</div>
	)
}

export default Home
