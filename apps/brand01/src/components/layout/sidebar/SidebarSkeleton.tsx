'use client'

import { cn } from 'JF-core'

const SidebarSkeleton: React.FC = () => {
	return (
		<div
			className={cn(
				'grid h-24 w-full animate-pulse items-center justify-items-center gap-3 px-3 py-1',
				'lg:h-20 lg:grid-cols-[auto_1fr] lg:justify-items-start lg:px-6 lg:py-3',
			)}
		>
			<span className='h-10 w-10 rounded-full bg-neutral-300' />
			<span className='h-5 w-12 rounded-full bg-neutral-300 lg:h-6 lg:w-20' />
		</div>
	)
}

export default SidebarSkeleton
