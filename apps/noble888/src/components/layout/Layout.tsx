'use client'

import {
	ALLOWED_CURRENCIES,
	LANG_GROUPS,
	LANG_TO_CURRENCY,
	LEFT_MENU_DATA,
	MENU_DATA,
	META_DATA,
	VIP_CLUB_IMAGES,
} from '@noble888/src/data/static'
import { useGetPathname } from 'JF-core'
import {
	useChangePasswordModalEffect,
	useInitEffect,
	useModalStore,
	useStaticDataStore,
} from 'JF-operations'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import dynamic from 'next/dynamic'
import { ReactNode, useCallback, useEffect } from 'react'
import { GlobalModal } from '../customModals'
import Footer from './footer'
import Header from './header'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localeData)

const ChangePasswordModal = dynamic(
	() => import('../customModals/ChangePasswordModal'),
	{ ssr: false },
)

export default function Layout({
	children,
	isSignedIn,
}: {
	children: ReactNode
	isSignedIn: boolean
}) {
	const { locale } = useGetPathname()
	const { openModal } = useModalStore()

	// init 靜態檔案
	const { initStaticData } = useStaticDataStore()
	useEffect(() => {
		initStaticData({
			ALLOWED_CURRENCIES,
			LEFT_MENU_DATA,
			META_DATA,
			VIP_CLUB_IMAGES,
			LANG_GROUPS,
			MENU_DATA,
		})
	}, [initStaticData])

	// 初始化
	useInitEffect({ isSignedIn, langToCurrency: LANG_TO_CURRENCY })

	useChangePasswordModalEffect(
		useCallback(() => {
			openModal({
				size: 'xs',
				content: <ChangePasswordModal />,
			})
		}, [openModal]),
	)

	return (
		<html dir={locale === 'ar' ? 'rtl' : 'ltr'}>
			<body>
				<GlobalModal />
				<div className='flex h-full w-full flex-col'>
					<Header isLogin={isSignedIn} />
					<main className='h-fit flex-grow'>{children}</main>
					<Footer isLogin={isSignedIn} />
				</div>
			</body>
		</html>
	)
}
