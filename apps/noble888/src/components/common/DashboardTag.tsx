'use client'

import { ElementType } from 'react'

interface IDashboardTagProps {
	Icon: ElementType
	title: string
	iconSize?: number
}

/** 用於顯示在 dashboard 頁面的標籤
 *  @param Icon React 組件（例如 react-icons 提供的圖示）
 *  @param title 標題
 *  @param iconSize 圖示大小，預設為 25
 *  @example
 * import { MdOutlineManageHistory } from 'react-icons/md'
 * <DashboardTag Icon={MdOutlineManageHistory} iconSize={40} title="Statement" />
 */
const DashboardTag = ({ Icon, title, iconSize = 25 }: IDashboardTagProps) => {
	return (
		<div className='flex'>
			<div className='bg-secondary-500 flex flex-col items-end rounded-b-xl px-10 pb-5 pt-3 text-white'>
				<div className='flex items-center gap-1'>
					<Icon size={iconSize} />
					<div className='ms-2 text-lg font-bold'>{title}</div>
				</div>
				<div className='from-gray-0 h-1 w-20 bg-gradient-to-l rtl:bg-gradient-to-r' />
			</div>
		</div>
	)
}

export default DashboardTag
