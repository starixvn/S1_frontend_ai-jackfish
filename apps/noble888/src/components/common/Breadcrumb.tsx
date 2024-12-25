'use client'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { RxTriangleRight } from 'react-icons/rx'

interface IBreadcrumbProps {
	breadcrumbData: string[] // Breadcrumb 資料
	activeIndex: number // 當前選中索引
	onBreadcrumbClick: (index: number) => void // 點擊 Breadcrumb 的事件
}

/**
 * Breadcrumb 組件
 * @param breadcrumbData - 顯示的 Breadcrumb 資料
 * @param activeIndex - 當前選中的 Breadcrumb 索引
 * @param onBreadcrumbClick - 點擊 Breadcrumb 的回調函數
 */
const Breadcrumb = ({
	activeIndex,
	breadcrumbData,
	onBreadcrumbClick,
}: IBreadcrumbProps) => {
	const { t } = useClientTranslation()

	/** 顯示 activeIndex 之前的 Breadcrumb */
	const visibleItems = breadcrumbData.slice(0, activeIndex + 1)

	return (
		<ul className='text-gray-300  ms-4 flex flex-wrap items-center lg:text-white'>
			{visibleItems.map((item, index) => {
				/** 是否為最後一個 item */
				const isLastItem = index === visibleItems.length - 1
				return (
					<li key={item} className='flex flex-nowrap items-center'>
						<a
							onClick={() => onBreadcrumbClick(index)}
							className={`cursor-pointer whitespace-nowrap text-sm ${
								isLastItem ? 'font-bold' : ''
							}`}
							aria-current={isLastItem ? 'page' : undefined}
						>
							{t(item)}
						</a>
						{/* 最後一個 item 不顯示箭頭 */}
						{!isLastItem && (
							<RxTriangleRight className='text-primary-500 mx-1' size={13} />
						)}
					</li>
				)
			})}
		</ul>
	)
}

export default Breadcrumb
