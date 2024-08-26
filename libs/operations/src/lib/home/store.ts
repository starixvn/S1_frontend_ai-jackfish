import { getLobbyHeader } from 'JF-api/game/server'
import { getTpMaintainList } from 'JF-api/site/server'
import { TpMaintainData } from 'JF-api/site/type'
import { getIsTpMaintain } from 'JF-core'
import {
	ISubMenuData,
	TLobbyHeaderData,
} from 'libs/api-services/src/lib/game/type'
import { create } from 'zustand'

interface IActiveHomeMenu {
	isInit: boolean
	isloading: boolean
	lobbyHeaderList: TLobbyHeaderData[]
	tpMaintainList: TpMaintainData[]
	fetchTpMaintain: () => Promise<void>
	fetchLobbyHeader: () => Promise<void>
	subMenuData: ISubMenuData[]
	setSubMenuData: (subMenu: ISubMenuData[]) => void
}

export const useHomeStore = create<IActiveHomeMenu>(set => ({
	isInit: false,
	isloading: false,
	lobbyHeaderList: [],
	tpMaintainList: [],
	fetchTpMaintain: async () => {
		set({ isloading: true })
		try {
			const tpMaintainList = await getTpMaintainList()
			set({ tpMaintainList, isloading: false })
		} catch (e) {
			set({ isloading: false })
		}
	},
	fetchLobbyHeader: async () => {
		set({ isloading: true })
		try {
			const [lobbyHeaderData, tpMaintainList] = await Promise.all([
				getLobbyHeader(),
				getTpMaintainList(),
			])
			const newLobbyHeaderList = lobbyHeaderData.map(mainMenuItem => {
				const { lobbyCategoryId, data: menuData = [] } = mainMenuItem || {}
				const mergedSubMenus = menuData.map(subMenuItem => {
					// * 插入 maintenance
					const isTpMaintain = getIsTpMaintain({
						tpMaintainList,
						tpId: subMenuItem.tpId,
						tpGameType: subMenuItem.tpGameType,
					})

					return {
						...subMenuItem,
						isTpMaintain,
					}
				})

				return { lobbyCategoryId, data: mergedSubMenus }
			})
			set({
				lobbyHeaderList: newLobbyHeaderList,
				tpMaintainList,
				isloading: false,
				isInit: true,
			})
		} catch (error) {
			set({ isloading: false })
		}
	},
	subMenuData: [],
	setSubMenuData: subMenu => set(() => ({ subMenuData: subMenu })),
}))
