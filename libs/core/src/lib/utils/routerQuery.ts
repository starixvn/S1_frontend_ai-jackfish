type Query = {
	[key: string]: string | number | undefined
}
export const NewRouterPush = (pathname: string, query: Query = {}) => {
	// 建立 URLSearchParams
	const searchParams = new URLSearchParams()
	Object.entries(query).forEach(([key, value]) => {
		if (value !== undefined) {
			searchParams.set(key, String(value))
		}
	})
	// 組合完整 URL
	const url = `${pathname}?${searchParams.toString()}`
	return url // 結果: /some-path?id=123&type=test
}
