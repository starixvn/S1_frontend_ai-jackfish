import { ISubMenuData, ISubMenuDesktopData } from 'JF-api/game/type'
import { IRootpath } from '../paths'
import { IProduct, TProductProps } from '../products'

// === Menu Category Enums ===
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

// === Core Action Interfaces ===
export interface IGoToGameArgs {
	tpId: number
	langId: string
	appType?: number
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

// === Action Type Definitions ===
type TMenuActionLinkType = Extract<
	keyof typeof MenuActionEnum,
	'Link' | 'WindowOpen'
>

type TMenuActionOtherType = Exclude<
	keyof typeof MenuActionEnum,
	'Link' | 'WindowOpen'
>

// === Menu Item Interfaces ===
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
	category?: MenuKeyEnum | undefined
	desktop?: {
		subMenuClassName?: string | undefined
	}
	display?: 'h5' | 'desktop' | 'all'
	displayKey?: string
	h5?: {
		subMenuClassName?: string
		icon: string
	}
	lobbyCategoryId?: number | undefined
	pathname?: string
	iconUrl?: string
	subMenu: ISubMenu[]
	subMenuAllowCurrenciesWithAuth?: boolean | undefined
	query?: { provider: string }
}

// === Icon Related Enums ===
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
	keyof typeof MenuActionEnum,
	'Link' | 'WindowOpen'
>

export type IMenuActionOtherType = Exclude<
	keyof typeof MenuActionEnum,
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

export interface ISubMenu extends TProductProps {
	currencyGameName?: Record<string, string> | null
	iconEndTime?: string
	iconStartTime?: string
	iconType?: MenuIconTypeEnum
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
	isTpMaintain?: boolean
	gameId?: number | string
}

export type TMenuData = {
	display?: string
	category: MenuKeyEnum | NovaMenuKeyEnum | undefined
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
	subMenuAllowCurrenciesWithAuth: boolean
}

export enum LoginGameTypeEnum {
	returnGameUrl = 1,
	returnHtml,
}
