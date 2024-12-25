'use client'

import { useClientTranslation } from '@noble888/src/i18n/client'
import { FaBoxOpen } from 'react-icons/fa'
const NoInformation = () => {
	const { t } = useClientTranslation()
	return (
		<div className='flex h-full w-full flex-col items-center  text-center'>
			{/* 手機版 */}
			<div className=' flex w-full flex-col items-center px-4 lg:hidden'>
				<FaBoxOpen size={64} className='text-gray-100' />
				<div className='mt-4 min-w-64 rounded bg-gray-100 py-2 shadow-sm'>
					<p className='text-sm text-white'>{t('Label_General_NoData')}</p>
				</div>
			</div>

			{/* 桌機版 */}
			<div className='mt-3 hidden flex-col items-center justify-center lg:flex'>
				<FaBoxOpen size={80} className='text-primary-300' />
				<p className='text-primary-300 text-lg'>{t('Label_General_NoData')}</p>
			</div>
		</div>
	)
}

export default NoInformation
