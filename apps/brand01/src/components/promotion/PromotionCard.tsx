'use client'

import { PromotionStatus } from 'JF-api/promotion/type'
import { cn } from 'JF-core'
import { Claimed } from './tags/Claimed'
import { Ongoing } from './tags/Ongoing'

interface PromotionCardProps {
	image: string
	status?: PromotionStatus
}

const PromotionCard: React.FC<PromotionCardProps> = ({ image, status }) => (
	<div className='relative'>
		<div className='overflow-hidden rounded-xl'>
			<img
				src={image}
				alt='promotion-banner'
				className='aspect-[547/197] w-[318px] min-w-full object-cover lg:w-[547px]'
			/>
			{status ? (
				<div
					className={cn(
						status === PromotionStatus.Ongoing
							? 'bg-primary-300'
							: 'bg-tertiary-500',
						'absolute inset-0 opacity-40',
					)}
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
