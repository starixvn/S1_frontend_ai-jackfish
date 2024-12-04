'use client'
import React from 'react';
import { FiChevronRight } from 'react-icons/fi'

interface IBreadcrumbProps {
	breadcrumbData: Array<{ displayKey: string }>
	activeIndex: number
	setActiveIndex: (index: number) => void
	onBreadcrumbClick: (index: number) => void
}

const Breadcrumb = ({
	activeIndex,
	setActiveIndex,
	breadcrumbData,
	onBreadcrumbClick,
}: IBreadcrumbProps) => {
	/** 點擊事件 */
	const handleBreadcrumbClick = (index: number) => {
		onBreadcrumbClick(index)
		setActiveIndex(index)
	}

	return (
		<div className='w-full h-6 flex items-center shadow-md'>
			<ul className='flex items-center text-blue-500'>
				{breadcrumbData.map((item, index) => {
					if (index > activeIndex) return null
					const isLastItem = index === activeIndex
					return (
						<li key={item.displayKey} className='flex items-center'>
							<a
								onClick={() => handleBreadcrumbClick(index)}
								className={`cursor-pointer hover:underline text-sm ${
									isLastItem ? 'font-bold text-black' : ''
								}`}
								aria-current={isLastItem ? 'page' : undefined}
							>
								{item.displayKey}
							</a>
							{/* 顯示分隔箭頭 */}
							{!isLastItem && (
								<FiChevronRight className='mx-1 text-gray-400' size={16} />
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Breadcrumb
