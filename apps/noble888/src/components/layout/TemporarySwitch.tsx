'use client'
import { langId } from '@noble888/src/data/country'
import { useGetPathname, useLocaleRouter } from 'JF-core'

export default function TemporarySwitch() {
	const router = useLocaleRouter()
	const { currentPath } = useGetPathname()
	return (
		<div className='flex gap-4 text-xs text-white rtl:flex-row-reverse'>
			<button onClick={() => router.push(currentPath, { locale: langId.en })}>
				EN (LTR)
			</button>
			<button onClick={() => router.push(currentPath, { locale: langId.ar })}>
				AR (RTL)
			</button>
		</div>
	)
}
