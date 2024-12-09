import { ISubMenuData, ISubMenuDesktopData } from 'JF-api/game/type'
import { IRootpath } from '../paths'
import { IProduct, TProductProps } from '../products'

export const MenuActionTypeEnum = {
	EnterPage: 'EnterPage',
	Link: 'Link',
	UseGoToGame: 'UseGoToGame',
	WindowOpen: 'WindowOpen',
	Null: 'Null',
} as const

export enum MenuKeyEnum {
	HotGame = 'HotGame',
	Sports = 'Sports',
	ESports = 'ESports',
	Casino = 'Casino',
	Slots = 'Slots',
	Games = 'Games',
	Fishing = 'Fishing',
	Lottery = 'Lottery',
	Exchange = 'Exchange',
	Slot = 'Slot',
	Game = 'Game',
	FourD = 'FourD',
	NumberGame = 'NumberGame',
	Keno = 'Keno',
	// 靜態 category
	Promotion = 'Promotion',
	VIP = 'VIP',
	LeaderBoard = 'LeaderBoard',
}

export enum NovaMenuKeyEnum {
	'Sports' = 'Sports',
	'Casino' = 'Casino',
	'Exchange' = 'Exchange',
	'ESports' = 'ESports',
	'Slot' = 'Slot',
	'Game' = 'Game',
	'Fishing' = 'Fishing',
	'FourD' = 'FourD',
	'Lottery' = 'Lottery',
	'NumberGame' = 'NumberGame',
	'Keno' = 'Keno',
	// 靜態 category
	'Promotion' = 'Promotion',
	'VIP' = 'VIP',
	'LeaderBoard' = 'LeaderBoard',
}

export const TUKLobbyCategoryEnum = {
	HotGame: 0,
	Sports: 1,
	ESports: 2,
	Casino: 3,
	SLOTS: 4,
	Poker: 5,
	Game: 6,
	Fishing: 7,
	Lottery: 8,
	Exchange: 9,
	FourD: 10,
	NumberGame: 81,
	Keno: 82,
} as const

export enum MenuActionEnum {
	EnterPage = 'EnterPage',
	Link = 'Link',
	UseGoToGame = 'UseGoToGame',
	WindowOpen = 'WindowOpen',
	Null = 'Null',
}

export interface IGoToGameArgs {
	tpId: number
	langId: string
	inputs: {
		gameId?: null | string | number
		fun: '0' | '1' // * '1' 為開啟模式
		gameType?: string
		tpGameType: string | number | null | undefined
		loginGameType?: string
	}
}

export interface IEnterPageArgs {
	langId: string
	tpId: number
	tpGameType?: number | null
	gameId?: string | number
	matchId?: string
	betType?: string | number
}

export interface IEnterSlotsPageArgs {
	tpId: string
	tpGameType?: string
	gameId?: string | number
	isFree?: boolean
}

export interface IOpen9WSportsArgs {
	url: string
	userId: string
	key: string
}

// export type TSubMenuData = {
// 	lobbyCategory: string
// 	tpId: number
// 	tpName: string
// 	productName: string
// 	tpGameIdNo: number | undefined
// 	gameId?: number | string
// 	tpGameType: number
// 	currencyGameName: Record<string, string> | null
// 	pcHeaderPicUrl: string
// 	pcLobbyPicUrl: string
// 	mobileHeaderPicUrl: string
// 	mobileLobbyPicUrl: string
// 	sort: number
// 	iconEndTime: string
// 	iconStartTime: string
// 	iconType: number
// }

type TMenuActionLinkType = Extract<
	keyof typeof MenuActionEnum,
	'Link' | 'WindowOpen'
>

type TMenuActionOtherType = Exclude<
	keyof typeof MenuActionEnum,
	'Link' | 'WindowOpen'
>

export interface TStaticSubMenuItemLinkType extends TProductProps {
	imgUrl: string
	displayKey: string
	menuActionType: TMenuActionLinkType
	pathname: string
	params?: {
		name: string
		value: string
	}
	needLogin?: boolean
	desktop?: ISubMenuDesktopData
	h5?: ISubMenuDesktopData
	query?: { provider?: string; tpId?: number }
}

type TStaticSubMenuItemOtherType = TProductProps & {
	imgUrl: string
	displayKey: string
	menuActionType: TMenuActionOtherType
	needLogin?: boolean
}

export interface IAddLiveStreamingProps {
	isTpMaintain: boolean
	noPlay?: boolean
	noShow?: boolean
}
export interface TDynamicSubMenuLinkType
	extends TStaticSubMenuItemLinkType,
		ISubMenuData,
		// TProductProps,
		IAddLiveStreamingProps {}

