'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { MENU_DATA } from '@noble888/src/data/static'
import { CurrenciesEnum, MenuIconTypeEnum, MenuKeyEnum } from 'JF-constants'
import { cn, isEventPeriod, useGetPathname, useMenuOpen } from 'JF-core'
import { useAuthStore, useHomeStore } from 'JF-operations'
import useMenu from 'libs/core/src/lib/hooks/useMenu'
import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

const mockHotGameData = [
	{
		gameLogo: 'https://dogecoin.com/assets/images/doge.webp',
		gameName: 'Game 1',
		gameList: Array.from({ length: 10 }, (_, i) => `Game 1-${i + 1}`),
	},
	{
		gameLogo: 'https://dogecoin.com/assets/images/doge.webp',
		gameName: 'Game 2',
		gameList: Array.from({ length: 10 }, (_, i) => `Game 2-${i + 1}`),
	},
	{
		gameLogo: 'https://dogecoin.com/assets/images/doge.webp',
		gameName: 'Game 3',
		gameList: Array.from({ length: 10 }, (_, i) => `Game 3-${i + 1}`),
	},
	{
		gameLogo: 'https://dogecoin.com/assets/images/doge.webp',
		gameName: 'Game 4',
		gameList: Array.from({ length: 10 }, (_, i) => `Game 4-${i + 1}`),
	},
]

const config = {
	slidesPerView: 3.2,
	spaceBetween: 10,
	pagination: { clickable: true },
}

export default function HotGameSwiper() {
	const [selectedGame, setSelectedGame] = useState(mockHotGameData[0])

	const {
		userInfo: { currencyId },
	} = useAuthStore()

	const defaultMenuKey =
		currencyId === CurrenciesEnum.USD || currencyId === CurrenciesEnum.CNY
			? 'Casino'
			: 'Sports'

	const [menuKey, setMenuKey] = useState<keyof typeof MenuKeyEnum | undefined>(
		defaultMenuKey,
	)

	// i18n
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { onMenuOpen } = useMenuOpen({})

	// 取得 hotGameList 和 fetchLobbyHeader 方法
	const { hotGameList, fetchLobbyHeader } = useHomeStore(state => ({
		hotGameList: state.hotGameList,
		fetchLobbyHeader: state.fetchLobbyHeader,
	}))

	// 在組件掛載時，執行 fetchLobbyHeader 方法來獲取資料
	useEffect(() => {
		fetchLobbyHeader()
	}, [fetchLobbyHeader])

	const { menuList } = useMenu({ homeMenuData: MENU_DATA })

	console.log(menuList)

	console.log(hotGameList)

	const handleHotGameClick = (game: any) => {
		setSelectedGame(game)
	}

	const gameSlides = mockHotGameData.map(game => {
		const { gameLogo, gameName } = game
		return (
			<SwiperSlide key={gameName} onClick={() => handleHotGameClick(game)}>
				<div className='hotgame-item'>
					<a>
						<div>
							<img src={gameLogo} alt={gameName} />
							<span>{gameName}</span>
						</div>
					</a>
				</div>
			</SwiperSlide>
		)
	})

	return (
		<>
			<div className='home-hotgame'>
				{menuList.map(mainMenuItem => {
					const { display, category, h5, displayKey, subMenu } =
						mainMenuItem || {}
					if (display === 'desktop') return null
					const { icon } = h5 || {}

					console.log('icon', h5)
					// * 查看 subMenu 是否有在顯示範圍的 New Icon( 手機貌似只有 New Tag )
					const hasNewIcon = subMenu.some(subMenuItem => {
						const { iconType, iconStartTime, iconEndTime } = subMenuItem || {}

						return (
							isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
							iconType === MenuIconTypeEnum.New
						)
					})

					const menuText = (displayKey && t(displayKey)) || ''

					return (
						<button
							className={cn(`btn-${icon}`, {
								active: menuKey === category,
							})}                           
							key={category}
						>
							{hasNewIcon && <div className='new-icon'>New</div>}
							<div className='btn-circle btn-circle bg-blue-500 rounded-full overflow-hidden w-full' >
								<img
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/h5/img/4.0/${icon}-icon.png`}
									alt={icon ?? ''}
                                    className="rounded-full"
								/>
							</div>
							<div>{menuText}</div>
						</button>
					)
				})}

				<div
					style={{
						overflowX: 'auto', // 水平滾動
						whiteSpace: 'nowrap', // 禁止換行
						scrollbarWidth: 'thin', // Firefox 滾動條樣式
					}}
				>
					<Swiper {...config}>{gameSlides}</Swiper>
				</div>
				<div className='home-hotgame-list'>
					<h3>{selectedGame.gameName} 的遊戲列表:</h3>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(4, 1fr)',
							gap: '10px',
						}}
					>
						{selectedGame.gameList.map((game, index) => (
							<div
								key={index}
								style={{
									padding: '10px',
									textAlign: 'center',
									backgroundColor: '#f8f8f8',
									border: '1px solid #ddd',
									borderRadius: '8px',
									boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
								}}
							>
								{game}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}
