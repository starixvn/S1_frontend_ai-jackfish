// authStore.ts
import {
	getCustBonusWallet,
	getCustVIPProgress,
	getMainWalletInfo,
	getTpWalletList,
} from 'JF-api/account/client'
import { TpWalletListTypeEnum } from 'JF-api/account/type'
import { getUserInfo } from 'JF-api/accountStrict/client'
import { signInPhone, signInUserName, signOut } from 'JF-api/auth/client'
import { CURRENCY_NAME_BY_CURRENCY } from 'JF-constants'
import { numberFormat } from 'JF-core'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { IAuthAction, IAuthState } from './type'

const defaultUserInfo = {
	userName: 'guest',
	langId: String(process.env.NEXT_PUBLIC_DEFAULT_LANG),
	currencyId: Number(process.env.NEXT_PUBLIC_DEFAULT_CURRENCY),
}

const defaultWallet = {
	mainWallet: '0',
	bonusWallet: '0',
	totalWallet: '0',
	rollover: 0,
	turnover: 0,
	promoCategoryId: 0,
}

const defaultMainWalletInfo = {
	balance: 0,
	lastLoginTime: '',
	lastTransaction: '',
	isHideBalance: false,
}
const defaultVIPProgress = {
	actualDeposit: 0,
	currentVipLevel: 1,
	downDeposit: null,
	downTurnover: null,
	turnoverSummary: 0,
	upDeposit: 0,
	upTurnover: 0,
}

/**
 * @defaultTUKWalletInfo TUK用的walletInfo
 * @defaultWallet 加工過後讓畫面使用的錢包金額與bonus金額
 */
const useAuthStore = create<IAuthState & IAuthAction>((set, get) => ({
	isLoading: false,
	isLogin: false,
	userInfo: defaultUserInfo,
	TUKWallet: defaultWallet,
	custVIPProgress: defaultVIPProgress,
	setUserInfo: newUserInfo => set({ userInfo: newUserInfo }),
	onSignInUserName: async ({ userName, password }) => {
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

		try {
			await signInUserName(args)
			await get().getUserInfo()
		} finally {
			set({ isLoading: false })
		}
		return { langId: get().userInfo.langId }
	},
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

	getWalletInfo: async () => {
		set({ isLoading: true })
		const currencyId = get().userInfo.currencyId

		const [mainWalletInfo, custBonusWalletInfo = []] = await Promise.all([
			getMainWalletInfo(),
			getCustBonusWallet(),
			getTpWalletList({
				langId: get().userInfo.langId,
				listType: TpWalletListTypeEnum.All,
			}),
		])

		const { balance } = mainWalletInfo ?? defaultMainWalletInfo

		// TUK Wallet---
		const {
			bonus = 0,
			rollover = 0,
			turnover = 0,
			promoCategoryId = 0,
		} = custBonusWalletInfo[0]
		set({
			TUKWallet: {
				mainWallet: numberFormat(balance, currencyId),
				bonusWallet: numberFormat(bonus, currencyId),
				totalWallet: numberFormat(balance + bonus, currencyId),
				rollover,
				turnover,
				promoCategoryId,
			},
			isLoading: false,
		})
	},

	/**
	 * 取得玩家目前ＶＩＰ等級資料
	 */
	getCustVIPProgress: async () => {
		set({ isLoading: true })
		try {
			const data = (await getCustVIPProgress()) ?? defaultVIPProgress
			set({ custVIPProgress: data })
		} catch (err) {
			toast.error((err as Error).message)
		}

		set({ isLoading: false })
	},
}))

export { useAuthStore }
