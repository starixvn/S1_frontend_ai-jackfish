'use client'

import { PromotionStatus } from 'JF-api/promotion/type'
import { Claimed } from './tags/Claimed'
import { Ongoing } from './tags/Ongoing'

interface PromotionCardProps {
	image: string
	status?: PromotionStatus
}

const PromotionCard: React.FC<PromotionCardProps> = ({ image, status }) => (
	<div className='relative'>
		<div className='relative overflow-hidden rounded-xl'>
			<img
				src={image}
				alt='promotion-banner'
				className='aspect-[547/197] max-h-[114px] w-full object-cover lg:max-h-[197px]'
			/>
			{status ? (
				<div
					className={`${
						status === PromotionStatus.Ongoing
							? 'bg-primary-300'
							: 'bg-tertiary-500'
					} absolute inset-0 opacity-40`}
				/>
			) : null}
		</div>
		{status ? (
			<div className='absolute -top-2 right-3'>
				{status === PromotionStatus.Ongoing ? <Ongoing /> : <Claimed />}
			</div>
		) : null}
	</div>
)

export default PromotionCard
