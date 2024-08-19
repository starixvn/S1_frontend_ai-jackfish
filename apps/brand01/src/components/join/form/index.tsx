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
import { useAuthStore } from 'JF-operations'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { TFunction } from 'i18next'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'

interface IJoinFormProps {
	step: JoinStepEnum
	t: TFunction<string, undefined>
	locale: string
	goToNextStep: () => void
}

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
			password: z
				.string()
				.min(1, { message: t('Label_General_PasswordRequired') })
				.refine(value => PASSWORD_REGEX.test(value), {
					message: t('Label_General_PasswordValidate'),
				}),
			confirmPwd: z.string().min(1, { message: t('Label_Join_ConfirmPwdReq') }),
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
			sysId: z.number().optional(),
			affiliate: z.string().optional(), // 目前無affiliate
		})
		.refine(data => data.password === data.confirmPwd, {
			message: t('Label_Join_ConfirmPwdNotMatch'),
			path: ['confirmPwd'],
		})
}

const JoinForm: React.FC<IJoinFormProps> = ({
	step,
	t,
	goToNextStep,
	locale,
}) => {
	const searchParams = useSearchParams()
	const {
		userInfo: { currencyId },
	} = useAuthStore()

	// 取得銀行資料
	const { bankInfoSysListByCurrencyId = [] } = useBankInfoSysListByCurrencyId({
		currencyId,
		langId: locale,
	})

	const formSchema = createFormSchema(t, currencyId)

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
	const { handleSubmit, setValue } = formMethods

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

	useEffect(() => {
		checkUrlAffiliate()
	}, [checkUrlAffiliate])

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
				sysId: sysId as number,
			})
			goToNextStep()
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	const renderSteps = () => {
		if (step === JoinStepEnum.Phone) {
			return <Step1 goToNextStep={goToNextStep} t={t} />
		}
		if (step === JoinStepEnum.Password) {
			return <Step2 goToNextStep={goToNextStep} t={t} />
		}
		if (step === JoinStepEnum.Bank) {
			return (
				<Step3
					bankInfoSysListByCurrencyId={bankInfoSysListByCurrencyId}
					t={t}
				/>
			)
		}
		return null
	}

	return (
		<FormProvider {...formMethods}>
			<form
				onSubmit={handleSubmit(handleRegister)}
				className='mt-6 grid place-items-center gap-1 lg:mt-5'
			>
				{renderSteps()}
			</form>
		</FormProvider>
	)
}

export default JoinForm
