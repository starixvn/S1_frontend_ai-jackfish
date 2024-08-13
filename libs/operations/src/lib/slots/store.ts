import { CATEGORY_SORT } from '@brand01/src/data/slots/categorySort'
import { getSlotGamePage } from 'JF-api/game/server'
import {
	ISlotsCategoryData,
	ISlotsGameData,
	IVendorData,
} from 'JF-api/game/type'
import { pick } from 'lodash-es'
import { create } from 'zustand'

interface ISlotPageType {
	fetchSlotGameData: () => Promise<void>
	isloading: boolean
	providerList: IVendorData[]
	slotGamesData: ISlotsGameData
	slotsCategoryData: ISlotsCategoryData
	categoryKeys: string[]
	setCategoryKeys: (categoryKey: string[]) => void
}

/**
 * @fetchSlotGameData 呼叫api
 * @providerList 所有遊戲商的列表
 * @categoryKeys 放所有slotsCategoryData keys的 string[] (ex: 'all','mini','recentlyPlayed','new','featured'.....)
 * @slotGamesData 單純把getSlotGamePage api 的物件丟出去 => 未篩選
 * @slotsCategoryData 根據CATEGORY_SORT裡的keys，去篩選從api回來的資料，以顯示在分類選單
 */
export const useSlotPageStore = create<ISlotPageType>(set => ({
	isloading: false,
	providerList: [],
	slotGamesData: {},
	slotsCategoryData: {},
	categoryKeys: [],
	setCategoryKeys: categoryKey => set(() => ({ categoryKeys: categoryKey })),
	fetchSlotGameData: async () => {
		set({ isloading: true })
		try {
			const data = await getSlotGamePage()
			const { providerList } = data
			set({
				isloading: false,
				providerList,
				slotGamesData: data,
				slotsCategoryData: pick(data, CATEGORY_SORT),
				categoryKeys: Object.keys(pick(data, CATEGORY_SORT)),
			})
		} catch (error) {
			set({ isloading: false })
		}
	},
}))
