'use client'

import ModuleWrapper from '@brand01/src/components/deposit/module/moudle-wrapper'
import Input from '@brand01/src/components/input'
import Select from '@brand01/src/components/select'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { useDepositPromotionList } from 'JF-api/promotion/client'
import { isConvert, useGetPathname } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { useFormContext } from 'react-hook-form'

export default function DepositChooseAvailablePromotion() {
	const { locale } = useGetPathname()
	const {
		userInfo: { langId, currencyId },
	} = useAuthStore()
	const {
		register,
		setValue,
		formState: { dirtyFields, errors },
	} = useFormContext()
	const { t } = useClientTranslation(locale)

	const { depositPromotionList = [] } = useDepositPromotionList({ langId })

	const selectOptions = depositPromotionList.map(depositPromotion => ({
		label: depositPromotion.title,
		value: depositPromotion.bonusCode,
	}))

	return (
		<ModuleWrapper>
			<div className='mb-3 text-center text-sm font-medium'>
				{t('Label_Deposit_ChooseAvailablePromotion')}
			</div>

			<div className='grid grid-flow-col items-baseline space-x-2 space-y-4'>
				<Select
					className='col-span-4'
					selectId='deposit-promotion'
					options={selectOptions}
					register={register('bonusCode')}
					onChange={() => {
						setValue('promoCode', undefined)
					}}
				/>

				<Input
					className='col-span-3'
					register={register('promoCode')}
					format={isConvert(currencyId || 4)}
					placeholder={t('Label_Promotions_PromoCode') || ''}
					dirty={!!dirtyFields['promoCode']}
					errorMessage={errors['promoCode']?.message as string}
					error={!!errors['promoCode']}
					onChange={() => {
						setValue('bonusCode', undefined)
					}}
				/>
			</div>
		</ModuleWrapper>
	)
}
