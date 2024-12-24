/* eslint-disable @typescript-eslint/no-empty-function */
import {
	getCustTpBetRecordDetailListbyGameType,
	getCustTpBetRecordListDateRange,
	getCustTpBetRecordListOneDay,
	getCustTpBetRecordListbyCategoryId,
} from 'JF-api/payment/client'

import {
	type ICustTpBetRecordDetailListbyGameTypeData,
	type ICustTpBetRecordListDateRangeData,
	type ICustTpBetRecordListOneDayData,
	type ICustTpBetRecordListbyCategoryIdData,
} from 'JF-api/payment/type'
import { create } from 'zustand'
import { DateIndexEnum, TableTypeEnum } from './type'

/** 顯示總頁數 */
const PAGE_SIZE = 10

export interface IStatementState {
	loading: boolean
	activeTable: number
	paramqueryObj: Record<string, string | number>
	currentDateRangeIndex: number
	dateRangeStatementData: ICustTpBetRecordListDateRangeData[]
	categoryStatementData: ICustTpBetRecordListbyCategoryIdData[]
	oneDayStatementData: ICustTpBetRecordListOneDayData[]
	gameTypeStatementData: ICustTpBetRecordDetailListbyGameTypeData[]
	dateRangesArg: [string, string]
	selDate: string
	categoryId: number
	gameTypeID: number
	pageNumber: number
	totalPages: number
	activeTablePageNumber: Record<string, number>

	updateQueryParams: (newParams: Record<string, string | number>) => void | null
	getQueryParams: () => Record<string, string | number> | null
}

export interface IStatementAction {
	fetchDataOnReload: () => void
	getCustTpBetRecordListDateRange: () => Promise<void>
	getCustTpBetRecordListOneDay: () => Promise<void>
	getCustTpBetRecordListbyCategoryId: () => Promise<void>
	getCustTpBetRecordDetailListbyGameType: () => Promise<void>
	fetchDataByTableType: (nextTable: TableTypeEnum) => void
}

