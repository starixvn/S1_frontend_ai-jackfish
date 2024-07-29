'use client'
import React, { ReactNode, Suspense, useEffect } from 'react'
import { FOOTER_PAYMENT_ICONS } from '@brand01/src/data/layout/footer'
import { useMediaQuery } from 'usehooks-ts'
import { cn, imageUrl, useGetPathname } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import FooterSign from './footer/FooterSign'
import Footer from './footer'
import Header from './header'
import Sidebar from './sidebar'
import { paths } from 'JF-constants'
interface ILayoutProps {
	children: ReactNode
	locale: string
	isSignedIn: boolean
}

const Layout = ({ children, isSignedIn }: ILayoutProps) => {
	const { setLogin } = useAuthStore()
	const { currentPath } = useGetPathname()
	const isMobile = useMediaQuery('(max-width: 1024px)')

	useEffect(() => {
		setLogin(isSignedIn)
	}, [isSignedIn, setLogin])

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Header />
			<div className='relative grid grid-cols-12'>
				{/* 如果不是首頁而且是手機版時不需要有sidebar */}
				{!(isMobile && currentPath !== paths.home.root) && (
					<div
						className={cn(
							'bg-tertiary-400 col-span-2 max-lg:max-h-[calc(100%-256px)] max-lg:overflow-auto',
						)}
					>
						<Sidebar />
					</div>
				)}

				{/* 內頁＋footer */}
				<div className='relative col-span-10 min-h-screen max-lg:mb-32'>
					{children}
					<Footer />
				</div>

				{/* 手機版滑到最下方才會出現的payment logo */}
				<div className='from-secondary-300 to-primary-300 absolute bottom-16 left-0 z-20 flex h-48 w-full flex-wrap items-center justify-center bg-gradient-to-b lg:hidden'>
					<ul className='mx-auto -mb-16 flex max-w-[290px] flex-wrap justify-center gap-4'>
						{FOOTER_PAYMENT_ICONS.map(item => {
							const { key, icon } = item
							return (
								<li key={key} className='h-10 w-10'>
									<img src={imageUrl(icon)} alt={key} />
								</li>
							)
						})}
					</ul>
					{/* 隱私權政策側標語和連結 */}
					<FooterSign />
				</div>
			</div>
		</Suspense>
	)
}

export default Layout
