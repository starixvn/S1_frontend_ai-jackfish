export interface ITpWalletInfoData {
	tpId: number
	balance: number
	bonus: number
	walletStatus: number
	// tpName 為 前端自行 mapping 進來的值
	tpName?: string
}

export interface IBonusWallets {
	bonusId: number
	bonus: number
	rollover: number
	turnover: number
	fullFillType: number
	promoCategoryId: number
	tpId: number
	status: number
	expiryTime: string | null
}

export interface IWalletInfoData {
	balance: number
	isHideBalance: boolean
	lastLoginTime: string
	lastTransaction: string
	tpWallets: ITpWalletInfoData[]
	bonusWallets: IBonusWallets[]
}

export interface ISetLangArgs {
	langId: string
	currencyId: number
}
