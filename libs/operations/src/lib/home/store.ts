import { getLobbyHeader } from 'JF-api/game/server'
import { MenuKeyEnum } from 'JF-constants'
import {
	ISubMenuData,
	TLobbyHeaderData,
} from 'libs/api-services/src/lib/game/type'
import { create } from 'zustand'

interface IActiveHomeMenu {
	isInit: boolean
	isLoading: boolean
	activeHomeMenu: MenuKeyEnum
	setActiveHomeMenu: (menu: MenuKeyEnum) => void
	lobbyHeaderList: TLobbyHeaderData[]
	fetchLobbyHeader: () => Promise<void>
	subMenuData: ISubMenuData[]
	setSubMenuData: (subMenu: ISubMenuData[]) => void
}

export const useHomeStore = create<IActiveHomeMenu>(set => ({
	isInit: false,
	isLoading: false,
	activeHomeMenu: MenuKeyEnum.Sports,
	setActiveHomeMenu: menu => set(() => ({ activeHomeMenu: menu })),
	lobbyHeaderList: [],
	fetchLobbyHeader: async () => {
		set({ isLoading: true })
		const data = await getLobbyHeader()
		set({ lobbyHeaderList: data, isLoading: false, isInit: true })
	},
	subMenuData: [],
	setSubMenuData: subMenu => set(() => ({ subMenuData: subMenu })),
}))
