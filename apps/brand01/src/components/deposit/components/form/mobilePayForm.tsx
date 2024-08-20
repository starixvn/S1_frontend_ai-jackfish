'use client'

import Button from '@brand01/src/components/button'
import DepositAmount from '@brand01/src/components/deposit/module/deposit-amount'
import DepositChooseAvailablePromotion from '@brand01/src/components/deposit/module/deposit-choose-available-promotion'
import DepositSelectedBankAmountModule from '@brand01/src/components/deposit/module/deposit-selected-bank-amount-module'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { zodResolver } from '@hookform/resolvers/zod'
import type { IEWallet } from 'JF-api/payment/type'
import { CurrenciesEnum } from 'JF-constants'
import { scrollToTop, useGetPathname } from 'JF-core'
import { useAuthStore, useDepositStore } from 'JF-operations'
import { find, head } from 'lodash-es'
import { useSearchParams } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { baseDepositFormSchema } from '../../schema'

type MobilePayFormProps = {
	payments: IEWallet
}

export default function MobilePayForm({ payments }: MobilePayFormProps) {
	if (!payments) return
	const searchParams = useSearchParams()

	const selectedPayment = find(payments?.data, {
		groupId: Number(searchParams.get('groupId')),
	})

	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const {
		userInfo: { currencyId = CurrenciesEnum.THB, langId },
	} = useAuthStore()
	const {
		minAmount = 0,
		maxAmount = 0,
		supportChannels = [],
	} = selectedPayment || {}
	const firstChannelId = head(supportChannels)?.channelId
	const { onSubmitMobilePay, isLoading } = useDepositStore()

	const mobilePayFormSchema = baseDepositFormSchema({
		minAmount,
		maxAmount,
		currencyId,
		t,
	})

	const formMethods = useForm<z.infer<typeof mobilePayFormSchema>>({
		defaultValues: {
			amount: undefined,
			bonusCode: undefined,
			promoCode: undefined,
		},
		resolver: zodResolver(mobilePayFormSchema),
		mode: 'onChange',
	})

	const {
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = formMethods

	const handelSubmitMobilePay = async ({
		amount,
		bonusCode: originBonusCode,
		promoCode,
	}: z.infer<typeof mobilePayFormSchema>) => {
		try {
			await onSubmitMobilePay(
				amount,
				originBonusCode,
				promoCode,
				firstChannelId,
				currencyId,
				langId,
				t,
			)
			scrollToTop()
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={handleSubmit(handelSubmitMobilePay)}>
				<DepositSelectedBankAmountModule
					minAmount={minAmount}
					maxAmount={maxAmount}
				/>

				<DepositAmount minAmount={minAmount} maxAmount={maxAmount} />

				<DepositChooseAvailablePromotion />

				<Button
					htmlType='submit'
					type='secondary'
					className=' mb-10 h-12 w-full'
					loading={isLoading}
					// 驗證有通過 => 防連點
					isDisabled={!isValid || isSubmitting}
				>
					{t('Label_General_Submit')}
				</Button>
			</form>
		</FormProvider>
	)
}
