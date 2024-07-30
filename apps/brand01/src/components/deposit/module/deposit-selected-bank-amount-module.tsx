'use client'

import ModuleWrapper from '@brand01/src/components/deposit/module/moudle-wrapper'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { useGetPathname } from 'JF-core'

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

	return (
		<ModuleWrapper className='bg-secondary-300'>
			<li>
				{t('Label_Promotion_MinDeposit')} : {minAmount}
			</li>
			<li>
				{' '}
				{t('Label_Max_Deposit')} : {maxAmount}
			</li>
		</ModuleWrapper>
	)
}
