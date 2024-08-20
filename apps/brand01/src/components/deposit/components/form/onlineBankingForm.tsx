'use client'

import Button from '@brand01/src/components/button'
import DepositAmount from '@brand01/src/components/deposit/module/deposit-amount'
import DepositChooseAvailablePromotion from '@brand01/src/components/deposit/module/deposit-choose-available-promotion'
import DepositSelectedBankAmountModule from '@brand01/src/components/deposit/module/deposit-selected-bank-amount-module'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { zodResolver } from '@hookform/resolvers/zod'
import type { IOnlineBanking } from 'JF-api/payment/type'
import { CurrenciesEnum } from 'JF-constants'
import { scrollToTop, useGetPathname } from 'JF-core'
import { useAuthStore, useDepositStore } from 'JF-operations'
import { head } from 'lodash-es'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { baseDepositFormSchema } from '../../schema'

type OnlineBankingFormProps = {
	payments: IOnlineBanking
}

export default function OnlineBankingForm({
	payments,
}: OnlineBankingFormProps) {
	if (!payments) return

	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const {
		userInfo: { currencyId = CurrenciesEnum.THB, langId },
	} = useAuthStore()
	const { onSubmitOnlineBanking, isLoading } = useDepositStore()

	const firstPayment = head(payments?.data)
	const { minAmount = 0, maxAmount = 0, channelId } = firstPayment || {}
	const onlineBankingFormSchema = baseDepositFormSchema({
		minAmount,
		maxAmount,
		currencyId,
		t,
	})

	const formMethods = useForm<z.infer<typeof onlineBankingFormSchema>>({
		defaultValues: {
			amount: undefined,
			bonusCode: undefined,
			promoCode: undefined,
		},
		resolver: zodResolver(onlineBankingFormSchema),
		mode: 'onChange',
	})

	const {
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = formMethods

	const handelSubmitOnlineBanking = async ({
		amount,
		bonusCode: originBonusCode,
		promoCode,
	}: z.infer<typeof onlineBankingFormSchema>) => {
		try {
			await onSubmitOnlineBanking(
				amount,
				originBonusCode,
				promoCode,
				channelId,
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
			<form onSubmit={handleSubmit(handelSubmitOnlineBanking)}>
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
