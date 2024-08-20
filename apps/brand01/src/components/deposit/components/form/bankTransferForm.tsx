'use client'

import Button from '@brand01/src/components/button'
import { useImageFile } from '@brand01/src/components/deposit/hook/useImageFile'
import DepositAmount from '@brand01/src/components/deposit/module/deposit-amount'
import DepositChooseAvailablePromotion from '@brand01/src/components/deposit/module/deposit-choose-available-promotion'
import DepositProcessImage from '@brand01/src/components/deposit/module/deposit-process-image'
import DepositSelectBankModule from '@brand01/src/components/deposit/module/deposit-select-bank-module'
import DepositSelectedBankAccount from '@brand01/src/components/deposit/module/deposit-selected-bank-account'
import DepositSelectedBankAmountModule from '@brand01/src/components/deposit/module/deposit-selected-bank-amount-module'
import DepositSubmitBankSlip from '@brand01/src/components/deposit/module/deposit-submit-bank-slip'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { zodResolver } from '@hookform/resolvers/zod'
import type { IBankTransfer } from 'JF-api/payment/type'
import { CurrenciesEnum, DEPOSIT_PAYMENT_TYPE } from 'JF-constants'
import { scrollToTop, useGetPathname } from 'JF-core'
import { useAuthStore, useDepositStore } from 'JF-operations'
import { head } from 'lodash-es'
import {
	parseAsInteger,
	parseAsString,
	useQueryStates,
} from 'next-usequerystate'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { baseDepositFormSchema } from '../../schema'

type BankTransferFromProps = {
	payments: IBankTransfer
}

export default function BankTransferFrom({ payments }: BankTransferFromProps) {
	if (!payments) return

	const { locale } = useGetPathname()
	const { onSubmitBankTransfer, isLoading } = useDepositStore()
	const searchParams = useSearchParams()
	const { t } = useClientTranslation(locale)
	const {
		userInfo: { currencyId = CurrenciesEnum.THB, langId },
	} = useAuthStore()
	const { errorMessage, imageFile, setImageFile, onImageFileChange } =
		useImageFile()
	const [, setPaymentQuery] = useQueryStates({
		paymentType: parseAsString.withDefault(DEPOSIT_PAYMENT_TYPE.BankTransfer),
		sysId: parseAsInteger,
	})

	const sysIdParam = searchParams.get('sysId')
	const selectedPayment = payments.data.find(payment => {
		return payment.sysId === Number(searchParams.get('sysId'))
	})

	const {
		minAmount = 0,
		maxAmount = 0,
		bankAccountInfo,
		canSubmit,
	} = selectedPayment || {}

	const bankTransferFormSchema = baseDepositFormSchema({
		minAmount,
		maxAmount,
		currencyId,
		t,
	})

	const formMethods = useForm<z.infer<typeof bankTransferFormSchema>>({
		defaultValues: {
			amount: undefined,
			bonusCode: undefined,
			promoCode: undefined,
		},
		resolver: zodResolver(bankTransferFormSchema),
		mode: 'onChange',
	})

	const {
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = formMethods

	const handelSubmitBankTransfer = async ({
		amount,
		bonusCode: originBonusCode,
		promoCode,
	}: z.infer<typeof bankTransferFormSchema>) => {
		try {
			await onSubmitBankTransfer(
				amount,
				originBonusCode,
				promoCode,
				imageFile,
				setImageFile,
				currencyId,
				sysIdParam,
				bankAccountInfo,
				langId,
				t,
			)
			scrollToTop()
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	useEffect(() => {
		setPaymentQuery(paymentQuery => ({
			...paymentQuery,
			paymentType: DEPOSIT_PAYMENT_TYPE.BankTransfer,
			sysId: head(payments.data)?.sysId,
		}))
	}, [])

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={handleSubmit(handelSubmitBankTransfer)}>
				<DepositSelectBankModule payments={payments} />

				<DepositSelectedBankAmountModule
					minAmount={minAmount}
					maxAmount={maxAmount}
				/>

				<DepositSelectedBankAccount
					selectedPayment={selectedPayment}
					locale={locale}
				/>

				{canSubmit && (
					<>
						<DepositAmount
							minAmount={minAmount}
							maxAmount={maxAmount}
							isShowShortcutList
						/>
						<DepositSubmitBankSlip
							locale={locale}
							imageFile={imageFile}
							setImageFile={setImageFile}
							onImageFileChange={onImageFileChange}
							errorMessage={errorMessage}
						/>
						<DepositChooseAvailablePromotion />
					</>
				)}

				{canSubmit ? (
					<Button
						htmlType='submit'
						type='secondary'
						className=' mb-10 h-12 w-full'
						loading={isLoading}
						// 有上傳收據 => 驗證有通過 => 防連點
						isDisabled={!imageFile || !isValid || isSubmitting}
					>
						{t('Label_General_Submit')}
					</Button>
				) : (
					<>
						<Button type='cancel' className=' mb-10 h-12 w-full' isDisabled>
							{t('Label_General_Pending')}
						</Button>
						<DepositProcessImage />
					</>
				)}
			</form>
		</FormProvider>
	)
}
