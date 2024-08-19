import { useClientTranslation } from '@brand01/src/i18n/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPwdByPhone } from 'JF-api/site/client'
import {
	AREA_CODE_BY_CURRENCY,
	ForgetPasswordStepEnum,
	PASSWORD_REGEX,
	PHONE_DIGITS_LIMIT,
	PHONE_LENGTH_REGEX,
	paths,
} from 'JF-constants'
import { useGetPathname, useLocaleRouter } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { TFunction } from 'i18next'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'

const createFormSchema = (t: TFunction, currencyId: number) => {
	return z
		.object({
			areaCode: z.string().min(1, { message: t('Label_Join_PhoneRequired') }),
			phoneNo: z
				.string()
				.min(1, { message: t('Label_Join_PhoneRequired') })
				.refine(
					value =>
						PHONE_LENGTH_REGEX.test(AREA_CODE_BY_CURRENCY[currencyId] + value),
					{
						message: t('Label_Join_PhoneNumberErrorTip', {
							digitalArea:
								PHONE_DIGITS_LIMIT[AREA_CODE_BY_CURRENCY[currencyId]],
						}),
					},
				),
			otpCode: z.string().min(1, { message: t('Label_Profile_EnterOTPCode') }),
			password: z
				.string()
				.min(1, { message: t('Label_General_PasswordRequired') })
				.refine(value => PASSWORD_REGEX.test(value), {
					message: t('Label_General_PasswordValidate'),
				}),
			confirmPwd: z.string().min(1, { message: t('Label_Join_ConfirmPwdReq') }),
		})
		.refine(data => data.password === data.confirmPwd, {
			message: t('Label_Join_ConfirmPwdNotMatch'),
			path: ['confirmPwd'],
		})
}

interface IForgetPasswordFormProps {
	step: ForgetPasswordStepEnum
	goToNextStep: () => void
}

const ForgetPasswordForm: React.FC<IForgetPasswordFormProps> = ({
	step,
	goToNextStep,
}) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const router = useLocaleRouter()
	const {
		userInfo: { currencyId },
	} = useAuthStore()

	// Setup submit timeout
	const [isTimeOut, setIsTimeOut] = useState<boolean>(false)

	const formSchema = createFormSchema(t, currencyId)

	const formMethods = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			areaCode: AREA_CODE_BY_CURRENCY[currencyId],
			phoneNo: '',
			otpCode: '',
			password: '',
			confirmPwd: '',
		},
		mode: 'onChange',
	})
	const { handleSubmit } = formMethods

	const handleResetPassword = async ({
		areaCode,
		phoneNo,
		password,
	}: z.infer<typeof formSchema>) => {
		if (isTimeOut) {
			toast.error(t('Label_General_Session_Timeout'))
			setTimeout(() => {
				window.location.reload()
			}, 5000)
			return
		}
		try {
			const { message } = await resetPwdByPhone({
				areaCode,
				phoneNo,
				newPassword: password,
			})
			toast.success(message)
			setTimeout(() => {
				router.push(paths.login.root)
			}, 5000)
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	const renderSteps = () => {
		if (step === ForgetPasswordStepEnum.ForgetPassword) {
			return <Step1 goToNextStep={goToNextStep} t={t} />
		}
		if (step === ForgetPasswordStepEnum.ConfirmOTP) {
			return <Step2 goToNextStep={goToNextStep} t={t} />
		}
		if (step === ForgetPasswordStepEnum.ResetPassword) {
			return <Step3 setIsTimeOut={setIsTimeOut} t={t} />
		}
		return null
	}

	return (
		<FormProvider {...formMethods}>
			<form
				onSubmit={handleSubmit(handleResetPassword)}
				className='mt-6 grid place-items-center gap-1 lg:mt-5'
			>
				{renderSteps()}
			</form>
		</FormProvider>
	)
}

export default ForgetPasswordForm
