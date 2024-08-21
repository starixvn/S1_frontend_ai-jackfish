import { cn } from 'JF-core'
import { ReactNode } from 'react'

export default function MaxWidthWrapper({
	className,
	title,
	description,
	children,
}: {
	className?: string
	title?: string
	description?: string
	children: ReactNode
}) {
	return (
		<div
			className={cn(
				' grid min-h-full  grid-flow-row  content-start gap-5 py-6 px-8 lg:px-36',
				className,
			)}
		>
			<h2 className='text-center text-2xl'>{title}</h2>
			<div className=' text-center text-2xl'>{description}</div>
			{children}
		</div>
	)
}
