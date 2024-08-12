import { useClientTranslation } from '@brand01/src/i18n/client'
import { CurrenciesEnum } from 'JF-constants'
import { cn, numberFormat, useGetPathname } from 'JF-core'
import { useAuthStore, useWithdrawalStore } from 'JF-operations'

// 顯示提款上下限，因 Tuk555 只有先做 localBank , 僅先移植 local bank 邏輯
export const LimitationInfo: React.FC = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { withdrawalLimit } = useWithdrawalStore()
	const {
		userInfo: { currencyId = CurrenciesEnum.THB },
	} = useAuthStore()

	const {
		withdrawalMin = 0,
		unlimited = false,
		withdrawalAvailableAmount = 0,
	} = withdrawalLimit ?? {}

	const withdrawalMinAmount = `${numberFormat(withdrawalMin, currencyId, 2)} ${t(`Label_Currency_${currencyId}`)}`

	const withdrawalMaxAmount = unlimited
		? t('Label_General_Unlimited')
		: `${numberFormat(withdrawalAvailableAmount, currencyId, 2)} ${t(`Label_Currency_${currencyId}`)}`

	return (
		<ul
			className={cn(
				'bg-secondary-300  grid list-disc grid-flow-row gap-2 rounded-2xl p-4 px-10 text-start text-xs',
				'lg:gap-4 lg:text-sm',
			)}
		>
			<li>{`${t('Label_General_Min')} ${t('Label_General_Withdrawal')} : ${withdrawalMinAmount}`}</li>
			<li>{`${t('Label_General_Max')} ${t('Label_General_Withdrawal')} : ${withdrawalMaxAmount}`}</li>
		</ul>
	)
}
