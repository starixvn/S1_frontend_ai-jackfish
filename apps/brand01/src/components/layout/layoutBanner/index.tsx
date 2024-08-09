'use client'
import { getAnnouncement } from 'JF-api/message/client'
import { getBanner } from 'JF-api/site/client'
import Announcement from './Announcement'
import Banner from './Banner'

const LayoutBanner = () => {
	const { announcementData } = getAnnouncement()
	const { bannerData, isLoading: bannerIsLoading } = getBanner()
	// TODO: 目前從useSWR取回的banner api會讓畫面有跳一下的感覺，之後再來改進
	return (
		<div className='col-span-12 flex flex-col'>
			<div className='order-2 bg-neutral-100 lg:order-1 lg:rounded-br-md lg:rounded-bl-md'>
				<Announcement announcementData={announcementData} />
			</div>
			<div className='order-1 lg:order-2'>
				<Banner bannerData={bannerData} bannerIsLoading={bannerIsLoading} />
			</div>
		</div>
	)
}
export default LayoutBanner
