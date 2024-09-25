'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { useGetPathname } from 'JF-core'
import { usePromotionList } from 'JF-operations'
import { useQueryState } from 'nuqs'
import Loading from '../loading'
import PromotionCard from './PromotionCard'
import PromotionDetailsModal from './PromotionDetailsModal'

const PromotionList: React.FC = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const [selectedBonusCode, setSelectedBonusCode] = useQueryState('bonusCode')

	const { data, isLoading } = usePromotionList()
	if (isLoading) return <Loading className='h-full bg-transparent' />

	return (
		<>
			{data.length ? (
				<ul className='grid grid-cols-1 gap-6 px-14 lg:grid-cols-2 lg:gap-4'>
					{data.map(({ bonusCode, banner, status }) => (
						<li key={bonusCode}>
							<div
								className='cursor-pointer'
								onClick={() => setSelectedBonusCode(bonusCode)}
							>
								<PromotionCard image={banner} status={status} />
							</div>
						</li>
					))}
				</ul>
			) : (
				<div>{t('Label_General_NoData')}</div>
			)}
			{selectedBonusCode && (
				<PromotionDetailsModal
					bonusCode={selectedBonusCode}
					onClose={() => setSelectedBonusCode(null)}
				/>
			)}
		</>
	)
}

export default PromotionList
