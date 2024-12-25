'use client'
import Sidebar from './Sidebar'

export default function Dashboard({ children }: { children: React.ReactNode }) {
	return (
		<div className='grid grid-cols-10 gap-6 lg:mb-2 lg:mt-8 lg:px-32 xl:px-64'>
			{/* 僅有桌機才會顯示的側邊欄 */}
			<div className='col-span-2 hidden lg:block'>
				<Sidebar />
			</div>

			{/* 需要登入才能看到的頁面主內容 */}
			<div className='bg-black-50 col-span-12 overflow-hidden lg:col-span-8 lg:rounded-md'>
				{children}
			</div>
		</div>
	)
}
