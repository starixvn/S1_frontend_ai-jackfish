import React, { ReactNode } from 'react'
import Header from './header'
import Footer from './footer'

interface ILayoutProps {
	children: ReactNode
	locale: string
}

const Layout = ({ children }: ILayoutProps) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}

export default Layout
