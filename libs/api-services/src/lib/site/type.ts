export enum BannerTypeEnum {
	Main = 1,
	HotEvent,
	Slots,
}

export enum BannerActionEnum {
	NoAction = 1,
	GoToGame,
	GoToBonus,
	OpenWindow,
	RedirectPage,
	RedirectPageOfThisSite,
}

export interface IGetBannerPayload {
	currencyId?: number
	bannerType: BannerTypeEnum
}

export type TBannerData = {
	bannerName: string
	bannerType: number
	actionMode: number
	bonusCode: null
	tpId: string
	gameId: string | null | undefined
	urlRouter: string
	details: null
	bannerLink: string
	bannerPCUrl: string
	bannerMobileUrl: string
	logo: null
	backgroundPic: null
	tpGameType: number
	redirectLink: string | null
	itemKey: string
}

export type TTpMaintainData = {
	siteId: number
	tpId: number
	tpGameType: number
	tpCategoryId: number
	beginDate: null | string
	endDate: null | string
	maintainType: number
	typeValue: number
	beginTime: null | string
	endTime: null | string
}
