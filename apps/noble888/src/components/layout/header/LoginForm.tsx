'use client'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import {
	LocaleLink,
	bannerUrl,
	cn,
	useGetPathname,
	useLocaleRouter,
} from 'JF-core'
import { useRef } from 'react'
import { useBoolean, useMediaQuery, useOnClickOutside } from 'usehooks-ts'
import Country from './Country'

const LoginForm = () => {
	const { t } = useClientTranslation()
	const ref = useRef<HTMLDivElement>(null)
	const { locale } = useGetPathname()
	const router = useLocaleRouter()
	// 定義桌機和手機的media query
	const isDesktop = useMediaQuery('(min-width: 1024px)')
	const { value: isActive, toggle, setFalse } = useBoolean(false)

	const handleLoginAndJoin = (pathname: string) => {
		if (!isDesktop) router.push(pathname, { locale: locale })
	}

	useOnClickOutside(ref, setFalse)
	return (
		<>
			<div className='relative hidden gap-3 lg:block'>
				<div className='flex items-center gap-3'>
					<input
						type='text'
						placeholder={t('Label_General_Username') || ''}
						className='text-primary rounded-[50px] px-4 py-2 text-start'
					/>
					<input
						type='password'
						placeholder={t('Label_General_Password') || ''}
						className='text-primary rounded-[50px] px-4 py-2 text-start'
					/>
				</div>
				<LocaleLink
					href={paths.forgetPassword.root}
					className='absolute top-12 text-xs text-gray-300 hover:text-white'
				>
					{t('Label_Header_ForgetPassword')}
				</LocaleLink>
			</div>
			<div className='flex items-center gap-1 text-xs font-semibold lg:gap-3 lg:text-base'>
				<button
					className={cn(
						'border-1 border-secondary-500 text-secondary-500 w-20 whitespace-nowrap rounded-[50px] border bg-transparent py-2 hover:bg-[#5a7ab8] lg:w-full lg:border-none lg:bg-[#6989c7] lg:px-6 lg:py-2 lg:text-white',
					)}
					onClick={() => handleLoginAndJoin(paths.login.root)}
				>
					{t('Label_General_LogIn')}
				</button>
				<button
					className='w-20 justify-center whitespace-nowrap rounded-[50px] bg-[#ff6b00] py-2 text-white hover:bg-[#e66000] lg:w-full lg:px-6 lg:py-2'
					onClick={() => handleLoginAndJoin(paths.join.root)}
				>
					{t('Label_General_Register')}
				</button>
			</div>

			{/* mobile */}
			<LocaleLink href={paths.menu.root} className='w-6 lg:hidden'>
				<img
					src={bannerUrl('/h5/img/4.0/menu.png')}
					alt='menu-logo'
					className='h-full w-full'
				/>
			</LocaleLink>

			{/* desktop */}
			<div ref={ref} className='hidden lg:block'>
				<Country isActive={isActive} toggle={toggle} />
			</div>
		</>
	)
}

export default LoginForm
