'use client'

import { useClientTranslation } from '@noble888/src/i18n/client'
import { THotEventData } from 'JF-api/hotEvent/type'
import { bannerUrl } from 'JF-core'
import React from 'react'
import HotMatchSwiper from './HotMatchSwiper'

const HotMatch: React.FC<{ hotEventList: THotEventData[] }> = ({
	hotEventList,
}: {
	hotEventList: THotEventData[]
}) => {
	const { t } = useClientTranslation()

	return (
		<div className='to-primary-800 relative mt-20 w-full bg-gradient-to-r from-black'>
			<div
				className='absolute -top-[6rem] min-h-[55vw] w-full bg-cover bg-center bg-no-repeat md:-top-[10rem]'
				style={{
					backgroundImage: `url(${bannerUrl('/desktop/img/4.0/hotmatch-bg-new.png')})`,
				}}
			/>
			<div className='relative mx-auto max-w-[88vw] lg:py-10'>
				<div className='w-full'>
					<img
						className='hidden w-48 lg:block'
						src={bannerUrl('/desktop/img/4.0/hotmatch-logo.png')}
						alt='hotMatch-logo'
					/>
					<div className='h-12 content-center text-4xl font-bold text-white lg:h-[8.5rem] lg:text-8xl'>
						{t('Label_General_Sports').toUpperCase()}
					</div>
				</div>
				<HotMatchSwiper hotEventList={hotEventList} />
				<div className='mt-7 hidden w-full justify-between gap-6 lg:flex'>
					{/* TODO onClick */}
					<div
						style={{
							backgroundImage: `url(${bannerUrl('/desktop/img/4.0/home-sports-soccer.png')})`,
						}}
						className='flex min-h-[300px] w-full items-end justify-end bg-cover bg-center bg-no-repeat pb-5 pe-12'
					>
						<button className='from-primary-700 to-primary-800 w-28 rounded-full bg-gradient-to-r p-4 text-center text-white'>
							{t('Label_General_BetNow')}
						</button>
					</div>
					<div
						style={{
							backgroundImage: `url(${bannerUrl('/desktop/img/4.0/home-sports-badminton.png')})`,
						}}
						className='flex min-h-[300px] w-full items-end justify-end bg-cover bg-center bg-no-repeat pb-5 pe-12'
					>
						<button className='from-primary-700 to-primary-800 w-28 rounded-full bg-gradient-to-r p-4 text-center text-white'>
							{t('Label_General_BetNow')}
						</button>
					</div>
					<div
						style={{
							backgroundImage: `url(${bannerUrl('/desktop/img/4.0/home-sports-basketball.png')})`,
						}}
						className='flex min-h-[300px] w-full items-end justify-end bg-cover bg-center bg-no-repeat pb-5 pe-12'
					>
						<button className='from-primary-700 to-primary-800 w-28 rounded-full bg-gradient-to-r p-4 text-center text-white'>
							{t('Label_General_BetNow')}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HotMatch
