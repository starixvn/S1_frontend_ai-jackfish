import React from 'react'
import { TAnnouncementData } from 'JF-api'
import Marquee from '../../marquee'

interface IAnnouncementProps {
	announcementData: TAnnouncementData[]
}

const Announcement: React.FC<IAnnouncementProps> = ({ announcementData }) => {
	return (
		// TODO announcementData是要顯示subject還是content，nova目前是有一個announcement頁面，首頁顯示subject
		<Marquee>
			{/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
			{announcementData?.map(({ content, id, subject }) => (
				<div className='ml-8 cursor-pointer py-1' key={`announcement-${id}`}>
					{subject}
				</div>
			))}
		</Marquee>
	)
}

export default Announcement
