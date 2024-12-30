export interface ITpWalletInfoData {
	tpId: number
	balance: number
	bonus: number
	walletStatus: number
	// tpName 為 前端自行 mapping 進來的值
	tpName?: string
}

export interface IWalletInfoData {
	balance: number
	isHideBalance: boolean
	lastLoginTime: string
	lastTransaction: string
	tpWallets: ITpWalletInfoData[]
	bonusWallets: ICustBonusWalletData[]
}

export interface ISetLangArgs {
	langId: string
	currencyId: number
}

export type TWithdrawalAvailableBalanceData = {
	availableBalance: number
	balance: number
	deduction: number
}

export type TBankInfoData = {
	accountNo: string
	bankLogo: string
	bankName: string
	bankSite: string
	disabled: boolean
	ifscCode: string
	sysId: number
}

export type TUSDTDetailData = {
	currencyId: number
	currencyName: string
	disabled: boolean
	network: string
	nickName: string
	usdtAddress: string
}

export type TCustBankInfoData = {
	accountName: string
	defAccountNo: number
	bankInfoDetail: TBankInfoData[]
	uSDTDetail: TUSDTDetailData[]
}

export type TEWalletData = {
	accountNo: string
	eWalletLogo: string
	eWalletName: string
	eWalletSite: string
	sysId: number
}

export type TReferralSummaryData = {
	amountCount: number
	amountSum: number
	conditionCount: number
	hasReferral: boolean
	referralCount: number
}

export type TReferralSettingDetailData = {
	referralReward: number
	invitationLimit: number
	agentValidBet: number
	agentDeposit: number
	memberReward: number
	vaildBet: number
	deposit: number
	periodDays: number
	depositRewardPercentage: number
	minPayout: number
	maxPayout: number
	referralContent: {
		langId: string
		bannerUrl: null | string
		title: null | string
		description: null | string
		detail: null | string
		type: number
	}
}

export interface ISetChangePasswordArgs {
	oldPassword: string
	newPassword: string
}

export interface IMainWalletInfoData {
	balance: number
	lastLoginTime: string
	lastTransaction: string
	isHideBalance: boolean
}

export enum CustBonusWalletStatusEnum {
	Initial = 0,
	Running,
	Canceled,
	Expiry,
	Fulfill,
}

export enum CustBonusWalletFullFillTypeEnum {
	RollOver = 1,
	WinOver,
}
export interface ICustBonusWalletData {
	bonusId: number
	bonus: number
	rollover: number
	turnover: number
	promoCategoryId: number
	tpId: number
	expiryTime: string
	status: CustBonusWalletStatusEnum
	fullFillType: CustBonusWalletFullFillTypeEnum
}

export enum TpWalletListTypeEnum {
	All,
	Transferred,
}
export interface ITpWalletData {
	tpId: number
	tpName: string
	displayKey: string
	description: string
	walletMode: number
}

export interface ITpWalletInfoData {
	tpId: number
	balance: number
	bonus: number
	walletStatus: number
	// tpName 為 前端自行 mapping 進來的值
	tpName?: string
}

export interface TCustVIPProgress {
	currentVipLevel: number
	upDeposit: null | number
	actualDeposit: number
	downDeposit: null | number
	downTurnover: null | number
	upTurnover: null | number
	turnoverSummary: null | number
}
