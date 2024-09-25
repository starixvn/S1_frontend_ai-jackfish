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
				'grid min-h-full  grid-flow-row  content-start gap-5 py-6 px-8 lg:px-[8rem] xl:px-[14rem]',
				className,
			)}
		>
			<h2 className='text-center text-xl'>{title}</h2>
			<div className=' text-center text-xl'>{description}</div>
			{children}
		</div>
	)
}
