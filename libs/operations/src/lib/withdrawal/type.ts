import {
	TBankInfoData,
	TEWalletData,
	TUSDTDetailData,
	TWithdrawalAvailableBalanceData,
} from 'JF-api/account/type'
import {
	KycStatusEnum,
	TWithdrawalLimitData,
	TWithdrawalSetting,
} from 'JF-api/payment/type'

export interface IWithdrawalStoreState {
	// 紀錄已選擇的卡片，若有 App 邏輯需要指定則可直接在 UI 層 set 指定
	selectedBankItem: TBankInfoData | undefined
}

export interface IWithdrawalStoreAction {
	// set 選擇的 bankItem
	setSelectedBankItem: (item: TBankInfoData) => void
}

export interface IWithdrawalInfoData {
	isLoading: boolean
	accountName: string
	kycStatus: KycStatusEnum
	withdrawalBalance: TWithdrawalAvailableBalanceData | undefined
	withdrawalLimit: TWithdrawalLimitData | undefined
	withdrawalBlockSetting: TWithdrawalSetting[]
	bankData: {
		custEWalletInfo: TEWalletData[]
		bankInfoDetail: TBankInfoData[]
		usdtDetail: TUSDTDetailData[]
	}
}

export interface IWithdrawalSetting {
	currencyId: number
	status: boolean
	type: number
}

export enum IWithdrawalTypeEnum {
	BankCard = 1,
	EWallet = 3,
	Crypto = 4,
}
