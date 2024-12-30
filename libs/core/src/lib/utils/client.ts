// import { LIFF_EXCLUDED_TP_GAME_IDS } from '@nx-next-app/constants'
import { DeviceTypeEnum } from 'JF-constants'

type ReactNativeWebViewMessage =
	| { type: 'SyncCurrency'; payload: number }
	| { type: 'SyncLanguage'; payload: string }
	| { type: 'SyncAuth'; payload: 'login' | 'logout' }

type ReactNativeWebView = {
	postMessage: (message: string) => void
}

type ReactNativeWebViewWindow = typeof window & {
	ReactNativeWebView: ReactNativeWebView
}

export const isReactNativeWebView = () =>
	typeof window !== 'undefined' &&
	'ReactNativeWebView' in window &&
	window.ReactNativeWebView != null

const postMsgToApp = (message: ReactNativeWebViewMessage) => {
	if (
		isReactNativeWebView() &&
		typeof (window as ReactNativeWebViewWindow)?.ReactNativeWebView
			?.postMessage === 'function'
	) {
		// eslint-disable-next-line @typescript-eslint/no-extra-semi
		;(window as ReactNativeWebViewWindow).ReactNativeWebView.postMessage(
			JSON.stringify(message),
		)
	}
}

export const isInApp = isReactNativeWebView

export const getDeviceType = () => {
	if (typeof window !== 'undefined') {
		if (isInApp()) return DeviceTypeEnum.NativeAPP
		// if (liff.isInClient()) return DeviceTypeEnum.Liff
	}
	return Number(process.env['NEXT_PUBLIC_DEVICE_TYPE'])
}

export const setAppCurrency = (currencyId: number) =>
	postMsgToApp({ type: 'SyncCurrency', payload: currencyId })

export const setAppLanguage = (langCode: string) =>
	postMsgToApp({ type: 'SyncLanguage', payload: langCode })

export const setAppAuth = (payload: 'login' | 'logout') =>
	postMsgToApp({ type: 'SyncAuth', payload })

// const liffExcludedGameIds = new Set<number>(LIFF_EXCLUDED_TP_GAME_IDS)

// export const isGameExcludedFromLiff = (tpGameIdNo?: number) =>
// 	tpGameIdNo !== undefined && liffExcludedGameIds.has(tpGameIdNo)
