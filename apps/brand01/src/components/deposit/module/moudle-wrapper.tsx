import { cn } from 'JF-core'

export default function ModuleWrapper({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<div
			className={cn(
				'mt-4 mb-4 rounded-2xl border-0  bg-neutral-500 px-8 py-6',
				className,
			)}
		>
			{children}
		</div>
	)
}

import { ReactNode } from 'react'
