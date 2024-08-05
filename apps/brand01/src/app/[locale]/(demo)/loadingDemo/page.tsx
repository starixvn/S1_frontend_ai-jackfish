'use client'

import Loading from '@brand01/src/components/loading'
import { useEffect, useState } from 'react'

const Page = () => {
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 5000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<>
			<div className='my-3 text-center text-3xl'>Loading Demo</div>
			{loading ? (
				<Loading classname='h-80' />
			) : (
				<div className='flex h-80 items-center justify-center text-2xl'>
					demo finished
				</div>
			)}
		</>
	)
}
export default Page
