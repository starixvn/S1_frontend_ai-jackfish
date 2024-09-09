export enum KycStatusEnum {
	Normal,
	KycUpload,
	KycProcessing,
}

export interface IGetBankInfoSysListByCurrencyIdArgs {
	currencyId: number
	langId: string
}

export type TBankInfoSysData = {
	sysId: number
	currencyId: number
	bankCode: string
	bankName: string
	bankLogo: string
	bankSite: string
	status: number
	transId: string
	withdrawalMessage: string
	withdrawalMessageDetail: TWithdrawalMessageData[]
}

export enum WithdrawalStatusEnum {
	Pending = 1,
	OnHold,
	Verify,
	Process,
	Cancelled,
	Approved,
	Rejected,
	ToKyc,
}

export type TUSDTData = {
	currencyId: number
	currencyName: string
	maxTimes: number
	network: string
	unlimited: boolean
	withdrawalAvailableAmount: number
	withdrawalMin: number
	withdrawalTimes: number
}
export type TWithdrawalLimitData = {
	eWalletStatus: number
	eWalletUnlimited: boolean
	eWalletWithdrawalAvailableAmount: number
	eWalletWithdrawalMin: number
	maxTimes: number
	totalWithdrawalMax: number
	unlimited: boolean
	withdrawalAvailableAmount: number
	withdrawalMin: number
	withdrawalTimes: number
	usdtList: TUSDTData[]
}

export enum WithdrawalTypeEnum {
	BankCard = 1,
	EWallet = 3,
	Crypto = 4,
}

export type TWithdrawalSetting = {
	currencyId: number
	status: boolean
	type: number
}

export interface ISubmitWithdrawalArgs {
	accountNo: string
	amount: number
	sysId: number
	memo?: string
	blackbox?: string
	ifscCode?: string
}

export type TWithdrawalMessageData = {
	createTime: string
	errorTypeName: string
	message: string
}

export type TWithdrawalRecentInfoData = {
	amount: number
	canCancel: boolean
	chargeFee: number
	createTime: string
	memo: string
	status: WithdrawalStatusEnum
	transId: string
	withdrawalMessage: string
	withdrawalMessageDetail: TWithdrawalMessageData[]
}

export type TStatementData = {
	type: string
	changeAmount: number
	beforeAmount: number
	afterAmount: number
	refTransId: string
	createTime: string
	createTimeOffset: string
	direction: number
	typeName: string
	custTimeZone: string
}
