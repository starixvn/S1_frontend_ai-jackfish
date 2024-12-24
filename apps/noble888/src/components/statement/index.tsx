'use client'

import {
	Breadcrumb,
	DashboardTag,
	Loading,
	MainTabMenu,
	NoInformation,
	Pagination,
	Select,
	SubTabMenu,
} from '@noble888/src/components/common'
import {
	dateOptions,
	initQuickPickOptions,
	lgDateSelectOptions,
} from '@noble888/src/data/statement'
import { MAIN_TAGS } from '@noble888/src/data/static/index'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { useDate, useGetPathname } from 'JF-core'
import { TableTypeEnum, useStatementStore } from 'JF-operations'
import { useEffect, useState } from 'react'
import { MdOutlineManageHistory } from 'react-icons/md'
import StatementItem from './StatementItem'
import {
	ByCategoryStatementTable,
	ByDayStatementTable,
	ByDetailStatementTable,
	DateRangeStatementTable,
} from './statementTable'

/**
 * 將單一日期轉為 [string, string] 格式的日期範圍。
 * 若 dateRanges[index] 是字串，則用 today 作為起始日期；否則直接使用日期範圍。
 * @example
 * "2024-12-18" => ["2024-12-18", "2024-12-18"]
 * ["2024-12-01", "2024-12-18"] => ["2024-12-01", "2024-12-18"]
 */
const formatDateRanges = (
	dateRanges: string | [string, string],
): [string, string] => {
	return typeof dateRanges === 'string' ? [dateRanges, dateRanges] : dateRanges
}

