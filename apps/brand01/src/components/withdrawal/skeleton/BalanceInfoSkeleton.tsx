export const BalanceInfoSkeleton = () => {
	return (
		<div className='bg-tertiary-500 grid grid-rows-3 gap-4 rounded-2xl p-8 lg:grid-cols-3'>
			<div className='flex items-center'>
				<div className='invisible mr-2 text-2xl font-bold'>+</div>
				<div className='bg-tertiary-400 text-s col-span-full grid h-full grow animate-pulse auto-cols-auto place-content-between gap-2 rounded-2xl px-3 py-4 text-start'>
					<div className='bg-primary-200 mb-2 h-4 w-3/4 rounded'></div>
					<div className='grid grid-flow-col place-content-start gap-2'>
						<div className='bg-secondary-300 h-4 w-1/4 rounded'></div>
						<div className='bg-secondary-300 h-4 w-1/2 rounded'></div>
					</div>
				</div>
			</div>
			<div className='flex items-center'>
				<div className='mr-2 text-2xl font-bold'>-</div>
				<div className='bg-tertiary-400 grid h-full grow animate-pulse auto-cols-auto place-content-between gap-2 rounded-2xl px-3 py-4 text-start'>
					<div className='bg-primary-200 mb-2 h-4 w-3/4 rounded'></div>
					<div className='grid grid-flow-col place-content-start gap-2'>
						<div className='bg-secondary-300 h-4 w-1/4 rounded'></div>
						<div className='bg-secondary-300 h-4 w-1/2 rounded'></div>
					</div>
				</div>
			</div>
			<div className='flex items-center'>
				<div className='mr-2 text-2xl font-bold'>=</div>
				<div className='bg-tertiary-400 grid grow animate-pulse auto-cols-auto place-content-between gap-2 rounded-2xl px-3 py-4 text-start'>
					<div className='bg-primary-200 mb-2 h-4 w-3/4 rounded'></div>
					<div className='grid grid-flow-col place-content-start gap-2'>
						<div className='bg-secondary-300 h-4 w-1/4 rounded'></div>
						<div className='bg-secondary-300 h-4 w-1/2 rounded'></div>
					</div>
				</div>
			</div>
		</div>
	)
}
