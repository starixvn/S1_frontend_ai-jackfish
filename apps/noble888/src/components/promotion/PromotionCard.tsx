import { useClientTranslation } from '@noble888/src/i18n/client'
import { TPromotionData } from 'JF-api/promotion/type'
import NewTag from './NewTag'

interface PromotionCardProps {
	data: TPromotionData
}

export default function PromotionCard({ data }: PromotionCardProps) {
	const { t } = useClientTranslation()
	return (
		<div className='bg-primary-200 relative flex w-full flex-col gap-2 rounded-md p-3 lg:flex-row lg:gap-10 lg:bg-white lg:p-4'>
			<NewTag />
			<img
				alt='promo'
				className='bg-white max-lg:rounded-md lg:h-[170px] lg:w-[450px] lg:object-cover'
				src={data.banner}
			/>
			<div className='flex flex-col text-start'>
				<header className='text-primary-700 font-bold lg:text-2xl'>
					{data.title}
				</header>
				<main className='text-primary-600 flex-grow text-xs lg:text-sm lg:text-gray-800'>
					{data.description}
				</main>
				<footer className='mt-2 flex gap-2'>
					<button
						type='button'
						className='bg-secondary-500 w-32 rounded-md py-2 text-sm font-bold text-white max-lg:flex-grow'
					>
						{t('Label_Promotion_JoinNow')}
					</button>
					<button
						type='button'
						className='bg-primary-600 w-32 rounded-md py-2 text-sm font-bold text-white max-lg:flex-grow'
					>
						{t('Label_Promotion_MoreInfo')}
					</button>
				</footer>
			</div>
		</div>
	)
}
