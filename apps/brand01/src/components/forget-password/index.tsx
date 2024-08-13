'use client'

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
import { cn, useGetPathname, useLocaleRouter } from 'JF-core'
import { useAuthStore, useSocialChannelStore } from 'JF-operations'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useStep } from 'usehooks-ts'
import { z } from 'zod'
import { Step1, Step2, Step3, StepTitle } from './steps'

const ForgetPassword = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const router = useLocaleRouter()
	const {
		userInfo: { currencyId },
	} = useAuthStore()
	// 取得 Line 資料
	const { lineChannel } = useSocialChannelStore()
	// setup submit timeout
	const [isTimeOut, setIsTimeOut] = useState<boolean>(false)
	// setup steps
	const [step, { goToNextStep }] = useStep(3)

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
		otpCode: z.string().min(1, { message: t('Label_Profile_EnterOTPCode') }),
		password: z
			.string()
			.min(1, { message: t('Label_General_PasswordRequired') })
			.refine(value => PASSWORD_REGEX.test(value), {
				message: t('Label_General_PasswordValidate'),
			}),
		confirmPwd: z
			.string()
			.min(1, { message: t('Label_Join_ConfirmPwdReq') })
			.refine(value => validateConfirmPwd(value), {
				message: t('Label_Join_ConfirmPwdNotMatch'),
			}),
	})

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
	const { handleSubmit, getValues } = formMethods

	const validatePhone = (value: string): boolean => {
		const formAreaCode = getValues('areaCode')
		return PHONE_LENGTH_REGEX.test(formAreaCode + value)
	}
	const validateConfirmPwd = (value: string): boolean => {
		const password = getValues('password')
		return value === password
	}

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

	return (
		<div
			className={cn(
				'bg-tertiary-500 flex w-full flex-col justify-center p-7',
				'lg:shadow-primary-200 lg:min-h-[46rem] lg:rounded-lg lg:p-16 lg:shadow-[0_0_0.75rem_0]',
			)}
		>
			<StepTitle step={step} />
			<FormProvider {...formMethods}>
				<form
					onSubmit={handleSubmit(handleResetPassword)}
					className='mt-6 grid place-items-center gap-1 lg:mt-5'
				>
					{step === ForgetPasswordStepEnum.ForgetPassword && (
						<Step1 goToNextStep={goToNextStep} />
					)}
					{step === ForgetPasswordStepEnum.ConfirmOTP && (
						<Step2 goToNextStep={goToNextStep} />
					)}
					{step === ForgetPasswordStepEnum.ResetPassword && (
						<Step3 setIsTimeOut={setIsTimeOut} />
					)}
				</form>
			</FormProvider>
			<div className='mt-5 text-center lg:mt-9'>
				<span className='mr-1 cursor-default'>
					{t('Label_General_Found_Problem')}
				</span>
				<a
					className='text-secondary-300 underline underline-offset-1'
					href={lineChannel.link}
					target='_blank'
				>
					{t('Label_General_Contact_Service')}
				</a>
			</div>
		</div>
	)
}

export default ForgetPassword
