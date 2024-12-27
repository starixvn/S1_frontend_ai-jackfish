'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ALLOWED_CURRENCIES, LANG_GROUPS } from '@noble888/src/data/static'
import { TERMS_CONDITIONS } from '@noble888/src/data/static/termsConditions'
import { useClientTranslation } from '@noble888/src/i18n/client'
import {
	existsEmail,
	existsUserName,
	signUpUserName,
	useGetSiteCurrencyList,
} from 'JF-api/site/client'
import {
	AREA_CODE,
	AREA_CODE_BY_CURRENCY,
	CURRENCY_TO_LANG_KEY,
	CurrenciesEnum,
	ENV_COOKIE_NAMES,
	FLAG_PREFIX_ICON_BY_CURRENCIES,
	PASSWORD_REGEX,
	PHONE_DIGITS_LIMIT,
	PHONE_LENGTH_REGEX,
	REALNAME_REGEX,
	USERNAME_REGEX,
	paths,
} from 'JF-constants'
import { bannerUrl, useLocaleRouter } from 'JF-core'
import {
	useAuthStore,
	useJoinAff,
	useJoinCountry,
	useModalStore,
} from 'JF-operations'
import dayjs from 'dayjs'
import { TFunction } from 'i18next'
import { includes, isNumber } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { FaUserCircle } from 'react-icons/fa'
import { GoMail } from 'react-icons/go'
import {
	ImCoinDollar,
	ImKey,
	ImPencil,
	ImPhone,
	ImSphere,
	ImUsers,
} from 'react-icons/im'
import { z } from 'zod'
import { Button, DateSelector, Input, Select } from '../common'
import { LineRegister } from './LineRegister'

const LoginModal = dynamic(() => import('../customModals/LoginModal'), {
	ssr: false,
})

const createFormSchema = (t: TFunction) => {
	return z
		.object({
			userName: z
				.string()
				.min(1, { message: t('Label_General_UsernameReq') })
				.refine(value => USERNAME_REGEX.test(value), {
					message: t('Label_General_UserNameLength'),
				}),
			password: z
				.string()
				.min(1, { message: t('Label_General_PasswordRequired') })
				.refine(value => PASSWORD_REGEX.test(value), {
					message: t('Label_General_PasswordValidate'),
				}),
			confirmPwd: z.string().min(1, { message: t('Label_Join_ConfirmPwdReq') }),
			realName: z
				.string()
				.min(1, { message: t('Label_Join_RealNameReq') })
				.refine(value => REALNAME_REGEX.test(value), {
					message: t('Label_Join_EnterRealName'),
				}),
			email: z.string().email({ message: t('Label_Join_MailWrongFormat') }),
			birth: z.date({ required_error: t('Label_Profile_BirthdayErrorTip') }),
			nationality: z.string(),
			currencyId: z.number({
				required_error: t('Label_Join_RemindPrefferedCurrency'),
			}),
			areaCode: z.string().min(1, { message: t('Label_Join_PhoneRequired') }),
			phoneNo: z.string().min(1, { message: t('Label_Join_PhoneRequired') }),
			affiliate: z.string().optional(),
		})
		.refine(data => data.password === data.confirmPwd, {
			message: t('Label_Join_ConfirmPwdNotMatch'),
			path: ['confirmPwd'],
		})
}

