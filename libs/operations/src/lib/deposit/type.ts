import {
	TBankInfoData,
	TEWalletData,
	TUSDTDetailData,
} from 'JF-api/account/type'
import {
	BankAccountInfo,
	EWalletData,
	IDepositInfoRecentData,
	IPayInfoListAllData,
} from 'JF-api/payment/type'
import { DepositPaymentType } from 'JF-constants'
import { TFunction } from 'i18next'
import { Dispatch, SetStateAction } from 'react'

export interface IDepositState {
	isInit: boolean
	isLoading: boolean
	payInfoListAll: null | IPayInfoListAllData
	paymentOptions: Array<PaymentOption>
	runningDepositRequestList: Array<IDepositInfoRecentData>
	bankData: {
		custEWalletInfo: TEWalletData[]
		bankInfoDetail: TBankInfoData[]
		usdtDetail: TUSDTDetailData[]
	}
}

export interface IDepositAction {
	fetchPayInfoListAll: () => Promise<void>
	onSubmitBankTransfer: (
		amount: number,
		originBonusCode: string | null | undefined,
		promoCode: string | null | undefined,
		imageFile: File | null,
		setImageFile: Dispatch<SetStateAction<File | null>>,
		currencyId: number,
		sysIdParam: string | null,
		bankAccountInfo: BankAccountInfo | undefined,
		langId: string,
		t: TFunction<string, undefined>,
	) => Promise<void>
	onSubmitOnlineBanking: (
		amount: number,
		originBonusCode: string | null | undefined,
		promoCode: string | null | undefined,
		channelId: number | undefined,
		currencyId: number,
		langId: string,
		t: TFunction<string, undefined>,
	) => Promise<void>
	onSubmitMobilePay: (
		amount: number,
		originBonusCode: string | null | undefined,
		promoCode: string | null | undefined,
		firstChannelId: number | undefined,
		currencyId: number,
		langId: string,
		t: TFunction<string, undefined>,
	) => Promise<void>
	onSubmitCryptoPay: (
		amount: number,
		originBonusCode: string | null | undefined,
		promoCode: string | null | undefined,
		firstChannelId: number | undefined,
		currencyId: number,
		langId: string,
		t: TFunction<string, undefined>,
	) => Promise<void>
}

export interface DepositQuery {
	paymentType: DepositPaymentType
	// BankTransfer query
	sysId?: number
	// OnlineBanking query
	payId?: number
	// EWallet query
	groupId?: number
}

export interface PaymentOption {
	title: string
	query: DepositQuery
	image: string | undefined
	payment?: EWalletData
}
