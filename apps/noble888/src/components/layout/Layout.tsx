import { ReactNode } from 'react'
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
