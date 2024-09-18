'use client'

import Button from '@brand01/src/components/button'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { DEPOSIT_PAYMENT_TYPE } from 'JF-constants'
import { cn, useGetPathname } from 'JF-core'
import type { PaymentOption } from 'JF-operations'
import { isEqual } from 'lodash-es'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import ModuleWrapper from './moudle-wrapper'

export default function DepositOptionModule({
	paymentOptions,
}: {
	className?: string
	paymentOptions: Array<PaymentOption> | undefined
}) {
	if (!paymentOptions) return
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const [paymentQuery, setPaymentQuery] = useQueryStates({
		paymentType: parseAsString.withDefault(DEPOSIT_PAYMENT_TYPE.BankTransfer),
		groupId: parseAsInteger,
		sysId: parseAsInteger,
		payId: parseAsInteger,
	})

	// 過濾掉 null 的 params
	const filteredPaymentQuery = Object.fromEntries(
		Object.entries(paymentQuery).filter(([_, value]) => value !== null),
	)

	return (
		<ModuleWrapper>
			<div className='mb-3 text-center text-sm font-medium'>
				{t('TopUp Option')}
			</div>
			<div className='bg-tertiary-500 grid  grid-cols-2 grid-rows-1 gap-4 rounded-2xl lg:grid-cols-3 '>
				{paymentOptions.map(paymentOption => {
					const { query } = paymentOption

					// BankTransfer 只需比對 paymentType，但其他只有一層，須比對個自的 param
					const isActive =
						query.paymentType === DEPOSIT_PAYMENT_TYPE.BankTransfer
							? isEqual(query.paymentType, paymentQuery.paymentType)
							: isEqual(query, filteredPaymentQuery)

					const {
						query: { paymentType, groupId, sysId, payId },
					} = paymentOption || {}

					return (
						<Button
							type='ghost'
							className={cn('h-fit w-full flex-col space-y-2', {
								'text-secondary-200 border-secondary-300': isActive,
							})}
							onClick={() =>
								setPaymentQuery(paymentQuery => ({
									...paymentQuery,
									paymentType,
									groupId: groupId ?? null,
									sysId: sysId ?? null,
									payId: payId ?? null,
								}))
							}
							key={paymentOption.image}
						>
							<img src={paymentOption.image} alt='deposit-option' />
							<div>{t(paymentOption.title)}</div>
						</Button>
					)
				})}
			</div>

			<div className='text-check-200 mt-10 text-center'>
				{t('Label_Deposit_Option_Description')}
			</div>
		</ModuleWrapper>
	)
}
