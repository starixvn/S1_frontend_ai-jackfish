import { getHotGameList, getLobbyHeader } from 'JF-api/game/server'
import { getTpMaintainList } from 'JF-api/site/server'
import { TpMaintainData } from 'JF-api/site/type'
import { getIsTpMaintain } from 'JF-core'
import {
	IHotGame,
	ISubMenuData,
	TLobbyHeaderData,
} from 'libs/api-services/src/lib/game/type'
import { create } from 'zustand'

interface IActiveHomeMenu {
	isInit: boolean
	isloading: boolean
	lobbyHeaderList: TLobbyHeaderData[]
	hotGameList: IHotGame[]
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
	hotGameList: [],
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
			const [lobbyHeaderData, tpMaintainList, hotGameData] = await Promise.all([
				getLobbyHeader(),
				getTpMaintainList(),
				getHotGameList(),
			])
			// 除了hot game之外的lobby games
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

			// 添加isTpMaintain的hotGameList
			const hotMergedSubMenus = hotGameData.map((subMenuItem: IHotGame) => {
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

			set({
				lobbyHeaderList: newLobbyHeaderList,
				hotGameList: hotMergedSubMenus,
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
