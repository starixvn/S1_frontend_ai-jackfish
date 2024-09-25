import HotGameSubMenu from './HotGameSubMenu'
import SubMenu from './SubMenu'

interface IHomeContentProps {
	isHotGame?: boolean
}

const HomeContent = ({ isHotGame }: IHomeContentProps) => {
	return (
		<div className='col-span-8 h-screen overflow-auto p-8 md:col-span-9 lg:col-span-12 lg:h-full'>
			<div className='w-full'>
				<div className='mb-3 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
					{/* 如果是首頁，就顯示hot game的遊戲，其餘都是用lobbyHeaderData渲染出來 */}
					{isHotGame ? <HotGameSubMenu /> : <SubMenu />}
				</div>
			</div>
		</div>
	)
}
export default HomeContent
