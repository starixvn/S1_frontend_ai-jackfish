'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const useGetPathname = () => {
	const pathname = usePathname()
	const params = useSearchParams()
	const router = useRouter()
	const pathArray = pathname.split('/')

	// 取得url上的語系名
	const locale = pathArray[1]

	// 取得語系後面的路徑名，如：promption, join...
	const routeName = pathArray[2] ? pathArray.slice(2).join('/') : ''

	// 用來實際和 path 匹配
	const currentPath =
		params.size > 0 ? `/${routeName}?${params.toString()}` : `/${routeName}`

	/**
	 * 新增或修改查詢參數
	 * @param newParams - 要新增或修改的參數物件
	 * @example
	 * // 增加 startDate 和 endDate 參數
	 * updateQueryParams({ startDate: '2025', endDate: '2026' })
	 * // 結果: ?startDate=2025&endDate=2026
	 *
	 *
	 * // 修改 startDate 和 endDate 參數
	 * // 原 url: ?startDate=2025&endDate=2026
	 * updateQueryParams({ startDate: '2027', endDate: '2028' })
	 * // 結果: ?startDate=2027&endDate=2028 */
	const updateQueryParams = (newParams: Record<string, string | number>) => {
		const updatedParams = new URLSearchParams(window.location.search)

		Object.entries(newParams).forEach(([key, value]) => {
			updatedParams.set(key, String(value))
		})

		router.replace(`?${updatedParams.toString()}`)
	}

	/**
	 * 取得查詢參數並轉換成物件
	 * @returns 查詢參數的物件形式
	 * @example
	 * // 當前 URL: ?startDate=2025&endDate=2028
	 * const queryObj = getQueryParams()
	 * console.log(queryObj)
	 * // 結果: { startDate: '2025', endDate: '2028' }
	 */
	const getQueryParams = () => {
		const params = new URLSearchParams(window.location.search)
		const queryObj: Record<string, string | number> = {}

		// 將所有查詢參數放入物件中
		params.forEach((value, key) => {
			// 如果是數字形式，轉換為數字
			queryObj[key] = isNaN(Number(value)) ? value : Number(value)
		})
		return queryObj
	}

	return {
		locale,
		currentPath,
		updateQueryParams,
		getQueryParams,
	}
}

export { useGetPathname }
