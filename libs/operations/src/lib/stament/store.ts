import {
	getCustTpBetRecordDetailListbyGameType,
	getCustTpBetRecordListDateRange,
	getCustTpBetRecordListOneDay,
	getCustTpBetRecordListbyCategoryId,
	type IAxiosResponse,
} from 'JF-api/payment/client'
import {
	ICustTpBetRecordDetailListbyGameTypeData,
	ICustTpBetRecordListDateRangeData,
	ICustTpBetRecordListOneDayData,
	ICustTpBetRecordListbyCategoryIdData,
} from 'JF-api/payment/type'
import { revertTimeZone } from 'JF-core'
import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import { create } from 'zustand'
import {
	IOnDetailsArgs,
	IStatementStoreAction,
	IStatementStoreState,
} from './type'

enum QuickPickEnum {
	Today,
	Yesterday,
	ThisWeek,
	LastWeek,
	ThisMonth,
	LastMonth,
}

export const QuickPickData: Record<QuickPickEnum, string> = {
	[QuickPickEnum.Today]: 'Label_History_Today',
	[QuickPickEnum.Yesterday]: 'Label_History_Yesterday',
	[QuickPickEnum.ThisWeek]: 'Label_History_ThisWeek',
	[QuickPickEnum.LastWeek]: 'Label_History_LastWeek',
	[QuickPickEnum.ThisMonth]: 'Label_History_ThisMonth',
	[QuickPickEnum.LastMonth]: 'Label_History_LastMonth',
}

