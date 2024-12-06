'use client'

import {
	ALLOWED_CURRENCIES,
	LANG_GROUPS,
	LEFT_MENU_DATA,
	MENU_DATA,
	META_DATA,
	VIP_CLUB_IMAGES,
} from '@noble888/src/data/static'
import { useStaticDataStore } from 'JF-operations'
import { ReactNode, useEffect } from 'react'
import TemporarySwitch from './TemporarySwitch'
import Footer from './footer'
import Header from './header'

export default function Layout({
	children,
	isSignedIn,
}: {
	children: ReactNode
	isSignedIn?: boolean
}) {
	// TODO: to be removed
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

	return (
		<div className='flex h-screen flex-col bg-white'>
			{/* TODO: to be removed */}
			<div className='absolute top-2 right-2'>
				<TemporarySwitch />
			</div>
			<Header />
			<main className='flex-grow overflow-auto'>{children}</main>
			<Footer />
		</div>
	)
}
