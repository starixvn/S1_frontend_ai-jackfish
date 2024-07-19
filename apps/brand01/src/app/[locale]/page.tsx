import React, { Suspense } from 'react'
import HomeBanner from '@brand01/src/components/home/homeBanneer'
import HomeMenu from '@brand01/src/components/home/homeMenu'
import HomeContent from '@brand01/src/components/home/homeContent'
import BannerSkeleton from '@brand01/src/components/home/skeleton/BannerSkeleton'

interface IHomeProps {
	locale: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home: React.FC<IHomeProps> = ({ locale }) => {
	return (
		<div className='min-h-[80vh] w-full'>
			<div className='grid grid-cols-12 gap-4 lg:grid-flow-col'>
				<Suspense fallback={<BannerSkeleton />}>
					<HomeBanner />
				</Suspense>
				<HomeMenu />
				<HomeContent />
			</div>
		</div>
	)
}

export default Home
