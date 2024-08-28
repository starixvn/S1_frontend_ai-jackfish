'use client'

import { cn } from 'JF-core'
import { BounceLoader } from 'react-spinners'

interface ILoadingProps {
	className?: string
	size?: number
}

/**
 * Server Component：使用 Suspense fallback 自動吃 loading 狀態: <Suspense fallback={<Loading />}>{Component}</Suspense>
 * Client Component：使用 isLoading 狀態判斷: if (isLoading) return <Loading />
 * --
 * @param {string} [className] - 手動傳入 className 撐開高度以及修改背景顏色，ex:h-screen bg-transparent
 * @param {number} [size] - 手動傳入 size 修改 loader 大小，ex:size={60}
 * @returns BounceLoader component.
 */
const Loading = ({ className, size = 80 }: ILoadingProps) => {
	return (
		<div
			className={cn(
				'mx-auto grid h-full w-full place-items-center bg-neutral-200/30',
				className,
			)}
		>
			<BounceLoader
				size={size}
				color='rgb(var(--color-primary-100))'
				speedMultiplier={1}
			/>
		</div>
	)
}

export default Loading
