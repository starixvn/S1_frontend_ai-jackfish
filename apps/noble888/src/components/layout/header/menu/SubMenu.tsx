'use client'

import { LoginModal } from '@noble888/src/components'
import { ALLOWED_CURRENCIES } from '@noble888/src/data/static'
import { EVENT_DATA } from '@noble888/src/data/static/event'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import {
	LocaleLink,
	bannerUrl,
	cn,
	isEventPeriod,
	useLocaleRouter,
} from 'JF-core'
import { useAuthStore, useModalStore } from 'JF-operations'
import {
	ISubMenu,
	MenuIconTypeEnum,
	TMenuData,
} from 'libs/constants/src/lib/types/menu'
import { includes } from 'lodash-es'
import { Dispatch, ReactNode, SetStateAction } from 'react'

interface ISubMenuProps {
	menuList: TMenuData[]
	onMenuOpen: (
		item: ISubMenu,
		{
			loginCallback,
			messageCallBack,
		}: {
			loginCallback: () => void
			messageCallBack?: (message: string) => void | undefined
			liveStreamingCallback: () => void
		},
	) => void
	debouncedMenuKey: string | undefined
	setMenuKey: Dispatch<SetStateAction<string | undefined>>
}

const subMenuIcon: { [p: number]: ReactNode | null } = {
	[MenuIconTypeEnum.NO_ICON as number]: null,
	[MenuIconTypeEnum.New as number]: (
		<div className='bg-secondary-500 absolute right-0 top-[-4px] flex h-9 w-9 justify-center rounded-full p-2 text-sm font-bold text-white'>
			NEW
		</div>
	),
}

const blurCss = 'bg-white/80 backdrop-blur-sm inset-0'

