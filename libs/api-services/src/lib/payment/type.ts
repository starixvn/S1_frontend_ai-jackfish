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

export type TWithdrawalMessageData = {
	createTime: string
	errorTypeName: string
	message: string
}
