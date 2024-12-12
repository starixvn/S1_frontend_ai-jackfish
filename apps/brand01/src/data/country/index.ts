import { CurrenciesEnum } from 'JF-constants'

export const langId = {
	en: 'en',
	th: 'th',
	cs: 'cs',
	vn: 'vn',
	kh: 'kh',
	bd: 'bd',
	id: 'id',
	ar: 'ar',
} as const

export type LangId = (typeof langId)[keyof typeof langId]

export const langLabel: Record<LangId, string> = {
	en: 'English',
	th: 'ภาษาไทย',
	cs: '简体中文',
	vn: 'Tiếng Việt',
	kh: 'ខ្មែរ',
	bd: 'বাংলা',
	id: 'Bhs Indonesia',
	ar: 'اَلْعَرَبِيَّةُ',
}

export const languageGroup: Record<CurrenciesEnum, LangId[]> = {
	[CurrenciesEnum.MYR]: [langId.en],
	[CurrenciesEnum.USD]: [langId.en],
	[CurrenciesEnum.THB]: [langId.th, langId.en],
	[CurrenciesEnum.CNY]: [langId.en, langId.cs],
	[CurrenciesEnum.VND]: [langId.en, langId.vn],
	[CurrenciesEnum.KHM]: [langId.en, langId.kh],
	[CurrenciesEnum.BDT]: [langId.en, langId.bd],
	[CurrenciesEnum.IDR]: [langId.en],
	[CurrenciesEnum.INR]: [langId.en, langId.id],
	[CurrenciesEnum.KRW]: [langId.en],
	[CurrenciesEnum.BRL]: [langId.en],
	[CurrenciesEnum.USDT]: [langId.en],
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
