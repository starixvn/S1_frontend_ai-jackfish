import Loading from '@brand01/src/components/loading'
import { KycUpload } from '@brand01/src/components/withdrawal/kyc/KycUpload'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { KycStatusEnum } from 'JF-api/payment/type'
import { useGetPathname } from 'JF-core'
import {
	useRunningRequest,
	useWithdrawalInfo,
	useWithdrawalStore,
} from 'JF-operations'
import { head } from 'lodash-es'
import { useCallback, useEffect } from 'react'
import { BalanceInfo } from './BalanceInfo'
import { ProcessingInfo } from './ProcessingInfo'
import { WithdrawalForm } from './form/WithdrawalForm'

const Withdrawal = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const {
		kycStatus,
		isLoading,
		bankData: { bankInfoDetail },
	} = useWithdrawalInfo()
	const runningWithdrawalRequest = useRunningRequest()
	const { setSelectedBankItem } = useWithdrawalStore()

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

	// 尋常邏輯可以選擇卡片，因為 brand01 固定顯示第一筆，所以在初始化時候就直接選好
	useEffect(() => {
		if (bankInfoDetail.length !== 0) {
			const bankItem = head(bankInfoDetail)
			if (bankItem) {
				setSelectedBankItem(bankItem)
			}
		}
	}, [isLoading, bankInfoDetail, setSelectedBankItem])

	if (isLoading) return <Loading className='h-[80vh] bg-transparent' />

	return (
		<div className='grid min-h-full grid-flow-row content-start gap-5 px-8 py-6 lg:px-[8rem] xl:px-[14rem]'>
			<h2 className='text-center text-xl '>{t('Label_General_Withdrawal')}</h2>
			{withdrawalContent()}
		</div>
	)
}

export default Withdrawal
