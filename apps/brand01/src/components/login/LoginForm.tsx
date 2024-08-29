import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { TFunction } from 'i18next'
import {
	AREA_CODE_BY_CURRENCY,
	paths,
	PHONE_DIGITS_LIMIT,
	PHONE_LENGTH_REGEX,
} from 'JF-constants'
import { LocaleLink, useLocaleRouter } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

interface ILoginFormProps {
	t: TFunction<string, undefined>
	locale: string
}

const createFormSchema = (
	t: TFunction<string, undefined>,
	currencyId: number,
) =>
	z.object({
		areaCode: z.string().min(1, { message: t('Label_Join_PhoneRequired') }),
		phoneNo: z
			.string()
			.min(1, { message: t('Label_Join_PhoneRequired') })
			.refine(
				value =>
					PHONE_LENGTH_REGEX.test(AREA_CODE_BY_CURRENCY[currencyId] + value),
				{
					message: t('Label_Join_PhoneNumberErrorTip', {
						digitalArea: PHONE_DIGITS_LIMIT[AREA_CODE_BY_CURRENCY[currencyId]],
					}),
				},
			),
		password: z
			.string()
			.min(1, { message: t('Label_General_PasswordRequired') }),
	})

const LoginForm: React.FC<ILoginFormProps> = ({ t, locale }) => {
	const router = useLocaleRouter()
	const {
		userInfo: { currencyId },
		onSignInPhone,
		isLoading,
	} = useAuthStore()
	// 定義 Zod schema
	const formSchema = createFormSchema(t, currencyId)
	const {
		formState: { errors, dirtyFields },
		register,
		handleSubmit,
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			areaCode: AREA_CODE_BY_CURRENCY[currencyId],
			phoneNo: '',
			password: '',
		},
		mode: 'onChange',
	})

	const handleSignIn = async (args: z.infer<typeof formSchema>) => {
		try {
			const data = await onSignInPhone(args)
			const { langId = locale } = data ?? {}
			// 指定登入後的 user langId ，避免過度導轉
			router.push(paths.home.root, { locale: langId })
			router.refresh()
		} catch (error) {
			toast.error((error as Error).message)
		}
	}
	return (
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
			<LocaleLink
				className='text-secondary-300 text-center underline underline-offset-1'
				href={paths.forgetPassword.root}
			>
				{t('Label_Header_ForgetPassword')}
			</LocaleLink>
			<div className='mt-7 grid w-full grid-cols-1 gap-4'>
				<Button
					htmlType='submit'
					type='primary'
					className='h-12 w-full'
					loading={isLoading}
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
		</form>
	)
}

export default LoginForm
