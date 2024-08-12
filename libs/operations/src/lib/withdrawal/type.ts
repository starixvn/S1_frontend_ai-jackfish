import {
	TBankInfoData,
	TEWalletData,
	TUSDTDetailData,
	TWithdrawalAvailableBalanceData,
} from 'JF-api/account/type'
import {
	KycStatusEnum,
	TWithdrawalLimitData,
	TWithdrawalRecentInfoData,
	TWithdrawalSetting,
} from 'JF-api/payment/type'

export interface IWithdrawalState {
	// 是否在 loading
	isLoading: boolean
	// 是否初始化完成，因需要精準控制初始化的 loading UI
	isInit: boolean
	accountName: string
	// 是否有進行中的提款單 , undefined 則為無進行中提款單
	kycStatus: KycStatusEnum
	runningWithdrawalRequest: TWithdrawalRecentInfoData | undefined
	// 這樣寫是為了表示 api response 本身存在 undefined 而非此資料為 optional
	withdrawalLimit: TWithdrawalLimitData | undefined
	withdrawalBalance: TWithdrawalAvailableBalanceData | undefined
	withdrawalBlockSetting: TWithdrawalSetting[]
	bankData: {
		custEWalletInfo: TEWalletData[]
		bankInfoDetail: TBankInfoData[]
		usdtDetail: TUSDTDetailData[]
	}
}

export interface IWithdrawalAction {
	// 獲取初始化資料
	fetchWithdrawalInfo: () => Promise<void>
	submitWithdrawalRequest: ({
		amount,
		currencyId,
	}: {
		amount: number
		currencyId: number
	}) => Promise<void>
	// 取消提款
	cancelWithdrawalRequest: ({ transId }: { transId: string }) => Promise<void>
}
