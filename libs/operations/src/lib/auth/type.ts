import { IUserInfoData } from 'JF-api'

export interface IAuthState {
	isLogin: boolean | undefined
	isLoading: boolean
	userInfo: IUserInfoData
}

export interface IAuthAction {
	onSignIn: (userName: string, password: string) => Promise<void>
	onSignOut: () => Promise<void>
	getUserInfo: () => Promise<void>
	resetAuth: () => void
}
