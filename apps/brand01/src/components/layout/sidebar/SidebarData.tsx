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
				'xl:min-w-500px hover:from-secondary-300 hover:to-primary-300 grid w-full items-center justify-items-center gap-3 px-3 py-1 text-sm text-neutral-100 drop-shadow-lg hover:bg-gradient-to-r max-lg:mt-4 lg:grid-cols-[auto_1fr] lg:justify-items-start lg:px-6 lg:py-3 lg:text-base xl:h-[4.5rem]',
				pathname === currentPath &&
					'from-secondary-300 to-primary-300 bg-gradient-to-r',
			)}
			key={category}
		>
			<img
				src={imageUrl(iconUrl)}
				alt={t(displayKey)}
				className='h-10 w-10 object-cover'
			/>
			<div className='text-center lg:text-left'>
				<p>{t(displayKey)}</p>
			</div>
		</LocaleLink>
	)
}
export default SidebarData
