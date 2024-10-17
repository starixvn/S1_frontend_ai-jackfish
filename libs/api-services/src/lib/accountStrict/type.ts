export enum UserInfoActStatusEnum {
	NonDeposit = 1,
	HasDeposit,
}

// *  會員類型
export enum UserInfoMemberType {
	Normal = 1,
	Affiliate,
	LiveStreaming,
}

export type TUserInfoData = {
	custId?: number
	currencyName?: string // * AuthStore 透過 CURRENCY_NAME_BY_CURRENCY 塞值
	userName: string
	currencyId: number
	langId: string
	email?: string
	accountName?: string
	birth_d?: string
	birth_m?: string
	birth_y?: string
	regTime?: string
	lastLogin?: string
	country?: string
	areaCode?: string
	phoneNo?: string
	perCountry?: string
	userLevel?: number
	phoneVerified?: false
	phoneReward?: number
	emailVerified?: false
	emailReward?: number
	enablePromotion?: number
	isLineBinding?: boolean
	addressCountry?: null | string
	addressState?: null | string
	addressPostCode?: null | string
	addressCity?: null | string
	addressLineFirst?: null | string
	addressLineSecond?: null | string
	isResetPwd?: boolean
	actStatus?: UserInfoActStatusEnum
	memberType?: UserInfoMemberType
}

export interface ISetLocalBankInfoArgs {
	accountName: string
	accountNo: string
	sysId: number
	IFSCCode?: string
}
