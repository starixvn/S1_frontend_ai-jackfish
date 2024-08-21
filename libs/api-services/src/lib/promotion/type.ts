export interface IDepositPromotionCanJoinTierAmountData {
	requiredAmount: number
	bonusAmount: number
	lockedAmount: number
}

export interface IDepositPromotionTierAmountData {
	requiredAmount: number
	bonus: number
	maxBonus: number
}

export interface IDepositPromotionData {
	banner: string
	beenUsed: boolean
	bonus: number
	bonusCode: string
	bonusType: number
	canJoin: boolean
	canJoinTierAmountList: IDepositPromotionCanJoinTierAmountData[]
	cashBackDetails: null
	categoryId: number
	custExpiryTime: null | string
	custRollOver: number
	custTurnOver: number
	depositAmount: number
	depositId: null | string
	description: string
	details: null
	deviceType: null
	displayFrom: number
	displayTo: number
	fullFillType: number
	isJoin: boolean
	lockedType: number
	maxAmount: number
	maxBonus: number
	periodFrom: number
	periodTo: number
	promotionAction: number
	promotionLink: null
	promotionType: number
	refList: null
	requiredAmount: number
	result: number
	rollOver: number
	sort: number
	status: number
	tierAmountList: IDepositPromotionTierAmountData[]
	title: string
	tpId: number
	walletType: number
	winOver: number
}

export interface ISetDepositPromotionQueueArgs {
	langId: string
	transId: string
	bonusCode: string
}
