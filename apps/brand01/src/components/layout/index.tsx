'use client'
import { lobbyRoutes } from '@brand01/src/data/home/lobbyRoutes'
import { FOOTER_PAYMENT_ICONS } from '@brand01/src/data/layout/footer'
import { cn, imageUrl, useGetPathname } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { ReactNode, Suspense, useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import Footer from './footer'
import FooterSign from './footer/FooterSign'
import Header from './header'
import Sidebar from './sidebar'
interface ILayoutProps {
	children: ReactNode
	isSignedIn: boolean
}

const Layout = ({ children, isSignedIn }: ILayoutProps) => {
	const { setLogin } = useAuthStore()
	const { currentPath } = useGetPathname()
	const isMobile = useMediaQuery('(max-width: 1024px)')

	useEffect(() => {
		setLogin(isSignedIn)
	}, [isSignedIn, setLogin])

	// 在h5時，除了首頁和lobby相關路徑有sidebar之外，其他都沒有
	const hasSidebar = !isMobile || lobbyRoutes.includes(currentPath)

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Header />
			<div
				className='relative grid grid-cols-12 text-sm lg:text-base
'
			>
				{/* 如果不是首頁or lobby頁面而且是手機版時不需要有sidebar */}
				{hasSidebar && (
					<div
						className={cn(
							'bg-tertiary-400 col-span-2 max-lg:max-h-[calc(100%-256px)] max-lg:overflow-auto',
						)}
					>
						<Sidebar />
					</div>
				)}

				{/* 內頁＋footer */}
				<div
					className={cn(
						`bg-layout-bg relative col-span-12 mb-64 min-h-screen lg:mb-0`,
						{
							'col-span-10': hasSidebar,
						},
					)}
				>
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
