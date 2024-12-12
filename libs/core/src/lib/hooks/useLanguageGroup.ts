'use client'

import { setLanguage } from 'JF-api/account/client'
import { CURRENCY_TO_LANG_KEY, ENV_COOKIE_NAMES } from 'JF-constants'
import { useAuthStore } from 'JF-operations'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { useGetPathname } from './useGetPathname'
import { useLocaleRouter } from './useLocaleRouter'

/**
 * @description 處理設置語系相關邏輯
 * @example
 * ```
 * const { icon, languageGroup, onSetLanguage } = useLanguageGroup()
 * ```
 */
const useLanguageGroup = () => {
	const router = useLocaleRouter()
	const { currentPath } = useGetPathname()
	const [cookies] = useCookies([
		ENV_COOKIE_NAMES.langId,
		ENV_COOKIE_NAMES.currencyId,
	])
	const {
		userInfo: { currencyId: currentCurrency, langId: currentLang },
		isLogin,
		getUserInfo,
	} = useAuthStore()

	const [icon, setIcon] = useState<string | null>(null)

	const onSetLanguage = async ({
		langCode,
		currencyId,
	}: {
		langCode: string
		currencyId: number
	}) => {
		// 選擇沒變則 return
		if (currencyId === currentCurrency && langCode === currentLang) return

		// 切換語系 func.
		// 已登入呼叫 setLanguage api，未登入 push 觸發 effect 更新 cookie userInfo 資料
		if (cookies[ENV_COOKIE_NAMES.langId] !== langCode) {
			try {
				if (isLogin) {
					// 設定語系後重撈 custProfile
					await setLanguage({ langId: langCode })
					await getUserInfo()
				} else {
					router.push(currentPath, { locale: langCode })
				}
			} catch (error) {
				toast.error((error as Error).message)
			}
		}
	}

	useEffect(() => {
		const langKey = CURRENCY_TO_LANG_KEY[currentCurrency]
		if (langKey !== icon) {
			setIcon(langKey)
		}
	}, [currentCurrency, icon])

	return { icon, onSetLanguage }
}

export { useLanguageGroup }
