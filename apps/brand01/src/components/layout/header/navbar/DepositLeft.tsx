'use client'
import { Nav_Links } from '@brand01/src/data/layout/header'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { useGetPathname } from 'JF-core'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

const DepositLeft = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	return (
		<>
			{Nav_Links.map(value => {
				const { displayKey, pathname, icon } = value
				return (
					<div key={displayKey} className='text-neutral-100 max-lg:hidden'>
						<Link
							href={pathname}
							className={clsx('whitespace-nowrap px-4 py-2')}
						>
							<div className='mx-auto my-0 h-14 w-14'>
								<img className='h-full w-full' src={icon} alt='' />
							</div>
							<div className=''>{t(displayKey)}</div>
						</Link>
					</div>
				)
			})}
		</>
	)
}

export default DepositLeft
