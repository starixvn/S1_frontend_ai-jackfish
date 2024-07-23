'use client'
import React from 'react'
import Logo from './Logo'
import Navbar from './navbar'

const Header = () => {
	return (
		<header className='sticky top-0 z-50 bg-neutral-500 px-5 lg:px-10'>
			<div className='mx-auto grid grid-cols-12 items-center'>
				{/* <!-- logo --> */}
				<Logo />

				{/* <!-- navbar --> */}
				<div className='col-span-8 flex items-center justify-end gap-4 text-neutral-100 md:col-span-9 lg:col-span-10'>
					<Navbar />
				</div>
			</div>
		</header>
	)
}

export default Header
