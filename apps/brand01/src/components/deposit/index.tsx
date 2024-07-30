'use client'

import {
	BankTransferFrom,
	CryptoPayForm,
	MobilePayForm,
	OnlineBankingForm,
} from '@brand01/src/components/deposit/components/form'
import MaxWidthWrapper from '@brand01/src/components/deposit/maxWidthWrapper'
import DepositOptionModule from '@brand01/src/components/deposit/module/deposit-option-module'
import Loading from '@brand01/src/components/loading'
import { useClientTranslation } from '@brand01/src/i18n/client'
import type {
	IBankTransfer,
	ICrypto,
	IEWallet,
	IOnlineBanking,
} from 'JF-api/payment/type'
import { DEPOSIT_PAYMENT_TYPE, type DepositPaymentType } from 'JF-constants'
import { useGetPathname } from 'JF-core'
import { useDepositStore } from 'JF-operations'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const defaultPayment = DEPOSIT_PAYMENT_TYPE.BankTransfer

export default function depositPage() {
	const { locale } = useGetPathname()
	const searchParams = useSearchParams()

	const { t } = useClientTranslation(locale)
	const { isInit, payInfoListAll, fetchPayInfoListAll, paymentOptions } =
		useDepositStore()

	const payments =
		payInfoListAll &&
		payInfoListAll[
			(searchParams.get('paymentType') as DepositPaymentType) || defaultPayment
		]

	if (payments === undefined) return

	const switchPayment = () => {
		switch (searchParams.get('paymentType')) {
			case DEPOSIT_PAYMENT_TYPE.BankTransfer:
				return <BankTransferFrom payments={payments as IBankTransfer} />
			case DEPOSIT_PAYMENT_TYPE.OnlineBanking:
				return <OnlineBankingForm payments={payments as IOnlineBanking} />
			case DEPOSIT_PAYMENT_TYPE.EWallet:
				return <MobilePayForm payments={payments as IEWallet} />
			case DEPOSIT_PAYMENT_TYPE.Crypto:
				return <CryptoPayForm payments={payments as ICrypto} />
			default:
				return <BankTransferFrom payments={payments as IBankTransfer} />
		}
	}

	useEffect(() => {
		fetchPayInfoListAll()
	}, [fetchPayInfoListAll])

	if (!isInit)
		return (
			<div className='h-3/4  py-6 px-8 lg:px-72'>
				<Loading className='bg-tertiary-500 rounded-2xl' />
			</div>
		)

	return (
		<MaxWidthWrapper
			title={t('Label_Deposit')}
			description={t('Label_Deposit_SubTitle')}
		>
			<DepositOptionModule paymentOptions={paymentOptions} />

			{switchPayment()}
		</MaxWidthWrapper>
	)
}
