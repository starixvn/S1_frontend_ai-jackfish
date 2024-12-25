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
					<div className='bg-primary-900 px-4 py-2 font-semibold text-white'>
						{t(displayKey)}
					</div>
					{/* 子分類 */}
					<div>
						{submenuList.map(
							({ displayKey, pathname, isActive, isVisible }) =>
								isVisible && (
									<Link
										key={pathname}
										href={pathname}
										className={cn(
											' text-primary-900 hover:bg-primary-300 block border-b border-b-white bg-gray-100 px-4 py-2 hover:text-white ',
											isActive && 'bg-primary-300 text-white',
										)}
										onClick={() => handleMenuClick(pathname)}
									>
										{`－${t(displayKey)}`}
									</Link>
								),
						)}
					</div>
				</div>
			))}
		</div>
	)
}
