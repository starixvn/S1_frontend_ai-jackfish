'use client'
import { useSocialChannelStore } from 'JF-operations'
import useMenu from 'libs/core/src/lib/hooks/useMenu'
import SidebarData from './SidebarData'

const Sidebar = () => {
	const { menuList } = useMenu()
	const { lineChannel } = useSocialChannelStore()
	return (
		<>
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
