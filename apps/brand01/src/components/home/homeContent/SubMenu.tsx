'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { paths } from 'JF-constants'
import { cn, useGetPathname, useLocaleRouter, useMenuOpen } from 'JF-core'
import { useHomeStore } from 'JF-operations'

const SubMenu = () => {
	const router = useLocaleRouter()
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { onMenuOpen } = useMenuOpen({ isPathParams: true })
	const { subMenuData } = useHomeStore()


	console.log(subMenuData)

	
	return (
		<>
			{subMenuData?.map(item => {
				const {
					tpGameIdNo,
					rwdLobbyPicUrl,
					productName = '',
					isTpMaintain,
				} = item
				let imgUrl
				if (rwdLobbyPicUrl) {
					try {
						imgUrl = JSON.parse(rwdLobbyPicUrl)[0]
					} catch (e) {
						// eslint-disable-next-line no-console
						console.error('Failed to parse rwdLobbyPicUrl', e)
						imgUrl = ''
					}
				} else {
					imgUrl = ''
				}
				return (
					<div key={`subMenu-${tpGameIdNo}`}>
						<div
							className='group relative cursor-pointer object-left-top'
							onClick={() => {
								onMenuOpen(item, {
									loginCallback: () => {
										router.push(paths.login.root)
									},
									// eslint-disable-next-line no-console
									messageCallBack: message => console.error(message),
								})
							}}
						>
							<img
								src={imgUrl}
								alt=''
								className={cn('w-full rounded-xl object-cover', {
									'transition ease-in-out group-hover:scale-105': !isTpMaintain,
								})}
							/>
							{/* 維護中遊戲要灰階且不能點擊 */}
							{isTpMaintain ? (
								<div
									className='absolute inset-0 grid w-full cursor-not-allowed place-items-center rounded-xl backdrop-grayscale'
									onClick={e => {
										e.stopPropagation()
									}}
								>
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
						<p>{t(productName)}</p>
					</div>
				)
			})}
		</>
	)
}
export default SubMenu
