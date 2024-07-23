'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { paths } from 'JF-constants'
import { useGetPathname } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { useClientTranslation } from '@brand01/src/i18n/client'

const Auth = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const router = useRouter()
	const { isLogin, onSignOut } = useAuthStore()

	const handleSignOut = () => {
		onSignOut()
		router.push(paths.login.root)
	}

	return (
		<>
			{isLogin && (
				<button
					onClick={handleSignOut}
					className='font-headline text-body-md border-secondary-300 from-secondary-400 to-secondary-300 mx-2.5 w-28 rounded-lg border-2 bg-gradient-to-t px-2 py-1.5 text-center font-semibold shadow-md'
				>
					{t('Label_General_LogOut')}
				</button>
			)}
			{!isLogin && (
				<>
					<Link
						href={paths.join.root}
						className='font-headline text-body-md border-primary-400 from-primary-500 to-primary-400  min-w-max rounded-lg border-2 bg-gradient-to-t px-6 py-1.5 text-center text-sm font-semibold shadow-md'
					>
						{t('Label_General_Join')}
					</Link>
					<Link
						href={paths.login.root}
						className='font-headline text-body-md border-secondary-300 from-secondary-400 to-secondary-300  rounded-lg border-2 bg-gradient-to-t px-6 py-1.5 text-center text-sm font-semibold shadow-md'
					>
						{t('Label_General_LogIn')}
					</Link>
				</>
			)}
		</>
	)
}

export default Auth
