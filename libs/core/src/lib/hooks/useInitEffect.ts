'use client'

import { envCookieNames } from '@brand01/src/i18n/settings'
import { LANG_TO_CURRENCY } from 'JF-constants'
import { useAuthStore, useSocialChannelStore } from 'JF-operations'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useGetPathname } from './useGetPathname'

interface IUseInitEffectProps {
	isSignedIn: boolean
	cookieLangId: string
	cookieCurrencyId: number
}

const useInitEffect = ({
	isSignedIn,
	cookieLangId,
	cookieCurrencyId,
}: IUseInitEffectProps) => {
	const router = useRouter()
	const { locale, currentPath } = useGetPathname()
	const [cookies, setCookie] = useCookies([
		envCookieNames.langId,
		envCookieNames.currencyId,
	])
	const {
		isLogin,
		setLogin,
		getUserInfo,
		setUserInfo,
		userInfo: { langId, currencyId },
	} = useAuthStore()
	const { getSocialChannels } = useSocialChannelStore()

	// 初始化 AuthStore，透過 server side init 資料
	useEffect(() => {
		setLogin(isSignedIn)
		setUserInfo({
			userName: 'guest',
			langId: cookieLangId,
			currencyId: cookieCurrencyId,
		})
	}, [cookieCurrencyId, cookieLangId, isSignedIn, setLogin, setUserInfo])

	// 手動切換語系時會 setCookie 觸發更新 userInfo 資料
	// 已登入就透過 api 取得
	// 未登入則從 cookie 設定
	useEffect(() => {
		isSignedIn
			? getUserInfo()
			: setUserInfo({
					userName: 'guest',
					langId: cookies[envCookieNames.langId],
					currencyId: cookies[envCookieNames.currencyId],
				})
	}, [cookies, getUserInfo, isSignedIn, setLogin, setUserInfo])

	// 初始化 cookie landgId & currencyId，
	// 已登入設定成 userInfo 資料，並且判斷 locale 是否符合帳號資料，不符合則倒轉
	// 未登入設定成 locale 以及對應的 currencyId
	useEffect(() => {
		if (!isLogin) {
			setCookie(envCookieNames.langId, locale, { path: '/' })
			setCookie(envCookieNames.currencyId, LANG_TO_CURRENCY[locale], {
				path: '/',
			})
		} else if (locale !== langId) {
			setCookie(envCookieNames.langId, langId, { path: '/' })
			setCookie(envCookieNames.currencyId, currencyId, { path: '/' })
			router.push(`/${langId}${currentPath}`)
			// window.history.pushState(null, '', `/${langId}${currentPath}`)
			// document.documentElement.lang = langId
		}
	}, [currencyId, currentPath, isLogin, langId, locale, router, setCookie])

	// 初始化取得 Social Channel 資料
	useEffect(() => {
		getSocialChannels({ currencyId, langId })
	}, [currencyId, getSocialChannels, langId])
}

export { useInitEffect }
