import { useClientTranslation } from '@noble888/src/i18n/client'
import { TPromotionData } from 'JF-api/promotion/type'
import { useQueryState } from 'nuqs'
import { GoInbox } from 'react-icons/go'
import PromotionCard from './PromotionCard'

interface PromotionListProps {
	list?: TPromotionData[]
}

export default function PromotionList({ list = [] }: PromotionListProps) {
	const { t } = useClientTranslation()

	const [, setBonusCode] = useQueryState('bonus_code')

	return list.length ? (
		<div className='flex flex-col gap-2'>
			{list.map(data => (
				<button
					key={data.bonusCode}
					className='w-full'
					onClick={() => setBonusCode(data.bonusCode)}
				>
					<PromotionCard data={data} />
				</button>
			))}
		</div>
	) : (
		<div className='text-primary-600 flex flex-col items-center justify-center py-12'>
			<GoInbox size={48} />
			<p className='mt-4 font-bold'>{t('Label_General_NoData')}</p>
		</div>
	)
}
