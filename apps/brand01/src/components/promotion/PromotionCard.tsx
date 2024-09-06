'use client'

import { PromotionStatus } from 'JF-api/promotion/type'
import { cn, imageUrl } from 'JF-core'

interface PromotionCardProps {
	image: string
	status?: PromotionStatus
}

const PromotionCard: React.FC<PromotionCardProps> = ({ image, status }) => (
	<div className='relative'>
		<div className='bg-tertiary-500 overflow-hidden rounded-xl'>
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
			<div className='absolute -top-3 right-3 w-[68px] lg:-top-2 lg:w-[76px]'>
				{status === PromotionStatus.Ongoing ? (
					<img alt='tag-claimed' src={imageUrl('/img/icon/tag-claimed.png')} />
				) : (
					<img alt='tag-ongoing' src={imageUrl('/img/icon/tag-ongoing.png')} />
				)}
			</div>
		) : null}
	</div>
)

export default PromotionCard
