'use client'

import { envCookieNames } from '@brand01/src/i18n/settings'
import { LANG_TO_CURRENCY } from 'JF-constants'
import { useAuthStore, useSocialChannelStore } from 'JF-operations'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useGetPathname } from './useGetPathname'
import { useLocaleRouter } from './useLocaleRouter'

interface IUseInitEffectProps {
	isSignedIn: boolean
}

const useInitEffect = ({ isSignedIn }: IUseInitEffectProps) => {
	const router = useLocaleRouter()
	const { locale, currentPath } = useGetPathname()
	const [cookies, setCookie] = useCookies([
		envCookieNames.langId,
		envCookieNames.currencyId,
	])

	const cookieLangId = cookies[envCookieNames.langId]
	const cookieCurrencyId = cookies[envCookieNames.currencyId]

	const {
		isLogin,
		setLogin,
		getUserInfo,
		setUserInfo,
		userInfo: { langId, currencyId },
	} = useAuthStore()
	const { getSocialChannels } = useSocialChannelStore()

	// 初始化 AuthStore，透過 server side init 資料，未登入就直接 set server side 資料，若登入則初始化 userInfo
	useEffect(() => {
		if (isSignedIn) {
			getUserInfo()
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
		isSignedIn,
		setLogin,
		setUserInfo,
	])

	// 初始化 cookie landgId & currencyId，
	// 已登入設定成 userInfo 資料，並且判斷 locale 是否符合帳號資料，不符合則倒轉
	// 未登入設定成 locale 以及對應的 currencyId
	useEffect(() => {
		if (!isLogin && locale !== cookieLangId) {
			// 未登入判斷 url 語系是否與 cookieLangId 符合，只有透過 url 直接強切語系且未登入才會觸發此 effect
			setCookie(envCookieNames.langId, locale, { path: '/' })
			setCookie(envCookieNames.currencyId, LANG_TO_CURRENCY[locale], {
				path: '/',
			})
		} else if (isLogin && locale !== langId) {
			// 登入狀態且 userInfo langId 改變
			setCookie(envCookieNames.langId, langId, { path: '/' })
			setCookie(envCookieNames.currencyId, currencyId, { path: '/' })
			router.push(currentPath, { locale: langId })
		}
	}, [
		cookieLangId,
		currencyId,
		currentPath,
		isLogin,
		langId,
		locale,
		router,
		setCookie,
	])

	// 初始化取得 Social Channel 資料
	useEffect(() => {
		if (isLogin) {
			getSocialChannels({ currencyId, langId })
		}
	}, [currencyId, getSocialChannels, langId, isLogin])
}

export { useInitEffect }
