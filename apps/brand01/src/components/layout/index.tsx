'use client'
import { IovationScript } from '@brand01/src/components/thirdPartyScript/thirdPartyJS'
import { lobbyRoutes } from '@brand01/src/data/home/lobbyRoutes'
import { FOOTER_PAYMENT_ICONS } from '@brand01/src/data/layout/footer'
import {
	cn,
	imageUrl,
	useGetPathname,
	useInitEffect,
	useOnlineCheckInterval,
} from 'JF-core'
import { ReactNode, Suspense } from 'react'
import Loading from '../loading'
import Footer from './footer'
import FooterSign from './footer/FooterSign'
import Header from './header'
import Sidebar from './sidebar'
interface ILayoutProps {
	children: ReactNode
	isSignedIn: boolean
	cookieLangId: string
	cookieCurrencyId: number
}

const Layout = ({
	children,
	isSignedIn,
	cookieLangId,
	cookieCurrencyId,
}: ILayoutProps) => {
	const { currentPath } = useGetPathname()
	// 初始化
	useInitEffect({ isSignedIn, cookieLangId, cookieCurrencyId })
	// check login interval
	useOnlineCheckInterval()

	// ⭐️：需要有sidebar的頁面：所有桌機＆首頁(h5)＆lobby games(h5)

	return (
		<Suspense
			fallback={
				<>
					<Loading />
				</>
			}
		>
			<Header />
			<div className='relative grid grid-cols-12 text-sm lg:text-base'>
				{/* 先判斷桌機手機 再判斷是不是lobby相關的routes以顯示sidebar */}
				<div
					className={cn(
						'bg-tertiary-400 col-span-2 overflow-auto max-lg:max-h-[calc(100%-256px)]',
						'hidden lg:block',
						{ block: lobbyRoutes.includes(currentPath) },
					)}
				>
					<Sidebar />
				</div>

				{/* 內頁＋footer */}
				<div
					className={cn(
						'bg-layout-bg relative col-span-12 mb-64 bg-cover bg-center lg:col-span-10 lg:mb-0',
						{ 'col-span-10': lobbyRoutes.includes(currentPath) },
					)}
				>
					<div className='min-h-screen'>{children}</div>
					<Footer />
				</div>

				{/* 手機版滑到最下方才會出現的payment logo */}
				<div className='from-secondary-300 to-tertiary-300 absolute bottom-0 left-0 z-20 flex h-64 w-full flex-wrap items-center justify-center bg-gradient-to-b lg:hidden'>
					<ul className='mx-auto -mt-20 flex max-w-[290px] flex-wrap justify-center gap-4'>
						{FOOTER_PAYMENT_ICONS.map(item => {
							const { key, icon } = item
							return (
								<li key={key} className='h-10 w-10'>
									<img src={imageUrl(icon)} alt={key} />
								</li>
							)
						})}
						{/* 隱私權政策側標語和連結 */}
						<FooterSign />
					</ul>
				</div>
			</div>
			<IovationScript />
		</Suspense>
	)
}

export default Layout
