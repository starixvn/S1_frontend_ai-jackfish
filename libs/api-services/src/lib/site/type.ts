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

export interface ISignUpPhoneArgs {
	currencyId: number
	userpwd: string
	areaCode: string
	phoneNo: string
	affCode?: string
	userLang: string
	referralUrl?: string
	affId?: string
	realName: string
	sysId: number
	accountNo: string
}

export interface IExistsPhoneNoArgs {
	areaCode: string
	phoneNo: string
}

export interface IResetPwdByOTPArgs {
	userName?: string
	areaCode: string
	phoneNo: string
}

export interface IResetPwdByPhoneArgs {
	areaCode: string
	phoneNo: string
	newPassword: string
}

export interface IVerifyOTPArgs {
	areaCode: string
	phoneNo: string
	inputOTPcode: string
}

export interface ISocialChannelArgs {
	currencyId: number
	langId: string
	displayPage: number
}

export type TSocialChannelData = {
	id: number
	channelName: string
	title: string
	link: string
	linkType: number
	scheme: {
		ios: string
		android: string
	}
}
