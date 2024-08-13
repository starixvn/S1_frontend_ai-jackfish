'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useBankInfoSysListByCurrencyId } from 'JF-api/payment/client'
import {
	affiliateCheck,
	getAffiliateAgent,
	signUpPhone,
} from 'JF-api/site/client'
import {
	AREA_CODE_BY_CURRENCY,
	JoinStepEnum,
	PASSWORD_REGEX,
	PHONE_DIGITS_LIMIT,
	PHONE_LENGTH_REGEX,
	REALNAME_REGEX,
	THAI_BANK_ACCOUNT_REGEX,
} from 'JF-constants'
import { cn, useGetPathname } from 'JF-core'
import { useAuthStore, useSocialChannelStore } from 'JF-operations'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useStep } from 'usehooks-ts'
import { z } from 'zod'
import { Step1, Step2, Step3, Step4, StepBar, StepTitle } from './steps'

const Join = () => {
	const searchParams = useSearchParams()
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const {
		userInfo: { currencyId },
	} = useAuthStore()

	// setup steps
	const [step, { goToNextStep }] = useStep(4)

	// 取得 Line 資料
	const { lineChannel } = useSocialChannelStore()

	// 取得銀行資料
	const { bankInfoSysListByCurrencyId = [] } = useBankInfoSysListByCurrencyId({
		currencyId,
		langId: locale,
	})

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
		confirmPwd: z
			.string()
			.min(1, { message: t('Label_Join_ConfirmPwdReq') })
			.refine(value => validateConfirmPwd(value), {
				message: t('Label_Join_ConfirmPwdNotMatch'),
			}),
		accountNo: z
			.string()
			.min(1, { message: t('Label_BankInfo_NeedAccountNo') })
			.refine(value => THAI_BANK_ACCOUNT_REGEX.test(value), {
				message: t('Label_BankInfo_AccountWrongFormat'),
			}),
		realName: z
			.string()
			.min(1, { message: t('Label_Join_RealNameReq') })
			.refine(value => REALNAME_REGEX.test(value), {
				message: t('Label_Join_EnterRealName'),
			}),
		sysId: z.number(),
		affiliate: z.string().optional(), // 目前無affiliate
	})

	const formMethods = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			areaCode: AREA_CODE_BY_CURRENCY[currencyId],
			phoneNo: '',
			password: '',
			confirmPwd: '',
			accountNo: '',
			realName: '',
		},
		mode: 'onChange',
	})
	const { handleSubmit, getValues, setValue } = formMethods

	const validatePhone = (value: string): boolean => {
		const formAreaCode = getValues('areaCode')
		return PHONE_LENGTH_REGEX.test(formAreaCode + value)
	}
	const validateConfirmPwd = (value: string): boolean => {
		const password = getValues('password')
		return value === password
	}

	const [cookies] = useCookies(['AffId', 'AffCode'])
	const affId = searchParams.get('AffId')
	const affCode = searchParams.get('AffCode')
	const urlAffId = affId || cookies.AffId
	const urlAffCode = affCode || cookies.AffCode

	const checkUrlAffiliate = useCallback(async () => {
		if (!urlAffId && !urlAffCode) return
		// AffId 是 Referral 用的，AffCode 是代理用的
		try {
			if (urlAffId) {
				const { currencyId: affCurrencyId } = await getAffiliateAgent({
					affId: urlAffId as string,
				})
				if (affCurrencyId && affCurrencyId === currencyId) {
					setValue('affiliate', urlAffId)
				}
				// 如果之後有不同currencyId並開放選擇再去select
				// if (affCurrencyId) selectCurrency(currencyId)
			} else if (urlAffCode) {
				await affiliateCheck({
					affCode: urlAffCode as string,
				})
				setValue('affiliate', urlAffCode)
			}
		} catch (error) {
			// api驗證失敗則不帶入 affiliate 欄位
			return
		}
	}, [currencyId, setValue, urlAffCode, urlAffId])

	const handleRegister = async ({
		areaCode,
		phoneNo,
		password,
		affiliate,
		accountNo,
		realName,
		sysId,
	}: z.infer<typeof formSchema>) => {
		const affId = affiliate && urlAffId ? affiliate : null
		const affCode = affiliate && !urlAffId ? affiliate : null
		try {
			await signUpPhone({
				affCode: affCode as string, // 因 cookies 有機會是 string[] 導致錯誤
				affId: affId as string, // 因 cookies 有機會是 string[] 導致錯誤
				currencyId, // 目前無其他幣別所以不從 form 拿，直接使用 userInfo 內的 default CurrencyId
				areaCode,
				phoneNo,
				referralUrl: document.referrer,
				userLang: locale,
				userpwd: password,
				accountNo,
				realName,
				sysId,
			})
			goToNextStep()
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	useEffect(() => {
		checkUrlAffiliate()
	}, [checkUrlAffiliate])

	return (
		<div
			className={cn(
				'bg-tertiary-500 flex w-full flex-col justify-center p-7',
				'lg:shadow-primary-200 lg:min-h-[46rem] lg:rounded-lg lg:p-16 lg:shadow-[0_0_0.75rem_0]',
			)}
		>
			{step === JoinStepEnum.Finish ? (
				<Step4 />
			) : (
				<>
					<StepTitle step={step} />
					<StepBar step={step} />
					<FormProvider {...formMethods}>
						<form
							onSubmit={handleSubmit(handleRegister)}
							className='mt-6 grid place-items-center gap-1 lg:mt-5'
						>
							{step === JoinStepEnum.Phone && (
								<Step1 goToNextStep={goToNextStep} />
							)}
							{step === JoinStepEnum.Password && (
								<Step2 goToNextStep={goToNextStep} />
							)}
							{step === JoinStepEnum.Bank && (
								<Step3
									bankInfoSysListByCurrencyId={bankInfoSysListByCurrencyId}
								/>
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
				</>
			)}
		</div>
	)
}

export default Join
