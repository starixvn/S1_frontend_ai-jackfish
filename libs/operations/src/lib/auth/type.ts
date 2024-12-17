import { TUserInfoData } from 'JF-api/accountStrict/type'

export interface IAuthState {
	isLogin: boolean | undefined
	isLoading: boolean
	userInfo: TUserInfoData
	wallet: {
		mainWallet?: string
		bonusWallet?: string
		totalWallet?: string
		rollover: number
		turnover: number
		promoCategoryId: number // 用來判斷使用者獲得的bonus是哪類型的Live casino, saba......
	}
}

export interface IAuthAction {
	setUserInfo: (newUserInfo: TUserInfoData) => void
	onSignInPhone: ({
		areaCode,
		phoneNo,
		password,
	}: {
		areaCode: string
		phoneNo: string
		password: string
	}) => Promise<{ langId: string } | undefined>
	onSignOut: () => Promise<void>
	getUserInfo: () => Promise<void>
	resetAuth: () => void
	getWalletInfo: () => Promise<void>
	getNobleWalletInfo: () => Promise<void>
}
