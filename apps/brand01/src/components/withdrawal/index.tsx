import Loading from '@brand01/src/components/loading'
import { KycUpload } from '@brand01/src/components/withdrawal/kyc/KycUpload'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { KycStatusEnum } from 'JF-api/payment/type'
import { useGetPathname } from 'JF-core'
import { useWithdrawalStore } from 'JF-operations'
import { useCallback, useEffect } from 'react'
import { BalanceInfo } from './BalanceInfo'
import { ProcessingInfo } from './ProcessingInfo'
import { WithdrawalForm } from './form/WithdrawalForm'

const Withdrawal = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	const { fetchWithdrawalInfo, isInit, runningWithdrawalRequest, kycStatus } =
		useWithdrawalStore()

	const withdrawalContent = useCallback(() => {
		// kyc upload 的觸發權重最高
		if (kycStatus === KycStatusEnum.KycUpload) return <KycUpload />

		// 提款 or kyc 進行中
		if (runningWithdrawalRequest || kycStatus === KycStatusEnum.KycProcessing)
			return <ProcessingInfo />

		// 尋常提款頁面
		return (
			<>
				{/*可提款餘額區塊*/}
				<BalanceInfo />
				{/*銀行與建單區塊*/}
				<WithdrawalForm />
			</>
		)
	}, [runningWithdrawalRequest, kycStatus])

	useEffect(() => {
		fetchWithdrawalInfo()
	}, [fetchWithdrawalInfo])

	if (!isInit) return <Loading className='h-[80vh] bg-transparent' />

	return (
		<div className='grid min-h-full grid-flow-row content-start gap-5 py-6 px-8 lg:px-[8rem] xl:px-[14rem]'>
			<h2 className='text-center text-xl '>{t('Label_General_Withdrawal')}</h2>
			{withdrawalContent()}
		</div>
	)
}

export default Withdrawal
