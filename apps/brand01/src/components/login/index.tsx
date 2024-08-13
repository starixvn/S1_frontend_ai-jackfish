'use client'

import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import Language from '@brand01/src/components/language'
import NavLink from '@brand01/src/components/navLink'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	AREA_CODE_BY_CURRENCY,
	PASSWORD_REGEX,
	PHONE_DIGITS_LIMIT,
	PHONE_LENGTH_REGEX,
	paths,
} from 'JF-constants'
import { cn, imageUrl, useGetPathname } from 'JF-core'
import { useAuthStore, useSocialChannelStore } from 'JF-operations'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const Login = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const router = useRouter()
	const {
		userInfo: { currencyId },
		onSignInPhone,
		isLoading,
	} = useAuthStore()
	// 取得 Line 資料
	const { lineChannel } = useSocialChannelStore()

	// 定義 Zod schema
	const formSchema = z.object({
		areaCode: z.string().min(1, { message: t('Label_Join_PhoneRequired') }),
		phoneNo: z
			.string()
			.min(1, { message: t('Label_Join_PhoneRequired') })
			.refine(value => validatePhone(value), {
				message: t('Label_Join_PhoneNumberErrorTip', {
					digitalArea: PHONE_DIGITS_LIMIT[AREA_CODE_BY_CURRENCY[currencyId]],
				}),
			}),
		password: z
			.string()
			.min(1, { message: t('Label_General_PasswordRequired') })
			.refine(value => PASSWORD_REGEX.test(value), {
				message: t('Label_General_PasswordValidate'),
			}),
	})

	const {
		formState: { errors, dirtyFields },
		register,
		handleSubmit,
		getValues,
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			areaCode: AREA_CODE_BY_CURRENCY[currencyId],
			phoneNo: '',
			password: '',
		},
		mode: 'onChange',
	})

	const validatePhone = (value: string): boolean => {
		const formAreaCode = getValues('areaCode')
		return PHONE_LENGTH_REGEX.test(formAreaCode + value)
	}

	const handleSignIn = async (args: z.infer<typeof formSchema>) => {
		try {
			await onSignInPhone(args)
			router.push(paths.home.root)
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	return (
		<div
			className={cn(
				'bg-tertiary-500 flex w-full flex-col justify-center p-4',
				'lg:shadow-primary-200 lg:min-h-[46rem] lg:rounded-lg lg:p-16 lg:shadow-[0_0_0.75rem_0]',
			)}
		>
			<div className='grid grid-cols-1 place-items-center'>
				<img className='w-1/2' src={imageUrl('/img/logo.png')} alt='logo' />
			</div>
			<form
				className='mt-12 grid place-items-center gap-1'
				onSubmit={handleSubmit(handleSignIn)}
			>
				<Input
					register={register('phoneNo')}
					type='number'
					placeholder={t('Label_General_Phone') || ''}
					title={AREA_CODE_BY_CURRENCY[currencyId]}
					icon='icon-phone'
					error={!!errors['phoneNo']}
					errorMessage={errors['phoneNo']?.message as string}
					dirty={!!dirtyFields['phoneNo']}
				/>
				<Input
					register={register('password')}
					password
					placeholder={t('Label_General_Password') || ''}
					icon='icon-lock'
					error={!!errors['password']}
					errorMessage={errors['password']?.message as string}
					dirty={!!dirtyFields['password']}
				/>
			</form>
			<NavLink
				className='text-secondary-300 text-center underline underline-offset-1'
				href={paths.forgetPassword.root}
			>
				{t('Label_Header_ForgetPassword')}
			</NavLink>
			<div className='mt-8 grid grid-cols-1 gap-4'>
				<Button
					htmlType='submit'
					type='primary'
					className='h-12 w-full'
					loading={isLoading}
					onClick={handleSubmit(handleSignIn)}
				>
					{t('Label_General_LogIn')}
				</Button>
				<Button
					htmlType='button'
					type='secondary'
					className='h-12 w-full'
					isDisabled={isLoading}
					onClick={() => router.push(paths.join.root)}
				>
					{t('Label_General_Join')}
				</Button>
			</div>
			<div className='mt-8 text-center'>
				<span className='mr-1 cursor-default'>
					{t('Label_General_Found_Problem')}
				</span>
				<Link
					className='text-secondary-300 underline underline-offset-1'
					href={lineChannel.link}
					target='_blank'
				>
					{t('Label_General_Contact_Service')}
				</Link>
			</div>
			<Language className='mt-16' />
		</div>
	)
}

export default Login
