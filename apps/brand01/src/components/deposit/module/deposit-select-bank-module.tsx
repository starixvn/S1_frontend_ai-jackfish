'use client'

import Button from '@brand01/src/components/button'
import { useClientTranslation } from '@brand01/src/i18n/client'
import type { IBankTransfer } from 'JF-api/payment/type'
import { cn, useGetPathname } from 'JF-core'
import { toLower } from 'lodash-es'
import { useSearchParams } from 'next/navigation'
import { parseAsInteger, useQueryStates } from 'nuqs'
import ModuleWrapper from './moudle-wrapper'

export default function DepositSelectBankModule({
	payments,
}: {
	payments: IBankTransfer
}) {
	if (!payments) return

	const { locale } = useGetPathname()
	const searchParams = useSearchParams()
	const { t } = useClientTranslation(locale)

	const [, setPaymentQuery] = useQueryStates({
		sysId: parseAsInteger,
	})

	const sysIdParam = searchParams.get('sysId')

	return (
		<ModuleWrapper>
			<div className='mb-3 text-center text-sm font-medium'>
				{t('Select Bank')}
			</div>
			<div className='grid grid-cols-1 gap-4 lg:grid-cols-2 '>
				{payments.data.map(payment => {
					const { sysId, canSubmit } = payment
					const isActive = sysId === Number(sysIdParam)

					return (
						<Button
							className={cn(
								' h-fit w-full justify-start lg:w-full',
								isActive && 'text-secondary-200 border-secondary-300 ',
								!canSubmit &&
									' text-secondary-200 bg-secondary-300/40 border-secondary-300 cursor-not-allowed',
							)}
							size='md'
							desktopSize='lg'
							h='lg'
							type='ghost'
							key={payment.sysId}
							onClick={() => {
								setPaymentQuery(paymentQuery => ({
									...paymentQuery,
									sysId: payment.sysId,
								}))
							}}
						>
							<div className='flex flex-row items-center justify-center p-2 '>
								<img
									className='mr-4 rounded-full'
									src={`http://payment.0814media.net/square/${toLower(payment.bankLogo)}`}
									alt='selected-bank'
								/>
								<p>{payment.bankName}</p>
							</div>
						</Button>
					)
				})}
			</div>
		</ModuleWrapper>
	)
}
