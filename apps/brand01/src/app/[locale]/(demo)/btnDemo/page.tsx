'use client'
import Button from '@brand01/src/components/button'

const Page = () => {
	return (
		<>
			<div className='bg-red mx-2 mt-2 flex flex-col items-center gap-4'>
				<div className='bg-black-700 w-full gap-5'>
					<p className='text-white'>
						自己定義要用的 Button 在 h5 和 desktop 的大小 用 size , desktopSize
						來控制 h5 和 desktop 的大小，高度也可調 預設是sm(40px)
					</p>
					<div>
						<Button size='sm' desktopSize='sm' h='md' type='primary'>
							sm/sm
						</Button>
					</div>

					<div>
						<Button size='lg' desktopSize='md' h='lg' type='cancel'>
							lg/md
						</Button>
					</div>

					<div>
						<Button size='md' desktopSize='lg' h='lg' type='ghost'>
							md/lg
						</Button>
					</div>
					<div>
						<Button size='sm' desktopSize='xl' h='sm' type='secondary'>
							sm/xl
						</Button>
					</div>
					<div>
						<Button
							size='sm'
							desktopSize='xl'
							h='lg'
							type='secondary'
							isDisabled={true}
						>
							h5= sm, desktop= xl
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
