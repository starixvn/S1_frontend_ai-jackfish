import { CurrenciesEnum } from '../currency'

export enum LeftMenuKeyEnum {
	'Cashier' = 'Cashier',
	'MyAccount' = 'MyAccount',
	'Message' = 'Message',
}

export type TLeftMenuData = {
	[key in LeftMenuKeyEnum]: {
		displayKey: string
		subMenu: {
			[key: string]: {
				displayKey: string
				pathname: string
				allowCurrencies?: CurrenciesEnum[] | boolean // * true: 全開, false: 全關
			}
		}
	}
}
