import { CurrenciesEnum } from 'JF-constants'

export const langId = {
	en: 'en',
	th: 'th',
	cs: 'cs',
	vn: 'vn',
	kh: 'kh',
	bd: 'bd',
	id: 'id',
	ko: 'ko',
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
	ko: '한국어',
	ar: 'اَلْعَرَبِيَّةُ',
}

// value的地方順序很重要！如果放在最前面，代表預設語言，會顯示在下拉選單中的最上面

export const languageGroup = {
	// [CurrenciesEnum.MYR]: [langId.en],
	[CurrenciesEnum.USD]: [langId.en, langId.ar],
	// [CurrenciesEnum.THB]: [langId.th, langId.en],
	// [CurrenciesEnum.CNY]: [langId.cs, langId.en],
	// [CurrenciesEnum.VND]: [langId.vn, langId.en],
	// [CurrenciesEnum.KHM]: [langId.kh, langId.en],
	// [CurrenciesEnum.BDT]: [langId.bd, langId.en],
	// [CurrenciesEnum.IDR]: [langId.en],
	// [CurrenciesEnum.INR]: [langId.id, langId.en],
	// [CurrenciesEnum.KRW]: [langId.ko, langId.en],
	// [CurrenciesEnum.BRL]: [langId.en],
	// [CurrenciesEnum.USDT]: [langId.en],
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
	ko: 'Korea',
	ar: 'Arab',
}