export type TDynamicSubMenuOtherType = TStaticSubMenuItemOtherType &
	ISubMenuData & {
		isTpMaintain: boolean
		noPlay?: boolean
		noShow?: boolean
	}

export type TDynamicSubMenuItem =
	| TDynamicSubMenuLinkType
	| TDynamicSubMenuOtherType

export type TStaticSubMenuItem =
	| TStaticSubMenuItemLinkType
	| TStaticSubMenuItemOtherType

export type IMergedMenuData = {
	display?: 'h5' | 'desktop' | 'all'
	displayKey?: string
	iconUrl?: string
	pathname?: string
	lobbyCategoryId?: number | undefined
	subMenuAllowCurrenciesWithAuth?: boolean | undefined // * 決定是否需要登入後才過濾(暫時沒有用到)
	query?: { provider: string }
	category?: MenuKeyEnum | undefined
	h5?: {
		subMenuClassName?: string
		icon: string
	}
	desktop?: {
		subMenuClassName?: string | undefined
	}
	// subMenu: TDynamicSubMenuItem[]
	subMenu: ISubMenuData[]
}

export enum MainMenuIcon {
	newTag = 'newTag',
	hotTag = 'hotTag',
}

export enum MenuIconTypeEnum {
	NO_ICON,
	New,
}

export const LobbyCategoryEnum = {
	Sports: 1,
	ESports: 2,
	Casino: 3,
	SLOTS: 4,
	Poker: 5,
	Game: 6,
	Fishing: 7,
	Lottery: 8,
	Exchange: 9,
	FourD: 10,
	NumberGame: 81,
	Keno: 82,
} as const

export type IMenuActionLinkType = Extract<
	keyof typeof MenuActionTypeEnum,
	'Link' | 'WindowOpen'
>

export type IMenuActionOtherType = Exclude<
	keyof typeof MenuActionTypeEnum,
	'Link' | 'WindowOpen'
>
export interface IStaticSubMenuItemLinkType extends IProduct {
	desktop?: {
		menuActionType: IMenuActionLinkType
	}
	h5?: {
		menuActionType: IMenuActionLinkType
	}
	pathname: IRootpath
	query?: { provider: string } | { tpId: number }
	needLogin?: boolean
}
export interface IStaticSubMenuItemOtherType extends IProduct {
	desktop?: {
		menuActionType: IMenuActionOtherType
	}
	h5?: {
		menuActionType: IMenuActionOtherType
	}
	needLogin?: boolean
}

// HOME_MENU_DATA 的 type:
export interface ISubMenu extends TProductProps {
	currencyGameName?: string | null
	iconEndTime?: string
	iconStartTime?: string
	iconType?: number
	lobbyCategory?: string
	pcHeaderPicUrl?: string
	pcLobbyPicUrl?: string
	mobileHeaderPicUrl?: string
	mobileLobbyPicUrl?: string
	productName?: string
	rwdHeaderPicUrl?: string
	rwdLobbyPicUrl?: string
	sort?: number
	tpName?: string
	h5: {
		hasLobby?: boolean
		menuActionType: keyof typeof MenuActionEnum
		hasDesktopLink?: boolean
	}
	desktop: {
		hasLobby?: boolean
		menuActionType: keyof typeof MenuActionEnum
		subMenuImageClassName?: string
	}
	pathname?: string
	query?: {
		provider?: string
		type?: string
		tpId?: string | number
	}
	needLogin?: boolean
}

export type TMenuData = {
	display?: string
	category: MenuKeyEnum | NovaMenuKeyEnum
	desktop: {
		subMenuClassName: string
		menuType?: 'menu' | 'banner'
	}
	displayKey?: string
	h5: {
		icon: string
		subMenuClassName?: string
	}
	iconUrl?: string
	lobbyCategoryId: number
	pathname?: string
	query?: { provider: string }
	subMenu: ISubMenu[]
	subMenuAllowCurrenciesWithAuth: boolean // * 決定是否需要登入後才過濾(暫時沒有用到)
}

// interface IDynamicSubMenuOtherType
// 	extends IStaticSubMenuItemOtherType,
// 		ISubMenuData,
// 		IProduct,
// 		IAddLiveStreamingProps {}

// export interface IDynamicSubMenuLinkType
// 	extends IStaticSubMenuItemLinkType,
// 		ISubMenuData,
// 		IProduct,
// 		IAddLiveStreamingProps {}

// // * 點擊 menu 遊戲產品的參數(Lobby Header Api)
// export type IDynamicSubMenuItem =
// 	| IDynamicSubMenuLinkType
// 	| IDynamicSubMenuOtherType
// export type IStaticSubMenuItem =
// 	| IStaticSubMenuItemLinkType
// 	| IStaticSubMenuItemOtherType
