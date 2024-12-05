'use client'

import Marquee from '@noble888/src/components/marquee'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { getAnnouncement } from 'JF-api/message/client'
import { paths } from 'JF-constants'
import { bannerUrl, useLocaleRouter } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import React from 'react'

const Announcement: React.FC = () => {
	const { t } = useClientTranslation()
	const router = useLocaleRouter()
	const { isLogin } = useAuthStore()
	const { announcementData } = getAnnouncement()

	const handleMarqueeClick = () => {
		if (!isLogin) {
			// TODO loginCallback
			return
		}
		router.push(paths.announcement.root)
	}
	return (
		<div className='flex h-10 items-center justify-between bg-gray-100 px-[2vw] md:h-12 lg:h-14 lg:px-[6vw]'>
			<div className='flex w-full items-center'>
				<div className='bg-secondary-500 rounded-[20px] px-2 py-0.5 text-sm text-white'>
					NEW
				</div>
				<Marquee className='mx-3'>
					{announcementData?.map(({ id, subject }) => (
						<div
							className='ms-8 cursor-pointer text-sm font-medium'
							key={`announcement-${id}`}
							onClick={handleMarqueeClick}
						>
							{subject}
						</div>
					))}
				</Marquee>
			</div>
			{/* TODO onClick */}
			<button className='box-border hidden items-center gap-1 md:flex md:w-28'>
				<img
					className='w-5'
					src={bannerUrl('/desktop/img/4.0/livechat.png')}
					alt='liveChat'
				/>
				<span className='text-sm font-medium'>
					{t('Label_General_LiveChat')}
				</span>
			</button>
		</div>
	)
}

export default Announcement
