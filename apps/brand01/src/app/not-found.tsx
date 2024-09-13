import React from 'react'

export default function NotFound() {
	return (
		<main className='bg-tertiary-500 flex min-h-screen items-center justify-center'>
			<div className='flex max-w-7xl flex-1 flex-col items-center justify-center gap-4 p-4 sm:p-12'>
				<div className='relative flex w-full flex-1 flex-col items-center text-white'>
					<div className="h-[20rem] w-full bg-[url('/img/errorpage/error.png')] bg-contain bg-center bg-no-repeat sm:h-[40rem]"></div>
					<div className='-mt-12 flex flex-col items-center gap-4 sm:-mt-48'>
						<h1 className='text-5xl font-black sm:text-6xl lg:text-7xl xl:text-8xl'>
							SHOOT
						</h1>
						<p className='m-0 text-center text-base sm:text-lg'>
							Well, It is unexpected.....
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
