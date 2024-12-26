'use client'

import { MouseEvent, useEffect, useRef, useState } from 'react'
// Utilities
import { useClientTranslation } from '@brand01/src/i18n/client'
import { MENU_DATA } from '@noble888/src/data/static'
import { MenuIconTypeEnum } from 'JF-constants'
import { cn, isEventPeriod, useGetPathname, useMenuOpen } from 'JF-core'
import { useHomeStore } from 'JF-operations'
import useMenu from 'libs/core/src/lib/hooks/useMenu'
import { useMediaQuery } from 'usehooks-ts'
import { activeCategoryColors } from './staticData'

export default function HotGameSwiper() {
	const defaultMenuKey = 'Sports'
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { onMenuOpen } = useMenuOpen({})
	const { menuList } = useMenu({ homeMenuData: MENU_DATA })
	const [selectedCategory, setSelectedCategory] =
		useState<string>(defaultMenuKey)

	const isLargeScreen = useMediaQuery('(min-width: 1024px)') // 偵測寬度是否大於 1024px

	const { fetchLobbyHeader } = useHomeStore(state => ({
		fetchLobbyHeader: state.fetchLobbyHeader,
	}))

	useEffect(() => {
		fetchLobbyHeader()
	}, [fetchLobbyHeader])

	// 取得當前選取 category 的子選單
	const subMenu = menuList.find(
		item => item.category === selectedCategory,
	)?.subMenu

	// 點擊遊戲後打開菜單 or 顯示登入視窗
	const handleMenuOpen = (item: any) => {
		onMenuOpen(item, {
			loginCallback: () => {
				console.log('尚未登入')
			},
		})
	}

	// ========== 以下是「可拖動」的核心邏輯 ==========
	const containerRef = useRef<HTMLDivElement>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)

	// onMouseDown: 開始拖曳
	const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return
		setIsDragging(true)
		// 目前滑鼠的位置 (相對於整個文件)
		setStartX(e.pageX - containerRef.current.offsetLeft)
		// 記錄下當前容器的 scrollLeft
		setScrollLeft(containerRef.current.scrollLeft)
	}

	// onMouseLeave / onMouseUp: 結束拖曳
	const stopDragging = () => {
		setIsDragging(false)
	}

	// onMouseMove: 拖曳過程中，不斷更新 scrollLeft
	const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!isDragging || !containerRef.current) return

		e.preventDefault() // 避免選到文字
		const x = e.pageX - containerRef.current.offsetLeft
		// 「滑鼠移動距離」 * 1 代表移動速度
		const walk = (x - startX) * 1
		containerRef.current.scrollLeft = scrollLeft - walk
	}

	if (isLargeScreen) {
		// 若寬度大於 1024px，整個元件隱藏
		return null
	}

	return (
		<div className='wrapper'>
			{/* Sidebar 改為用原生 div + CSS，增加可拖動功能 */}
			<div
				ref={containerRef}
				className='home-sidebar scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400
          cursor-grab select-none overflow-x-auto whitespace-nowrap'
				onMouseDown={onMouseDown}
				onMouseLeave={stopDragging}
				onMouseUp={stopDragging}
				onMouseMove={onMouseMove}
				style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
			>
				{/* inline-flex 讓按鈕們橫向排列 */}
				<div className='inline-flex'>
					{menuList
						.filter(menuItem => menuItem?.display !== 'desktop')
						.map((menuItem, index) => {
							const { category, h5, displayKey, subMenu } = menuItem
							const { icon } = h5 || {}

							// 決定是否顯示 new-icon
							const hasNewIcon = subMenu?.some(
								({ iconType, iconStartTime, iconEndTime }) =>
									isEventPeriod({
										start: iconStartTime,
										end: iconEndTime,
									}) && iconType === MenuIconTypeEnum.New,
							)

							// 判斷是否選中
							const isActive = selectedCategory === category

							// 使用 index 去輪詢顏色
							const colorIndex = index % activeCategoryColors.length
							const activeBgColor = activeCategoryColors[colorIndex].bg
							const activeBorderColor = activeCategoryColors[colorIndex].border

							return (
								<div
									key={category ?? `undefined-${index}`}
									className='inline-block'
								>
									<button
										onClick={() => {
											// 若 category 為 undefined，可自行判斷要不要 setSelectedCategory
											if (category) setSelectedCategory(category)
										}}
										className={cn(
											'relative mx-1 flex flex-col items-center justify-center p-2 transition-colors duration-200',
											// active 才有底部 border
											isActive && `border-b-[7px] ${activeBorderColor}`,
										)}
										style={{ width: '16vw', minWidth: '80px' }}
									>
										{/* new-icon */}
										{hasNewIcon && (
											<div
												className=' flex h-7 absolute top-2 right-3 w-7 items-center justify-center
                       rounded-full bg-[#ff7600] text-[10px] text-white
                        '
											>
												NEW
											</div>
										)}

										{/* 圓形圖片：縮小並居中 */}
										<div
											className={cn(
												'mt-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-400',
												isActive && activeBgColor,
											)}
										>
											<img
												src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/${icon}-icon.png`}
												alt={icon ?? ''}
												className={cn(
													'h-2/3 w-2/3 object-contain',
													isActive && 'brightness-110 saturate-150 filter',
												)}
											/>
										</div>

										{/* 文字：改大、加粗 */}
										<div className='mt-1 whitespace-nowrap text-center text-base font-bold text-[1rem]'>
											{displayKey ? t(displayKey) : ''}
										</div>
									</button>
								</div>
							)
						})}
				</div>
			</div>

			<div className='home-hotgame-list mt-4'>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(4, 1fr)',
						gap: '10px',
					}}
				>
					{subMenu?.map(item => {
						const {
							tpGameIdNo,
							isTpMaintain,
							productName = '',
							pcLobbyPicUrl,
							mobileHeaderPicUrl,
						} = item
						let imgUrl = ''
						if (pcLobbyPicUrl) {
							try {
								imgUrl = JSON.parse(pcLobbyPicUrl)[0]
							} catch (e) {
								console.error('Failed to parse pcLobbyPicUrl', e)
							}
						}

						// 後端這裡是字串格式 需做處理
						const subMenuImage =
							mobileHeaderPicUrl && JSON.parse(mobileHeaderPicUrl)[0]

						return (
							<div key={`subMenu-${tpGameIdNo}`}>
								<div
									className='group relative cursor-pointer object-left-top'
									onClick={() => {
										if (!isTpMaintain) {
											handleMenuOpen(item)
										}
									}}
								>
									<img
										src={subMenuImage}
										alt=''
										className={cn('w-full rounded-xl object-cover', {
											'transition ease-in-out group-hover:scale-105':
												!isTpMaintain,
										})}
									/>
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
								<p className='mt-2 text-center text-sm font-bold text-neutral-700'>
									{t(productName)}
								</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
