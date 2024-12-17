// authStore.ts
import { langId } from '@noble888/src/data/country'
import { getWalletInfo } from 'JF-api/account/client'
import { getUserInfo } from 'JF-api/accountStrict/client'
import { signInPhone, signOut } from 'JF-api/auth/client'
import { CURRENCY_NAME_BY_CURRENCY, CurrenciesEnum } from 'JF-constants'
import { numberFormat } from 'JF-core'
import { create } from 'zustand'
import { IAuthAction, IAuthState } from './type'

const defaultUserInfo = {
	userName: 'guest',
	langId: langId.en,
	currencyId: CurrenciesEnum.USD,
}
const defaultWalletInfo = {
	balance: 0,
	isHideBalance: false,
	lastLoginTime: '',
	lastTransaction: '',
	tpWallets: [],
	bonusWallets: [],
}
const defaultWallet = {
	mainWallet: '0',
	bonusWallet: '0',
	totalWallet: '0',
	rollover: 0,
	turnover: 0,
	promoCategoryId: 0,
}

/**
 * @defaultWalletInfo api取回的資料格式
 * @defaultWallet 加工過後讓畫面使用的錢包金額與bonus金額
 */
const useAuthStore = create<IAuthState & IAuthAction>((set, get) => ({
	isLoading: false,
	isLogin: true,
	userInfo: defaultUserInfo,
	wallet: defaultWallet,
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
			await signInPhone(args)
			await get().getUserInfo()
		} finally {
			set({ isLoading: false })
		}
		return { langId: get().userInfo.langId }
	},
	onSignOut: async () => {
		await signOut()
		// 使用定義好的 function
		get().resetAuth()
	},
	// 撈用戶資訊
	getUserInfo: async () => {
		set({ isLoading: true })
		const data = await getUserInfo()
		get().setUserInfo({
			...defaultUserInfo,
			...data,
			currencyName:
				CURRENCY_NAME_BY_CURRENCY[
					data?.currencyId ?? defaultUserInfo.currencyId
				],
		})
		// 成功撈取用戶資訊後便可確保已經登入
		data && set({ isLogin: true })
		set({ isLoading: false })
	},
	resetAuth: () => {
		set({ isLogin: false, userInfo: defaultUserInfo })
	},
	// 撈用戶錢包資訊
	getWalletInfo: async () => {
		set({ isLoading: true })

		const data = (await getWalletInfo()) ?? defaultWalletInfo
		const {
			balance = 0,
			bonusWallets: [
				{ bonus = 0, rollover = 0, turnover = 0, promoCategoryId = 0 } = {},
			] = [],
		} = data
		const currencyId = get().userInfo.currencyId
		set({
			wallet: {
				mainWallet: numberFormat(balance, currencyId),
				bonusWallet: numberFormat(bonus, currencyId),
				totalWallet: numberFormat(balance + bonus, currencyId),
				rollover,
				turnover,
				promoCategoryId,
			},
		})

		set({ isLoading: false })
	},

	getNobleWalletInfo: async () => {
		set({ isLoading: true })

		// const data = await getMainWalletInfo()

		set({ isLoading: false })
	},
}))

export { useAuthStore }
