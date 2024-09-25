export const DEPOSIT_PAYMENT_TYPE = {
	BankTransfer: 'BankTransfer',
	OnlineBanking: 'OnlineBanking',
	QuickTransfer: 'QuickTransfer',
	AutoChannel: 'AutoChannel',
	ChatTransfer: 'ChatTransfer',
	LinePay: 'LinePay',
	EWallet: 'EWallet',
	TopUpCard: 'TopUpCard',
	Crypto: 'Crypto',
	QRPay: 'QRPay',
} as const

export type DepositPaymentType = keyof typeof DEPOSIT_PAYMENT_TYPE

export const DEPOSIT_OPTIONS_IMAGE = {
	BankTransfer: {
		title: 'Label_Deposit_BankTransfer',
		image:
			'https://imgs.tuk555.net/img/icon/financial-transactions/icon-bank.png',
	},
	OnlineBanking: {
		title: 'Label_Deposit_OnlineBanking',
		image:
			'https://imgs.tuk555.net/img/icon/financial-transactions/icon-online.png',
	},
	EWallet: {
		title: 'Label_Deposit_MobileEWallet',
		options: [
			{
				displayGroupName: 'TrueMoney',
				groupId: 34,
				image:
					'https://imgs.tuk555.net/img/icon/financial-transactions/icon-truemoney.png',
			},
			{
				displayGroupName: 'ThaiQR',
				groupId: 5,
				image:
					'https://imgs.tuk555.net/img/icon/financial-transactions/icon-thaiqr.png',
			},
			{
				displayGroupName: 'PromptPay',
				groupId: 49,
				image:
					'https://imgs.tuk555.net/img/icon/financial-transactions/icon-promptpay.png',
			},
		],
	},
	Crypto: {
		title: 'Label_Deposit_Crypto',
		image:
			'https://imgs.tuk555.net/img/icon/financial-transactions/icon-usdt-trc20.png',
	},
} as const

export enum DepositTypeEnum {
	OnlineBanking = 1,
	MobilePayment,
	BankTransfer,
	CryptoPay,
	TopUpCard,
	QRPay,
	BankAutoChannel = 7,
	CryptoWallet = 8,
	QuickTransfer = 9,
	ChatTransfer = 10,
}

export enum DepositStatusEnum {
	Draft,
	Pending,
	Paid,
	Approved,
	Rejected,
	Cancelled,
	Expired,
	OnHold,
	Processing,
}
