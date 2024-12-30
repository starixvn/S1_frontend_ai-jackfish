'use client'
import { useClientTranslation } from '@noble888/src/i18n/client'
const Info = () => {
	const { t } = useClientTranslation()
	return (
		<div className='lg:bg-gray-1000 my-5 w-full lg:col-span-3 lg:h-96'>
			<div className='text-gray-0 grid grid-cols-2 gap-4 lg:grid-cols-1 lg:p-5'>
				{/* Real Name */}
				<div className='flex flex-col lg:grid lg:w-full lg:grid-cols-4'>
					<span className='text-xs font-semibold '>Real Name</span>
					<span className='text-xs font-medium'>seventest</span>
				</div>

				{/* Birthday */}
				<div className='flex flex-col lg:grid lg:w-full lg:grid-cols-4'>
					<span className=' text-xs font-semibold '>Birthday</span>
					<span className=' text-xs font-medium'>1/1/1990</span>
				</div>

				{/* Username */}
				<div className='flex flex-col lg:grid lg:w-full lg:grid-cols-4'>
					<span className=' text-xs font-semibold '>Username</span>
					<span className=' text-xs font-medium'>seventest15</span>
				</div>

				{/* Phone Number */}
				<div className='flex flex-col lg:grid lg:w-full lg:grid-cols-4'>
					<p className='text-xs font-semibold lg:flex lg:items-center'>
						Phone Number
					</p>
					<p className='text-xs font-medium break-words lg:flex lg:items-center'>
						(+62) 925845257856
					</p>
					<div className='lg:col-span-2 lg:flex lg:justify-center'>
						<button className='bg-secondary-500 text-gray-0 mt-2 w-32 whitespace-nowrap rounded px-1 py-2 text-xs'>
							{t('Label_Profile_MobileVerifiy')}
						</button>
					</div>
				</div>

				{/* Email */}
				<div className='flex flex-col lg:grid lg:w-full lg:grid-cols-4'>
					<p className='text-xs font-semibold lg:flex lg:items-center'>
						Email
					</p>
					<p className='whitespace-normal break-words text-xs font-medium lg:flex lg:items-center'>
						qazewtwef6120p@gmail.com
					</p>
					<div className='justify-center  lg:col-span-2 lg:flex lg:items-center'>
						<button className='bg-secondary-500 text-gray-0 mt-2 w-32 whitespace-nowrap rounded px-1 py-2 text-xs'>
							{t('Label_Profile_EmailVerification')}
						</button>
					</div>
				</div>

				{/* Register Time */}
				<div className='flex flex-col lg:grid lg:w-full lg:grid-cols-4'>
					<span className='text-xs font-semibold '>
						Register Time
					</span>
					<span className='text-xs font-medium '>
						26/12/2024 17:10:55
					</span>
				</div>

				{/* Last Login */}
				<div className='flex flex-col lg:grid lg:w-full lg:grid-cols-4'>
					<span className='text-xs font-semibold '>
						Last Login
					</span>
					<span className='text-xs font-medium'>
						27/12/2024 10:39:13
					</span>
				</div>
			</div>
		</div>
	)
}

export { Info }
