'use client'

import Carousel from '@noble888/src/components/carousel'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { TPromotionData } from 'JF-api/promotion/type'
import { paths } from 'JF-constants'
import { bannerUrl, cn } from 'JF-core'
import { usePromotionList } from 'JF-operations'
import Link from 'next/link'
import React, { useState } from 'react'
import { ImArrowRight2 } from 'react-icons/im'
import { SwiperProps, SwiperSlide } from 'swiper/react'

const PromotionSwiper: React.FC<{ promotionList: TPromotionData[] }> = ({
	promotionList,
}: {
	promotionList: TPromotionData[]
}) => {
	const [activeIndex, setActiveIndex] = useState<number>(0)
	const [showNavigation, setShowNavigation] = useState<boolean>(false)
	const { t } = useClientTranslation()
	const { data: promotionData } = usePromotionList()
	// console.log(promotionData);
	// console.log('promotionData :>> ', promotionData);
	const config: SwiperProps = {
		pagination: false,
		navigation: false,
		slidesPerView: 1,
		breakpoints: {
			1024: {
				slidesPerView: 3,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			},
		},
		autoplay: false,
		spaceBetween: 25,
		centeredSlides: true,
		onRealIndexChange: swiper => setActiveIndex(swiper.realIndex),
		wrapperClass: 'items-center',
		className: 'my-5 lg:my-10 overflow-visible',
	}

	// TODO 修改 loading component
	// if (isLoading) {
	// 	// 	return <Loading className='h-[30vw] lg:h-[20vw]' size={60} />
	// 	return null
	// }

	return (
		<div className='mx-auto my-7 max-w-[88vw] overflow-hidden lg:my-16'>
			<div className='flex w-full justify-between font-semibold'>
				<div className='flex cursor-default items-center gap-2'>
					<span className='text-xl'>{t('Label_General_Promotion')}</span>
					<div
						className={cn(
							'h-[5px] w-[18vw] [clip-path:polygon(0_0,100%_0,100%_100%,6%_100%)] lg:w-[8vw]',
							'from-secondary-500 bg-gradient-to-r to-white',
						)}
					/>
				</div>
				<Link
					href={paths.promotion.root}
					className='hidden cursor-pointer items-center gap-2 text-base lg:flex'
				>
					<span>{t('Label_General_More').toUpperCase()}</span>
					<ImArrowRight2 className='text-secondary-500' />
				</Link>
			</div>
			<div
				onMouseOver={() => setShowNavigation(true)}
				onMouseOut={() => setShowNavigation(false)}
				onFocus={() => 0}
				onBlur={() => 0}
			>
				<Carousel {...config}>
					{(promotionData || promotionList).map(
						(
							{ bonusCode, categoryId, tpId, banner, title }: TPromotionData,
							index,
						) => (
							<SwiperSlide
								key={`promotion.list-${bonusCode}-${categoryId}-${tpId}`}
							>
								<div
									className={cn(
										'h-[35vw] lg:h-full',
										activeIndex === index ? 'lg:scale-125' : 'lg:scale-[82%]',
									)}
									// TODO: promotion click open detail modal
									// eslint-disable-next-line no-console
									onClick={() => console.log(bonusCode)}
								>
									<img
										src={banner}
										alt={title}
										className='h-full w-full rounded-[20px] object-cover'
										loading='lazy'
									/>
									<div className='swiper-lazy-preloader' />
								</div>
							</SwiperSlide>
						),
					)}
					{promotionData.length > 3 && (
						<>
							<div
								className={cn(
									'swiper-button-prev left-[25vw] hidden opacity-100 after:hidden lg:flex',
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
									'swiper-button-next right-[25vw] hidden opacity-100 after:hidden lg:flex',
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
		</div>
	)
}

export default PromotionSwiper
