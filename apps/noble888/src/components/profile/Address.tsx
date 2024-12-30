'use client'
import { useClientTranslation } from '@noble888/src/i18n/client'

const Address = () => {
	const { t } = useClientTranslation()
	return (
		<div className='my-5 flex w-full flex-col items-center '>
			<div className='flex flex-col items-center'>
				<span className='mb-2 text-lg font-bold'>
					{t('Label_Profile_ShippingAddress')}
				</span>
				<span className='text-xs'>{t('Label_Profile_ShippingHint')}</span>
			</div>

			<hr className='my-4 w-full border-t border-gray-300' />

			<h2 className='text-md mb-4 text-center font-bold'>
				{t('Label_Profile_Address')}
			</h2>

			<span className='mb-4 text-center text-sm '>
				{t('Label_Profile_Address')}
			</span>

			<span className='mb-4 text-center text-sm '>
				{t('Label_Profile_Address')}
			</span>

			<span className='mb-4 text-center text-sm '>
				{t('Label_Profile_Address')}
			</span>

			<span className='mb-4 text-center text-sm '>
				{t('Label_Profile_Address')}
			</span>
		</div>
	)
}

export { Address }
