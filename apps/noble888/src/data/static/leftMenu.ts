import {
	CurrenciesEnum,
	LeftMenuKeyEnum,
	TLeftMenuData,
	paths,
} from 'JF-constants'
import { ALLOWED_CURRENCIES } from './allowedCurrencies'

export const LEFT_MENU_DATA: TLeftMenuData = {
	[LeftMenuKeyEnum.Cashier]: {
		displayKey: 'Label_General_Cashier',
		subMenu: {
			deposit: {
				displayKey: 'Label_General_Deposit',
				pathname: paths.deposit.root,
				allowCurrencies: false,
			},
			transfer: {
				displayKey: 'Label_General_TransferFunds',
				pathname: paths.transferFunds.root,
				allowCurrencies: ALLOWED_CURRENCIES['TRANSFER'],
			},
			withdrawal: {
				displayKey: 'Label_General_Withdrawal',
				pathname: paths.withdrawal.root,
				allowCurrencies: false,
			},
			history: {
				displayKey: 'Label_General_History',
				pathname: paths.history.root,
				allowCurrencies: false,
			},
			statement: {
				displayKey: 'Label_General_Statement',
				pathname: paths.statement.root,
				allowCurrencies: false,
			},
		},
	},
	[LeftMenuKeyEnum.MyAccount]: {
		displayKey: 'Label_General_MyAccount',
		subMenu: {
			profile: {
				displayKey: 'Label_General_Profile',
				pathname: paths.profile.root,
				allowCurrencies: false,
			},
			bankInfo: {
				displayKey: 'Label_General_BankInfo',
				pathname: paths.bankInfo.root,
				allowCurrencies: ALLOWED_CURRENCIES['BANK_INFO'] as CurrenciesEnum[],
			},
			cryptoWallet: {
				displayKey: 'Label_General_CryptoWallet',
				pathname: paths.cryptoWallet.root,
				allowCurrencies: false,
			},
			referral: {
				displayKey: 'Label_General_ReferFriends',
				pathname: paths.referral.root,
				allowCurrencies: ALLOWED_CURRENCIES['REFER_FRIENDS'],
			},
			selfExclusion: {
				displayKey: 'Label_General_SelfExclusion',
				pathname: paths.selfExclusion.root,
				allowCurrencies: false,
			},
			setting: {
				displayKey: 'Label_General_Setting',
				pathname: paths.setting.root,
				allowCurrencies: false,
			},
		},
	},
	[LeftMenuKeyEnum.Message]: {
		displayKey: 'Label_General_Message',
		subMenu: {
			message: {
				displayKey: 'Label_General_PersonalMessage',
				pathname: paths.message.root,
				allowCurrencies: false,
			},
			announcement: {
				displayKey: 'Label_General_Announcement',
				pathname: paths.announcement.root,
				allowCurrencies: false,
			},
		},
	},
}
