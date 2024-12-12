'use client'

import { ALLOWED_CURRENCIES } from '@noble888/src/data/static/allowedCurrencies'
import { MENU_DATA } from '@noble888/src/data/static/menu'
import { useClientTranslation } from '@noble888/src/i18n/client'
import {
	LobbyCategoryEnum,
	MainMenuIcon,
	MenuActionEnum,
	MenuIconTypeEnum,
	paths,
	PRODUCTS,
	TDynamicSubMenuItem,
} from 'JF-constants'
import { cn, isEventPeriod, LocaleLink, useMenuOpen } from 'JF-core'
import { useAuthStore, useHomeStore } from 'JF-operations'
import useMenu from 'libs/core/src/lib/hooks/useMenu'
import { includes, toUpper, union } from 'lodash-es'
import { useEffect, useState } from 'react'
import { ImHome } from 'react-icons/im'
import { useDebounceValue } from 'usehooks-ts'
import SubMenu from './SubMenu'

const headerMenuCss =
	'text-base font-semibold hover:text-secondary-500 hover:border-b-4 hover:border-b-secondary-500 py-4 relative cursor-pointer'

const mainMenuIcon = {
	// * 舊的版本沒有 i18n 後來說要支援再加
	[MainMenuIcon.newTag]: (
		<div className='bg-secondary-500 absolute left-1/2 top-[-4px] flex translate-x-[-50%] justify-center rounded-bl-xl rounded-br-xl px-4 text-sm font-bold text-white'>
			NEW
		</div>
	),
	[MainMenuIcon.hotTag]: (
		<div className='bg-danger-500 absolute left-1/2 top-[-4px] flex translate-x-[-50%] justify-center rounded-bl-xl rounded-br-xl px-4'>
			<img
				className='h-4 w-4'
				src='https://banner.0814media.net/desktop/img/4.0/icon-fire.png'
				alt='hot-fire'
			/>
			<span className='text-sm font-bold text-white'>Hot</span>
		</div>
	),
} as const

const Menu = () => {
	const { t } = useClientTranslation()
	const {
		userInfo: { currencyId },
	} = useAuthStore()
	const { menuList } = useMenu({ homeMenuData: MENU_DATA })
	const { onMenuOpen } = useMenuOpen({})
	const { fetchLobbyHeader } = useHomeStore()
	const [menuKey, setMenuKey] = useState<string>()
	const [debouncedMenuKey] = useDebounceValue(menuKey, 150)

	// 有符合任何 Event 的 ALLOWED_CURRENCIES
	const isEventAllowed = includes(
		union(
			ALLOWED_CURRENCIES.LEADER_BOARD,
			ALLOWED_CURRENCIES.PREDICTION_CHALLENGE,
		),
		currencyId,
	)

	useEffect(() => {
		fetchLobbyHeader()
	}, [fetchLobbyHeader])

	const menus = menuList.map(mainMenuItem => {
		const {
			displayKey,
			subMenu,
			lobbyCategoryId,
			pathname,
			category,
			display,
		} = mainMenuItem || {}

		if (display === 'h5') return null

		const switchMainMenuIcon = (iconType: MainMenuIcon) => {
			return mainMenuIcon[iconType] || null
		}

		// * 查看 subMenu 是否有在顯示範圍的 New Icon
		const hasNewIcon = subMenu.some(subMenuItem => {
			const { iconType, iconStartTime, iconEndTime } = subMenuItem || {}

			return (
				isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
				iconType === MenuIconTypeEnum.New
			)
		})

		const menuText = toUpper((displayKey && t(displayKey)) || '')

		// * 目前動態 menu 只支援 New
		const icon = (hasNewIcon && switchMainMenuIcon(MainMenuIcon.newTag)) || null

		// * 特例 Sport Soccer (需轉 EnterPage)
		if (lobbyCategoryId === LobbyCategoryEnum.Sports) {
			const soccerItem = subMenu?.find(
				sportSubItem => sportSubItem.tpGameIdNo === PRODUCTS.Soccer.tpGameIdNo,
			)
			return (
				<button
					className={headerMenuCss}
					key={lobbyCategoryId}
					type='button'
					aria-label='menu-item'
					onClick={() =>
						onMenuOpen(
							{
								...soccerItem,
								desktop: { menuActionType: MenuActionEnum.EnterPage },
							} as TDynamicSubMenuItem,
							{
								loginCallback: () => <></>,
								messageCallBack: () => <></>,
								// TODO: 等modal做好後回復
								// liveStreamingCallback: () =>
								// 	modal.open(<LiveStreamingModalDesktop />),
								// loginCallback: () => modal.open(<LoginModal />),
								// messageCallBack: message => modal.error(message),
								// liveStreamingCallback: () =>
								// 	modal.open(<LiveStreamingModalDesktop />),
							},
						)
					}
					onMouseEnter={() => setMenuKey(category)}
				>
					{icon}
					{menuText}
				</button>
			)
		}

		// * 特例 EXCHANGE 沒有導轉功能
		if (lobbyCategoryId === LobbyCategoryEnum.Exchange) {
			return (
				<a
					className={headerMenuCss}
					key={lobbyCategoryId}
					onMouseEnter={() => setMenuKey(category)}
				>
					{icon}
					{menuText}
				</a>
			)
		}

		return (
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			<LocaleLink
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				href={pathname!}
				key={lobbyCategoryId}
				onMouseEnter={() => setMenuKey(category)}
				className={headerMenuCss}
			>
				{icon}
				{menuText}
			</LocaleLink>
		)
	})

	return (
		<div className='hidden lg:block' onMouseLeave={() => setMenuKey(undefined)}>
			<div className='bg-primary-50 flex h-16 w-full items-center justify-evenly'>
				<LocaleLink
					href={paths.home.root}
					onMouseEnter={() => setMenuKey('Home')}
					passHref
				>
					<ImHome className='h-6 w-6' />
				</LocaleLink>
				{menus}

				<LocaleLink href={paths.promotion.root} passHref>
					<div
						className={cn(`${headerMenuCss}`, {
							active: debouncedMenuKey === 'Promotion',
						})}
						onMouseEnter={() => setMenuKey('Promotion')}
					>
						{isEventPeriod({ start: '2020-00-01T00:00:00', end: null }) &&
							mainMenuIcon.hotTag}
						{t('Label_General_Promos')}
					</div>
				</LocaleLink>
				{includes(ALLOWED_CURRENCIES.VIP, Number(currencyId)) && (
					<LocaleLink href={paths.vip.root} passHref>
						<div
							className={cn(`${headerMenuCss}`, {
								active: debouncedMenuKey === 'VIP',
							})}
							onMouseEnter={() => setMenuKey('VIP')}
						>
							{t('VIP')}
						</div>
					</LocaleLink>
				)}
				{isEventAllowed && (
					<div
						className={cn(`${headerMenuCss} cursor-pointer`, {
							active: debouncedMenuKey === 'Event',
						})}
						onMouseEnter={() => setMenuKey('Event')}
					>
						{t('Label_LeaderBoard_Event')}
					</div>
				)}
			</div>
			<SubMenu
				menuList={menuList}
				onMenuOpen={onMenuOpen}
				debouncedMenuKey={debouncedMenuKey}
				setMenuKey={setMenuKey}
			/>
		</div>
	)
}

export default Menu
