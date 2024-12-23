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
import { useInitEffect } from 'JF-core'
import { useStaticDataStore } from 'JF-operations'
import { ReactNode, useEffect, useState } from 'react'
import GlobalModal from '../modal/GlobalModal'
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
	// console.log({ isSignedIn })

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
	return (
		<>
			<GlobalModal />
			<div className='flex h-full w-full flex-col bg-white'>
				<Header isLogin={isLogin} setIsLogin={setIsLogin} />
				<main className='h-fit flex-grow'>{children}</main>
				<Footer isLogin={isLogin} />
			</div>
		</>
	)
}
