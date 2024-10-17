'use client'

import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { TFunction } from 'i18next'
import { setLocalBankInfo } from 'JF-api/accountStrict/client'
import { useBankInfoSysListByCurrencyId } from 'JF-api/payment/client'
import { REALNAME_REGEX, THAI_BANK_ACCOUNT_REGEX } from 'JF-constants'
import { cn, imageUrl, useGetPathname } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { useForm } from 'react-hook-form'
import { Trans } from 'react-i18next'
import { toast } from 'react-toastify'
import { z } from 'zod'

const createFormSchema = (t: TFunction) => {
	return z.object({
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
	})
}

const SetLocalBankInfoModal = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const {
		userInfo: { currencyId, langId },
		getUserInfo,
	} = useAuthStore()

	// 取得銀行資料
	const { bankInfoSysListByCurrencyId = [] } = useBankInfoSysListByCurrencyId({
		currencyId,
		langId,
	})

	const formSchema = createFormSchema(t)
	const {
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors, dirtyFields, isSubmitting },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
	})
	const watchSysId = watch('sysId')

	const handleSetLocalBank = async ({
		accountNo,
		realName,
		sysId,
	}: z.infer<typeof formSchema>) => {
		try {
			if (!sysId) {
				throw new Error(t('Label_Join_Bank_Select'))
			}
			await setLocalBankInfo({ accountName: realName, accountNo, sysId })
			await getUserInfo()
			toast.success(t('Label_ChangePassword_ChangePswUpdateSuccess'))
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	return (
		<>
			<div className='mt-4 text-center text-lg font-bold'>
				{t('Label_Join_Choose_Bank')}
			</div>
			<form
				className='mx-auto mt-4 w-full lg:w-3/4'
				onSubmit={handleSubmit(handleSetLocalBank)}
			>
				<div className='mt-6 cursor-default text-center text-base lg:mt-4'>
					{t('Label_Join_Bank_Select')}
				</div>
				<div className='mt-5 flex flex-wrap justify-center gap-5 p-4 lg:mt-2.5 lg:gap-3.5'>
					{bankInfoSysListByCurrencyId.map(({ sysId, bankLogo, bankCode }) => (
						<div
							className={cn('relative cursor-pointer', {
								'hidden lg:block': watchSysId && watchSysId !== sysId,
							})}
							key={sysId}
							onClick={() =>
								setValue('sysId', sysId === watchSysId ? undefined : sysId)
							}
						>
							<img
								className={cn(
									'h-12 w-12 cursor-pointer rounded-full opacity-100',
									'lg:h-[2.125rem] lg:w-[2.125rem] lg:opacity-60 lg:hover:opacity-100',
									{ 'lg:opacity-100': watchSysId === sysId },
								)}
								src={`${process.env['NEXT_PUBLIC_PAYMENT_HOST']}/square/${bankLogo.toLowerCase()}`}
								alt={bankCode}
							/>
							{watchSysId === sysId && (
								<img
									className='absolute -bottom-1 -right-1 h-4 w-4 rounded-full'
									src={imageUrl('/img/icon/icon-check.svg')}
									alt='icon-check'
								/>
							)}
						</div>
					))}
				</div>
				<div className='relative w-full'>
					<div className='text-primary-200 cursor-default text-center text-sm lg:hidden'>
						{t('Label_Join_Tap_Tip')}
					</div>
					<div
						className={cn(
							'bg-tertiary-400 mt-7 grid w-full place-items-center gap-4 p-4',
							'border-primary-200 rounded-2xl border border-solid',
							'text-primary-200 text-center text-base',
							'lg:absolute lg:-left-[17.5rem] lg:-top-10 lg:h-40 lg:w-60 lg:gap-3',
						)}
					>
						<Trans
							i18nKey='Label_Join_Check_Account'
							components={{
								span: <span />,
							}}
							values={{
								className: 'mx-12 text-sm lg:mx-0',
							}}
						/>
						<img
							className='bg-tertiary-400 absolute top-14 -right-5 hidden h-8 w-8 rounded-full lg:block'
							src={imageUrl('/img/icon/icon-arrow-right.svg')}
							alt='icon-arrow-right'
						/>
					</div>
					<div className='mt-10 w-full lg:mt-3.5'>
						<Input
							register={register('accountNo')}
							placeholder={t('Label_BankInfo_AccountNumber') || ''}
							icon='icon-banknumber'
							error={!!errors['accountNo']}
							errorMessage={errors['accountNo']?.message as string}
							dirty={!!dirtyFields['accountNo']}
						/>
						<Input
							register={register('realName')}
							placeholder={t('Label_BankInfo_BankAccountName') || ''}
							icon='icon-username'
							error={!!errors['realName']}
							errorMessage={errors['realName']?.message as string}
							dirty={!!dirtyFields['realName']}
						/>
					</div>
					<Button
						htmlType='submit'
						type='secondary'
						className='h-12 w-full'
						loading={isSubmitting}
					>
						{t('Label_General_Confirm')}
					</Button>
				</div>
			</form>
		</>
	)
}

export default SetLocalBankInfoModal