const Statement = () => {
	// ====== Hooks ======
	const { today, yesterday, thisWeek, lastWeek, thisMonth, lastMonth } =
		useDate()

	/** 日期範圍選項 */
	const dateRanges = [
		today,
		yesterday,
		thisWeek,
		lastWeek,
		thisMonth,
		lastMonth,
	]

	const { t } = useClientTranslation()
	const {
		loading,
		pageNumber,
		currentDateRangeIndex,
		activeTable,
		totalPages,
		dateRangeStatementData,
		oneDayStatementData,
		categoryStatementData,
		gameTypeStatementData,
		fetchDataOnReload,
		fetchDataByTableType,
	} = useStatementStore()

	const pathnameUtils = useGetPathname()

	/** 是否顯示頁碼 */
	const isShowPagination =
		activeTable !== TableTypeEnum.NoInformation && totalPages !== 0

	/** DateSelect 當前的日期範圍 */
	const lgDateSelectValue = lgDateSelectOptions[currentDateRangeIndex].value

	// ====== States ======

	/** 快速選擇 Breadcrumb 的索引 */
	const [activeQuickPickBreadcrumbIndex, setActiveQuickPickBreadcrumbIndex] =
		useState<number>(0)

	/** 用於顯示的 Breadcrumb I18nKeys */
	const [breadcrumbI18nKeys, setBreadcrumbI18nKeys] = useState<string[]>([
		...initQuickPickOptions,
	])
	// ====== Handlers ======

	/**
	 * 取得當前的快速選擇的 I18nKeys
	 * @param currentDateRangeIndex 當前日期範圍索引
	 * @returns 更新後的 I18nKeys
	 */
	const getQuickPickI18nKeys = (currentDateRangeIndex: number): string[] => {
		const newQuickPickOptions = [...initQuickPickOptions]
		newQuickPickOptions[1] = dateOptions[currentDateRangeIndex].i18nKey
		return newQuickPickOptions
	}

	/**
	 * 處理大螢幕日期範圍改變事件
	 * @param dateSelectIndex 選中的日期範圍索引
	 */
	const onLgDateChange = (dateSelectIndex: string | number) => {
		useStatementStore.setState({
			currentDateRangeIndex: dateSelectIndex as number,
		})
	}

	/**
	 * 切換頁碼，更新 store 頁碼的狀態，並獲取當前表格的資料
	 * @param selected 選中的頁碼索引
	 */
	const onPageChange = ({ selected }: { selected: number }) => {
		const pageNumber = selected + 1
		useStatementStore.setState({ pageNumber })

		switch (activeTable) {
			case TableTypeEnum.DateRangeStatementTable:
				useStatementStore.setState(state => ({
					activeTablePageNumber: {
						...state.activeTablePageNumber,
						ByDateRangePageNumber: pageNumber,
					},
				}))
				break
			case TableTypeEnum.ByDayStatementTable:
				useStatementStore.setState(state => ({
					activeTablePageNumber: {
						...state.activeTablePageNumber,
						ByDayPagePageNumber: pageNumber,
					},
				}))
				break
			case TableTypeEnum.ByCategoryStatementTable:
				useStatementStore.setState(state => ({
					activeTablePageNumber: {
						...state.activeTablePageNumber,
						ByCategoryPageNumber: pageNumber,
					},
				}))
				break
			case TableTypeEnum.ByDetailStatementTable:
				useStatementStore.setState(state => ({
					activeTablePageNumber: {
						...state.activeTablePageNumber,
						ByDetailPageNumber: pageNumber,
					},
				}))
				break
		}
		fetchDataByTableType(activeTable)
	}

	/**
	 * 以選擇的日期範圍，更新表格內容。
	 * 更新 store 狀態，根據使用者選擇的日期範圍，設定快速選擇面包屑 */
	const onSubmit = () => {
		const formatDateArg = formatDateRanges(dateRanges[currentDateRangeIndex])
		useStatementStore.setState({
			dateRangesArg: formatDateArg,
			activeTable: TableTypeEnum.DateRangeStatementTable,
		})
		setBreadcrumbI18nKeys(getQuickPickI18nKeys(currentDateRangeIndex))
		fetchDataByTableType(TableTypeEnum.DateRangeStatementTable)
	}

	/**
	 * 處理小螢幕日期範圍事件。
	 * 更新 store 的 dateRangesArg 狀態，並獲取當前表格的資料
	 * @param dateRangIndex 選中的日期範圍索引 */
	const onSmGetStatementByDate = (dateRangIndex: number) => {
		const formatDateArg = formatDateRanges(dateRanges[dateRangIndex])
		useStatementStore.setState({
			dateRangesArg: formatDateArg,
			currentDateRangeIndex: dateRangIndex,
		})
		fetchDataByTableType(TableTypeEnum.DateRangeStatementTable)
		setBreadcrumbI18nKeys(
			getQuickPickI18nKeys(useStatementStore.getState().currentDateRangeIndex),
		)
	}

	/**
	 * 處理快速選擇的 Breadcrumb 點擊事件。
	 * 根據使用者選擇的日期範圍，設定快速選擇面包屑，
	 * 更新快速選擇 Breadcrumb 的索引，並獲取當前表格的資料。
	 * @param currentTable 當前表格類型索引 */
	const onQuickPickBreadcrumbChange = (currentTable: number) => {
		setBreadcrumbI18nKeys(getQuickPickI18nKeys(currentDateRangeIndex))
		setActiveQuickPickBreadcrumbIndex(currentTable)
		fetchDataByTableType(currentTable)
	}
	/** 根據當前的表格類型返回對應的 Data */
	const getStatementData = () => {
		switch (activeTable) {
			case TableTypeEnum.DateRangeStatementTable:
				return dateRangeStatementData || []
			case TableTypeEnum.ByDayStatementTable:
				return oneDayStatementData || []
			case TableTypeEnum.ByCategoryStatementTable:
				return categoryStatementData || []
			case TableTypeEnum.ByDetailStatementTable:
				return gameTypeStatementData || []
			default:
				return []
		}
	}

	/** 切換表格內容 */
	const switchTable = () => {
		switch (activeTable) {
			case TableTypeEnum.NoInformation:
				return <NoInformation />
			case TableTypeEnum.DateRangeStatementTable:
				return <DateRangeStatementTable />
			case TableTypeEnum.ByDayStatementTable:
				return <ByDayStatementTable />
			case TableTypeEnum.ByCategoryStatementTable:
				return <ByCategoryStatementTable />
			case TableTypeEnum.ByDetailStatementTable:
				return <ByDetailStatementTable />
		}
	}

	// ====== Effects ======

	/** 重新整理，根據使用者選擇的日期範圍，設定快速選擇面包屑，初始化 store */
	useEffect(() => {
		fetchDataOnReload()
		setBreadcrumbI18nKeys(
			getQuickPickI18nKeys(useStatementStore.getState().currentDateRangeIndex),
		)

		// 初始化 store
		useStatementStore.setState({
			updateQueryParams: pathnameUtils.updateQueryParams,
			getQueryParams: pathnameUtils.getQueryParams,
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchDataOnReload])

	/** 更新快速選擇 Breadcrumb 索引 */
	useEffect(() => {
		if (activeQuickPickBreadcrumbIndex !== activeTable) {
			setActiveQuickPickBreadcrumbIndex(activeTable)
		}
	}, [activeTable, activeQuickPickBreadcrumbIndex])

	// ====== Render ======
	return (
		<div>
			{/* Mobile View */}
			<div className='block lg:hidden'>
				<MainTabMenu tagsData={MAIN_TAGS.statement} />
				<SubTabMenu
					currentIndex={currentDateRangeIndex}
					menuData={dateOptions}
					onMenuClick={onSmGetStatementByDate}
				/>
				<div className='flex h-auto w-full flex-wrap items-center py-2 shadow-md'>
					<Breadcrumb
						activeIndex={activeQuickPickBreadcrumbIndex}
						breadcrumbData={getQuickPickI18nKeys(currentDateRangeIndex)}
						onBreadcrumbClick={onQuickPickBreadcrumbChange}
					/>
				</div>

				{/* 頁碼 */}
				{isShowPagination && (
					<div className='my-10'>
						<Pagination
							totalPage={totalPages}
							currentPage={pageNumber}
							onPageChange={onPageChange}
						/>
					</div>
				)}
				{/* 顯示內容 */}
				<div className='m-5 grid grid-cols-1 gap-4 md:mb-10 md:ml-10 md:mr-10 md:grid-cols-2'>
					{loading ? (
						<Loading />
					) : getStatementData().length > 0 ? (
						getStatementData().map((item, index) => (
							<StatementItem
								key={`statement-item-${index}`}
								{...item}
								index={index}
							/>
						))
					) : (
						<NoInformation />
					)}
				</div>
			</div>

			{/* Desktop View */}
			<div className='hidden lg:block'>
				<div className='bg-primary-50 w-full px-5 pb-10'>
					<DashboardTag title='Statement' Icon={MdOutlineManageHistory} />
					<div className='bg-primary-200 mt-10 flex h-5 items-center rounded-3xl py-5'>
						<Breadcrumb
							activeIndex={activeQuickPickBreadcrumbIndex}
							breadcrumbData={breadcrumbI18nKeys}
							onBreadcrumbClick={onQuickPickBreadcrumbChange}
						/>
					</div>
					<div className='mt-6 grid grid-cols-12 items-center gap-4'>
						{/* 選單區域 */}
						<div className='col-span-5'>
							<Select
								value={lgDateSelectValue}
								defaultValue={lgDateSelectValue}
								options={lgDateSelectOptions}
								isTranslation={true}
								placeholder='-'
								onChange={onLgDateChange}
								prefixText='Label_History_QuickPick'
							/>
						</div>
						<button
							onClick={onSubmit}
							className=' bg-primary-500 col-span-2 rounded px-4 py-2 text-sm font-bold text-white'
						>
							{t('Label_General_Submit')}
						</button>

						{/* 提交按鈕 */}
					</div>

					<div className='mt-6'>
						{loading ? (
							<Loading />
						) : (
							<>
								{switchTable()}
								{isShowPagination && (
									<div className='mt-6'>
										<Pagination
											totalPage={totalPages}
											currentPage={pageNumber}
											onPageChange={onPageChange}
										/>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Statement
