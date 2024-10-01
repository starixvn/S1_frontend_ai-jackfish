'use client'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { imageUrl, useGetPathname } from 'JF-core'
import HotGameSubMenu from './HotGameSubMenu'
import SubMenu from './SubMenu'

interface IHomeContentProps {
	isHotGame?: boolean
}

const HomeContent = ({ isHotGame }: IHomeContentProps) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	return (
		<div className='col-span-8 h-screen overflow-auto p-4 md:col-span-9 lg:col-span-12 lg:h-full lg:p-8'>
			<div className='w-full'>
				{isHotGame && (
					<div className='mb-4 flex items-end gap-1'>
						<img src={imageUrl('/img/icon/tag-hot.png')} alt='icon-hot' />
						<p>{t('Label_General_HotGames').toUpperCase()}</p>
					</div>
				)}
				<div className='mb-3 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
					{/* 如果是首頁，就顯示hot game的遊戲，其餘都是用lobbyHeaderData渲染出來 */}
					{isHotGame ? <HotGameSubMenu /> : <SubMenu />}
				</div>
			</div>
		</div>
	)
}
export default HomeContent
