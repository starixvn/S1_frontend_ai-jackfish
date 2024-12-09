'use client'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import { cn, imageUrl, LocaleLink } from 'JF-core'
import useDevice from 'libs/core/src/lib/hooks/useDevice'
import Link from 'next/link'
import Country from './Country'

const LoginForm = () => {
	const { t } = useClientTranslation()
	const isMobile = useDevice('mobile')

	return (
		<>
			{!isMobile && (
				<div className='relative gap-3'>
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
					<Link
						href={paths.forgetPassword.root}
						className='absolute top-12 text-xs text-gray-300 hover:text-white'
					>
						{t('Label_Header_ForgetPassword')}
					</Link>
				</div>
			)}

			<div className='flex items-center gap-1 text-xs font-semibold lg:gap-3 lg:text-base'>
				<button
					className={cn(
						'w-20 whitespace-nowrap rounded-[50px] bg-[#6989c7] py-2 text-white hover:bg-[#5a7ab8] lg:w-full lg:px-6 lg:py-2',
						{
							'border-1 border-secondary-500 text-secondary-500 border bg-transparent':
								isMobile,
						},
					)}
				>
					{t('Label_General_LogIn')}
				</button>
				<button className='w-20 justify-center whitespace-nowrap rounded-[50px] bg-[#ff6b00] py-2 text-white hover:bg-[#e66000] lg:w-full lg:px-6 lg:py-2'>
					{t('Label_General_Register')}
				</button>
			</div>

			{isMobile ? (
				<LocaleLink href={paths.menu.root} className='w-6'>
					<img
						src={imageUrl('/h5/img/4.0/menu.png')}
						alt='menu-logo'
						className='h-full w-full'
					/>
				</LocaleLink>
			) : (
				<Country />
			)}
		</>
	)
}

export default LoginForm
