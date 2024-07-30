import Button from '@brand01/src/components/button'
import { BankInfo } from '@brand01/src/components/withdrawal/form/BankInfo'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { KycStatusEnum } from 'JF-api/payment/type'
import { CurrenciesEnum } from 'JF-constants'
import {
	cn,
	imageUrl,
	numberFormat,
	scrollToTop,
	useGetPathname,
} from 'JF-core'
import {
	useAuthStore,
	useSocialChannelStore,
	useWithdrawalStore,
} from 'JF-operations'
import { Trans } from 'react-i18next'
import { toast } from 'react-toastify'

export const ProcessingInfo = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const {
		userInfo: { currencyId = CurrenciesEnum.THB },
	} = useAuthStore()

	const {
		runningWithdrawalRequest,
		cancelWithdrawalRequest,
		kycStatus,
		isLoading,
	} = useWithdrawalStore()
	const { lineChannel } = useSocialChannelStore()

	const { transId, amount } = runningWithdrawalRequest ?? {}
	// kyc processing 跟 withdrawal processing 共用同一個 component , 用 status 判斷
	const isKycProcessing = kycStatus === KycStatusEnum.KycProcessing

	const onCancelClick = async () => {
		if (!transId) return
		try {
			await cancelWithdrawalRequest({ transId })
			// 取消之後會回出款頁面，須退回頂部否則 pageView 位置不對
			scrollToTop()
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	return (
		<div
			className={cn(
				'bg-tertiary-500 grid grid-flow-row  gap-6 rounded-2xl p-8 text-center',
			)}
		>
			<div className='grid gap-2 '>
				<img
					className='h-24 place-self-center '
					src={imageUrl('/img/icon/financial-transactions/icon-pendding.svg')}
					alt='processing'
				/>
				<h2 className='text-check-200 text text-2xl font-bold uppercase'>
					{t('Label_Withdrawal_Status1')}
				</h2>
			</div>
			{!isKycProcessing && (
				<>
					<div className='grid grid-flow-row gap-0.5'>
						<p className='text-xs text-neutral-300'>
							{t('Label_History_RefTransId')}
						</p>
						<p className='text-xl'>{transId}</p>
					</div>
					<BankInfo />
					<div className='grid grid-flow-row gap-0.5'>
						<p className='text-xs text-neutral-300'>
							{t('Label_Withdrawal_Amount')}
						</p>
						<div className='text-secondary-300 grid grid-flow-col place-content-center gap-2 text-xl font-bold'>
							<span>{t(`Label_Currency_${currencyId}`)}</span>
							<span>{amount && numberFormat(amount, currencyId)}</span>
						</div>
					</div>
				</>
			)}
			<div className='grid grid-flow-row gap-0.5 text-xs text-neutral-300'>
				{isKycProcessing ? (
					<p>{t('Label_Withdrawal_WaitKYCHint')}</p>
				) : (
					<p>{t('Label_Withdrawal_Processing_Hint')}</p>
				)}

				<p>
					<Trans
						i18nKey='Label_Withdrawal_Processing_ContactHint'
						components={{
							Link: <a className='text-check-200' href={lineChannel?.link} />,
						}}
					/>
				</p>
			</div>

			{!isKycProcessing && (
				<Button
					type='cancel'
					className='h-12 w-full'
					onClick={onCancelClick}
					loading={isLoading}
				>
					{t('Label_General_Cancel')}
				</Button>
			)}
		</div>
	)
}
