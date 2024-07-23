import { paths } from 'JF-constants'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
	return (
		<div className='col-span-4 flex items-center justify-center pr-6 text-neutral-100 md:col-span-3 lg:col-span-2'>
			<Link href={paths.home.root}>
				<img src={'/img/logo/tuk555-logo.png'} alt='tuk555 logo' />
			</Link>
		</div>
	)
}

export default Logo
