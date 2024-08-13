'use client'

import { cn } from 'JF-core'
import { BounceLoader } from 'react-spinners'

interface ILoadingProps {
	className?: string
}

/**
 * Server Component：使用Suspense fallback自動吃loading狀態 <Suspense fallback={<Loading />}>{Component}</Suspense>
 * Client Component：使用isLoading狀態判斷 <Loading loading={isLoading} />
 * --
 * @param {string} [className] - 手動傳入className撐開高度，其他可直接傳入className調整 ex:bg-transparent 等
 * @returns BounceLoader component with loading state, default to true. BounceLoader component with loading state, default to true.
 */
const Loading = ({ className }: ILoadingProps) => {
	return (
		<div
			className={cn(
				'mx-auto grid h-full w-full place-items-center bg-neutral-200/30',
				className,
			)}
		>
			<BounceLoader
				size={60}
				color='rgb(var(--color-primary-100))'
				speedMultiplier={1}
			/>
		</div>
	)
}

export default Loading
