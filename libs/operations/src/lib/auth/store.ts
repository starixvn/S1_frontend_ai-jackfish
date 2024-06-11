// authStore.ts
import { create } from 'zustand'
import { getUserInfo, signIn, signOut } from 'JF-api'
import { IAuthAction, IAuthState } from './type'

const defaultUserInfo = { userName: 'guest' }

const useAuthStore = create<IAuthState & IAuthAction>((set, get) => ({
	isLoading: false,
	isLogin: false,
	userInfo: {
		userName: 'guest',
	},
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
}))

export { useAuthStore }
