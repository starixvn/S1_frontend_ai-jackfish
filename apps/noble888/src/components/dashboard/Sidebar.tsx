import { useClientTranslation } from '@noble888/src/i18n/client'
import { cn, useSidebar } from 'JF-core'
import { useWithdrawalStore } from 'JF-operations'
import Link from 'next/link'

export default function Sidebar() {
	const { t } = useClientTranslation()
	const { withdrawalBlockSetting } = useWithdrawalStore()
	const { menuList, handleMenuClick } = useSidebar({
		withdrawalBlockSetting,
	})

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
											' block border-b border-b-white bg-gray-100 px-4 py-2 text-blue-900 hover:bg-blue-300 hover:text-white ',
											isActive && 'bg-blue-300 text-white',
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
