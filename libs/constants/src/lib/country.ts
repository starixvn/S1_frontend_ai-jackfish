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

export enum CurrenciesEnum {
	MYR = 2,
	USD = 3,
	THB = 4,
	CNY = 13,
	IDR = 15,
	KRW = 45,
	VND = 51,
	INR = 61,
	KHM = 72,
	BDT = 74,
	BRL = 82,
	USDT = 96,
}

export const languageGroup: Record<CurrenciesEnum, LangId[]> = {
	[CurrenciesEnum.MYR]: [langId.en],
	[CurrenciesEnum.USD]: [langId.en],
	[CurrenciesEnum.THB]: [langId.en, langId.th],
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

export const LANG_GROUP_COUNTRY: {
	[key: string]: string
} = {
	ch: 'Malaysia',
	th: 'Thailand',
	id: 'Indonesia',
	in: 'India',
	cs: 'China',
	gb: 'Global',
	bd: 'Bangladesh',
	kh: 'Cambodia',
	vn: 'Vietnam',
}
