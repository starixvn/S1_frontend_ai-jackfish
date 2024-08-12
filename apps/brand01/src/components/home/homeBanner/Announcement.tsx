'use client'
import { TAnnouncementData } from 'JF-api/message/type'
import { imageUrl } from 'JF-core'
import React from 'react'
import Marquee from '../../marquee'

interface IAnnouncementProps {
	announcementData?: TAnnouncementData[]
}

const Announcement: React.FC<IAnnouncementProps> = ({ announcementData }) => {
	return (
		// TODO: announcementData是要顯示subject還是content，nova目前是有一個announcement頁面，首頁顯示subject
		<>
			<div className='flex'>
				<img
					className='mx-2 lg:mx-4'
					src={imageUrl('/img/icon/icon-megaphone.svg')}
					alt=''
				/>

				<Marquee>
					{announcementData?.map(({ id, subject }) => (
						<div
							className='text-secondary-300 ml-8 cursor-pointer py-1 text-xs font-medium'
							key={`announcement-${id}`}
						>
							{subject}
						</div>
					))}
				</Marquee>
			</div>
		</>
	)
}

export default Announcement
