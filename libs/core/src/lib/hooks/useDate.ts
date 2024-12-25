'use client'
import dayjs from 'dayjs'

interface DateRanges {
	today: string
	yesterday: string
	thisWeek: [string, string]
	lastWeek: [string, string]
	thisMonth: [string, string]
	lastMonth: [string, string]
}

/** 提供常用日期資訊的自定義 Hook */
const useDate = (): DateRanges => {
	/** 今日的日期字串
	 *  @example 當前日期 2024/12/13
	 *  @returns "2024-12-13" */
	const today = dayjs().format('YYYY-MM-DD')

	/** 昨日的日期字串
	 *  @example 當前日期 2024/12/13
	 *  @returns "2024-12-12" */
	const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')

	/** 這禮拜的日期區間
	 *  @example 當前日期 2024/12/13
	 *  @returns ["2024-12-09","2024-12-13"] 追朔到今天的日期 */
	const thisWeek: [string, string] = [
		dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD'),
		dayjs().format('YYYY-MM-DD'),
	]

	/** 上禮拜的日期區間
	 *  @example 當前日期 2024/12/13
	 *  @returns ["2024-12-02","2024-12-08"]*/
	const lastWeek: [string, string] = [
		dayjs()
			.subtract(1, 'week')
			.startOf('week')
			.add(1, 'day')
			.format('YYYY-MM-DD'),
		dayjs()
			.subtract(1, 'week')
			.endOf('week')
			.add(1, 'day')
			.format('YYYY-MM-DD'),
	]

	/** 這個月的日期區間
	 *  @example 當前日期 2024/12/13
	 *  @returns ["2024-12-01","2024-12-13"] 追朔到今天的日期 */
	const thisMonth: [string, string] = [
		dayjs().startOf('month').format('YYYY-MM-DD'),
		dayjs().format('YYYY-MM-DD'),
	]

	/** 上個月的日期區間
	 *  @example 當前日期 2024/12/13
	 *  @returns ["2024-11-01","2024-11-30"]*/
	const lastMonth: [string, string] = [
		dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
		dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
	]

	return { today, yesterday, thisWeek, lastWeek, thisMonth, lastMonth }
}
export { useDate }
