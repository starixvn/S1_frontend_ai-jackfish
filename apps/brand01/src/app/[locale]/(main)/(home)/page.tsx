import HomeBanner from '@brand01/src/components/home/homeBanner'
import HomeContent from '@brand01/src/components/home/homeContent'

// 此 page 是僅針對hot game的，如果是/en/sports之類的需要到[lobby]裡的page.tsx
const Home = () => {
	return (
		<div className='w-full'>
			<div className=''>
				<HomeBanner />
				<HomeContent isHotGame={true} />
			</div>
		</div>
	)
}

export default Home
