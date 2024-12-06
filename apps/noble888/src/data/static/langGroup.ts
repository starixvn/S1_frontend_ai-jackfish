import { CurrenciesEnum, TLangGroupsData } from 'JF-constants'

export const LANG_GROUPS: TLangGroupsData = {
	ch: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.MYR,
			mainLanguage: true,
		},
		{
			displayText: '简体中文',
			value: 'cs',
			currencyId: CurrenciesEnum.MYR,
		},
		{
			displayText: 'Malay',
			value: 'my',
			currencyId: CurrenciesEnum.MYR,
		},
	],
	th: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.THB,
		},
		{
			displayText: 'ภาษาไทย',
			value: 'th',
			currencyId: CurrenciesEnum.THB,
			mainLanguage: true,
		},
	],
	id: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.IDR,
		},
		{
			displayText: 'Indonesian',
			value: 'id',
			currencyId: CurrenciesEnum.IDR,
			mainLanguage: true,
		},
	],
	in: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.INR,
		},
		{
			displayText: 'हिंदी',
			value: 'hi',
			currencyId: CurrenciesEnum.INR,
			mainLanguage: true,
		},
	],
	vn: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.VND,
		},
		{
			displayText: 'Tiếng Việt',
			value: 'vn',
			currencyId: CurrenciesEnum.VND,
			mainLanguage: true,
		},
	],
	gb: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.USD,
			mainLanguage: true,
		},
		{
			displayText: '简体中文',
			value: 'cs',
			currencyId: CurrenciesEnum.USD,
		},
	],
	bd: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.BDT,
		},
		{
			displayText: 'বাংলা',
			value: 'bd',
			currencyId: CurrenciesEnum.BDT,
			mainLanguage: true,
		},
	],
	cs: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.CNY,
		},
		{
			displayText: '简体中文',
			value: 'cs',
			currencyId: CurrenciesEnum.CNY,
			mainLanguage: true,
		},
	],
	kh: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.KHM,
		},
		{
			displayText: 'ខ្មែរ',
			value: 'kh',
			currencyId: CurrenciesEnum.KHM,
			mainLanguage: true,
		},
	],
	br: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.BRL,
		},
		{
			displayText: 'Portugese',
			value: 'br',
			currencyId: CurrenciesEnum.BRL,
			mainLanguage: true,
		},
	],
	// 日本語位置
	ko: [
		{
			displayText: 'English',
			value: 'en',
			currencyId: CurrenciesEnum.KRW,
		},
		{
			displayText: '한국어',
			value: 'ko',
			currencyId: CurrenciesEnum.KRW,
			mainLanguage: true,
		},
	],
}