export const useStatementStore = create<IStatementState & IStatementAction>(
	(set, get) => ({
		/** api 資料載入中 */
		loading: false,

		/** 當前顯示的結算資料表格種類 */
		activeTable: TableTypeEnum.NoInformation,

		currentDateRangeIndex: 0,

		/** 使用日期區間獲取的結算資料 */
		dateRangeStatementData: [],

		/** 使用單一日期獲取的結算資料 */
		oneDayStatementData: [],

		/** 使用類別獲取的結算資料 */
		categoryStatementData: [],

		/** 使用遊戲種類獲取的結算資料 */
		gameTypeStatementData: [],

		/** 查詢參數的物件形式 */
		paramqueryObj: {},

		// ====== api arg ======

		/**  使用日期範圍取得結算資料的參數 */
		dateRangesArg: ['', ''] as [string, string],

		/** 獲取指定日期的結算資料的參數 */
		selDate: '',

		/** category ID arg (ID 大小寫跟隨後端參數) */
		categoryId: 1,

		/** gameType ID arg (ID 大小寫跟隨後端參數) */
		gameTypeID: 1,

		/** 當前選中的 "頁碼" */
		pageNumber: 1,

		activeTablePageNumber: {
			ByDateRangePageNumber: 1,
			ByDayPagePageNumber: 1,
			ByCategoryPageNumber: 1,
			ByDetailPageNumber: 1,
		},

		/** 總頁數 */
		totalPages: 1,

		// ====== api ======

		/** 使用日期範圍取得結算資料 (Qiick Pick : Date Range ) */
		getCustTpBetRecordListDateRange: async () => {
			set({ loading: true })
			const { dateRangesArg, pageNumber } = get()
			const response = await getCustTpBetRecordListDateRange({
				startDate: dateRangesArg[DateIndexEnum.StartDate],
				endDate: dateRangesArg[DateIndexEnum.EndDate],
				pageNumber: pageNumber,
				pageSize: PAGE_SIZE,
			})
			set({
				loading: false,
				pageNumber: response.pageNumber,
				totalPages: response.totalPages,
				dateRangeStatementData: response.data,
			})
		},
		/** 獲取指定日期的結算資料 (Qiick Pick : By Day) */
		getCustTpBetRecordListOneDay: async () => {
			set({ loading: true })
			const { selDate, pageNumber } = get()
			const response = await getCustTpBetRecordListOneDay({
				selDate,
				pageNumber: pageNumber,
				pageSize: PAGE_SIZE,
			})
			set({
				loading: false,
				pageNumber: response.pageNumber,
				totalPages: response.totalPages,
				oneDayStatementData: response.data,
			})
		},

		/** 獲取指定類型的結算資料 (Qiick Pick : By Category) */
		getCustTpBetRecordListbyCategoryId: async () => {
			set({ loading: true })
			const { selDate, categoryId, pageNumber } = get()
			const response = await getCustTpBetRecordListbyCategoryId({
				selDate: selDate,
				categoryId,
				pageNumber: pageNumber,
				pageSize: PAGE_SIZE,
			})
			set({
				loading: false,
				pageNumber: response.pageNumber,
				totalPages: response.totalPages,
				categoryStatementData: response.data,
			})
		},

		/** 獲取指定類型的結算資料 (Qiick Pick : By Detail) */
		getCustTpBetRecordDetailListbyGameType: async () => {
			set({ loading: true })
			const { selDate, gameTypeID, pageNumber } = get()
			const response = await getCustTpBetRecordDetailListbyGameType({
				selDate: selDate,
				gameTypeID,
				pageNumber: pageNumber,
				pageSize: PAGE_SIZE,
			})
			set({
				loading: false,
				pageNumber: response.pageNumber,
				totalPages: response.totalPages,
				gameTypeStatementData: response.data,
			})
		},

		// ====== 函數 ======

		fetchDataOnReload: () => {
			const { getQueryParams, fetchDataByTableType } = get()
			const queryParams = getQueryParams()

			// 檢查是否有查詢參數
			if (!queryParams || Object.keys(queryParams).length === 0) {
				return
			}

			const {
				currentDateRangeIndex,
				activeTable,
				startDate,
				endDate,
				selDate,
				categoryId,
				gameTypeID,
				pageNumber,
			} = queryParams

			set({
				currentDateRangeIndex: Number(currentDateRangeIndex),
				activeTable: Number(activeTable || TableTypeEnum.NoInformation),
				dateRangesArg: [startDate, endDate] as [string, string],
				selDate: selDate as string,
				categoryId: Number(categoryId),
				gameTypeID: Number(gameTypeID),
				pageNumber: Number(pageNumber),
			})

			if (activeTable) {
				fetchDataByTableType(Number(activeTable))
			}
		},

		/** 更新查詢參數，由外部獲取 */
		updateQueryParams: () => {},

		/** 取得查詢參數並轉換成物件，由外部獲取 */
		getQueryParams: () => ({}),

		/** 根據使用者點擊的結算表格類型來獲取對應的表格資料，
		 *  並更新當前顯示的表格類型 activeTable
		 *  @currentTable 當前需要顯示的表格類型 */
		fetchDataByTableType: (currentTable: TableTypeEnum) => {
			const {
				selDate,
				pageNumber,
				categoryId,
				gameTypeID,
				dateRangesArg,
				activeTablePageNumber,
				currentDateRangeIndex,
				updateQueryParams,
				getCustTpBetRecordListDateRange,
				getCustTpBetRecordListOneDay,
				getCustTpBetRecordListbyCategoryId,
				getCustTpBetRecordDetailListbyGameType,
			} = get()

			const {
				ByDateRangePageNumber,
				ByDayPagePageNumber,
				ByCategoryPageNumber,
				ByDetailPageNumber,
			} = activeTablePageNumber
			set({ activeTable: currentTable })

			switch (currentTable) {
				case TableTypeEnum.DateRangeStatementTable:
					getCustTpBetRecordListDateRange()
					set({ pageNumber: ByDateRangePageNumber })
					updateQueryParams({
						currentDateRangeIndex,
						startDate: dateRangesArg[DateIndexEnum.StartDate],
						endDate: dateRangesArg[DateIndexEnum.EndDate],
						pageNumber: pageNumber,
						activeTable: currentTable,
					})
					break

				case TableTypeEnum.ByDayStatementTable:
					getCustTpBetRecordListOneDay()
					set({ pageNumber: ByDayPagePageNumber })
					updateQueryParams({
						currentDateRangeIndex,
						selDate,
						pageNumber: pageNumber,
						activeTable: currentTable,
					})
					break

				case TableTypeEnum.ByCategoryStatementTable:
					getCustTpBetRecordListbyCategoryId()
					set({ pageNumber: ByCategoryPageNumber })
					updateQueryParams({
						currentDateRangeIndex,
						selDate,
						categoryId,
						pageNumber: pageNumber,
						activeTable: currentTable,
					})
					break

				case TableTypeEnum.ByDetailStatementTable:
					getCustTpBetRecordDetailListbyGameType()
					set({ pageNumber: ByDetailPageNumber })
					updateQueryParams({
						currentDateRangeIndex,
						selDate,
						gameTypeID,
						pageNumber: pageNumber,
						activeTable: currentTable,
					})
					break
			}
		},
	}),
)
