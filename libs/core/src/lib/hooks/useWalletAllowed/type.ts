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
