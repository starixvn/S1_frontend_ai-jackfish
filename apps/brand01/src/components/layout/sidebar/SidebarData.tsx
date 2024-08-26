'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { IMergedMenuData } from 'JF-constants'
import { LocaleLink, cn, imageUrl, useGetPathname } from 'JF-core'
import { useHomeStore } from 'JF-operations'
import { useEffect } from 'react'

const SidebarData: React.FC<IMergedMenuData> = ({
	pathname = '',
	category,
	displayKey = '',
	iconUrl = '',
	subMenu,
}) => {
	const { locale, currentPath } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { setSubMenuData } = useHomeStore()
	useEffect(() => {
		if (pathname === currentPath) {
			setSubMenuData(subMenu ?? [])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPath, pathname])

	return (
		<LocaleLink
			href={pathname}
			className={cn(
				'grid h-24 w-full items-center justify-items-center gap-3 px-3 py-1 text-sm text-neutral-100 drop-shadow-lg',
				'lg:h-20 lg:grid-cols-[auto_1fr] lg:justify-items-start lg:px-6 lg:py-3 lg:text-base',
				'hover:from-secondary-300 hover:to-tertiary-400 hover:bg-gradient-to-r',
				pathname === currentPath &&
					'from-secondary-300 to-tertiary-400 bg-gradient-to-r',
			)}
			key={category}
		>
			<div className='items-center justify-center lg:flex lg:gap-x-2'>
				<div className='mx-auto h-8 w-8 lg:h-10 lg:w-10'>
					<img
						src={imageUrl(iconUrl)}
						alt={t(displayKey)}
						className='h-full w-full object-cover'
					/>
				</div>
				<div className='text-center lg:text-left'>
					<p>{t(displayKey)}</p>
				</div>
			</div>
		</LocaleLink>
	)
}
export default SidebarData
