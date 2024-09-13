type Entries<TObj> = {
	[K in keyof TObj]: [K, TObj[K]]
}[keyof TObj][]

// 只限制 Object 的型態
export function objectEntries<TObj extends object>(obj: TObj): Entries<TObj> {
	return Object.entries(obj) as Entries<TObj>
}

export function objectKeys<TObj extends object>(obj: TObj) {
	return Object.keys(obj) as Array<keyof TObj>
}
