import { useClientTranslation } from '@noble888/src/i18n/client'
import { FEATURE_BONUS } from 'JF-constants'
import { bannerUrl } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { ImStarFull } from 'react-icons/im'

const Features: React.FC = () => {
	const { t } = useClientTranslation()
	const {
		userInfo: { currencyId },
	} = useAuthStore()

	return (
		<div className='order-2 grid w-full grid-cols-1 place-content-between bg-gray-800 text-xs lg:order-1'>
			<div>
				<div className='bg-primary-500 flex w-full items-center gap-1 px-3 py-2 font-semibold'>
					<ImStarFull size={16} />
					<span className='leading-6'>
						{t('Label_Join_Features').toUpperCase()}
					</span>
				</div>
				<div className='p-3'>
					<div className='font-semibold leading-6 text-gray-200'>
						{t('Label_Join_Memeber_Benefits').toUpperCase()}
					</div>
					<ul className='ms-6 mt-3 list-disc font-normal leading-6 text-gray-400'>
						<li>{t('Label_Join_MemberBenefits_1')}</li>
						<li>{t('Label_Join_MemberBenefits_2')}</li>
						<li>{t('Label_Join_MemberBenefits_3')}</li>
						{FEATURE_BONUS[currencyId] && (
							<li>
								{t(`Label_Join_MemberBenefits_4`, {
									rebate: FEATURE_BONUS[currencyId],
								})}
							</li>
						)}
					</ul>
					<div className='mt-4 font-semibold leading-6 text-gray-200'>
						{t('Label_Join_EnjoyVipExclusiveBonus').toUpperCase()}
					</div>
					<ul className='ms-6 mt-3 list-disc font-normal leading-6 text-gray-400'>
						<li>{t('Label_Join_MultipleProductPlatforms')}</li>
						<li>{t('Label_Join_SpeedyDepositAndWithdrawal')}</li>
					</ul>
				</div>
			</div>
			<div className='relative hidden h-96 w-full scale-90 p-2.5 lg:block'>
				<img
					className='absolute bottom-0 z-[3]'
					src={bannerUrl('/desktop/img/logo_en_w.png')}
					alt='logo_en_w'
				/>
				<img
					className='absolute top-5'
					src={bannerUrl('/desktop/img/joinNpc01.png')}
					alt='joinNpc01'
				/>
				<img
					className='absolute -end-2.5 bottom-4 z-[1]'
					src={bannerUrl('/desktop/img/joinNpc02.png')}
					alt='joinNpc02'
				/>
				<img
					className='absolute bottom-0 start-[50%] z-[1]'
					src={bannerUrl('/desktop/img/welcome.png')}
					alt='welcome'
				/>
				<img
					className='absolute bottom-0 end-24'
					src={bannerUrl('/desktop/img/back.png')}
					alt='back'
				/>
			</div>
		</div>
	)
}

export default Features
