'use client'

import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { CurrenciesEnum } from 'JF-constants'
import { cn, generateShortcutList, isConvert, useGetPathname } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { useFormContext } from 'react-hook-form'
import ModuleWrapper from './moudle-wrapper'

export default function DepositAmount({
	minAmount,
	maxAmount,
	isShowShortcutList = false,
}: {
	minAmount: number
	maxAmount: number
	isShowShortcutList?: boolean
}) {
	const { locale } = useGetPathname()
	const {
		userInfo: { currencyId = CurrenciesEnum.THB },
	} = useAuthStore()
	const {
		register,
		setValue,
		getValues,
		formState: { dirtyFields, errors },
	} = useFormContext()
	const { t } = useClientTranslation(locale)

	const isDisabled = (amount: number) =>
		amount < minAmount || amount > maxAmount

	return (
		<ModuleWrapper className='bg-inherit px-0 py-0'>
			<Input
				type='number'
				register={register('amount')}
				format={isConvert(currencyId)}
				placeholder={
					t('Label_General_AmountMinMaxLimit', {
						value1: minAmount,
						value2: maxAmount,
					}) || ''
				}
				dirty={!!dirtyFields['amount']}
				errorMessage={errors['amount']?.message as string}
				error={!!errors['amount']}
			/>
			{isShowShortcutList && (
				<div className=' grid w-full auto-cols-max grid-flow-col gap-2'>
					{generateShortcutList({ minAmount }).map(amount => {
						const disabled = isDisabled(amount)
						const selected = amount === getValues('amount')

						return (
							<Button
								className={cn(
									'h-6 w-11 rounded-xl text-xs',
									'lg:h-10 lg:w-20',
									{
										'bg-primary-500': selected,
									},
								)}
								isDisabled={disabled}
								onClick={() => {
									setValue('amount', amount, { shouldValidate: true })
								}}
								key={amount}
							>
								{amount}
							</Button>
						)
					})}
				</div>
			)}
		</ModuleWrapper>
	)
}
