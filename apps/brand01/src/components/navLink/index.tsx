'use client'

import { useGetPathname } from 'JF-core'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

interface INavLinkProps extends LinkProps {
	className: string
	children: ReactNode
}

const NavLink = ({ href, className, children, ...props }: INavLinkProps) => {
	const { locale } = useGetPathname()
	return (
		<Link href={`/${locale}${href}`} className={className} {...props}>
			{children}
		</Link>
	)
}

export default NavLink
