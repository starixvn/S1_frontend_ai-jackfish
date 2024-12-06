export type TLangGroupsData = {
	[lang: string]: {
		displayText: string
		value: string
		currencyId: number
		mainLanguage?: boolean
	}[]
}
