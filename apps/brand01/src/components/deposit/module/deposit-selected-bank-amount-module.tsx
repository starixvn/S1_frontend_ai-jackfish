'use client'

import ModuleWrapper from '@brand01/src/components/deposit/module/moudle-wrapper'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { CurrenciesEnum } from 'JF-constants'
import { numberFormat, useGetPathname } from 'JF-core'
import { useAuthStore } from 'JF-operations'

type DepositSelectedBankAmountModuleProps = {
	minAmount: number
	maxAmount: number
}

export default function DepositSelectedBankAmountModule({
	minAmount,
	maxAmount,
}: DepositSelectedBankAmountModuleProps) {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const {
		userInfo: { currencyId = CurrenciesEnum.THB },
	} = useAuthStore()

	const depositMinAmount = `${numberFormat(minAmount, currencyId, 2)} ${t(`Label_Currency_${currencyId}`)}`
	const depositMaxAmount = `${numberFormat(maxAmount, currencyId, 2)} ${t(`Label_Currency_${currencyId}`)}`

	return (
		<ModuleWrapper className='bg-secondary-300'>
			<li>
				{t('Label_Min_Deposit')} : {depositMinAmount}
			</li>
			<li>
				{' '}
				{t('Label_Max_Deposit')} : {depositMaxAmount}
			</li>
		</ModuleWrapper>
	)
}
