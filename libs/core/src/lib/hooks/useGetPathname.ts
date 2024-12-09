'use client'

import { usePathname, useSearchParams } from 'next/navigation'

const useGetPathname = () => {
	const pathname = usePathname()
	const params = useSearchParams()
	const pathArray = pathname.split('/')

	// 取得url上的語系名
	const locale = pathArray[1]

	// 取得語系後面的路徑名，如：promption, join...
	const routeName = pathArray[2] ? pathArray.slice(2).join('/') : ''

	// 用來實際和 path 匹配
	const currentPath = `/${routeName}`
	const currentPathWithParams =
		params.size > 0 ? `/${routeName}?${params.toString()}` : currentPath

	return { locale, currentPath, currentPathWithParams }
}

export { useGetPathname }
