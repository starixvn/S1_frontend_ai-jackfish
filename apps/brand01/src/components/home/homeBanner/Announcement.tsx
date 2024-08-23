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
		<div className='flex h-8 items-center'>
			<img
				className='mx-2 h-4 w-4 lg:mx-4'
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
	)
}

export default Announcement
