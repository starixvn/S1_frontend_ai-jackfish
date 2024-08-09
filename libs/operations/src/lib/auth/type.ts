import { IWalletInfoData } from 'JF-api/account/type'
import { IUserInfoData } from 'JF-api/accountStrict/type'

export interface IAuthState {
	isLogin: boolean | undefined
	isLoading: boolean
	userInfo: IUserInfoData
	walletInfo: IWalletInfoData
	isSetLanguage: boolean | number
}

export interface IAuthAction {
	setLogin: (loginStatus: boolean) => void
	onSignIn: (userName: string, password: string) => Promise<void>
	onSignOut: () => Promise<void>
	getUserInfo: () => Promise<void>
	resetAuth: () => void
	getWalletInfo: () => void
	onSetLanguage: (
		langCode: string,
		currencyId: number,
		errorMsg: string,
	) => Promise<void>
}
