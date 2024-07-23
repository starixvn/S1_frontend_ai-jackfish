import { TProductProps } from '../products'

export enum MenuKeyEnum {
	HotGame = 'HotGame',
	Sports = 'Sports',
	ESports = 'ESports',
	Casino = 'Casino',
	Slots = 'Slots',
	Games = 'Games',
	Fishing = 'Fishing',
	Lottery = 'Lottery',
}

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

export type TSubMenuData = {
	lobbyCategory: string
	tpId: number
	tpName: string
	productName: string
	tpGameIdNo: number | undefined
	gameId?: number | string
	tpGameType: number
	currencyGameName: Record<string, string> | null
	pcHeaderPicUrl: string
	pcLobbyPicUrl: string
	mobileHeaderPicUrl: string
	mobileLobbyPicUrl: string
	sort: number
	iconEndTime: string
	iconStartTime: string
	iconType: number
}

type TMenuActionLinkType = Extract<
	keyof typeof MenuActionEnum,
	'Link' | 'WindowOpen'
>

type TMenuActionOtherType = Exclude<
	keyof typeof MenuActionEnum,
	'Link' | 'WindowOpen'
>

type TStaticSubMenuItemLinkType = TProductProps & {
	imgUrl: string
	displayKey: string
	menuActionType: TMenuActionLinkType
	pathname: string
	params?: {
		name: string
		value: string
	}
	needLogin?: boolean
}

type TStaticSubMenuItemOtherType = TProductProps & {
	imgUrl: string
	displayKey: string
	menuActionType: TMenuActionOtherType
	needLogin?: boolean
}

export type TDynamicSubMenuLinkType = TStaticSubMenuItemLinkType &
	TSubMenuData & {
		isTpMaintain: boolean
		// noPlay?: boolean
		// noShow?: boolean
	}

export type TDynamicSubMenuOtherType = TStaticSubMenuItemOtherType &
	TSubMenuData & {
		isTpMaintain: boolean
		// noPlay?: boolean
		// noShow?: boolean
	}

export type TDynamicSubMenuItem =
	| TDynamicSubMenuLinkType
	| TDynamicSubMenuOtherType

export type TStaticSubMenuItem =
	| TStaticSubMenuItemLinkType
	| TStaticSubMenuItemOtherType
