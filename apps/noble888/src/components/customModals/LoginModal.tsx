'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { IAxiosError } from 'JF-api/baseApi'
import { paths } from 'JF-constants'
import { bannerUrl, useGetPathname, useLocaleRouter } from 'JF-core'
import { useAuthStore, useModalStore } from 'JF-operations'
import { includes } from 'lodash-es'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FaUserCircle } from 'react-icons/fa'
import { ImKey } from 'react-icons/im'
import { z } from 'zod'
import { Button, Input } from '../common'

interface ILoginModalProps {
	path?: string
	affCode?: string
}

const LoginModal: React.FC<ILoginModalProps> = ({
	path = paths.deposit.root,
	affCode,
}) => {
	const { closeModal } = useModalStore()
	const router = useLocaleRouter()
	const { t } = useClientTranslation()
	const { locale } = useGetPathname()
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
		handleSubmit,
		register,
		setError,
		formState: { errors, dirtyFields },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userName: '',
			password: '',
		},
		mode: 'onChange',
	})

	const handleSignIn = async (args: z.infer<typeof formSchema>) => {
		try {
			const data = await onSignInUserName(args)
			const { langId = locale } = data ?? {}
			// 指定登入後的 user langId ，避免過度導轉
			closeModal()
			router.push(path, { locale: langId })
			router.refresh()
		} catch (error) {
			const { errorCode, message } = (error as IAxiosError) || {}
			if (includes([1101, 1102, 1103, 9000, 1001], errorCode)) {
				setError(errorCode === 1001 ? 'password' : 'userName', {
					type: 'mismatch',
					message,
				})
			}
		}
	}

	return (
		<div className='grid h-full w-full grid-cols-1 place-content-start gap-11 lg:grid-cols-2 lg:place-items-center'>
			<div className='group hidden h-96 w-full lg:relative lg:block'>
				<img
					className='animate-animation-logo absolute bottom-0 start-7 z-[3] duration-700 group-hover:start-0'
					src={bannerUrl('/desktop/img/logo_en_w.png')}
					alt='logo_en_w'
				/>
				<img
					className='animate-npc1 absolute start-10 top-0 duration-700 group-hover:start-36 group-hover:top-12'
					src={bannerUrl('/desktop/img/loginNpc01.png')}
					alt='npc1'
				/>
				<img
					className='animate-npc2 absolute -bottom-4 -end-24 z-[2] duration-700 group-hover:-end-32'
					src={bannerUrl('/desktop/img/loginNpc02.png')}
					alt='npc2'
				/>
				<img
					className='animate-welcome absolute bottom-0 start-[50%] z-[1] duration-700 group-hover:bottom-52'
					src={bannerUrl('/desktop/img/welcome.png')}
					alt='welcome'
				/>
				<img
					className='animate-back absolute bottom-0 end-24 duration-700 group-hover:-bottom-12'
					src={bannerUrl('/desktop/img/back.png')}
					alt='back'
				/>
			</div>
			<div className='mx-auto mt-5 lg:hidden'>
				<img
					className='w-[40vw]'
					src={bannerUrl('/h5/img/logo_en_w.png')}
					alt='logo_en_w'
				/>
			</div>
			<form
				className='grid w-full grid-cols-1 gap-3 lg:gap-5'
				onSubmit={handleSubmit(handleSignIn)}
			>
				<div className='lg:text-md text-center text-xl font-bold lg:text-start'>
					{t('Label_General_LogIn')}
				</div>
				<div className='text-md text-center lg:text-start lg:text-xs'>
					<span>{t('Label_Join_DontHaveAccount')}</span>
					<Link
						className='text-secondary-500 ms-1 underline'
						href={`${paths.join.root}${affCode ? `?affCode=${affCode}` : ''}`}
						onClick={closeModal}
					>
						{t('Label_General_Join')}
					</Link>
				</div>
				<div>
					<Input
						register={register('userName')}
						placeholder={t('Label_General_Username') || ''}
						icon={<FaUserCircle size={14} />}
						error={!!errors['userName']}
						errorMessage={errors['userName']?.message as string}
						dirty={!!dirtyFields['userName']}
						infoMessage={t('Label_Join_UsernameTooltip') || ''}
						successMessage={t('Label_Join_CantChangeUsername') || ''}
					/>
					<Input
						register={register('password')}
						placeholder={t('Label_General_Password') || ''}
						icon={<ImKey size={14} />}
						password
						error={!!errors['password']}
						errorMessage={errors['password']?.message as string}
						dirty={!!dirtyFields['password']}
					/>
					<div className='text-md text-center underline lg:text-end lg:text-xs'>
						<Link href={paths.forgetPassword.root} onClick={closeModal}>
							{t('Label_Header_ForgetPassword')}
						</Link>
					</div>
				</div>
				<div className='flex gap-2.5'>
					<Button
						type='cancel'
						htmlType='button'
						desktopSize='xl'
						onClick={closeModal}
					>
						{t('Label_General_Cancel')}
					</Button>
					<Button type='secondary' htmlType='submit' desktopSize='xl'>
						{t('Label_General_LogIn')}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default LoginModal
