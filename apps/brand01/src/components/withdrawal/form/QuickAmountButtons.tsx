import Button from '@brand01/src/components/button'
import { CurrenciesEnum } from 'JF-constants'
import { cn, numberFormat } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { uniqueId } from 'lodash-es'
import React from 'react'

interface IQuickAmountButtonsProps {
	minAmount: number
	maxAmount: number
	current: number
	list: number[]
	onChange?: (value: number) => void
}

export const QuickAmountButtons: React.FC<IQuickAmountButtonsProps> = ({
	minAmount,
	maxAmount,
	current,
	list,
	onChange,
}) => {
	if (list.length === 0) return null
	const {
		userInfo: { currencyId = CurrenciesEnum.THB },
	} = useAuthStore()
	const isDisabled = (amount: number) =>
		amount < minAmount || amount > maxAmount

	return (
		<div className='-mt-4 grid w-full auto-cols-max grid-flow-col  gap-2'>
			{list.map(value => {
				const disabled = isDisabled(value)
				const selected = current === value
				return (
					<Button
						key={uniqueId()}
						isDisabled={disabled}
						className={cn('h-6 w-11 rounded-xl text-xs', 'lg:h-10 lg:w-20', {
							'bg-primary-500': selected,
						})}
						onClick={() => {
							onChange && onChange(value)
						}}
					>
						{numberFormat(value, currencyId)}
					</Button>
				)
			})}
		</div>
	)
}
