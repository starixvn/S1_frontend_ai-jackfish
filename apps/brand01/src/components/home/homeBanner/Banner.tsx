'use client'

import { TBannerData } from 'JF-api/site/type'
import { cn, useBannerClick, useLocaleRouter } from 'JF-core'
import React from 'react'
import { SwiperSlide } from 'swiper/react'
import Carousel from '../../carousel'
import Loading from '../../loading'

interface IBannerProps {
	bannerData: TBannerData[]
	bannerIsLoading: boolean
}

const Banner: React.FC<IBannerProps> = ({ bannerData, bannerIsLoading }) => {
	const router = useLocaleRouter()
	const { bannerClick } = useBannerClick()
	return bannerIsLoading ? (
		<>
			<Loading />
		</>
	) : (
		<Carousel>
			{bannerData?.map((item: TBannerData) => (
				<SwiperSlide key={item.itemKey}>
					<div
						onClick={
							item.redirectLink
								? () => router.push(item.redirectLink ?? '/')
								: () => bannerClick(item)
						}
					>
						<img
							src={item.bannerPCUrl}
							alt={item.bannerName}
							className={cn('h-[30vw] w-full object-cover lg:h-[20vw]', {
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
