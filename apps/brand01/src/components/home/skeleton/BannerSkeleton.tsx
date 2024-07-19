import React from 'react'

const BannerSkeleton = () => {
	return (
		<div className='col-span-12'>
			<div className='lg:mr-4 lg:pt-4'>
				<div className='h-[30vw] w-full animate-pulse rounded bg-neutral-300 lg:h-[20vw]' />
			</div>
			<div className=' min-h-[1.5rem] animate-pulse rounded bg-neutral-400 text-xs text-neutral-100 lg:mr-4' />
		</div>
	)
}

export default BannerSkeleton
