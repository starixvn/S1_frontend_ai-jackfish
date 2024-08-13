'use client'
import { usePathname } from 'next/navigation'

const useGetPathname = () => {
	const pathname = usePathname()

	// 取得url上的語系名
	const locale = pathname.substring(1, 3)

	// 取得語系後面的路徑名，如：promption, join...
	const routeName = pathname.substring(4)

	// 用來實際和 path 匹配
	const currentPath = `/${routeName}`

	return { locale, currentPath }
}

export { useGetPathname }
