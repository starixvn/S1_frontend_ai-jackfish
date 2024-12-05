'use client'

import dynamic from 'next/dynamic'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { SwiperProps } from 'swiper/react'

const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), {
	ssr: false,
})

const Carousel = ({ children, ...rest }: SwiperProps) => {
	const defaultConfig: SwiperProps = {
		modules: [Pagination, Navigation, Autoplay],
		loop: true,
		grabCursor: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	}

	const config = { ...defaultConfig, ...rest }

	return <Swiper {...config}>{children}</Swiper>
}
export default Carousel
