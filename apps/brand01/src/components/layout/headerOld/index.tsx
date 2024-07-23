'use client'
import React from 'react'
import Menu from './menu'
import Logo from './logo'
import RightFunction from './rightFunction'

const HeaderOld = () => {
	return (
		<header className='sticky top-0 z-50 bg-neutral-500 px-4 py-2'>
			<div className='mx-auto grid grid-cols-12 items-center'>
				<Logo />
				<div className='col-span-8 flex items-center justify-between md:col-span-9 lg:col-span-10'>
					<Menu />
					<RightFunction />
				</div>
			</div>
		</header>
	)
}

export default HeaderOld
