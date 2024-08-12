import { CurrenciesEnum } from './types'

export const CURRENCY_NAME_BY_CURRENCY: { [key: number]: string } = {
	[CurrenciesEnum.MYR]: 'MYR',
	[CurrenciesEnum.THB]: 'THB',
	[CurrenciesEnum.IDR]: 'IDR',
	[CurrenciesEnum.INR]: 'INR',
	[CurrenciesEnum.BDT]: 'BDT',
	[CurrenciesEnum.CNY]: 'CNY',
	[CurrenciesEnum.USD]: 'USD',
	[CurrenciesEnum.KHM]: 'KHM',
	[CurrenciesEnum.VND]: 'VND',
	[CurrenciesEnum.KRW]: 'KRW',
	[CurrenciesEnum.BRL]: 'BRL',
}

export const AREA_CODE_BY_CURRENCY: { [key: number]: string } = {
	[CurrenciesEnum.MYR]: '+60',
	[CurrenciesEnum.THB]: '+66',
	[CurrenciesEnum.IDR]: '+62',
	[CurrenciesEnum.INR]: '+91',
	[CurrenciesEnum.BDT]: '+880',
	[CurrenciesEnum.CNY]: '+86',
	[CurrenciesEnum.USD]: '',
	[CurrenciesEnum.KHM]: '+855',
	[CurrenciesEnum.VND]: '+84',
	[CurrenciesEnum.KRW]: '+82',
	[CurrenciesEnum.BRL]: '+55',
}

export const PHONE_DIGITS_LIMIT: { [key: string]: string } = {
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.MYR]]: '9-10',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.THB]]: '9',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.IDR]]: '10-13',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.INR]]: '10',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.BDT]]: '10-11',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.CNY]]: '10',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.KHM]]: '8-9',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.VND]]: '9',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.KRW]]: '9-10',
	[AREA_CODE_BY_CURRENCY[CurrenciesEnum.BRL]]: '10-11',
}

export const LANG_TO_CURRENCY: { [key: string]: number } = {
	th: CurrenciesEnum.THB,
	en: CurrenciesEnum.THB,
	cs: CurrenciesEnum.MYR,
	my: CurrenciesEnum.MYR,
	id: CurrenciesEnum.IDR,
	ko: CurrenciesEnum.KRW,
	hi: CurrenciesEnum.INR,
	kh: CurrenciesEnum.KHM,
	bd: CurrenciesEnum.BDT,
	vn: CurrenciesEnum.VND,
	br: CurrenciesEnum.BRL,
}
