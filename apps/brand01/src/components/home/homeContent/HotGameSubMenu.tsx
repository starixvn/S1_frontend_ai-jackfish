'use client'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { IEnterPageArgs } from 'JF-constants'
import { cn, useGetPathname, useMenuOpen } from 'JF-core'
import { useHomeStore } from 'JF-operations'

const HotGameSubMenu = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { hotGameList } = useHomeStore()
	const { onEnterPage } = useMenuOpen({})

	return (
		<>
			{hotGameList?.map(hotGameItem => {
				const { gameLogo, isTpMaintain, tpId, gameName, gameId, tpGameType } =
					hotGameItem
				const enterPageArgs: IEnterPageArgs = {
					langId: locale,
					tpId,
					gameId,
					tpGameType,
				}
				return (
					<div key={`subMenu-${tpId}-${gameId}`}>
						<div
							className='group relative cursor-pointer object-left-top'
							onClick={() => {
								onEnterPage(enterPageArgs, {})
							}}
						>
							<img
								src={gameLogo}
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
										{t(gameName)}
									</div>
								</div>
							)}
						</div>
						<p>{t(gameName)}</p>
					</div>
				)
			})}
		</>
	)
}

export default HotGameSubMenu
