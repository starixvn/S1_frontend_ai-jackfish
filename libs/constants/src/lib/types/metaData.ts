export type TMetaData = {
	[path: string]: {
		[lang: string]: {
			title?: string
			description?: string
			keyword?: string
			links: {
				rel?: string
				href?: string
				media?: string
				hrefLang?: string
			}[]
		}
	}
}
