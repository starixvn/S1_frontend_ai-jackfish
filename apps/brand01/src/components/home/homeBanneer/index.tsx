import React from 'react'
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
			<div className='lg:mr-4 lg:pt-4'>
				<Banner bannerData={bannerData} />
			</div>
			<div className='bg-primary-400 min-h-[1.5rem] text-xs text-neutral-100 lg:mr-4'>
				<Announcement announcementData={announcementData} />
			</div>
		</div>
	)
}
export default HomeBanner
