'use client'
import { FaBoxOpen } from 'react-icons/fa'

const NoInformation = () => {
	return (
		<div className='flex h-full w-full flex-col items-center  text-center'>
			{/* 手機版 */}
			<div className='mt-10 flex w-full flex-col items-center px-4 lg:hidden'>
				<FaBoxOpen size={64} className='text-gray-100' />
				<div className='mt-4 w-80 rounded bg-gray-100 py-2 shadow-sm'>
					<p className='text-sm text-white'>No information is available now</p>
				</div>
			</div>

			{/* 桌機版 */}
			<div className='mt-16 hidden flex-col items-center justify-center lg:flex'>
				<FaBoxOpen size={80} className='text-blue-300' />
				<p className='text-lg text-blue-300'>No information is available now</p>
			</div>
		</div>
	)
}

export default NoInformation