const useStatementStore = create<IStatementStoreState & IStatementStoreAction>(
	(set, get) => {
		return {
			loading: false,
			QUICK_PICK_LIST: QuickPickData,
			activePeriod: QuickPickEnum.Today,
			recordPeriod: QuickPickEnum.Today,
			activeTab: '',
			startDate: new Date(new Date().setHours(0, 0, 0, 0)),
			endDate: new Date(new Date(new Date().setHours(23, 59, 59, 999))),
			displayColumns: [],
			breadcrumbs: [
				{ displayKey: 'Label_History_QuickPick', value: null },
				{
					displayKey:
						QuickPickData[
							(get().recordPeriod as QuickPickEnum) ?? QuickPickEnum.Today
						],
					value: '',
				},
				{ displayKey: 'Label_General_ByDay', value: 'byDay' },
				{ displayKey: 'Label_General_ByCategory', value: 'byCategory' },
				{ displayKey: 'Label_General_ByDetail', value: 'byDetail' },
			], // 麵包序列
			totalPage: 1, // 總頁數
			currentPage: 1, // 當前頁數
			totalTurnover: 0, // 總交易金額
			totalWinlostAmount: 0, // 總贏賠金額
			queryObject: null, // 當前查詢參數

			init: ({ queryString, currentQueryObject }) => {
				set({ queryObject: currentQueryObject })
				const { onDetails, queryObject } = get()

				let newTab = ''
				if ('byDetail' in queryObject) {
					newTab = 'byDetail'
				} else if ('byCategory' in queryObject) {
					newTab = 'byCategory'
				} else if ('byDay' in queryObject) {
					newTab = 'byDay'
				} else {
					newTab = ''
				}
	
				const targetSelDate = queryString.match(/selDate=([^&]+)/)?.[1] || ''

				const updateQueryObject: Record<string, string> = {}
				if (newTab) {
					queryString.split('&').forEach((pair: string) => {
						const [key, value] = pair.split('=')
						queryObject[key] = value
					})
				}

				onDetails({
					targetTab: newTab,
					selDate: targetSelDate,
					...(newTab !== ''
						? queryObject
						: {
								...currentParams,
								newStartDate: dayjs(queryObjectx.get('startDate')).format(
									'YYYY-MM-DD',
								),
								newEndDate: dayjs(queryObjectx.get('endDate')).format(
									'YYYY-MM-DD',
								),
							}),
				})
			},
		

			onPageChange: async ({ selected }) => {
				const searchParams = useSearchParams()
				const queryObject: Record<string, string> = {}
				const activeTab = get().activeTab

				// 解析 URL 中的查詢參數
				if (activeTab) {
					const tabQuery = searchParams.get(activeTab)
					if (tabQuery) {
						tabQuery.split('&').forEach((pair: string) => {
							const [key, value] = pair.split('=')
							queryObject[key] = value
						})
					}
				}

				// 調用 onDetails，並傳遞必要參數
				await get().onDetails({
					targetTab: activeTab,
					...queryObject,
					pageNumber: selected + 1,
				} as {
					targetTab: string
					selDate: string
					categoryId?: number
					gameTypeId?: number
					pageNumber?: number
				})
			},

			onQuickPickChange: (newPeriod, isSearch = true) => {
				const { updateDateRangeByPeriod, onDetails } = get()
				set({ activePeriod: newPeriod })
				updateDateRangeByPeriod(newPeriod)
				const dateRangeData: Record<
					number,
					{ startDate: Date; endDate: Date }
				> = {
					[QuickPickEnum.Today]: {
						startDate: dayjs().startOf('day').toDate(),
						endDate: dayjs().endOf('day').toDate(),
					},
					[QuickPickEnum.Yesterday]: {
						startDate: dayjs().subtract(1, 'day').startOf('day').toDate(),
						endDate: dayjs().subtract(1, 'day').endOf('day').toDate(),
					},
					[QuickPickEnum.ThisWeek]: {
						startDate: dayjs().startOf('week').toDate(),
						endDate: dayjs().toDate(),
					},
					[QuickPickEnum.LastWeek]: {
						startDate: dayjs().subtract(1, 'week').startOf('week').toDate(),
						endDate: dayjs().subtract(1, 'week').endOf('week').toDate(),
					},
					[QuickPickEnum.ThisMonth]: {
						startDate: dayjs().startOf('month').toDate(),
						endDate: dayjs().toDate(),
					},
					[QuickPickEnum.LastMonth]: {
						startDate: dayjs().subtract(1, 'month').startOf('month').toDate(),
						endDate: dayjs().subtract(1, 'month').endOf('month').toDate(),
					},
				}
				if (isSearch) {
					onDetails({
						targetTab: '',
						selDate: '',
						newStartDate: dateRangeData[newPeriod].startDate as Date,
						newEndDate: dateRangeData[newPeriod].endDate as Date,
						period: newPeriod,
					})
				}
			},

			onDetails: async (args: IOnDetailsArgs) => {
				const {
					targetTab,
					selDate = '',
					categoryId,
					gameTypeId,
					pageNumber,
					newStartDate,
					newEndDate,
					period,
				} = args
				const { startDate, endDate, currentPage, activePeriod } = get()

				const requestArgs = {
					pageNumber: pageNumber ?? currentPage,
					pageSize: 10,
					selDate: selDate ? revertTimeZone(selDate).format('YYYY-MM-DD') : '',
				}

				let result: IAxiosResponse<
					(
						| ICustTpBetRecordListDateRangeData
						| ICustTpBetRecordListOneDayData
						| ICustTpBetRecordListbyCategoryIdData
						| ICustTpBetRecordDetailListbyGameTypeData
					)[]
				> = {
					errorCode: 0,
					message: '',
					data: [],
					pageNumber: 1,
					totalPages: 1,
				}

				switch (targetTab) {
					case '':
						result = await getCustTpBetRecordListDateRange({
							startDate: dayjs(newStartDate ?? startDate).format('YYYY-MM-DD'),
							endDate: dayjs(newEndDate ?? endDate).format('YYYY-MM-DD'),
							pageNumber: currentPage,
							pageSize: 10,
						})
						deleteQuery('byDay')
						deleteQuery('byCategory')
						deleteQuery('byDetail')
						set({ activeTab: '' })
						setUrlArgs({
							period: period ?? activePeriod,
							startDate: dayjs(newStartDate ?? startDate).format('YYYY-MM-DD'),
							endDate: dayjs(newEndDate ?? endDate).format('YYYY-MM-DD'),
							pageNumber: currentPage,
							pageSize: 10,
						})
						break

					case 'byDay':
						result = await getCustTpBetRecordListOneDay(requestArgs)
						deleteQuery('byCategory')
						deleteQuery('byDetail')
						set({ activeTab: 'byDay' })
						setUrlArgs({
							period: period ?? activePeriod,
							...currentParams,
							byDay: Object.keys(requestArgs)
								.map(
									key =>
										`${key}=${(requestArgs as Record<string, unknown>)[key]}`,
								)
								.join('&'),
						})
						break

					case 'byCategory':
						result = await getCustTpBetRecordListbyCategoryId({
							...requestArgs,
							categoryId: categoryId as number,
						})
						deleteQuery('byDetail')
						set({ activeTab: 'byCategory' })
						setUrlArgs({
							period: period ?? activePeriod,
							...currentParams,
							byCategory: Object.keys({
								...requestArgs,
								categoryId: categoryId as number,
							})
								.map(
									key =>
										`${key}=${({ ...requestArgs, categoryId: categoryId as number } as Record<string, unknown>)[key]}`,
								)
								.join('&'),
						})
						break

					case 'byDetail':
						result = await getCustTpBetRecordDetailListbyGameType({
							...requestArgs,
							gameTypeId: gameTypeId as number,
						})
						set({ activeTab: 'byDetail' })
						setUrlArgs({
							period: period ?? activePeriod,
							...currentParams,
							byDetail: Object.keys({
								...requestArgs,
								gameTypeId: gameTypeId as number,
							})
								.map(
									key =>
										`${key}=${({ ...requestArgs, gameTypeId: gameTypeId as number } as Record<string, unknown>)[key]}`,
								)
								.join('&'),
						})
						break

					default:
						break
				}

				set({ displayColumns: result.data ?? [] })
				set({ totalPage: result.totalPages ?? 1 })
				set({ currentPage: result.pageNumber ?? 1 })
			},

			onTabChange: newTab => {
				// 將查詢參數轉換為 Record 格式
				const queryParams = parseQueryString(searchParams)

				get().onDetails({
					targetTab: newTab,
					...queryParams,
				})
				set({ activeTab: newTab })
			},

			onTabsScroll: () => {
				const { tabsRef } = get()
				if (tabsRef?.current) {
					tabsRef.current.scrollTo({
						left: tabsRef.current.scrollLeft + 80,
						behavior: 'smooth',
					})
				}
			},

			onSearch: () => {
				const { onDetails, activePeriod } = get()
				onDetails({ targetTab: '', selDate: '', period: activePeriod })
			},

			updateDateRangeByPeriod: (newPeriod: string | number | undefined) => {
				switch (newPeriod) {
					case QuickPickEnum.Today:
						set({ startDate: dayjs().startOf('day').toDate() })
						set({ endDate: dayjs().endOf('day').toDate() })
						break

					case QuickPickEnum.Yesterday:
						set({
							startDate: dayjs().subtract(1, 'day').startOf('day').toDate(),
						})
						set({ endDate: dayjs().subtract(1, 'day').endOf('day').toDate() })
						break

					case QuickPickEnum.ThisWeek:
						set({ startDate: dayjs().startOf('week').toDate() })
						set({ endDate: dayjs().toDate() })
						break

					case QuickPickEnum.LastWeek:
						set({
							startDate: dayjs().subtract(1, 'week').startOf('week').toDate(),
						})
						set({ endDate: dayjs().subtract(1, 'week').endOf('week').toDate() })
						break

					case QuickPickEnum.ThisMonth:
						set({ startDate: dayjs().startOf('month').toDate() })
						set({ endDate: dayjs().toDate() })
						break

					case QuickPickEnum.LastMonth:
						set({
							startDate: dayjs().subtract(1, 'month').startOf('month').toDate(),
						})
						set({
							endDate: dayjs().subtract(1, 'month').endOf('month').toDate(),
						})
						break
					default:
						break
				}
			},
		}
	},
)
export { useStatementStore }
