'use client'

import Carousel from '@noble888/src/components/carousel'
import { getBanner } from 'JF-api/site/client'
import { TBannerData } from 'JF-api/site/type'
import { paths } from 'JF-constants'
import { cn, useBannerClick, useLocaleRouter } from 'JF-core'
import React from 'react'
import { SwiperProps, SwiperSlide } from 'swiper/react'

const Banner: React.FC = () => {
	const router = useLocaleRouter()
	const { bannerData, isLoading } = getBanner()
	const { bannerClick } = useBannerClick()

	const config: SwiperProps = {
		navigation: false,
		pagination: false,
		breakpoints: {
			1024: {
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					type: 'bullets',
					bulletClass: 'h-2 w-4 mx-1 bg-gray-600 opacity-100 rounded-xl',
					bulletActiveClass: '!w-3 !h-3 !rounded-full !bg-white',
					renderBullet: (_index, className) => {
						return `<span class="swiper-pagination-bullet ${className}"></span>`
					},
				},
			},
		},
	}

	// TODO 修改 loading component
	if (isLoading) {
		return null
		// return <Loading className='h-[30vw] lg:h-[20vw]' size={60} />
	}

	return (
		<Carousel {...config}>
			{bannerData?.map((item: TBannerData) => (
				<SwiperSlide key={item.itemKey}>
					<div
						className='h-[37.5vw] object-cover lg:h-full'
						onClick={
							item.redirectLink
								? () => router.push(item.redirectLink ?? '/')
								: () =>
										bannerClick(item, {
											// TODO 修改 loginCallback
											loginCallback: () => router.push(paths.login.root),
										})
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
						<div className='swiper-lazy-preloader' />
					</div>
				</SwiperSlide>
			))}
			<div className='swiper-pagination mb-7 ms-5 hidden items-center text-left lg:flex' />
		</Carousel>
	)
}

export default Banner
