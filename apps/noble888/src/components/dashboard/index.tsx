'use client'
import Sidebar from './Sidebar'

export default function Dashboard({ children }: { children: React.ReactNode }) {
	return (
		<div className='mt-md-10 mt-lg-10 mt-xl-10 grid grid-cols-12 gap-6 lg:px-[8rem] xl:px-[15rem]'>
			{/* 桌機側邊欄 */}
			<div className='col-span-3 hidden lg:block xl:block'>
				<Sidebar />
			</div>

			{/* 主內容 */}
			<div className='bg-black-50 col-span-12 overflow-hidden lg:col-span-9 lg:rounded-md xl:col-span-9  xl:rounded-md'>
				{children}
			</div>
		</div>
	)
}
