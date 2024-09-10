'use client'
import { getAnnouncement } from 'JF-api/message/client'
import { getBanner } from 'JF-api/site/client'
import Announcement from './Announcement'
import Banner from './Banner'

const HomeBanner = () => {
	const { announcementData } = getAnnouncement()
	const { bannerData, isLoading: bannerIsLoading } = getBanner()
	return (
		<div className='col-span-12 flex flex-col'>
			<div className='order-4 bg-neutral-100 lg:order-1 lg:rounded-br-md lg:rounded-bl-md'>
				<Announcement announcementData={announcementData} />
			</div>
			<div className='order-1 lg:order-2'>
				<Banner bannerData={bannerData} bannerIsLoading={bannerIsLoading} />
			</div>
		</div>
	)
}
export default HomeBanner
