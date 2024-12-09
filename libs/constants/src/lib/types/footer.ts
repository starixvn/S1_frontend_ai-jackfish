import { IProduct } from 'JF-constants'

export interface IFooterData {
	copyRightList?: ICopyRightData[]
	quickLinks?: IQuickLinksData[]
	platformList?: IPlatformListData[]
	programList?: IProgramData[]
	promotionTextList?: IPromotionTextData[]
	programDescriptionList?: IProgramDescriptionData[]
	licenseData: ILicenseData
	suggestedBrowser?: ISuggestedBrowserData[]
	paymentMethodsByCurrencyId?: {
		[key: number]: IPaymentMethod[]
	}
	aboutUsList?: IAboutUsListData[]
}

interface IQuickLinksData {
	displayKey: string
	href: string
}

type ICopyRightData = IQuickLinksData

export interface IPlatformListData extends IProduct {
	imgName: string
	hoverImgName?: string
}

interface IProgramData {
	applyNowLink: string
	icon: string
	displayKey: string
	description: string
	hotKeyName: string
}

interface IProgramDescriptionData {
	contents: {
		displayKey: string
		description: string
	}[]
}

export interface ILicenseData {
	defaultScript: string
	defaultXCMScript: string
}

interface ISuggestedBrowserData {
	imageSrc: string
	alt: string
	width: number
	height: number
}

interface IPaymentMethod {
	name: string
	img: string
}

export interface ISeoData {
	siteId?: number
	meta?: string
	defaultLang?: string
	activeDomain?: boolean
	followUs?: null
	paymentMethod?: null
	script?: string
	xcmScript?: string
	title?: string
	keyword?: string
	description?: string
	links?: {
		rel?: string
		href?: string
		hrefLang?: string
		media?: string
	}[]
}

export interface IPromotionTextData {
	title: string
	content: string
}

export interface ISponsorsListdata {
	imgUrl: string
	year: string
}

export interface IAboutUsListData {
	displayText: string
	pathname: string
}

export interface IGameProvidersData {
	imgUrl: string
	pathname: string
	mobileGroup?: number
}

export enum SocialChannelEnum {
	HOME = 1,
	CONTACT_US,
	APP,
	FOOTER,
}

export const footerImgName: Record<string, string> = {
	Youtube: 'youtube.png',
	Telegram: 'tga.png',
	Facebook: 'fb.png',
	Twitter: 'twitter.png',
	Instagram: 'ig.png',
	WhatsApp: 'whatsapp.png',
	'E-mail': 'email-2.png',
	Livechat: 'livechat-2.png',
	LINE: 'line-1.png',
}
