import { paths } from 'JF-constants'

export const FOOTER_PAYMENT_ICONS = [
	{ key: 'payment-1', icon: '/desktop/img/icon-payment-1.png' },
	{ key: 'payment-2', icon: '/desktop/img/icon-payment-2.png' },
	{ key: 'payment-3', icon: '/desktop/img/icon-payment-3.png' },
	{ key: 'payment-4', icon: '/desktop/img/icon-payment-4.png' },
	{ key: 'payment-5', icon: '/desktop/img/icon-payment-5.png' },
	{ key: 'payment-6', icon: '/desktop/img/icon-payment-6.png' },
	{ key: 'payment-7', icon: '/desktop/img/icon-payment-7.png' },
	{ key: 'payment-8', icon: '/desktop/img/icon-payment-8.png' },
	{ key: 'payment-9', icon: '/desktop/img/icon-payment-9.png' },
	{ key: 'payment-10', icon: '/desktop/img/icon-payment-10.png' },
]

export interface IFooterNavProps {
	displayKey: string
	pathname: string
	iconPath: string
}

export const FOOTER_NAV_LEFT_DATA = [
	{
		displayKey: 'Label_General_LinePay',
		pathname: paths.promotion.root,
		iconPath: '/img/mobile-footer/icon-line.png',
	},
	{
		displayKey: 'Label_General_Promos',
		pathname: paths.promotion.root,
		iconPath: '/img/mobile-footer/icon-promos.png',
	},
] as const satisfies Array<IFooterNavProps>

export const FOOTER_NAV_RIGHT_DATA = [
	{
		displayKey: 'Label_General_Deposit',
		pathname: paths.deposit.root,
		iconPath: '/img/mobile-footer/icon-deposit.png',
	},
	{
		displayKey: 'Label_General_Withdrawal',
		pathname: paths.withdrawal.root,
		iconPath: '/img/mobile-footer/icon-withdraw.png',
	},
] as const satisfies Array<IFooterNavProps>
