'use client'

import {
	ALLOWED_CURRENCIES,
	LANG_GROUPS,
	LEFT_MENU_DATA,
	MENU_DATA,
	META_DATA,
	VIP_CLUB_IMAGES,
} from '@noble888/src/data/static'
import { useInitEffect } from 'JF-core'
import { useStaticDataStore } from 'JF-operations'
import { ReactNode, useEffect, useState } from 'react'
import TemporarySwitch from './TemporarySwitch'
import Footer from './footer'
import Header from './header'

export default function Layout({
	children,
	isSignedIn,
}: {
	children: ReactNode
	isSignedIn: boolean
}) {
	// TODO: to be removed
	const [isLogin, setIsLogin] = useState(false)
	// eslint-disable-next-line no-console
	console.log({ isSignedIn })

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
	useInitEffect({ isSignedIn })
	return (
		<div className='flex h-full w-full flex-col bg-white'>
			{/* TODO: to be removed */}
			<div className='absolute right-2 top-2'>
				<TemporarySwitch />
			</div>
			<Header isLogin={isLogin} setIsLogin={setIsLogin} />
			<main className='flex-grow'>{children}</main>
			<Footer isLogin={isLogin} />
		</div>
	)
}
