import { create } from 'zustand'
import { MenuKeyEnum, TStaticSubMenuItem } from 'JF-constants'

interface IActiveHomeMenu {
	activeHomeMenu: MenuKeyEnum
	setActiveHomeMenu: (menu: MenuKeyEnum) => void
	subMenuData: TStaticSubMenuItem[]
	setSubMenuData: (subMenu: TStaticSubMenuItem[]) => void
}

export const useHomeStore = create<IActiveHomeMenu>(set => ({
	activeHomeMenu: MenuKeyEnum.Sports,
	setActiveHomeMenu: menu => set(() => ({ activeHomeMenu: menu })),
	subMenuData: [],
	setSubMenuData: subMenu => set(() => ({ subMenuData: subMenu })),
}))
