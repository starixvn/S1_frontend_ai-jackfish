import SubMenu from './SubMenu'

const HomeContent = () => {
	return (
		<div className='col-span-8 pr-4 pb-8 md:col-span-9 lg:col-span-12'>
			<div className='w-full'>
				<div className='mb-3 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
					<SubMenu />
				</div>
			</div>
		</div>
	)
}
export default HomeContent
