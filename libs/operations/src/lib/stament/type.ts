export enum QuickPickEnum {
	Today,
	Yesterday,
	ThisWeek,
	LastWeek,
	ThisMonth,
	LastMonth,
}

export interface Breadcrumb {
	displayKey: string
	value: string | null
}

export interface IOnDetailsArgs {
	targetTab: string
	selDate?: string
	categoryId?: number
	gameTypeId?: number
	pageNumber?: number
	newStartDate?: Date
	newEndDate?: Date
	period?: number
}

export interface IStatementStoreState {
	loading: boolean
	QUICK_PICK_LIST: Record<QuickPickEnum, string>
	activePeriod: QuickPickEnum
	recordPeriod: QuickPickEnum
	activeTab: string
	startDate: Date
	endDate: Date
	displayColumns: unknown[]
	breadcrumbs: Breadcrumb[]
	totalPage: number
	currentPage: number
	totalTurnover: number | string
	totalWinlostAmount: number | string
	tabsRef?: React.MutableRefObject<HTMLDivElement | null>
	queryObject: Record<string, string>
}

interface IInitArgs{
    queryString:string
    currentQueryObject: Record<string, string>
}

export interface IStatementStoreAction {
	init: (initArgs:IInitArgs) => void
	onPageChange: ({ selected }: { selected: number }) => Promise<void>
	onQuickPickChange: (newPeriod: number, isSearch: boolean) => void
	onDetails: (args: IOnDetailsArgs) => Promise<void>
	onTabChange: (newTab: string) => void
	onTabsScroll: () => void
	onSearch: () => void
	updateDateRangeByPeriod: (newPeriod: number) => void
}
