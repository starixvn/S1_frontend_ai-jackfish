'use client'

import ReactMarquee from 'react-fast-marquee'
import { IMarqueeConfigs } from './type'

export interface IMarqueeProps extends IMarqueeConfigs {
	className?: string
}

const Marquee = ({ children, className, ...rest }: IMarqueeProps) => {
	const defaultConfig: IMarqueeConfigs = {
		direction: 'left' as const,
		pauseOnHover: true,
		speed: 50,
		gradient: false,
	}

	const config = { ...defaultConfig, ...rest }

	return (
		<ReactMarquee {...config} className={className}>
			{children}
		</ReactMarquee>
	)
}

export default Marquee
