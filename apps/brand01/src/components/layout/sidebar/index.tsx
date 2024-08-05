'use client'
import { HOME_MENU_DATA } from '@brand01/src/data/home/menu'
import { imageUrl } from 'JF-core'
import Link from 'next/link'
import SidebarData from './SidebarData'

const Sidebar = () => {
	return (
		<>
			{HOME_MENU_DATA.map(({ category, displayKey, iconUrl, subMenu }) => (
				<SidebarData
					key={category}
					category={category}
					displayKey={displayKey}
					iconUrl={iconUrl}
					subMenu={subMenu}
				/>
			))}
			<Link href='' className='mx-auto mt-8 block lg:w-28'>
				<img
					className='w-full'
					src={imageUrl('/img/menu/sever-line.png')}
					alt=''
				/>
			</Link>
		</>
	)
}

export default Sidebar
