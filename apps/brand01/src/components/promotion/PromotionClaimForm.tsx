'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { PromotionType, TPromotionData } from 'JF-api/promotion/type'
import {
	numFormatToDigits,
	numberFormat,
	replaceStringToNumber,
	revertNumberFormat,
} from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { debounce } from 'lodash-es'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MoonLoader } from 'react-spinners'
import Button from '../button'
import Input from '../input'
import SelectArrow from './icons/SelectArrow'

interface PromotionClaimFormProps {
	data: TPromotionData
	onCancel: () => void
	onSubmit: (lockedAmount: number) => void
}

const PromotionClaimForm: FC<PromotionClaimFormProps> = ({
	data,
	onSubmit,
	onCancel,
}) => {
	const { promotionType } = data
	const { t } = useClientTranslation()
	const { currencyId } = useAuthStore().userInfo
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { formState, register, trigger, handleSubmit } = useForm<{
		amount: string
	}>()

	const debounceTrigger = debounce(trigger, 200)

	const min = numberFormat(data.requiredAmount, currencyId)
	const max = numberFormat(data.maxAmount, currencyId)

	const onFormSubmit = async (data: { amount: string }) => {
		const revertedAmount = Number(revertNumberFormat(data.amount, currencyId))

		setIsSubmitting(true)
		await onSubmit(revertedAmount)
		setIsSubmitting(false)
	}

	return (
		<form
			onSubmit={handleSubmit(onFormSubmit)}
			className='flex h-full flex-col items-center justify-center'
		>
			{/* 如果 'promotionType' 為 'FirstDeposit' 則需提供 Input 給使用者填寫金額 */}
			{promotionType === PromotionType.FirstDeposit && (
				<>
					<div className='mb-4'>{t('Label_Promotion_EnterPreferAmount')}</div>
					<Input
						type='number'
						register={register('amount', {
							required: {
								value: true,
								message: t('Label_General_AmountLessThan', { value1: min }),
							},
							min: {
								// * 只拿整數
								value: replaceStringToNumber(min ?? ''),
								message: t('Label_General_AmountLessThan', { value1: min }),
							},
							max: {
								// * 只拿整數
								value: replaceStringToNumber(max ?? ''),
								message: t('Label_General_NotInLimit'),
							},
							onChange: () => debounceTrigger('amount'),
						})}
						dirty={!!formState.dirtyFields['amount']}
						error={!!formState.errors['amount']}
						errorMessage={formState.errors['amount']?.message}
					/>

					<div>
						{t('Label_Promotion_ClaimAmountRange')}: {`${min} ~ ${max}`}
					</div>
				</>
			)}

			{/* 如果 'promotionType' 為 'Redeposit' 則提供 距級 的 Dropdown 提供選擇 */}
			{(promotionType === PromotionType.Redeposit ||
				promotionType === PromotionType.MissionBonus) && (
				<>
					<div className='mb-4'>{t('Label_Promotion_SelectPreferAmount')}</div>
					{data.canJoinTierAmountList?.length ? (
						<label className='relative inline'>
							<SelectArrow className='pointer-events-none absolute right-3 h-full' />
							<select
								{...register('amount')}
								className='appearance-none rounded-lg border-none bg-white py-3 pl-4 pr-8 text-[12px] text-black'
							>
								{data.canJoinTierAmountList.map((item, index) => {
									const formattedTierLabel = item.requiredAmount
										? `${t('Label_General_DepositAmount')} ${numFormatToDigits(item.requiredAmount, 0)}`
										: `${t('Label_General_Turnover')} ${numFormatToDigits(item.requiredTurnover, 0)}`

									const formattedBonusAmount = `${numFormatToDigits(
										item.bonusAmount,
										0,
									)}`

									return (
										<option
											key={index}
											value={
												promotionType === PromotionType.MissionBonus
													? item.bonusAmount
													: item.lockedAmount
											}
										>
											{`${formattedTierLabel} / ${t('Label_General_BonusAmount')} ${formattedBonusAmount}`}
										</option>
									)
								})}
							</select>
						</label>
					) : null}
				</>
			)}

			<footer className='mt-4 flex w-full items-stretch justify-center gap-4 max-lg:flex-col'>
				<Button
					className='lg:order-last'
					htmlType='submit'
					size='md'
					isDisabled={isSubmitting}
				>
					{isSubmitting ? (
						<MoonLoader size={16} className='bg-transparent' />
					) : (
						t('Label_Promotion_JoinNow')
					)}
				</Button>
				<Button size='md' type='cancel' onClick={onCancel}>
					{t('Label_General_Cancel')}
				</Button>
			</footer>
		</form>
	)
}

export default PromotionClaimForm
