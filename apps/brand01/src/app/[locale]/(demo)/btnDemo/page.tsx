'use client'
import Button from '@brand01/src/components/button'
import { useState } from 'react'

const Page = () => {
	const [loading, setLoading] = useState(false)
	const [loading2, setLoading2] = useState(false)
	const [loading3, setLoading3] = useState(false)
	const [loading4, setLoading4] = useState(false)

	const handleClick = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 2000)
	}

	const handleClick2 = () => {
		setLoading2(true)
		setTimeout(() => {
			setLoading2(false)
		}, 2000)
	}

	const handleClick3 = () => {
		setLoading3(true)
		setTimeout(() => {
			setLoading3(false)
		}, 2000)
	}

	const handleClick4 = () => {
		setLoading4(true)
		setTimeout(() => {
			setLoading4(false)
		}, 2000)
	}

	return (
		<>
			<div className='bg-red mx-2 mt-2 flex flex-col items-center gap-5'>
				<div className='bg-black-700 w-full gap-5'>
					<p className='text-white'>
						自己定義要用的 Button 在 h5 和 desktop 的大小 用 size , desktopSize
						來控制 h5 和 desktop 的大小，高度也可調 預設是sm(40px)
					</p>
					<div>
						<Button
							size='sm'
							desktopSize='sm'
							h='md'
							type='primary'
							onClick={handleClick}
							loading={loading}
						>
							{`${loading ? '' : 'Submit'}`}
						</Button>
					</div>

					<div>
						<Button
							size='lg'
							desktopSize='md'
							h='lg'
							type='cancel'
							onClick={handleClick2}
							loading={loading2}
						>
							lg/md
						</Button>
					</div>

					<div>
						<Button
							size='md'
							desktopSize='lg'
							h='lg'
							type='ghost'
							onClick={handleClick3}
							loading={loading3}
						>
							md/lg
						</Button>
					</div>
					<div>
						<Button
							size='sm'
							desktopSize='xl'
							h='sm'
							type='secondary'
							onClick={handleClick4}
							loading={loading4}
						>
							sm/xl
						</Button>
					</div>
					<div>
						<Button
							size='xl'
							desktopSize='xl'
							h='lg'
							type='secondary'
							isDisabled={true}
						>
							h5= sm, desktop= xl
						</Button>
					</div>
					<div>
						<Button
							size='xl'
							desktopSize='sm'
							h='md'
							type='primary'
							onClick={handleClick}
							loading={loading}
						>
							{loading ? 'Submitting...' : 'Submit'}
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
