import { getLobbyHeader } from 'JF-api/game/server'
import { MenuKeyEnum } from 'JF-constants'
import {
	ISubMenuData,
	TLobbyHeaderData,
} from 'libs/api-services/src/lib/game/type'
import { create } from 'zustand'

interface IActiveHomeMenu {
	isloading: boolean
	activeHomeMenu: MenuKeyEnum
	setActiveHomeMenu: (menu: MenuKeyEnum) => void
	lobbyHeaderList: TLobbyHeaderData[]
	fetchLobbyHeader: () => Promise<void>
	subMenuData: ISubMenuData[]
	setSubMenuData: (subMenu: ISubMenuData[]) => void
}

export const useHomeStore = create<IActiveHomeMenu>(set => ({
	isloading: false,
	activeHomeMenu: MenuKeyEnum.Sports,
	setActiveHomeMenu: menu => set(() => ({ activeHomeMenu: menu })),
	lobbyHeaderList: [],
	fetchLobbyHeader: async () => {
		set({ isloading: true })
		try {
			const data = await getLobbyHeader()
			set({ lobbyHeaderList: data, isloading: false })
		} catch (error) {
			set({ isloading: false })
		}
	},
	subMenuData: [],
	setSubMenuData: subMenu => set(() => ({ subMenuData: subMenu })),
}))
