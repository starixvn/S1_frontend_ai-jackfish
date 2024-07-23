import React, { ReactNode } from 'react'
import Footer from './footer'
import Header from './header'
import Sidebar from './sidebar'
import { FOOTER_PAYMENT_ICONS } from '@brand01/src/data/layout/footer'
import { imageUrl } from 'JF-core'
import FooterSign from './footer/FooterSign'

interface ILayoutProps {
	children: ReactNode
	locale: string
}

const Layout = ({ children }: ILayoutProps) => {
	return (
		<>
			<Header />
			<div className='relative grid grid-cols-12'>
				<div className='bg-tertiary-400 col-span-2'>
					<Sidebar />
				</div>

				{/* 內頁＋footer */}
				<div className='relative col-span-10 max-lg:mb-32'>
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
		</>
	)
}

export default Layout
