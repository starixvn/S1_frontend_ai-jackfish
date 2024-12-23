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

export interface ICustTpBetRecordListbyCategoryIdData {
	settledDate: string
	gameTypeName: string
	gameTypeID: number
	turnOver: number
	validBet: number
	winlostAmount: number
}

export interface ICustTpBetRecordListbyCategoryIdArgs {
	selDate: string
	categoryId: number
	pageNumber: number
	pageSize: number
}

export interface ICustTpBetRecordDetailListbyGameTypeData {
	transId: string
	bonusId: number
	bonusCode: null | string
	turnOver: number
	validBet: number
	winlostAmount: number
	transTime: string
	settledTime: string
}

export interface ICustTpBetRecordDetailListbyGameTypeArgs {
	selDate: string
	gameTypeID: number
	pageNumber: number
	pageSize: number
}

export interface ICustTpBetRecordListDateRangeData {
	settledDate: string
	turnOver: number
	validBet: number
	winlostAmount: number
}

export interface ICustTpBetRecordListDateRangeArgs {
	startDate: string
	endDate: string
	pageNumber: number
	pageSize: number
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
export interface IPayInfoListAllData {
	BankTransfer: IBankTransfer
	OnlineBanking: IOnlineBanking
	QuickTransfer: IQuickTransfer
	AutoChannel: IAutoChannel
	ChatTransfer: IChatTransfer
	LinePay: ILinePay
	EWallet: IEWallet
	TopUpCard: ITopUpCard
	Crypto: ICrypto
	QRPay: IQrPay
}

export interface IBankTransfer {
	data: Array<BankTransferData>
}

export interface BankTransferData {
	canSubmit: boolean
	depositType: number
	bankAccountInfo: BankAccountInfo
	sysId: number
	bankName: string
	bankCode: string
	bankLogo: string
	minAmount: number
	maxAmount: number
}

export interface BankAccountInfo {
	bankId: number
	accountName: string
	accountNo: string
	qrCodeUrl: string
	code: string
}

export type TSupportBanks = {
	sysId: number
	bankName: string
	bankCode: string
	bankLogo: string
	minAmount: number
	maxAmount: number
}

export interface OnlineBankingData {
	selectBank: boolean
	supportBanks: Array<TSupportBanks>
	payId: number
	payName: string
	groupId: number
	groupName: string
	displayGroupName: string
	channelId: number
	channelName: string
	displayChannelName: string
	mode: number
	extraDataType: number
	minAmount: number
	maxAmount: number
	amountRule: number
	amountList: number[]
	depositType: number
}

export interface IOnlineBanking {
	data: Array<OnlineBankingData>
}

export interface IQuickTransfer {
	data: null
}

export interface IAutoChannel {
	data: null
}

export interface IChatTransfer {
	data: null
}
export interface ILinePay {
	data: { link: null }
}

export interface EWalletData {
	groupId: number
	groupName: string
	displayGroupName: string
	minAmount: number
	maxAmount: number
	supportChannels: SupportChannel[]
}

export interface IEWallet {
	data: Array<EWalletData>
}

export interface SupportChannel {
	payId: number
	payName: string
	groupId: number
	groupName: string
	displayGroupName: string
	channelId: number
	channelName: string
	displayChannelName: string
	mode: number
	extraDataType: number
	minAmount: number
	maxAmount: number
	amountRule: number
	amountList?: number[]
	depositType: number
}

export interface ITopUpCard {
	data: null
}

export type ICryptoData = {
	groupId: number
	groupName: string
	displayGroupName: string
	minAmount: number
	maxAmount: number
	supportChannels: ICryptoSupportChannel[]
}

export interface ICrypto {
	data: Array<ICryptoData>
}

export interface ICryptoSupportChannel {
	payId: number
	payName: string
	groupId: number
	groupName: string
	displayGroupName: string
	channelId: number
	channelName: string
	displayChannelName: string
	mode: number
	extraDataType: number
	minAmount: number
	maxAmount: number
	amountRule: number
	amountList: number[]
	depositType: number
}

export interface IQrPay {
	data: null
}

export interface IDepositBankTransferReqData {
	bankName: string
	bankLogo: string
	bankSite: string
	accountNo: string
	accountName: string
	ifscCode: string
	transId: string
	postScript: string
	minAmount: number
	maxAmount: number
}

export interface IPostDepositBankTransferReqArgs {
	amount: number
	sysId?: number
	fromChannel?: number
	fromSysId?: number
	hasPromotion: boolean
	bankId?: number
	code?: string | null
}

export interface IUploadReceiptArgs {
	receipt: string
	transId: string
}

export interface IDepositInfoRecentData {
	createTime: string
	depositType: number
	transId: string
	amount: number
	status: number
	depositRep: {
		ver: number
		sysId: number
		accountName: string
		accountNo: string
		ifscCode: string
		currencyId: number
		isLocalPay: boolean
		groupId: number
		code: null | string
	}
	bankInfo: {
		sysId: number
		currencyId: number
		bankCode: string
		bankName: string
		bankLogo: string
		bankSite: string
		status: number
	}
	thirdId: null | string
	refId: null | string
	depositTime: null
	depositReceipt: [
		{
			depositId: number
			picFileName: string
			receiptNo: number
			depositPic: string
		},
	]
	depositMessage: null | string
	depositMessageDetail: {
		errorTypeName: string
		message: string
		createTime: string
	}[]
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

export interface ICustTpBetRecordListDateRangeData {
	settledDate: string
	turnOver: number
	validBet: number
	winlostAmount: number
}

export interface ICustTpBetRecordListOneDayArgs {
	selDate: string
	pageNumber: number
	pageSize: number
}

export interface ICustTpBetRecordListOneDayData {
	settledDate: string
	categoryName: string
	categoryId: number
	turnOver: number
	validBet: number
	winlostAmount: number
}

export interface ICustTpBetRecordListbyCategoryIdData {
	settledDate: string
	gameTypeName: string
	gameTypeID: number
	turnOver: number
	validBet: number
	winlostAmount: number
}

export interface ICustTpBetRecordDetailListbyGameTypeData {
	transId: string
	bonusId: number
	bonusCode: null | string
	turnOver: number
	validBet: number
	winlostAmount: number
	transTime: string
	settledTime: string
}
