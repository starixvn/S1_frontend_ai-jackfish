import { useClientTranslation } from '@noble888/src/i18n/client'
import { cn, useSidebar } from 'JF-core'
import Link from 'next/link'

export default function Sidebar() {
	const { t } = useClientTranslation()

	const { menuList, handleMenuClick } = useSidebar()

	return (
		<div className='flex flex-col gap-2 '>
			{menuList?.map(({ displayKey, submenuList }) => (
				<div key={displayKey} className='overflow-hidden rounded-md'>
					{/* 主分類 */}
					<div className='bg-secondary-500 text-gray-0 px-4 py-2 font-semibold'>
						{t(displayKey)}
					</div>
					{/* 子分類 */}
					<div>
						{submenuList.map(
							({ displayKey, pathname, isActive, isVisible }, index) => {
								const lastIndex = submenuList.length - 1
								const noBottomBorder = index !== lastIndex

								return (
									isVisible && (
										<Link
											key={pathname}
											href={pathname}
											className={cn(
												'text-gray-0 hover:bg-secondary-500 hover:text-gray-0 block bg-gray-900 px-4 py-2',
												isActive &&
													'from-secondary-500 bg-gradient-to-r to-gray-900 text-white',
												noBottomBorder && 'border-b border-b-white', // 只在不是最後一項時渲染邊框
											)}
											onClick={() => handleMenuClick(pathname)}
										>
											{`－${t(displayKey)}`}
										</Link>
									)
								)
							},
						)}
					</div>
				</div>
			))}
		</div>
	)
}
