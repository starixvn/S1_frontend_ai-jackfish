'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import type { BankTransferData } from 'JF-api/payment/type'
import { useCopyToClipboard } from 'usehooks-ts'
import ModuleWrapper from './moudle-wrapper'

export default function DepositSelectedBankAccount({
	selectedPayment,
	locale,
}: {
	selectedPayment?: BankTransferData
	locale: string
}) {
	if (!selectedPayment) return
	if (!selectedPayment.bankAccountInfo) return

	const [, copy] = useCopyToClipboard()

	const { t } = useClientTranslation(locale)

	return (
		<ModuleWrapper>
			<div className='mb-3 text-center text-base font-medium'>
				{t('Bank Account')}
			</div>
			<div className='mb-3 text-center text-sm font-medium'>
				{t('Please transfer the amount to the account')}
			</div>

			<div className='grid grid-cols-1 justify-items-center gap-4 lg:grid-cols-6'>
				<div className='col-span-4 grid '>
					<div className='inline-grid grid-cols-3 gap-4 text-left'>
						<h6 className=' text-lg font-semibold '>
							{t('Label_General_BankName')}
						</h6>
						<p className='text-check-200'>{selectedPayment.bankName}</p>
						<button onClick={() => copy(selectedPayment.bankName)}>
							<img
								src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/icon/financial-transactions/icon-financial-link.svg`}
								alt='copy-pasty'
							/>
						</button>
					</div>
					<div className='inline-grid grid-cols-3 gap-4 text-left'>
						<h6 className='text-lg font-semibold '>
							{t('Label_General_AccountName')}
						</h6>
						<p className='text-check-200'>
							{selectedPayment.bankAccountInfo.accountName}
						</p>
						<button
							onClick={() => copy(selectedPayment.bankAccountInfo.accountName)}
						>
							<img
								src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/icon/financial-transactions/icon-financial-copy.svg`}
								alt='copy-pasty'
							/>
						</button>
					</div>
					<div className='inline-grid grid-cols-3 gap-4 text-left'>
						<h6 className='text-lg font-semibold'>
							{t('Label_General_BankName')}
						</h6>
						<p className='text-check-200'>
							{selectedPayment.bankAccountInfo.accountNo}
						</p>
						<button
							onClick={() => copy(selectedPayment.bankAccountInfo.accountNo)}
						>
							<img
								src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/icon/financial-transactions/icon-financial-copy.svg`}
								alt='copy-pasty'
							/>
						</button>
					</div>
					<div className='inline-grid grid-cols-3 gap-4 text-left'>
						<h6 className='text-lg font-semibold'>
							{t('Label_General_Remark')}
						</h6>
						<p className='text-check-200'>
							{selectedPayment.bankAccountInfo.code}
						</p>
						<button onClick={() => copy(selectedPayment.bankAccountInfo.code)}>
							<img
								src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/icon/financial-transactions/icon-financial-copy.svg`}
								alt='copy-pasty'
							/>
						</button>
					</div>
				</div>
				{selectedPayment?.bankAccountInfo?.qrCodeUrl && (
					<div className='col-span-2 '>
						<img
							className='bg-primary-200 h-24 w-24 gap-0 rounded-lg object-cover'
							src={`${process.env.NEXT_PUBLIC_PAYMENT_HOST}${selectedPayment.bankAccountInfo.qrCodeUrl}`}
							alt='qr-code-url'
						/>
					</div>
				)}
			</div>
		</ModuleWrapper>
	)
}
