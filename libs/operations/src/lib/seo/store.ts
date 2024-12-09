import { META_DATA } from '@noble888/src/data/metaData'
import { getSeo } from 'JF-api/site/server'
import { create } from 'zustand'
import { ISeoData } from './type'

interface ISeoStore {
	seoData: ISeoData
	isSuccess: boolean
	fetchSeoData: ({ langId }: { langId: string }) => Promise<void>
}

export const useSeoStore = create<ISeoStore>(set => ({
	seoData: {},
	isSuccess: false,
	fetchSeoData: async ({ langId }: { langId: string }) => {
		try {
			const data = await getSeo()
			let pathname = ''
			if (typeof window !== 'undefined') {
				pathname = window.location.pathname
			}
			const pathArr = pathname?.split('/').filter(str => str !== '')
			let seoData = {}

			if (META_DATA[`/${pathArr[1]}`]) {
				const rootPath = META_DATA[`/${pathArr[1]}`]
				seoData = {
					...data,
					title: rootPath?.[langId]?.title ?? rootPath?.['en']?.title,
					keyword: rootPath?.[langId]?.keyword ?? rootPath?.['en']?.keyword,
					description:
						rootPath?.[langId]?.description ?? rootPath?.['en']?.description,
					links: rootPath?.[langId]?.links ?? rootPath?.['en']?.links,
				}
			} else {
				seoData = {
					...data,
					description: data?.meta,
					links: META_DATA?.[langId]?.['links'],
				}
			}

			set({ seoData, isSuccess: true })
		} catch (error) {
			set({ seoData: {}, isSuccess: false })
		}
	},
}))
