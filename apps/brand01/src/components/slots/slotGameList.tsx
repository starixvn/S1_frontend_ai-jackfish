'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { IDisplayGameData, ISlotsCategoryData } from 'JF-api/game/type'
import { paths } from 'JF-constants'
import {
	cn,
	useGetPathname,
	useInView,
	useLocaleRouter,
	useMenuOpen,
} from 'JF-core'
import { useAuthStore, useSlotPageStore } from 'JF-operations'
import { find, isArray } from 'lodash-es'
import { useEffect, useState } from 'react'
import Button from '../button'

interface ISlotGameListProps {
	tpId: string
	activeCategoryKey: keyof ISlotsCategoryData
}
const SlotGameList = ({
	tpId: providerTpId,
	activeCategoryKey,
}: ISlotGameListProps) => {
	const { locale } = useGetPathname()
	const router = useLocaleRouter()
	const { t } = useClientTranslation(locale)
	const { isLogin } = useAuthStore()
	const { slotsCategoryData, providerList, slotGamesData } = useSlotPageStore()
	const { onEnterSlotsPage } = useMenuOpen()
	const { ref: gameListRef, isInView: isGameListInView } = useInView({})

	const [slotsGameList, setSlotsGameList] = useState<IDisplayGameData[]>([])
	// 初始渲染40筆資料
	const [pageSize, setPageSize] = useState(40)
	const [newGameId, setNewGameId] = useState('')

	// 設定每個provider的slot games list
	useEffect(() => {
		const originalGameList = slotsCategoryData[activeCategoryKey]
		const onlyArrayGameList = isArray(originalGameList) ? originalGameList : []
		const filteredGameList = onlyArrayGameList?.filter(({ tpId }) => {
			return tpId ? String(tpId) === providerTpId : true
		})
		setSlotsGameList(filteredGameList.slice(0, pageSize))
	}, [activeCategoryKey, providerTpId, slotsCategoryData, pageSize])

	// 每次向下更新25筆資料
	useEffect(() => {
		if (isGameListInView) {
			if (pageSize > slotsGameList.length) {
				return
			}
			setPageSize(prev => prev + 25)
		}
	}, [isGameListInView, pageSize, slotsGameList.length])

	const handleLoginCallback = () => {
		!isLogin && router.push(paths.login.root)
	}
	// 打開slot games or (DEMO)slot games
	const onGamePlay = ({
		tpId,
		gameId,
		playFree,
	}: {
		tpId: number
		gameId: string
		playFree: boolean
	}) => {
		// * 從 slotGameData 中的 providerList 找對應的 tpGameType
		const { tpGameType = '' } =
			find(slotGamesData.providerList, {
				tpId,
			}) || {}

		onEnterSlotsPage(
			{
				tpId: String(tpId),
				tpGameType: String(tpGameType),
				gameId,
				isFree: playFree,
			},
			{ loginCallback: handleLoginCallback },
		)
	}

	return slotsGameList.length > 0 ? (
		<div className='grid grid-cols-3 place-items-center gap-6 px-8 py-6 lg:grid-cols-5 lg:px-52'>
			{slotsGameList.map(({ tpId, gameId, imgName, playFree, isMaintain }) => {
				/**
				 * @resultImgUrl 根據語系組合過的遊戲圖片
				 */
				const resultGameImgDisplayText = providerList.find(
					({ tpId: vendorTpId }) => vendorTpId === tpId,
				)?.gameImgDisplayText
				const resultImgName = imgName[locale] ?? imgName['en']
				const resultImgUrl = `${slotGamesData.imgUrl}/${resultGameImgDisplayText}/${resultImgName}`
				return (
					<div
						key={`game-${gameId}`}
						className='max-w-[200px] cursor-pointer overflow-hidden rounded-xl'
						onClick={() => {
							setNewGameId(gameId)
						}}
					>
						{/* 在維修中遊戲的做些顯示 */}
						{isMaintain && <div>{t('Label_General_UnderMaintenance')}</div>}
						<div className='relative'>
							<img
								className='h-full w-full'
								src={resultImgUrl}
								alt={resultImgName}
							/>

							{/* 遮罩部分：桌機hover，手機點一下觸發 */}
							<div
								className={cn(
									'absolute inset-0 top-1/2 left-1/2 mx-auto hidden h-full w-full translate-y-[-50%] translate-x-[-50%] flex-col items-center justify-center gap-2 bg-black bg-opacity-50 text-center opacity-0 transition ease-in-out hover:opacity-100 lg:flex',
									{ 'flex opacity-100 lg:opacity-0': newGameId === gameId },
								)}
							>
								<Button
									type='secondary'
									size={'sm'}
									className='w-full truncate'
									onClick={() =>
										onGamePlay({
											tpId,
											gameId,
											playFree: false,
										})
									}
								>
									{t('Label_PlayNow')}
								</Button>

								{playFree ? (
									<Button
										type='ghost'
										size={'sm'}
										className='w-full'
										onClick={() =>
											onGamePlay({
												tpId,
												gameId,
												playFree,
											})
										}
									>
										{t('Label_Demo')}
									</Button>
								) : null}
							</div>
						</div>
					</div>
				)
			})}
			<span ref={gameListRef} />
		</div>
	) : (
		<div className='mt-6'>
			<div className='mx-auto my-0 h-16 w-16'>
				<img
					className='h-full w-full'
					src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/nodata-icon.png`}
					alt=''
				/>
			</div>

			<div className='flex justify-center'>{t('Label_General_NoData')}</div>
		</div>
	)
}

export default SlotGameList
