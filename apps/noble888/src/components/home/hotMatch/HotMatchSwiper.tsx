'use client'

import Carousel from '@noble888/src/components/carousel'
import { THotEventData } from 'JF-api/hotEvent/type'
import { cn } from 'JF-core'
import { bannerUrl } from 'libs/core/src/lib/utils/imageUrl'
import React, { useState } from 'react'
import { SwiperProps, SwiperSlide } from 'swiper/react'
import HotMatchItem from './HotMatchItem'

const HotMatchSwiper: React.FC<{ hotEventList: THotEventData[] }> = ({
	hotEventList,
}: {
	hotEventList: THotEventData[]
}) => {
	const [showNavigation, setShowNavigation] = useState<boolean>(false)
	const config: SwiperProps = {
		pagination: false,
		navigation: false,
		slidesPerView: 1.1,
		spaceBetween: 10,
		breakpoints: {
			1024: {
				slidesPerView: 4.1,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			},
		},
		autoplay: false,
		loop: false,
		className: 'static',
	}

	if (hotEventList.length === 0) {
		return null
	}

	return (
		<div
			onMouseOver={() => setShowNavigation(true)}
			onMouseOut={() => setShowNavigation(false)}
			onFocus={() => 0}
			onBlur={() => 0}
		>
			<Carousel {...config}>
				{hotEventList?.map((hotMatchData: THotEventData) => (
					<SwiperSlide
						key={`${hotMatchData.sportLeaguesTitle}-${hotMatchData.matchId}`}
					>
						<HotMatchItem
							key={`${hotMatchData.sportLeaguesTitle}-${hotMatchData.matchId}`}
							hotMatchData={hotMatchData}
						/>
					</SwiperSlide>
				))}
				{hotEventList.length > 4 && (
					<>
						<div
							className={cn(
								'swiper-button-prev -left-3 top-[40%] hidden opacity-100 after:hidden lg:flex',
								{ 'opacity-20': !showNavigation },
							)}
						>
							<img
								className='scale-125'
								src={bannerUrl('/desktop/img/4.0/left-1.png')}
								alt='chevron-left'
							/>
						</div>
						<div
							className={cn(
								'swiper-button-next -right-3 top-[40%] hidden opacity-100 after:hidden lg:flex',
								{ 'opacity-20': !showNavigation },
							)}
						>
							<img
								className='scale-125'
								src={bannerUrl('/desktop/img/4.0/right-1.png')}
								alt='chevron-right'
							/>
						</div>
					</>
				)}
			</Carousel>
		</div>
	)
}

export default HotMatchSwiper
