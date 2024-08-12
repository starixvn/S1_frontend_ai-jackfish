// authStore.ts
import { getWalletInfo } from 'JF-api/account/client'
import { getUserInfo } from 'JF-api/accountStrict/client'
import { signInPhone, signOut } from 'JF-api/auth/client'
import { CURRENCY_NAME_BY_CURRENCY, CurrenciesEnum } from 'JF-constants'
import { create } from 'zustand'
import { IAuthAction, IAuthState } from './type'

const defaultUserInfo = {
	userName: 'guest',
	langId: 'en',
	currencyId: CurrenciesEnum.THB,
}
const defaultWalletInfo = {
	balance: 0,
	isHideBalance: false,
	lastLoginTime: '',
	lastTransaction: '',
	tpWallets: [],
	bonusWallets: [],
}

const useAuthStore = create<IAuthState & IAuthAction>((set, get) => ({
	isLoading: false,
	isLogin: false,
	userInfo: defaultUserInfo,
	walletInfo: defaultWalletInfo,
	setLogin: loginStatus => set({ isLogin: loginStatus }),
	setUserInfo: newUserInfo => set({ userInfo: newUserInfo }),
	onSignInPhone: async ({ areaCode, phoneNo, password }) => {
		if (typeof window === 'undefined') return

		const url = window.location.origin
		const { platform, userAgent } = navigator
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
			areaCode,
			phoneNo,
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

		try {
			const success = await signInPhone(args)
			if (success) {
				set({ isLogin: true })
				await get().getUserInfo()
			} else {
				get().resetAuth()
			}
		} finally {
			set({ isLoading: false })
		}
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
			const data = await getUserInfo()
			get().setUserInfo({
				...defaultUserInfo,
				...data,
				currencyName:
					CURRENCY_NAME_BY_CURRENCY[
						data?.currencyId ?? defaultUserInfo.currencyId
					],
			})
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
}))

export { useAuthStore }
