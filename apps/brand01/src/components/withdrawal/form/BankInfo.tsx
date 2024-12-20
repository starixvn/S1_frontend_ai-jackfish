import { cn } from 'JF-core'
import { useWithdrawalInfo, useWithdrawalStore } from 'JF-operations'
import React from 'react'

// 顯示已選擇的卡片
export const BankInfo: React.FC = () => {
	const { accountName } = useWithdrawalInfo()
	const { selectedBankItem: bankItem } = useWithdrawalStore()

	if (!bankItem) return null

	const { bankLogo: rawBankLogo, bankName, accountNo } = bankItem
	const bankLogo = String(rawBankLogo).toLowerCase()

	return (
		<div
			className={cn(
				'bg-tertiary-400 flex items-center gap-2 rounded-2xl p-4 text-start',
				'lg:gap-4 lg:px-10',
			)}
		>
			<img
				className={cn(
					'h-14 w-14  rounded-full border-2 border-neutral-900',
					'lg:h-20 lg:w-20',
				)}
				src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}/square/${bankLogo}`}
				alt={bankName}
			/>
			<div className='grid grow grid-flow-row place-content-start gap-0.5'>
				<span className='text-base'>{bankName}</span>
				<span>{accountName}</span>
				<span>{accountNo}</span>
				<span className='text-secondary-300'></span>
			</div>
		</div>
	)
}
