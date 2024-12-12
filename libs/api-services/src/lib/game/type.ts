import { MenuActionEnum, TProductProps } from 'JF-constants'

export enum SlotGameCategoryEnum {
	Jackpot = 2,
}

/** @IGetSlotPagePayload 使用'Game/GetSlotGamePage' api 需要的參數type */
export interface IGetSlotPagePayload {
	deviceType: number
	currencyId: number
	slotGameCategoryList?: SlotGameCategoryEnum[]
}

export interface IGameData {
	slotGameId: string
	tpId: number
	gameId: string
	appId: string
	launchDate: string
	reels: string
	rtp: string
	paylines: string
	playFree: boolean
	gameName: {
		[lang: string]: string
	}
	slotGameCategoryList: number[]
	imgName: {
		[lang: string]: string
	}
	sort: number
	top: number
}
export interface IDisplayGameData extends IGameData {
	isMaintain?: boolean
	isFavorite?: boolean
}
export interface IVendorData {
	tpId: number
	tpName: string
	tpGameType: number
	playFree: boolean
	displayText: string
	imgName: string
	gameImgDisplayText: string
	sort: number
	openPath: string
}

/** @ISlotsGameData 使用'Game/GetSlotGamePage' api取回的資料格式 */
export interface ISlotsGameData {
	all?: IGameData[]
	buyFeaturesGames?: IGameData[]
	featured?: IGameData[]
	imgUrl?: string
	jackpot?: IGameData[]
	megaways?: IGameData[]
	mini?: IGameData[]
	myFavorite?: IGameData[]
	new?: IGameData[]
	providerList?: IVendorData[]
	random?: IVendorData[]
	recentlyPlayed?: IGameData[]
	tableAndCards?: IGameData[]
	arcade?: IGameData[]
}

export type ISlotsCategoryData = Pick<
	ISlotsGameData,
	| 'all'
	| 'mini'
	| 'recentlyPlayed'
	| 'new'
	| 'featured'
	| 'jackpot'
	| 'tableAndCards'
	| 'arcade'
	| 'buyFeaturesGames'
	| 'megaways'
	// | 'myFavorite'
>

/////////////
/** @IGetLobbyHeaderPayload 使用'Game/GetLobbyHeader' api 需要的參數type */
export interface IGetLobbyHeaderPayload {
	siteId: number
	currencyId: number
}

export interface ISubMenuDesktopData {
	menuActionType: MenuActionEnum
}

/** @ISubMenuData 使用'Game/GetLobbyHeader' api取回的資料格式 */
export interface ISubMenuData extends TProductProps {
	currencyGameName?: Record<string, string> | null
	desktop?: ISubMenuDesktopData
	gameId?: number | string
	h5?: ISubMenuDesktopData
	iconEndTime: string
	iconStartTime: string
	iconType: number
	isTpMaintain: boolean
	lobbyCategory: string
	mobileHeaderPicUrl: string
	mobileLobbyPicUrl: string
	pathname: string
	pcHeaderPicUrl: string
	pcLobbyPicUrl: string
	productName: string
	query?: { provider?: string; tpId?: number }
	rwdHeaderPicUrl: string
	rwdLobbyPicUrl: string
	sort: number
	tpName: string
}
export interface TLobbyHeaderData {
	lobbyCategoryId: number
	data: ISubMenuData[]
}

export type IHotGame = {
	gameId: string
	gameLogo: string
	gameName: string
	sort: number
	tpCategory: number
	tpGameType: number
	tpId: number
	tpLogo: string
	tpName: string
	isTpMaintain?: boolean
}

export interface THotGameData {
	HotGame: IHotGame[]
	NewGame?: IHotGame[]
	Progressive?: IHotGame[]
	TopCasino?: IHotGame[]
}

export interface IGetHotGameListPayload {
	deviceType: number
	currencyId: number
}
