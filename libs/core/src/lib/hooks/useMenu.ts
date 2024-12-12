'use client'
import { ISubMenu, TMenuData } from 'JF-constants'
import { useHomeStore } from 'JF-operations'
import { find } from 'lodash-es'

interface IUseMenuProps {
	homeMenuData: TMenuData[]
}

const useMenu = ({ homeMenuData }: IUseMenuProps) => {
	const { lobbyHeaderList } = useHomeStore()

	const mergedMenus = () => {
		const mainLobbyHeaderList = lobbyHeaderList?.map(mainMenuItem => {
			const defMainMenuItem = find(homeMenuData, {
				lobbyCategoryId: mainMenuItem.lobbyCategoryId,
			})
			const {
				data = [],
				subMenu = [],
				...rest
			} = { ...mainMenuItem, ...(defMainMenuItem && defMainMenuItem) }
			const subMenus = data.map(subMenuItem => {
				// * subMenu 是插入的相關資料 因此不會影響順序
				subMenu.forEach(defSubItem => {
					if (subMenuItem.tpGameIdNo === defSubItem.tpGameIdNo) {
						Object.assign(subMenuItem, defSubItem)
					}
				})
				return { ...(subMenuItem as ISubMenu) }
				// return { ...(subMenuItem as TDynamicSubMenuItem) }
			})
			return { ...rest, subMenu: subMenus }
		}) as TMenuData[]
		return mainLobbyHeaderList
	}

	return { menuList: mergedMenus() }
}

export default useMenu
