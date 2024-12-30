'use client'

import Marquee from '@noble888/src/components/marquee'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { getAnnouncement } from 'JF-api/message/client'
import { paths } from 'JF-constants'
import { bannerUrl, openLiveChat, useLocaleRouter } from 'JF-core'
import { useAuthStore, useModalStore } from 'JF-operations'
import dynamic from 'next/dynamic'
import React from 'react'

const LoginModal = dynamic(() => import('../customModals/LoginModal'), {
	ssr: false,
})

const Announcement: React.FC = () => {
	const { t } = useClientTranslation()
	const router = useLocaleRouter()
	const { isLogin } = useAuthStore()
	const { openModal } = useModalStore()
	const { announcementData } = getAnnouncement()

	const handleMarqueeClick = () => {
		if (!isLogin) {
			openModal({
				content: <LoginModal />,
			})
			return
		}
		router.push(paths.announcement.root)
	}
	return (
		<div className='bg-secondary-500 flex h-10 items-center justify-between px-[2vw] md:h-12 lg:h-14 lg:px-[6vw]'>
			<div className='flex w-full items-center'>
				<div className='bg-gray-0 text-secondary-500 w-12 rounded-full py-0.5 text-center text-sm'>
					NEW
				</div>
				<Marquee className='mx-3'>
					{announcementData?.map(({ id, subject }) => (
						<div
							className='ms-8 cursor-pointer text-sm font-normal'
							key={`announcement-${id}`}
							onClick={handleMarqueeClick}
						>
							{subject}
						</div>
					))}
				</Marquee>
			</div>
			<button
				className='box-border hidden items-center gap-2.5 md:flex md:w-28'
				onClick={openLiveChat}
			>
				<img
					className='h-6 w-6'
					src={bannerUrl('/desktop/img/4.0/livechat.png')}
					alt='liveChat'
				/>
				<span className='text-gray-1000 text-sm font-medium'>
					{t('Label_General_LiveChat')}
				</span>
			</button>
		</div>
	)
}

export default Announcement
