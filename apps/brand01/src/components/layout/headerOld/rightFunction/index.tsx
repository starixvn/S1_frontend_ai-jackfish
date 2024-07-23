'use client'
import Link from 'next/link'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { useGetPathname } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import Country from './country'
import { paths } from 'JF-constants'

const RightFunction = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { isLogin, onSignOut } = useAuthStore()

	return (
		<div className='flex items-center justify-end text-sm text-neutral-100'>
			{isLogin && (
				<button
					onClick={onSignOut}
					className='font-headline text-body-md border-secondary-300 from-secondary-400 to-secondary-300 mx-2.5 w-28 rounded-full border-2 bg-gradient-to-t px-2 py-1.5 text-center font-semibold shadow-md'
				>
					{t('Label_General_LogOut')}
				</button>
			)}
			{!isLogin && (
				<>
					<Link
						href={paths.join.root}
						className='font-headline text-body-md border-primary-400 from-primary-500 to-primary-400 w-28 min-w-max rounded-full border-2 bg-gradient-to-t px-2 py-1.5 text-center font-semibold shadow-md'
					>
						{t('Label_General_Register')}
					</Link>
					<Link
						href={paths.login.root}
						className='font-headline text-body-md border-secondary-300 from-secondary-400 to-secondary-300 mx-2.5 w-28 rounded-full border-2 bg-gradient-to-t px-2 py-1.5 text-center font-semibold shadow-md'
					>
						{t('Label_General_LogIn')}
					</Link>
				</>
			)}
			<Country />
		</div>
	)
}

export default RightFunction
