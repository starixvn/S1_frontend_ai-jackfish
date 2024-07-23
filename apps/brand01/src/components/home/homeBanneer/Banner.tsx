'use client'

import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useBannerClick } from 'JF-core'
import { TBannerData } from 'JF-api'
import { SwiperSlide } from 'swiper/react'
import Carousel from '../../carousel'

interface IBannerProps {
	bannerData: TBannerData[]
}

const Banner: React.FC<IBannerProps> = ({ bannerData }) => {
	const router = useRouter()
	return (
		<Carousel>
			{bannerData?.map(item => (
				<SwiperSlide key={item.itemKey}>
					<div
						onClick={
							item.redirectLink
								? () => router.push(item.redirectLink ?? '/')
								: () => useBannerClick(item)
						}
					>
						<img
							src={item.bannerPCUrl}
							alt={item.bannerName}
							className={clsx('h-[30vw] w-full object-cover lg:h-[20vw]', {
								'cursor-pointer': Boolean(item.redirectLink),
							})}
							loading='lazy'
						/>
						<div className='swiper-lazy-preloader'></div>
					</div>
				</SwiperSlide>
			))}
		</Carousel>
	)
}

export default Banner
