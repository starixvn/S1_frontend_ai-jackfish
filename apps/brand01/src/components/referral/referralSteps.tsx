import { referralSteps } from '@brand01/src/data/referral'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { cn, imageUrl, useGetPathname } from 'JF-core'

const ReferralSteps: React.FC = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	return (
		<div className='flex w-full flex-col'>
			<div className='text-check-200 text-center text-lg font-bold lg:text-left lg:text-xl'>
				{t('Label_Referral_Simple3StepsToShare')}
			</div>
			{referralSteps.map(({ name, subjectLabel, contentLabel }, index) => (
				<div
					className={cn(
						'relative mt-8 grid grid-cols-[auto_1fr] items-center gap-2.5 lg:mt-14',
						{ 'mt-6 lg:mt-6': index === 0 },
					)}
					key={name}
				>
					<img
						className='h-[3.75rem] w-[3.75rem] lg:h-[4.375rem] lg:w-[4.375rem]'
						src={imageUrl(`/img/icon/referral/icon-${name}.png`)}
						alt={name}
					/>
					{index !== referralSteps.length - 1 && (
						<img
							className='absolute top-12 left-7 h-14 w-1 lg:top-[4.4rem] lg:left-8'
							src={imageUrl('/img/dash-line.png')}
							alt='dash-line'
						/>
					)}
					<div className='grid'>
						<div className='text-check-200 text-base font-bold'>
							{t(subjectLabel).toUpperCase()}
						</div>
						<div className='text-xs lg:text-sm'>{t(contentLabel)}</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default ReferralSteps
