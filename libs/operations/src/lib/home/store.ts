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
	isloading: boolean
	lobbyHeaderList: TLobbyHeaderData[]
	tpMaintainList: TpMaintainData[]
	fetchTpMaintain: () => Promise<void>
	fetchLobbyHeader: () => Promise<void>
	subMenuData: ISubMenuData[]
	setSubMenuData: (subMenu: ISubMenuData[]) => void
}

export const useHomeStore = create<IActiveHomeMenu>((set, get) => ({
	isloading: false,
	lobbyHeaderList: [],
	tpMaintainList: [],
	fetchTpMaintain: async () => {
		set({ isloading: true })
		try {
			const tpMaintainList = await getTpMaintainList()
			set({ tpMaintainList })
		} catch (e) {
			set({ isloading: false })
		}
	},
	fetchLobbyHeader: async () => {
		set({ isloading: true })
		try {
			const data = await getLobbyHeader()
			const tpMaintainList = get().tpMaintainList
			const newLobbyHeaderList = data.map(mainMenuItem => {
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
			})
		} catch (error) {
			set({ isloading: false })
		}
	},
	subMenuData: [],
	setSubMenuData: subMenu => set(() => ({ subMenuData: subMenu })),
}))