const JoinForm: React.FC = () => {
	const { t } = useClientTranslation()
	const {
		userInfo: { langId, currencyId },
	} = useAuthStore()
	const { openModal } = useModalStore()
	const router = useLocaleRouter()
	const formSchema = createFormSchema(t)
	const formMethods = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userName: '',
			password: '',
			confirmPwd: '',
			realName: '',
			email: '',
			birth: new Date('1990-01-01'),
			nationality: '',
			currencyId: 3,
			areaCode: '',
			phoneNo: '',
			affiliate: '',
		},
		mode: 'onChange',
	})
	const {
		handleSubmit,
		setValue,
		register,
		trigger,
		setError,
		getValues,
		clearErrors,
		watch,
		formState: { errors, dirtyFields },
	} = formMethods

	const [cookies] = useCookies([ENV_COOKIE_NAMES.lineUserId])
	const lineUserId = cookies[ENV_COOKIE_NAMES.lineUserId]
	const { siteCurrencyList = [] } = useGetSiteCurrencyList()
	const { initNationality, countrySelectOptions } = useJoinCountry()
	const { checkAffiliate, isAffValid, affValidType } = useJoinAff({
		successCallback: (affCode, affCurrencyId) => {
			setValue('affiliate', affCode)
			clearErrors('affiliate')
			if (affCurrencyId) {
				selectCurrency(affCurrencyId)
			}
		},
		errorCallback: () =>
			setError('affiliate', {
				type: 'invalid',
				message: t('Label_Join_AffiliateIdWrong') || '',
			}),
	})

	const checkUserName = async () => {
		const isUserNameValid = await trigger('userName')
		if (isUserNameValid) {
			const userName = getValues('userName')
			const { data: isExistsUserName, message: existsUsernameMsg } =
				await existsUserName({ userName, langId })
			if (isExistsUserName) {
				setError('userName', {
					type: 'duplicate',
					message: existsUsernameMsg,
				})
			} else {
				clearErrors('userName')
			}
		}
	}

	const checkEmail = async () => {
		const isEmailValid = await trigger('email')
		if (isEmailValid) {
			const email = getValues('email')
			const { data: isExistsEmail } = await existsEmail({ email })
			if (isExistsEmail) {
				setError('email', {
					type: 'duplicate',
					message: t('Label_Profile_MailExisted'),
				})
			} else {
				clearErrors('email')
			}
		}
	}

	const checkPhoneNo = async () => {
		const isAreaCodeValid = await trigger('areaCode')
		const isPhoneNoValid = await trigger('phoneNo')
		if (isAreaCodeValid && isPhoneNoValid) {
			const areaCode = getValues('areaCode')
			const phoneNo = getValues('phoneNo')
			if (
				Object.values(AREA_CODE_BY_CURRENCY).includes(areaCode) &&
				!PHONE_LENGTH_REGEX.test(areaCode + phoneNo)
			) {
				setError('phoneNo', {
					type: 'inValid',
					message: t('Label_Join_PhoneNumberErrorTip', {
						digitalArea: PHONE_DIGITS_LIMIT[areaCode],
					}),
				})
			} else {
				clearErrors('phoneNo')
			}
		}
	}

	const selectCurrency = (newCurrencyId: number) => {
		const formCurrencyId = getValues('currencyId')
		if (isNumber(newCurrencyId) && newCurrencyId !== formCurrencyId) {
			setValue('currencyId', newCurrencyId)
			clearErrors('currencyId')

			const areaCode = AREA_CODE_BY_CURRENCY[newCurrencyId]
			setValue('areaCode', areaCode || '')
			setValue('phoneNo', '')
			clearErrors('phoneNo')
		}
	}

	const selectAreaCode = (newAreaCode: string) => {
		const formAreaCode = getValues('areaCode')
		if (newAreaCode !== formAreaCode) {
			setValue('areaCode', newAreaCode)
			const phoneNo = getValues('phoneNo')
			if (phoneNo) {
				checkPhoneNo()
			}
		}
	}

	// 32 日幣, 13 人民幣
	const filterSiteCurrencyList = () => {
		return siteCurrencyList
			.filter(currencyId => !includes([32, 13], currencyId))
			.filter(currencyId => {
				const formCurrencyId = getValues('currencyId')
				// if affId qualified, only show currencyId from api
				return affValidType === 'affId' ? currencyId === formCurrencyId : true
			})
	}

	const currencySelectOptions = filterSiteCurrencyList().map(currencyId => {
		const flagName = FLAG_PREFIX_ICON_BY_CURRENCIES[currencyId]
		return {
			value: currencyId,
			label: t(`Label_General_Currency_${currencyId}`),
			optionIcon: (
				<img
					src={bannerUrl(`/desktop/img/flag/${flagName}.jpg`)}
					className='border-primary-200 h-4 w-4 rounded-full border'
					alt={`flag-${flagName}`}
				/>
			),
		}
	})

	const areaCodeSelectOptions = Object.values(AREA_CODE).map(el => ({
		value: el.AreaCode,
		label: `${el.AreaCode} ${el.Name}`,
	}))

	const handleRegister = async ({
		userName,
		password,
		realName,
		email,
		birth,
		nationality,
		currencyId,
		areaCode,
		phoneNo,
		affiliate,
	}: z.infer<typeof formSchema>) => {
		if (initNationality === 'China') {
			return
		}
		// tracking('registerSubmit', userName)
		const affCode = isAffValid && affValidType === 'affCode' ? affiliate : null
		const affId = isAffValid && affValidType === 'affId' ? affiliate : null
		const userLang =
			LANG_GROUPS[CURRENCY_TO_LANG_KEY[currencyId] as string]?.find(
				({ value }) => value === langId,
			)?.value ?? 'en'

		try {
			await signUpUserName({
				affCode: affCode as string,
				affId: affId as string,
				areaCode,
				currencyId,
				phoneNo,
				realName,
				email,
				Birth_d: birth ? dayjs(birth).format('DD') : 0,
				Birth_m: birth ? dayjs(birth).format('MM') : 0,
				Birth_y: birth ? dayjs(birth).format('YYYY') : 0,
				nationality,
				referralUrl: document.referrer,
				userLang,
				userName,
				userpwd: password,
				langId: userLang,
				lineUserId: lineUserId as string,
				// ...(reCaptchaToken && { reCaptchaToken, captchaType }),
			})
			// tracking('CompleteRegistration', username)
			router.push(paths.deposit.root, { locale: userLang })
		} catch (error) {
			openModal({
				type: 'error',
				content: (error as Error).message,
			})
		}
	}

	// TODO tracker 部分待確認
	// useEffect(() => {
	// 	if (initNationality === 'China') {
	// 		// GA 紀錄
	// 		window.dataLayer = window.dataLayer || []
	// 		window.dataLayer.push({
	// 			event: 'China_Register_Blocked',
	// 		})
	// 		// api 紀錄
	// 		registerRejectClick({
	// 			siteId: Number(process.env['NEXT_PUBLIC_SITE_ID']),
	// 			domain: window.location.origin,
	// 		})
	// 		modal.info(t('Label_Close_Region_Register_Notice'), {
	// 			onOK: () => router.push(paths.home.root),
	// 		})
	// 	}
	// }, [initNationality])

	return (
		<form
			className='order-1 w-full text-sm lg:order-2'
			onSubmit={handleSubmit(handleRegister)}
		>
			<span className='font-bold leading-6'>{t('Label_General_Join')}</span>
			<div className='font-semibold leading-6'>
				<span>{t('Label_Join_LoginMsg')}</span>
				<span
					className='text-secondary-500 ms-1 cursor-pointer underline'
					onClick={() =>
						openModal({
							content: <LoginModal />,
						})
					}
				>
					{t('Label_Join_LoginHere')}
				</span>
			</div>
			{/* TODO Line Callback Page */}
			<div className='mt-4'>
				{currencyId === CurrenciesEnum.THB && <LineRegister />}
				<Input
					register={register('userName')}
					placeholder={t('Label_General_Username') || ''}
					icon={<ImPencil size={14} />}
					error={!!errors['userName']}
					errorMessage={errors['userName']?.message as string}
					dirty={!!dirtyFields['userName']}
					infoMessage={t('Label_Join_UsernameTooltip') || ''}
					successMessage={t('Label_Join_CantChangeUsername') || ''}
					onBlur={checkUserName}
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
				<Input
					register={register('confirmPwd')}
					placeholder={t('Label_Join_ConfirmPassword') || ''}
					password
					icon={<ImKey size={14} />}
					error={!!errors['confirmPwd']}
					errorMessage={errors['confirmPwd']?.message as string}
					dirty={!!dirtyFields['confirmPwd']}
				/>
				<Input
					register={register('realName')}
					placeholder={t('Label_General_RealName') || ''}
					icon={<FaUserCircle size={14} />}
					error={!!errors['realName']}
					errorMessage={errors['realName']?.message as string}
					dirty={!!dirtyFields['realName']}
					infoMessage={t('Label_General_RemindForName') || ''}
				/>
				<Input
					register={register('email')}
					placeholder={t('Label_General_Email') || ''}
					icon={<GoMail size={14} />}
					error={!!errors['email']}
					errorMessage={errors['email']?.message as string}
					dirty={!!dirtyFields['email']}
					infoMessage={t('Label_Join_EmailToolTip') || ''}
					successMessage={t('Label_Join_CantChangeEmail') || ''}
					onBlur={checkEmail}
				/>
				<div className='flex flex-col gap-6 lg:flex-row lg:gap-1'>
					<DateSelector
						selected={watch('birth')}
						onChange={date => date !== null && setValue('birth', date)}
						maxDate={dayjs().subtract(18, 'year').toDate()}
						placeholderText='DD/MM/YYYY'
						closeOnScroll
						showDisabledMonthNavigation
						showYearDropdown
						className='lg:max-w-40'
					/>
					<Select
						showSearch
						isTranslation
						options={countrySelectOptions}
						defaultValue={initNationality}
						value={getValues('nationality')}
						placeholder={t('Label_Join_Nationality') as string}
						icon={<ImSphere size={16} />}
						onChange={nationality =>
							setValue('nationality', nationality as string)
						}
						showMessage
						errorMessage={errors['nationality']?.message as string}
					/>
				</div>
				<Select
					options={currencySelectOptions}
					value={getValues('currencyId')}
					placeholder={t('Label_Join_PrefferedCurrency') as string}
					icon={<ImCoinDollar size={14} />}
					onChange={currencyId => selectCurrency(currencyId as number)}
					showMessage
					errorMessage={errors['currencyId']?.message as string}
					successMessage={t('Label_Join_CantChangePreferredCurrency') || ''}
				/>
				{watch('currencyId') && (
					<>
						<div className='flex gap-1'>
							<Select
								showSearch
								showValue
								options={areaCodeSelectOptions}
								placeholder=''
								icon={<ImPhone size={14} />}
								onChange={areaCode => selectAreaCode(areaCode as string)}
								value={getValues('areaCode')}
								errorMessage={errors['phoneNo']?.message as string}
								className='w-full max-w-28 lg:max-w-40'
							/>
							<Input
								register={register('phoneNo')}
								type='number'
								placeholder={t('Label_General_Phone') || ''}
								error={!!errors['phoneNo']}
								dirty={!!dirtyFields['phoneNo']}
								isMessagesHide
								onBlur={checkPhoneNo}
							/>
						</div>
						{errors['phoneNo'] ? (
							<div className='text-danger-400'>
								{errors['phoneNo']?.message as string}
							</div>
						) : (
							<div className='my-5' />
						)}
					</>
				)}
				{includes(
					ALLOWED_CURRENCIES['AFFILIATE'] as CurrenciesEnum[],
					currencyId,
				) && (
					<Input
						register={register('affiliate')}
						placeholder={t('Label_Join_Affiliate_ID') || ''}
						icon={<ImUsers size={14} />}
						error={!!errors['affiliate']}
						errorMessage={errors['affiliate']?.message as string}
						dirty={isAffValid || !!dirtyFields['affiliate']}
						infoMessage={t('Label_Join_Please_Enter_Affiliate_ID') as string}
						readOnly={isAffValid && !!getValues('affiliate')}
						onBlur={e => e.target.value && checkAffiliate(e.target.value)}
					/>
				)}
			</div>
			<div className='font-semibold leading-6'>
				<span>{t('Label_Join_SignUpTerms1')}</span>
				<a
					className='text-secondary-500 ms-1 underline'
					target='_blank'
					rel='noreferrer'
					href={TERMS_CONDITIONS({ langId })['TermsConditions']}
				>
					{t('Label_Join_SignUpTerms2')}
				</a>
				<span>{t('Label_Join_SignUpTerms3')}</span>
			</div>
			<div className='my-2.5 flex gap-2.5'>
				<Button
					type='cancel'
					htmlType='button'
					desktopSize='xl'
					onClick={() => router.push(paths.home.root)}
				>
					{t('Label_General_Cancel')}
				</Button>
				<Button type='secondary' htmlType='submit' desktopSize='xl'>
					{t('Label_General_Submit')}
				</Button>
			</div>
		</form>
	)
}

export default JoinForm
