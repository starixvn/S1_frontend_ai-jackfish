import type {
	TAllowedCurrenciesData,
	TLangGroupsData,
	TLeftMenuData,
	TMenuData,
	TMetaData,
	TVipImageData,
} from 'JF-constants'
import { create } from 'zustand'

interface IStaticDataStore {
	ALLOWED_CURRENCIES?: TAllowedCurrenciesData
	LEFT_MENU_DATA?: TLeftMenuData
	VIP_CLUB_IMAGES?: TVipImageData[]
	META_DATA?: TMetaData
	LANG_GROUPS?: TLangGroupsData
	MENU_DATA?: TMenuData[]
	initStaticData: ({
		ALLOWED_CURRENCIES,
		LEFT_MENU_DATA,
		VIP_CLUB_IMAGES,
		META_DATA,
		LANG_GROUPS,
		MENU_DATA,
	}: {
		ALLOWED_CURRENCIES?: TAllowedCurrenciesData
		LEFT_MENU_DATA?: TLeftMenuData
		VIP_CLUB_IMAGES?: TVipImageData[]
		META_DATA?: TMetaData
		LANG_GROUPS?: TLangGroupsData
		MENU_DATA?: TMenuData[]
	}) => void
}

export const useStaticDataStore = create<IStaticDataStore>(set => ({
	ALLOWED_CURRENCIES: undefined,
	LEFT_MENU_DATA: undefined,
	VIP_CLUB_IMAGES: [],
	META_DATA: undefined,
	LANG_GROUPS: undefined,
	MENU_DATA: [],
	initStaticData: ({
		ALLOWED_CURRENCIES,
		LEFT_MENU_DATA,
		VIP_CLUB_IMAGES,
		META_DATA,
		LANG_GROUPS,
		MENU_DATA,
	}) =>
		set(() => ({
			ALLOWED_CURRENCIES,
			LEFT_MENU_DATA,
			VIP_CLUB_IMAGES,
			META_DATA,
			LANG_GROUPS,
			MENU_DATA,
		})),
}))
