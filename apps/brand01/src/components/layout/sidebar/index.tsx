'use client'
import { HOME_MENU_DATA } from '@brand01/src/data/home/menu'
import { useHomeStore, useSocialChannelStore } from 'JF-operations'
import useMenu from 'libs/core/src/lib/hooks/useMenu'
import { useEffect } from 'react'
import SidebarData from './SidebarData'
import SidebarHotGame from './SidebarHotGame'
import SidebarSkeleton from './SidebarSkeleton'

const Sidebar = () => {
	const { menuList } = useMenu({ homeMenuData: HOME_MENU_DATA })
	const { lineChannel } = useSocialChannelStore()
	const { isInit, fetchLobbyHeader } = useHomeStore()

	useEffect(() => {
		fetchLobbyHeader()
	}, [fetchLobbyHeader])

	if (!isInit) {
		return [...Array(8)].map((_, index) => <SidebarSkeleton key={index} />)
	}

	return (
		<>
			{/* 只有hot game的  */}
			<SidebarHotGame />

			{/* sports, lottery, slots...等sidebar lobby  */}
			{menuList.map(
				({ pathname, category, displayKey, subMenu, iconUrl, ...rest }) => {
					return (
						<SidebarData
							key={category}
							category={category}
							subMenu={subMenu}
							pathname={pathname}
							displayKey={displayKey}
							iconUrl={iconUrl}
							{...rest}
						/>
					)
				},
			)}
			<a
				href={lineChannel.link}
				target='_blank'
				className='mx-auto mt-8 block w-3/4 lg:w-28'
			>
				<img className='w-full' src='/img/icon/icon-line-sidebar.png' alt='' />
			</a>
		</>
	)
}

export default Sidebar
