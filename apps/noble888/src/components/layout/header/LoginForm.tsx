'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import {
	LocaleLink,
	bannerUrl,
	cn,
	useGetPathname,
	useLocaleRouter,
} from 'JF-core'
import { useAuthStore, useModalStore } from 'JF-operations'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'
import { z } from 'zod'
import { Button } from '../../common'
import Country from './Country'

const LoginModal = dynamic(() => import('../../customModals/LoginModal'), {
	ssr: false,
})

const LoginForm = () => {
	const { t } = useClientTranslation()
	const ref = useRef<HTMLDivElement>(null)
	const { locale } = useGetPathname()
	const router = useLocaleRouter()
	const { openModal } = useModalStore()
	const { value: isActive, toggle, setFalse } = useBoolean(false)

	const { onSignInUserName } = useAuthStore()

	// 定義 Zod schema
	const formSchema = z.object({
		userName: z
			.string()
			.min(1, { message: t('Label_General_UsernameReq') })
			.min(6, { message: t('Label_General_UserNameLength') })
			.max(18, { message: t('Label_General_UserNameLength') }),
		password: z
			.string()
			.min(1, { message: t('Label_General_PasswordRequired') }),
	})

	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userName: '',
			password: '',
		},
	})

	const handleSignIn = async (args: z.infer<typeof formSchema>) => {
		try {
			const data = await onSignInUserName(args)
			const { langId = locale } = data ?? {}
			// 指定登入後的 user langId ，避免過度導轉
			router.push(paths.home.root, { locale: langId })
			router.refresh()
		} catch (error) {
			openModal({
				type: 'error',
				content: (error as Error).message,
			})
		}
	}

	useOnClickOutside(ref, setFalse)

	useEffect(() => {
		if (!!errors['userName'] || !!errors['password']) {
			openModal({
				type: 'error',
				content: (errors['userName'] || errors['password'])?.message,
			})
		}
	}, [errors, openModal])

	return (
		<form className='flex gap-4' onSubmit={handleSubmit(handleSignIn)}>
			<div className='relative hidden gap-3 lg:block'>
				<div className='flex items-center gap-3'>
					<input
						type='text'
						placeholder={t('Label_General_Username') || ''}
						className='text-primary rounded-full px-4 py-2 text-start'
						{...register('userName')}
					/>
					<input
						type='password'
						placeholder={t('Label_General_Password') || ''}
						className='text-primary rounded-full px-4 py-2 text-start'
						{...register('password')}
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
				<Button
					className={cn(
						'hidden w-full whitespace-nowrap rounded-full border-none bg-[#6989c7] px-6 py-2 text-white hover:bg-[#5a7ab8] lg:block',
					)}
					htmlType='submit'
				>
					{t('Label_General_LogIn')}
				</Button>
				<Button
					className={cn(
						'border-secondary-500 text-secondary-500 w-20 whitespace-nowrap rounded-full border bg-transparent py-2 lg:hidden',
					)}
					htmlType='button'
					onClick={() =>
						openModal({
							content: <LoginModal />,
						})
					}
				>
					{t('Label_General_LogIn')}
				</Button>
				<Button
					htmlType='button'
					className='w-20 justify-center whitespace-nowrap rounded-full bg-[#ff6b00] py-2 text-white hover:bg-[#e66000] lg:w-full lg:px-6 lg:py-2'
					onClick={() => router.push(paths.join.root)}
				>
					{t('Label_General_Register')}
				</Button>
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
		</form>
	)
}

export default LoginForm
