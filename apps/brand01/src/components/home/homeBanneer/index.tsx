import { getAnnouncement, getBanner } from 'JF-api'
import Banner from './Banner'
import Announcement from './Announcement'

const HomeBanner = async () => {
	// * Server Actions
	const [bannerData, announcementData] = await Promise.all([
		getBanner(),
		getAnnouncement(),
	])

	return (
		<div className='col-span-12'>
			<div className='min-h-[1.5rem] bg-neutral-100 text-xs text-neutral-100 lg:mr-4'>
				<Announcement announcementData={announcementData} />
			</div>
			<div className='lg:mr-4 lg:pt-4'>
				<Banner bannerData={bannerData} />
			</div>
		</div>
	)
}
export default HomeBanner
