import Loading from '@brand01/src/components/loading'
import { TFunction } from 'i18next'
import { useGetReferralSummary } from 'JF-api/account/client'
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

interface IReferralStatusProps {
	t: TFunction<string, undefined>
}

const ReferralStatus: React.FC<IReferralStatusProps> = ({ t }) => {
	const {
		userInfo: { currencyName },
	} = useAuthStore()

	const { referralSummary, isLoading } = useGetReferralSummary()

	return (
		<div className='mt-7 px-5 lg:mt-9 lg:px-0'>
			<div className='text-check-200 text-center text-2xl font-bold'>
				{t('Label_Referral_YourReferralStatus')}
			</div>
			{isLoading ? (
				<Loading
					className='mt-4 h-[13.25rem] rounded-[5px] lg:mt-6 lg:h-32'
					size={60}
				/>
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
		</div>
	)
}

export default ReferralStatus
