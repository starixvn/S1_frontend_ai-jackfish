import { IWalletInfoData } from 'JF-api/account/type'
import { TUserInfoData } from 'JF-api/accountStrict/type'

export interface IAuthState {
	isLogin: boolean | undefined
	isLoading: boolean
	userInfo: TUserInfoData
	walletInfo: IWalletInfoData
}

export interface IAuthAction {
	setLogin: (loginStatus: boolean) => void
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
	getWalletInfo: () => void
}
