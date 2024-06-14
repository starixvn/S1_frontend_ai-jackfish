'use client'

import { THomeMenuData } from '@brand01/src/data/home/menu'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { imageUrl, useGetPathname } from 'JF-core'
import { useHomeStore } from 'JF-operations'
import clsx from 'clsx'
import { useEffect } from 'react'

const Menu: React.FC<THomeMenuData> = ({
	category,
	displayKey,
	iconUrl,
	subMenu,
}) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { activeHomeMenu, setActiveHomeMenu, setSubMenuData } = useHomeStore()
	useEffect(() => {
		if (category === activeHomeMenu) {
			setSubMenuData(subMenu ?? [])
		}
	}, [activeHomeMenu, category, setSubMenuData, subMenu])
	return (
		<button
			className={clsx(
				'xl:min-w-500px hover:bg-primary-300 mb-3 grid w-full items-center justify-items-center gap-3 rounded-xl px-3 py-1 text-sm text-neutral-100 drop-shadow-lg lg:grid-cols-[auto_1fr] lg:justify-items-start lg:px-6 lg:py-3 lg:text-base xl:h-[4.5rem]',
				category === activeHomeMenu ? 'bg-primary-300' : 'bg-neutral-400',
			)}
			key={category}
			onClick={() => setActiveHomeMenu(category)}
		>
			<img
				src={imageUrl(iconUrl)}
				alt={t(displayKey)}
				className='h-6 w-6 object-cover lg:h-10 lg:w-10'
			/>
			<span>{t(displayKey)}</span>
		</button>
	)
}
export default Menu
