'use client'

import { THomeMenuData } from '@brand01/src/data/home/menu'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { imageUrl, useGetPathname } from 'JF-core'
import { useHomeStore } from 'JF-operations'
import clsx from 'clsx'
import { useEffect } from 'react'

const SidebarData: React.FC<THomeMenuData> = ({
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
				'xl:min-w-500px hover:from-secondary-300 hover:to-primary-300 grid w-full items-center justify-items-center gap-3 px-3 py-1 text-sm text-neutral-100 drop-shadow-lg hover:bg-gradient-to-r max-lg:mt-4 lg:grid-cols-[auto_1fr] lg:justify-items-start lg:px-6 lg:py-3 lg:text-base xl:h-[4.5rem]',
				category === activeHomeMenu &&
					'from-secondary-300 to-primary-300 bg-gradient-to-r',
			)}
			key={category}
			onClick={() => setActiveHomeMenu(category)}
		>
			<img
				src={imageUrl(iconUrl)}
				alt={t(displayKey)}
				className='h-10 w-10 object-cover'
			/>
			<div className='text-center lg:text-left'>
				<p>{t(displayKey)}</p>
				<p className='max-lg:hidden'>ยอดนิยม</p>
			</div>
		</button>
	)
}
export default SidebarData
