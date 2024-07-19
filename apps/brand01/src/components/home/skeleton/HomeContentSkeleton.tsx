const HomeContentSkeleton = () => {
	return (
		<div className='col-span-8 pr-4 pb-8 md:col-span-9 lg:col-span-12'>
			<div className='min-h-[30vh] w-full'>
				<div className='mb-3 grid animate-pulse grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
					{Array.from({ length: 18 }).map((_, index) => (
						<div
							key={index}
							className='group relative w-full cursor-pointer rounded-xl bg-neutral-300 pb-[100%]'
						>
							<div className='absolute inset-0 m-1 grid place-items-center bg-gradient-to-t from-neutral-500 to-neutral-500/10 opacity-0 transition ease-in-out '>
								<div className='truncate text-center text-sm font-medium leading-8 text-neutral-100'>
									&nbsp;
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default HomeContentSkeleton
