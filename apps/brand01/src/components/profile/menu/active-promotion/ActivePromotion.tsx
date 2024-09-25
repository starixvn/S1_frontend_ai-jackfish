import Loading from '@brand01/src/components/loading'
import PromotionCard from '@brand01/src/components/promotion/PromotionCard'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { useActivePromotionList } from 'JF-operations'

const ActivePromotion: React.FC = () => {
	const { t } = useClientTranslation()
	const { data, isLoading } = useActivePromotionList()
	if (isLoading) return <Loading className='h-full bg-transparent' />

	return (
		<div className='flex h-full flex-col items-center overflow-y-auto'>
			<header className='mb-4 text-center text-xl'>
				{t('Label_Profile_ActivePromotion')}
			</header>
			{data?.length ? (
				<ul className='flex h-[400px] max-w-[420px] flex-col items-center gap-4'>
					{data.map(({ bonusCode, banner, status }) => (
						<li key={bonusCode}>
							<PromotionCard image={banner} status={status} />
						</li>
					))}
				</ul>
			) : (
				t('Label_General_NoData')
			)}
		</div>
	)
}

export default ActivePromotion