const SubMenu = ({
	debouncedMenuKey,
	setMenuKey,
	menuList,
	onMenuOpen,
}: ISubMenuProps) => {
	const { t } = useClientTranslation()
	const router = useLocaleRouter()
	const {
		userInfo: { langId, currencyId },
		isLogin,
	} = useAuthStore()
	const { openModal } = useModalStore()

	const menus = menuList.map(mainMenuItem => {
		const { lobbyCategoryId, subMenu, category } = mainMenuItem || {}
		const active = debouncedMenuKey === String(category)

		if (subMenu) {
			return (
				<div
					key={lobbyCategoryId}
					className={cn(`hidden h-0 w-full ${blurCss}`, {
						'absolute flex h-fit w-full flex-wrap justify-center gap-5 px-4 py-2 ':
							active,
					})}
					onMouseLeave={() => setMenuKey(undefined)}
				>
					{subMenu?.map(subMenuItem => {
						// * 後端這裡是字串格式 需做處理
						const subMenuImage =
							subMenuItem?.pcHeaderPicUrl &&
							JSON.parse(subMenuItem?.pcHeaderPicUrl)[0]

						const displayName =
							subMenuItem?.currencyGameName &&
							subMenuItem?.currencyGameName[
								langId as keyof typeof subMenuItem.currencyGameName
							] &&
							subMenuItem?.currencyGameName[
								langId as keyof typeof subMenuItem.currencyGameName
							]

						const {
							iconType = 0,
							iconStartTime,
							iconEndTime,
						} = subMenuItem || {}

						const switchSubMenuIcon = (iconType: MenuIconTypeEnum) => {
							return subMenuIcon[iconType] || null
						}

						const submenuIcon =
							(isEventPeriod({ start: iconStartTime, end: iconEndTime }) &&
								switchSubMenuIcon(iconType)) ||
							null

						return (
							<button
								key={subMenuItem?.tpGameIdNo}
								className={cn(
									'relative max-w-36 transition-transform hover:-translate-x-[-4px] hover:duration-300',
									{
										grayscale: subMenuItem?.isTpMaintain,
									},
								)}
								onMouseEnter={() => setMenuKey(debouncedMenuKey)}
								onClick={() => {
									onMenuOpen(subMenuItem, {
										loginCallback: () => {
											openModal({
												content: <LoginModal />,
											})
										},
										messageCallBack: message =>
											openModal({
												content: message,
											}),
										liveStreamingCallback: () => <></>,
										// 	modal.open(<LiveStreamingModalDesktop />),
									})
								}}
							>
								{submenuIcon}
								<img
									className='rounded-3xl'
									src={subMenuImage}
									alt={subMenuItem?.productName}
								/>
								<span className='whitespace-nowrap'>
									{displayName || subMenuItem?.productName}
								</span>
								{subMenuItem?.isTpMaintain && (
									<div className='disabled absolute top-1/2 translate-y-[-50%] rounded-md bg-gray-800 px-2 py-1 text-center text-sm text-white'>
										{t('Label_General_UnderMaintenance')}
									</div>
								)}
							</button>
						)
					})}
				</div>
			)
		}

		return null
	})
	return (
		<div className='relative text-center'>
			{/* Home button的subMenu */}
			<div
				className={cn(`hidden h-0 w-full ${blurCss}`, {
					'absolute flex h-fit w-full flex-wrap items-center justify-center gap-5 px-4 py-2':
						debouncedMenuKey === 'Home',
				})}
			>
				{includes(ALLOWED_CURRENCIES.VIP, currencyId) && (
					<LocaleLink
						href={paths.vip.root}
						className='relative max-w-36 transition-transform hover:-translate-x-[-4px] hover:duration-300'
					>
						<img
							className='w-full rounded-3xl'
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-vip.png`}
							alt='vip'
						/>
						<span className='text-center'>{t('VIP')}</span>
					</LocaleLink>
				)}
				{includes(ALLOWED_CURRENCIES.LEADER_BOARD, currencyId) && (
					<LocaleLink
						href={paths.leaderBoard.root}
						className='relative max-w-36 transition-transform hover:-translate-x-[-4px] hover:duration-300'
					>
						<img
							className='rounded-3xl'
							src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-ranking.png`}
							alt='leaderBoard'
						/>
						<span>{t('Label_General_LeaderBoard')}</span>
					</LocaleLink>
				)}
				<button
					onClick={
						!isLogin
							? () =>
									openModal({
										content: <LoginModal />,
									})
							: () => router.push(paths.referral.root)
					}
					className='relative max-w-36 transition-transform hover:-translate-x-[-4px] hover:duration-300'
				>
					<img
						className='rounded-3xl'
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/home-refer.png`}
						alt='referral'
					/>
					<span>{t('Label_General_Referral')}</span>
				</button>
				<LocaleLink
					href={paths.milestones.root}
					className='relative max-w-36 transition-transform hover:-translate-x-[-4px] hover:duration-300'
				>
					<img
						className='min-h-48 w-full rounded-3xl'
						src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/dropdown/home/home-milestone.png`}
						alt='home-milestone'
					/>
					<span>{t('Label_General_Milestone')}</span>
				</LocaleLink>
			</div>

			{menus}

			<LocaleLink
				href={paths.promotion.root}
				className={cn(`hidden h-0 w-full ${blurCss}`, {
					'flex h-fit w-full justify-center ': debouncedMenuKey === 'Promotion',
				})}
				onMouseEnter={() => setMenuKey('Promotion')}
			>
				<img
					className='bg-center bg-no-repeat'
					src={bannerUrl('/desktop/img/4.0/pomobanner-en.jpg')}
					alt='promotion banner'
				/>
			</LocaleLink>
			<div
				className={cn(`hidden h-0 w-full ${blurCss}`, {
					'flex h-fit w-full justify-center': debouncedMenuKey === 'VIP',
				})}
				onMouseEnter={() => setMenuKey('VIP')}
			>
				<img
					className='bg-center bg-no-repeat'
					src={bannerUrl('/desktop/img/4.0/vipdropdown-en-v1.png')}
					alt='vip banner'
				/>
			</div>

			<div
				className={cn(`hidden h-0 w-full ${blurCss}`, {
					'absolute flex h-fit w-full flex-wrap justify-center gap-5 px-4 py-2':
						debouncedMenuKey === 'Event',
				})}
				onMouseLeave={() => setMenuKey(undefined)}
			>
				{EVENT_DATA?.map(
					({
						name,
						path,
						desktopPicUrl,
						label,
						isNew,
						underMaintenance,
						allowedCurrencies,
					}) => {
						if (allowedCurrencies && !includes(allowedCurrencies, currencyId)) {
							return null
						}
						return (
							<button
								className={cn(
									'relative max-w-36 transition-transform hover:-translate-x-[-4px] hover:duration-300',
									{
										active: underMaintenance,
									},
								)}
								onMouseEnter={() => setMenuKey('Event')}
								onClick={() => router.push(path)}
								key={name}
							>
								{isNew && <div className='new-icon'>NEW</div>}
								<img
									className='rounded-3xl'
									src={`${process.env['NEXT_PUBLIC_BANNER_HOST']}${desktopPicUrl}`}
									alt={name}
								/>
								<span className='whitespace-nowrap'>{t(label)}</span>
							</button>
						)
					},
				)}
			</div>
		</div>
	)
}

export default SubMenu
