'use client'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { CurrenciesEnum } from 'JF-constants'
import { cn, numberFormat, useGetPathname } from 'JF-core'
import { useAuthStore, useWithdrawalInfo } from 'JF-operations'

export const BalanceInfo = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const {
		userInfo: { currencyId = CurrenciesEnum.THB },
	} = useAuthStore()
	const { withdrawalBalance } = useWithdrawalInfo()
	const {
		availableBalance = 0,
		balance = 0,
		deduction = 0,
	} = withdrawalBalance ?? {}

	return (
		<div
			className={cn(
				'bg-tertiary-500 grid grid-rows-3 gap-4 rounded-2xl p-8',
				'lg:grid-cols-3 lg:grid-rows-1',
			)}
		>
			<div className='flex items-center'>
				<div className='invisible mr-2 text-2xl font-bold'>+</div>
				<div className='bg-tertiary-400  col-span-full  grid h-full grow  auto-cols-auto place-content-between gap-1 rounded-2xl px-3 py-4 text-start'>
					<p className='text-primary-200 text-xs lg:text-base'>
						{t('Label_Withdrawal_Balance')}
					</p>
					<div className='grid grid-flow-col place-content-start gap-2'>
						<span>{t(`Label_Currency_${currencyId}`)}</span>
						<span className='text-secondary-300'>
							{numberFormat(balance, currencyId)}
						</span>
					</div>
				</div>
			</div>
			<div className='flex items-center'>
				<div className='mr-2 text-2xl font-bold'>-</div>
				<div className='bg-tertiary-400 grid h-full grow auto-cols-auto place-content-between gap-1 rounded-2xl px-3 py-4 text-start'>
					<p className='text-primary-200 text-xs lg:text-base'>
						{t('Label_Withdrawal_Deduction')}
					</p>
					<div className='grid grid-flow-col place-content-start gap-2'>
						<span>{t(`Label_Currency_${currencyId}`)}</span>
						<span className='text-secondary-300'>
							{numberFormat(deduction, currencyId)}
						</span>
					</div>
				</div>
			</div>

			<div className='flex items-center'>
				<div className='mr-2 text-2xl font-bold'>=</div>
				<div className='bg-tertiary-400 grid grow auto-cols-auto place-content-between gap-1 rounded-2xl px-3 py-4 text-start'>
					<p className='text-primary-200 text-xs lg:text-base'>
						{t('Label_Withdrawal_EligibleWithdrawalAmount')}
					</p>
					<div className='grid grid-flow-col place-content-start gap-2'>
						<span>{t(`Label_Currency_${currencyId}`)}</span>
						<span className='text-secondary-300'>
							{numberFormat(availableBalance, currencyId)}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
