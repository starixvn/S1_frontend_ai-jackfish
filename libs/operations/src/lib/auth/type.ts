import { TUserInfoData } from 'JF-api/accountStrict/type'

export interface IAuthState {
	isLogin: boolean | undefined
	isLoading: boolean
	userInfo: TUserInfoData
	wallet: {
		mainWallet: number
		bonusWallet: number
		totalWallet: number
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
}
