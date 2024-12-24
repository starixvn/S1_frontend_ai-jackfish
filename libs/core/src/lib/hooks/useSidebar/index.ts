'use client'

import { paths } from 'JF-constants'
import { useGetPathname } from 'JF-core'
import {
	useAuthStore,
	useStaticDataStore,
	useWalletAllowed,
} from 'JF-operations'
import { includes, isArray } from 'lodash-es'
import { usePathname, useRouter } from 'next/navigation'

/**
 * 自定義 hook 用於處理 SideBar 的邏輯。
 * @param {IWithdrawalSetting[]} withdrawalBlockSetting - 提款設定數據。
 * @returns {Object} 菜單列和菜單點擊事件函數。 */
export const useSidebar = () => {
	const pathname = usePathname() // 獲取當前路徑
	const router = useRouter()

	const { LEFT_MENU_DATA } = useStaticDataStore()
	const { currentPath } = useGetPathname()
	const {
		userInfo: { currencyId },
	} = useAuthStore()

	const {
		cardAllowed: { bankCardAllowed, cryptoCardAllowed },
	} = useWalletAllowed()

	/** 菜單列表 */
	const menuList =
		LEFT_MENU_DATA &&
		Object.values(LEFT_MENU_DATA).map(({ displayKey, subMenu }) => {
			const submenuList = Object.values(subMenu)
				.filter(({ pathname: subPathname, allowCurrencies }) => {
					let isShow = true
					if (isArray(allowCurrencies))
						isShow = includes(allowCurrencies, currencyId)

					// 與 api 的 withdrawal payment 同步
					if (subPathname === paths.bankInfo.root) isShow = bankCardAllowed
					if (subPathname === paths.cryptoWallet.root)
						isShow = cryptoCardAllowed

					return isShow
				})
				.map(({ displayKey, pathname: subPathname, allowCurrencies }) => {
					const isMatchCurrency = isArray(allowCurrencies)
						? includes(allowCurrencies, currencyId)
						: !allowCurrencies

					return {
						displayKey,
						pathname: subPathname,
						isActive: currentPath === subPathname, // 返回的當前路徑
						isVisible: isMatchCurrency,
					}
				})

			return {
				displayKey,
				submenuList,
			}
		})

	/**
	 * 處理菜單點擊，如果選擇的路徑不同於當前路徑，則導至新的路徑。
	 * @param {string} newPathname - 新的路徑。 */
	const handleMenuClick = (newPathname: string) => {
		if (newPathname !== currentPath) {
			router.push(pathname)
		}
	}

	return {
		menuList,
		handleMenuClick,
	}
}
