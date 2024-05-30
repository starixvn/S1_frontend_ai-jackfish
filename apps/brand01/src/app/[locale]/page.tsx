'use client'

export default function Home({
	params: { locale },
}: {
	params: {
		locale: string
	}
}) {
	return (
		<div className='grid grid-rows-3 place-items-center min-h-full border-2 w-full h-screen'>
			<div className='text-center'>
				<h2 className='py-0 text-primary-400 text-lg'>CHILDREN</h2>
			</div>
		</div>
	)
}
