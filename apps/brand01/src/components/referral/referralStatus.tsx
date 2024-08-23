import Loading from '@brand01/src/components/loading'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { useGetReferralSummary } from 'JF-api/account/client'
import { useGetPathname } from 'JF-core'
import { useAuthStore } from 'JF-operations'

interface IStatusBoxProps {
	label: string
	value: number
	currencyName?: string
}

const StatusBox: React.FC<IStatusBoxProps> = ({
	label,
	value,
	currencyName = '',
}) => (
	<div className='grid h-24 w-full rounded-[5px] bg-neutral-100 p-2.5 text-center lg:h-32'>
		<div className='text-sm font-bold text-neutral-400'>
			{label.toUpperCase()}
		</div>
		<div className='text-secondary-300 text-2xl font-bold'>
			{currencyName && <span className='mr-2'>{currencyName}</span>}
			{value}
		</div>
	</div>
)

const ReferralStatus: React.FC = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const {
		userInfo: { currencyName },
	} = useAuthStore()

	const { referralSummary, isLoading } = useGetReferralSummary()

	return (
		<>
			<div className='text-check-200 text-center text-2xl font-bold'>
				{t('Label_Referral_YourReferralStatus')}
			</div>
			{isLoading ? (
				<Loading className='mt-4 h-[13.25rem] rounded-[5px] lg:mt-6 lg:h-32' />
			) : (
				<div className='mt-4 grid grid-cols-1 place-items-center gap-5 lg:mt-6 lg:grid-cols-2'>
					<StatusBox
						label={t('Label_Referral_NoOfAchievements')}
						value={referralSummary?.referralCount ?? 0}
					/>
					<StatusBox
						label={t('Label_Referral_AccumulateRewardAmount')}
						value={referralSummary?.amountSum ?? 0}
						currencyName={currencyName}
					/>
				</div>
			)}
		</>
	)
}

export default ReferralStatus
