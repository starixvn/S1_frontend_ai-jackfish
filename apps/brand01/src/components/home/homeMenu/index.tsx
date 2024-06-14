import { HOME_MENU_DATA } from '@brand01/src/data/home/menu'
import MenuData from './Menu'

const HomeMenu = () => {
	return (
		<div className='col-span-4 pl-4 md:col-span-3 lg:order-first lg:row-span-3 lg:p-4 xl:col-span-2'>
			<div className='sticky top-24 grid h-80 w-full place-items-center'>
				{HOME_MENU_DATA.map(({ category, displayKey, iconUrl, subMenu }) => (
					<MenuData
						key={category}
						category={category}
						displayKey={displayKey}
						iconUrl={iconUrl}
						subMenu={subMenu}
					/>
				))}
			</div>
		</div>
	)
}
export default HomeMenu
