'use client'

import { LANG_GROUPS } from '@noble888/src/data/static'
import { envCookieNames } from '@noble888/src/i18n/settings'
import { setLanguage } from 'JF-api/account/client'
import { CURRENCY_TO_LANG_KEY, TLangGroupsData } from 'JF-constants'
import { useAuthStore } from 'JF-operations'
import { isEqual, omit } from 'lodash-es'
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
const useLanguageGroup = (filterLangs?: string[]) => {
	const router = useLocaleRouter()
	const { currentPath } = useGetPathname()
	const [cookies] = useCookies([
		envCookieNames.langId,
		envCookieNames.currencyId,
	])
	const {
		userInfo: { currencyId: currentCurrency, langId: currentLang },
		isLogin,
		getUserInfo,
	} = useAuthStore()

	const filteredLangGroups: TLangGroupsData =
		filterLangs && filterLangs.length > 0 && !isLogin
			? omit(LANG_GROUPS, filterLangs)
			: LANG_GROUPS

	const [icon, setIcon] = useState<string | null>(null)
	const [languageGroup, setLanguageGroup] = useState<{
		[key: string]: Array<{
			displayText: string
			value: string
			currencyId: number
			mainLanguage?: boolean
		}>
	}>(filteredLangGroups)

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
		if (cookies[envCookieNames.langId] !== langCode) {
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
		if (isLogin) {
			// 登入後針對 langGroup 做篩選
			setLanguageGroup({ [langKey]: filteredLangGroups[langKey] })
			// 未登入加入比對當前 langGroup 是否與初始 langGroup 相同，減少重複渲染
		} else if (!isEqual(languageGroup, filteredLangGroups)) {
			// 若不相符才 reset 至 filteredLangGroups
			setLanguageGroup(filteredLangGroups)
		}

		if (langKey !== icon) {
			setIcon(langKey)
		}
	}, [isLogin, currentCurrency, languageGroup, filteredLangGroups, icon])

	return { icon, languageGroup, onSetLanguage }
}

export { useLanguageGroup }
