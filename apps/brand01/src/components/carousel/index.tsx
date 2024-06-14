import { Swiper, SwiperProps } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

export interface ICarouselProps extends SwiperProps {
	className?: string
}

const Carousel = ({ children, className, ...rest }: ICarouselProps) => {
	const defaultConfig: SwiperProps = {
		modules: [Pagination, Navigation, Autoplay],
		spaceBetween: 0,
		centeredSlides: true,
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
	}

	const config = { ...defaultConfig, ...rest }

	return (
		<Swiper className={className} {...config}>
			{children}
		</Swiper>
	)
}
export default Carousel
