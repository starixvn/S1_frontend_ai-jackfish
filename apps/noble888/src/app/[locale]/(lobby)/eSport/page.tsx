'use client'

import { MENU_DATA } from '@noble888/src/data/static/menu'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { cn, useGetPathname } from 'JF-core'
import useMenu from 'libs/core/src/lib/hooks/useMenu'

export default function FishingContent() {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { menuList } = useMenu({ homeMenuData: MENU_DATA })

	const fishingSubMenu = menuList.find(
		item => item.category === 'Fishing',
	)?.subMenu

	console.log('123', fishingSubMenu)
	console.log(menuList)

	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5'>
			{fishingSubMenu?.map(item => {
				const { tpGameIdNo, isTpMaintain, productName ="", pcLobbyPicUrl } = item

				let imgUrl
				if (pcLobbyPicUrl) {
					try {
						imgUrl = JSON.parse(pcLobbyPicUrl)[0]
					} catch (e) {
						// eslint-disable-next-line no-console
						console.error('Failed to parse rwdLobbyPicUrl', e)
						imgUrl = ''
					}
				} else {
					imgUrl = ''
				}

				console.log(imgUrl)

				return (
					<div key={`subMenu-${tpGameIdNo}`}>
						<div className='group relative cursor-pointer object-left-top'>
							<img
								src={imgUrl}
								alt=''
								className={cn('w-full rounded-xl object-cover', {
									'transition ease-in-out group-hover:scale-105': !isTpMaintain,
								})}
							/>
							{/* 維護中遊戲要灰階且不能點擊 */}
							{isTpMaintain ? (
								<div className='absolute inset-0 grid w-full cursor-not-allowed place-items-center rounded-xl backdrop-grayscale'>
									<div className='w-full rounded-md bg-neutral-300 py-1 text-center text-neutral-500'>
										{t('Label_General_UnderMaintenance')}
									</div>
								</div>
							) : (
								<div
									className={cn(
										'absolute inset-0 grid place-items-center rounded-xl bg-gradient-to-t from-neutral-500 to-neutral-500/10 opacity-0 transition ease-in-out group-hover:scale-105 group-hover:hover:opacity-100',
									)}
								>
									<div className='truncate text-center text-sm font-medium leading-8 text-neutral-100'>
										{t(productName)}
									</div>
								</div>
							)}
						</div>
						<p className='mt-2 text-center text-sm font-medium text-neutral-700'>
							{t(productName)}
						</p>
					</div>
				)
			})}
		</div>
	)
}
