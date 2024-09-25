import SubMenu from './SubMenu'

const HomeContent = () => {
	return (
		<div className='col-span-8 h-screen overflow-auto p-4 md:col-span-9 lg:col-span-12 lg:h-full lg:p-8'>
			<div className='w-full'>
				<div className='mb-3 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
					<SubMenu />
				</div>
			</div>
		</div>
	)
}
export default HomeContent
