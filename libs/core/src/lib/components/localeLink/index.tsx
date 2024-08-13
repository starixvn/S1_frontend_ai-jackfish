'use client'

import { useGetPathname } from 'JF-core'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

interface ILocaleLinkProps extends LinkProps {
	className?: string
	children: ReactNode
}

const LocaleLink = ({
	href,
	className = '',
	children,
	...props
}: ILocaleLinkProps) => {
	const { locale } = useGetPathname()
	return (
		<Link href={`/${locale}${href}`} className={className} {...props}>
			{children}
		</Link>
	)
}

export { LocaleLink }
