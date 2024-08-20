'use client'

import Button from '@brand01/src/components/button'
import DepositAmount from '@brand01/src/components/deposit/module/deposit-amount'
import DepositChooseAvailablePromotion from '@brand01/src/components/deposit/module/deposit-choose-available-promotion'
import DepositSelectedBankAmountModule from '@brand01/src/components/deposit/module/deposit-selected-bank-amount-module'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ICrypto } from 'JF-api/payment/type'
import { CurrenciesEnum } from 'JF-constants'
import { scrollToTop, useGetPathname } from 'JF-core'
import { useAuthStore, useDepositStore } from 'JF-operations'
import { head } from 'lodash-es'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { baseDepositFormSchema } from '../../schema'

type CryptoPayFormProps = {
	payments: ICrypto
}

export default function CryptoPayForm({ payments }: CryptoPayFormProps) {
	if (!payments) return

	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const {
		userInfo: { currencyId = CurrenciesEnum.THB, langId },
	} = useAuthStore()
	const { onSubmitCryptoPay, isLoading } = useDepositStore()

	const firstPayment = head(payments?.data)
	const {
		minAmount = 0,
		maxAmount = 0,
		supportChannels = [],
	} = firstPayment || {}
	const firstChannelId = head(supportChannels)?.channelId

	const cryptoPaySchema = baseDepositFormSchema({
		minAmount,
		maxAmount,
		currencyId,
		t,
	})

	const formMethods = useForm<z.infer<typeof cryptoPaySchema>>({
		defaultValues: {
			amount: undefined,
			bonusCode: undefined,
			promoCode: undefined,
		},
		resolver: zodResolver(cryptoPaySchema),
		mode: 'onChange',
	})

	const {
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = formMethods

	const handelSubmitCryptoPay = async ({
		amount,
		bonusCode: originBonusCode,
		promoCode,
	}: z.infer<typeof cryptoPaySchema>) => {
		try {
			await onSubmitCryptoPay(
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
			<form onSubmit={handleSubmit(handelSubmitCryptoPay)}>
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
