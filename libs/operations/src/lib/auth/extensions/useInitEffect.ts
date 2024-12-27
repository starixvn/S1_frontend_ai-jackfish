'use client'

import { ENV_COOKIE_NAMES } from 'JF-constants'
import { useGetPathname, useLocaleRouter } from 'JF-core'
import { useAuthStore, useSocialChannelStore } from 'JF-operations'
import { debounce } from 'lodash-es'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

const debouncedGetSocialChannels = debounce(
	(getSocialChannels, langId, currencyId) => {
		getSocialChannels({ langId, currencyId })
	},
	300,
)

interface IUseInitEffectProps {
	isSignedIn: boolean
	langToCurrency: { [key: string]: number } // 因為不同品牌有不同的LANG_TO_CURRENCY，所以用傳入的方式
}

const useInitEffect = ({ isSignedIn, langToCurrency }: IUseInitEffectProps) => {
	const router = useLocaleRouter()
	const { locale, currentPath } = useGetPathname()
	const [cookies, setCookie] = useCookies([
		ENV_COOKIE_NAMES.langId,
		ENV_COOKIE_NAMES.currencyId,
	])

	const cookieLangId = cookies[ENV_COOKIE_NAMES.langId]
	const cookieCurrencyId = cookies[ENV_COOKIE_NAMES.currencyId]
	const {
		isLogin,
		getUserInfo,
		setUserInfo,
		userInfo: { langId, currencyId },
		getWalletInfo,
	} = useAuthStore()
	const { getSocialChannels } = useSocialChannelStore()

	// 初始化 AuthStore，未登入就直接 set cookie 資料，若登入則初始化 userInfo
	useEffect(() => {
		if (isSignedIn) {
			getUserInfo()
			getWalletInfo()
		} else {
			setUserInfo({
				userName: 'guest',
				langId: cookieLangId,
				currencyId: cookieCurrencyId,
			})
		}
	}, [
		cookieCurrencyId,
		cookieLangId,
		getUserInfo,
		getWalletInfo,
		isSignedIn,
		setUserInfo,
	])
	// 初始化 cookie landgId & currencyId，
	// 已登入設定成 userInfo 資料，並且判斷 locale 是否符合帳號資料，不符合則倒轉
	// 未登入設定成 locale 以及對應的 currencyId
	useEffect(() => {
		if (!isLogin && locale !== cookieLangId) {
			// 未登入判斷 url 語系是否與 cookieLangId 符合
			setCookie(ENV_COOKIE_NAMES.langId, locale, { path: '/' })
			setCookie(ENV_COOKIE_NAMES.currencyId, langToCurrency[locale], {
				path: '/',
			})
		} else if (isLogin && locale !== langId) {
			// 登入狀態且 userInfo langId 改變
			setCookie(ENV_COOKIE_NAMES.langId, langId, { path: '/' })
			setCookie(ENV_COOKIE_NAMES.currencyId, currencyId, { path: '/' })
			router.push(currentPath, { locale: langId })
		}
	}, [
		cookieLangId,
		currencyId,
		currentPath,
		isLogin,
		langId,
		langToCurrency,
		locale,
		router,
		setCookie,
	])

	// 初始化 Store 使用 Debounce 避免多次調用
	useEffect(() => {
		debouncedGetSocialChannels(getSocialChannels, langId, currencyId)
		// 清理函數
		return () => {
			debouncedGetSocialChannels.cancel()
		}
	}, [currencyId, getSocialChannels, langId])
}

export { useInitEffect }
