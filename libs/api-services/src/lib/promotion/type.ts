export enum PromotionType {
	FirstDeposit = 1,
	Redeposit = 2,
	FreeBet = 3,
	WalletBonus = 5,
	Rebate = 6,
	Cashback = 7,
	SpecialBonus = 8,
	RetentionFreeBet = 9,
	MissionBonus = 11,
	PromoCode = 9001,
}

export enum PromotionStatus {
	None,
	Ongoing,
	Canceled,
	Expired,
	Fulfilled,
	TransferredOut,
}

export enum PromotionCategory {
	BonusWallet,
	Slots,
	LiveCasino,
	Fish,
	SabaSports,
	Lottery,
	Sports,
	PtSlots,
	PtLiveCasino,
	SBSW,
	Mega888SlotRNGFishing,
	ESports,
}

export enum PromotionWalletType {
	Transfer = 0,
	Seamless,
}

export enum PromotionPeriodType {
	Daily = 1,
	Weekly,
	Monthly,
}

export enum PromotionActionType {
	Link = 0,
	Detail,
}

export type TCashBackDetailData = {
	totalBonus: number // Total Bonus Claimable
	maxBonus: number // Max Bonus
	totalLossAmount: number // Total Net Loss
	minLossAmount: number // Min Net Loss Required
	originalTotalBonus: number // Total Bonus
	percentage: string // percentage
	tpName: string
	lossAmountWithBonus: number
	lossAmount: number
	cashBackDetail: TCashBackDetailData[]
}

export type TPromotionDataBase = {
	banner: string
	beenUsed: boolean
	bonus: number
	bonusCode: string
	bonusType: number
	canJoin: boolean
	categoryId: number
	custRollOver: number
	custTurnOver: number
	depositAmount: number
	depositId: null | string
	description: string
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
	promotionType: PromotionType
	requiredAmount: number
	result: number // * 0=成功
	rollOver: number
	sort: number
	status: PromotionStatus
	title: string
	tpId: number
	walletType: number
	winOver: number
}

export type TTierAmount = {
	bonus: number
	maxBonus: number
	requiredAmount: number
	requiredTurnover: number
	rollOver: number
	winOver: number
}

export type TCanJoinTierAmount = {
	requiredAmount: number
	requiredTurnover: number
	bonus: number
	bonusAmount: number
	lockedAmount: number
}

export type TPromotionData = TPromotionDataBase & {
	canJoinTierAmountList: TCanJoinTierAmount[]
	cashBackDetails: TCashBackDetailData
	custExpiryTime: string
	details: string | null
	deviceType: number | null
	promotionLink: string | null
	refList: {
		depositId: number
		amount: number
	}[]
	tierAmountList: TTierAmount[]
	periodType: number
	missionBonusProgress: {
		depositAmountSum: number
		turnoverSum: number
	}
}

export type TRebateExcludeGameData = {
	gameName: string
	tpCategoryName: string
	tpGameType: number
	tpGameTypeName: string
	tpName: string
}

export type TDepositPromotionCanJoinTierAmountData = {
	requiredAmount: number
	bonusAmount: number
	lockedAmount: number
}

export type TDepositPromotionTierAmountData = {
	requiredAmount: number
	bonus: number
	maxBonus: number
}

export type TDepositPromotionData = TPromotionDataBase & {
	canJoinTierAmountList: TDepositPromotionCanJoinTierAmountData[]
	cashBackDetails: null
	custExpiryTime: null | string
	details: null
	deviceType: null
	promotionLink: null
	refList: null
	tierAmountList: TDepositPromotionTierAmountData[]
}

export type TPromotionBonusData = { bonusCode: null | string }

export interface IGetPromotionBaseArgs {
	deviceType: number
	langId: string
}

export interface IGetPromotionListArgs extends IGetPromotionBaseArgs {
	currencyId: number
}

export interface IGetPromotionDetailArgs extends IGetPromotionBaseArgs {
	bonusCode: string
	currencyId: number
}

export interface IGetRebateExcludeGameListArgs extends IGetPromotionBaseArgs {
	currencyId: number
}

export interface ISetClaimPromotionArgs extends IGetPromotionBaseArgs {
	bonusCode: string
	lockedAmount: number
}

export interface ISetDepositPromotionQueueArgs extends IGetPromotionBaseArgs {
	transId: string
	bonusCode: string
}

export interface ISetSpecialCodeArgs extends IGetPromotionBaseArgs {
	specialCode: string
}
