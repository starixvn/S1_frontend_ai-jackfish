'use client'
import { HOME_MENU_DATA, HOT_GAME_DATA } from '@brand01/src/data/home/menu'
import { ISubMenuData } from 'JF-api/game/type'
import { IMergedMenuData } from 'JF-constants'
import { useHomeStore } from 'JF-operations'
import { find } from 'lodash-es'
import { useEffect } from 'react'

const useMenu = () => {
	const { lobbyHeaderList, fetchLobbyHeader } = useHomeStore()
	useEffect(() => {
		fetchLobbyHeader()
	}, [fetchLobbyHeader])

	const mergedMenus = (): IMergedMenuData[] => {
		const mainLobbyHeaderList = lobbyHeaderList?.map(mainMenuItem => {
			const defMainMenuItem = find(HOME_MENU_DATA, {
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
				return { ...(subMenuItem as ISubMenuData) }
				// return { ...(subMenuItem as TDynamicSubMenuItem) }
			})
			return { ...rest, subMenu: subMenus }
		})
		// 在sidebar陣列前面插入一個靜態的hot game object
		mainLobbyHeaderList.unshift(HOT_GAME_DATA[0])
		return mainLobbyHeaderList
	}

	return { menuList: mergedMenus() }
}

export default useMenu
