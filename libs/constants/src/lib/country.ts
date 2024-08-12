interface ILanguageGroupData {
	displayText: string
	value: keyof typeof langId
	currencyId: number
}

export const langId = {
	en: 'en',
	th: 'th',
	cs: 'cs',
	vn: 'vn',
	kh: 'kh',
	bd: 'bd',
	id: 'id',
} as const

export const languageGroup = {
	[langId.en]: [{ displayText: 'English', value: langId.en, currencyId: 4 }],
	[langId.th]: [
		{ displayText: 'ภาษาไทย', value: langId.th, currencyId: 4 },
		{ displayText: 'English', value: langId.en, currencyId: 4 },
	],
	[langId.cs]: [
		// { displayText: 'English', value: 'en', currencyId: 4 },
		{ displayText: '简体中文', value: langId.cs, currencyId: 2 },
	],
	[langId.vn]: [
		// { displayText: 'English', value: 'en', currencyId: 4 },
		{ displayText: 'Tiếng Việt', value: langId.vn, currencyId: 51 },
	],
	[langId.kh]: [
		// { displayText: 'English', value: 'en', currencyId: 4 },
		{ displayText: 'ខ្មែរ', value: langId.kh, currencyId: 72 },
	],
	[langId.bd]: [{ displayText: 'বাংলা', value: langId.bd, currencyId: 74 }],
	[langId.id]: [
		{ displayText: 'Bhs Indonesia', value: langId.id, currencyId: 15 },
	],
} as const satisfies Record<keyof typeof langId, Array<ILanguageGroupData>>

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
