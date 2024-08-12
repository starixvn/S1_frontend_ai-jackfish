import { cn } from 'JF-core'
import { useWithdrawalStore } from 'JF-operations'
import { head } from 'lodash-es'
import React from 'react'

// 顯示銀行戶頭資料，因不可刪減銀行卡，僅顯示第一筆
export const BankInfo: React.FC = () => {
	const {
		bankData: { bankInfoDetail },
		accountName,
	} = useWithdrawalStore()
	const bankItem = head(bankInfoDetail)

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
