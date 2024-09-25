'use client'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { paths } from 'JF-constants'
import { LocaleLink, cn, imageUrl, useGetPathname } from 'JF-core'

const SidebarHotGame = () => {
	const { locale, currentPath } = useGetPathname()
	const { t } = useClientTranslation(locale)

	return (
		<LocaleLink
			href={''}
			className={cn(
				'grid h-24 w-full items-center justify-items-center gap-3 px-3 py-1 text-sm text-neutral-100 drop-shadow-lg',
				'lg:h-20 lg:grid-cols-[auto_1fr] lg:justify-items-start lg:px-6 lg:py-3 lg:text-base',
				'hover:from-secondary-300 hover:to-tertiary-400 hover:bg-gradient-to-r',
				currentPath === paths.home.root &&
					'from-secondary-300 to-tertiary-400 bg-gradient-to-r',
			)}
		>
			<div className='items-center justify-center lg:flex lg:gap-x-2'>
				<div className='mx-auto h-8 w-8 lg:h-10 lg:w-10'>
					<img
						src={imageUrl('/desktop/img/hotgame.png')}
						alt={t('Label_General_HotGames')}
						className='h-full w-full object-cover'
					/>
				</div>
				<div className='text-center lg:text-left'>
					<p>{t('Label_General_HotGames')}</p>
				</div>
			</div>
		</LocaleLink>
	)
}

export default SidebarHotGame
