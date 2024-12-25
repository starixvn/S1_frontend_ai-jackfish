const Info = () => {
	return (
		<div className='my-5 w-full'>
			<div className='text-gray-0 grid grid-cols-2 gap-4 '>
				{/* Phone Number */}
				<div className='flex flex-col'>
					<span className='text-xs font-semibold '>Phone Number</span>
					<span className='t text-xs font-medium'>(+62) 925845257856</span>
					<button className='bg-secondary-500 text-gray-0 mt-2 whitespace-nowrap rounded px-1 py-2 text-xs'>
						Mobile Verification
					</button>
				</div>

				{/* Email */}
				<div className='flex flex-col'>
					<span className='text-xs font-semibold '>Email</span>
					<span className='t text-xs font-medium'>
						qazewtwef6120p@gmail.com
					</span>
					<button className='bg-secondary-500 text-gray-0 mt-2 whitespace-nowrap rounded px-1 py-2 text-xs'>
						Email Verification
					</button>
				</div>

				{/* Real Name */}
				<div className='flex flex-col'>
					<span className='text-xs font-semibold '>Real Name</span>
					<span className='t text-xs font-medium'>seventest</span>
				</div>

				{/* Birthday */}
				<div className='flex flex-col'>
					<span className='text-xs font-semibold '>Birthday</span>
					<span className='t text-xs font-medium'>1/1/1990</span>
				</div>

				{/* Username */}
				<div className='flex flex-col'>
					<span className='text-xs font-semibold '>Username</span>
					<span className='t text-xs font-medium'>seventest15</span>
				</div>

				{/* Register Time */}
				<div className='flex flex-col'>
					<span className='text-xs font-semibold '>Register Time</span>
					<span className='t text-xs font-medium'>26/12/2024 17:10:55</span>
				</div>

				{/* Last Login */}
				<div className='flex flex-col'>
					<span className='text-xs font-semibold '>Last Login</span>
					<span className='t text-xs font-medium'>27/12/2024 10:39:13</span>
				</div>
			</div>
		</div>
	)
}

export { Info }
