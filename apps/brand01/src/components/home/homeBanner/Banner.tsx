'use client'

import Carousel from '@brand01/src/components/carousel'
import Loading from '@brand01/src/components/loading'
import { TBannerData } from 'JF-api/site/type'
import { cn, useBannerClick, useLocaleRouter } from 'JF-core'
import React from 'react'
import { SwiperSlide } from 'swiper/react'

interface IBannerProps {
	bannerData: TBannerData[]
	bannerIsLoading: boolean
}

const Banner: React.FC<IBannerProps> = ({ bannerData, bannerIsLoading }) => {
	const router = useLocaleRouter()
	const { bannerClick } = useBannerClick()

	if (bannerIsLoading) {
		return <Loading className='h-[30vw] lg:h-[20vw]' size={60} />
	}

	return (
		<Carousel>
			{bannerData?.map((item: TBannerData) => (
				<SwiperSlide key={item.itemKey}>
					<div
						className='h-[30vw] lg:h-[17vw]'
						onClick={
							item.redirectLink
								? () => router.push(item.redirectLink ?? '/')
								: () => bannerClick(item)
						}
					>
						<img
							src={item.bannerPCUrl}
							alt={item.bannerName}
							className={cn('h-full w-full object-cover lg:h-full', {
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
