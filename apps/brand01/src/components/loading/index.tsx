'use client'

import { cn } from 'JF-core'
import { useEffect, useState } from 'react'
import { BounceLoader } from 'react-spinners'

interface ILoadingProps {
	className?: string
}

/**
 * Server Component：使用 Suspense fallback 自動吃 loading 狀態: <Suspense fallback={<Loading />}>{Component}</Suspense>
 * Client Component：使用 isLoading 狀態判斷: if (isLoading) return <Loading />
 * --
 * @param {string} [className] - 手動傳入 className 撐開高度以及修改背景顏色，ex:h-screen bg-transparent
 * @returns BounceLoader component.
 */
const Loading = ({ className }: ILoadingProps) => {
	const [loaderSize, setLoaderSize] = useState(
		window.innerWidth < 768 ? 60 : 80,
	)
	// 監聽視窗大小變化調整 loader 大小
	useEffect(() => {
		const handleResize = () => {
			setLoaderSize(window.innerWidth < 768 ? 60 : 80)
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<div
			className={cn(
				'mx-auto grid h-full w-full place-items-center bg-neutral-200/30',
				className,
			)}
		>
			<BounceLoader
				size={loaderSize}
				color='rgb(var(--color-primary-100))'
				speedMultiplier={1}
			/>
		</div>
	)
}

export default Loading
