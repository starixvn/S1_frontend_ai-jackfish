// authStore.ts
import { getWalletInfo, setLanguage } from 'JF-api/account/client'
import { getUserInfo } from 'JF-api/accountStrict/api'
import { signIn, signOut } from 'JF-api/auth/client'
import { create } from 'zustand'
import { IAuthAction, IAuthState } from './type'

const defaultUserInfo = { userName: '' }
const defaultWalletInfo = {
	balance: 0,
	isHideBalance: false,
	lastLoginTime: '',
	lastTransaction: '',
	tpWallets: [],
	bonusWallets: [],
}

/**
 * @isSetLanguage 是否成功打設定語言'Account/SetLanguage' api
 */

const useAuthStore = create<IAuthState & IAuthAction>((set, get) => ({
	isLoading: false,
	isLogin: false,
	userInfo: defaultUserInfo,
	walletInfo: defaultWalletInfo,
	isSetLanguage: false,
	setLogin: loginStatus => set({ isLogin: loginStatus }),
	onSignIn: async (userName, password) => {
		if (typeof window === 'undefined') return

		const url = window.location.origin
		const { platform } = navigator
		const { userAgent } = navigator
		const screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`
		let di = ''
		let bi = ''
		let detecasAnalysis = ''
		let sessionKey = ''
		let token = ''

		// * di, bi, detecasAnalysis, sessionKey, token 引用第三方 js: //*/activator.ashx
		di = (document.getElementById('__di') as HTMLInputElement)?.value
		bi = (document.getElementById('__bi') as HTMLInputElement)?.value
		detecasAnalysis = (
			document.getElementById('detecas-analysis') as HTMLInputElement
		)?.value
		sessionKey = (document.getElementById('__fdi') as HTMLInputElement)?.value // * fdi = sessionKey
		token = (document.getElementById('__tk') as HTMLInputElement)?.value // * 默認為 empty

		const args = {
			userName,
			userpwd: password,
			isPersistent: false,
			url,
			platform,
			userAgent,
			screen,
			FPSRequest: {
				di,
				bi,
				detecasAnalysis,
				sessionKey,
				token,
			},
		}
		set({ isLoading: true })

		const success = await signIn(args)

		if (success) {
			set({ isLogin: true })
			await get().getUserInfo()
		} else {
			get().resetAuth()
		}

		set({ isLoading: false })
	},
	onSignOut: async () => {
		await signOut()
		// 使用定義好的 function
		get().resetAuth()
	},
	// 撈用戶資訊
	getUserInfo: async () => {
		set({ isLoading: true })
		try {
			const { data } = await getUserInfo()
			set({ userInfo: data ?? defaultUserInfo })
		} finally {
			set({ isLoading: false })
		}
	},
	resetAuth: () => {
		set({ isLogin: false, userInfo: defaultUserInfo })
	},
	// 撈用戶錢包資訊
	getWalletInfo: async () => {
		set({ isLoading: true })
		try {
			const data = await getWalletInfo()
			set({ walletInfo: data ?? defaultWalletInfo })
		} catch (e) {
			set({ isLoading: false })
		}
	},

	// 切換語系時設定語系api
	onSetLanguage: async (
		langCode: string,
		currencyId: number,
		errorMsg: string,
	) => {
		const args = { langId: langCode, currencyId }
		const success = await setLanguage(args, errorMsg)
		set({ isSetLanguage: success })
	},
}))

export { useAuthStore }
