import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { TBankInfoSysData } from 'JF-api/payment/type'
import { cn, imageUrl, useGetPathname } from 'JF-core'
import { useFormContext } from 'react-hook-form'
import { Trans } from 'react-i18next'

interface IStep3Props {
	bankInfoSysListByCurrencyId: TBankInfoSysData[]
}

const Step3 = ({ bankInfoSysListByCurrencyId }: IStep3Props) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	const {
		formState: { errors, dirtyFields, isSubmitting },
		watch,
		setValue,
		register,
	} = useFormContext()
	const watchSysId = watch('sysId')

	return (
		<>
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
			{watchSysId && (
				<div className='relative w-full'>
					<div className='text-primary-200 cursor-default text-center text-sm lg:hidden'>
						{t('Label_Join_Tap_Tip')}
					</div>
					<div
						className={cn(
							'bg-tertiary-400 mt-7 grid w-full place-items-center gap-4 p-4',
							'border-primary-200 rounded-2xl border-2 border-solid',
							'text-primary-200 text-center text-base',
							'lg:absolute lg:-left-[17.5rem] lg:-top-7 lg:h-40 lg:w-60 lg:gap-3',
						)}
					>
						<Trans
							i18nKey='Label_Join_Check_Account'
							components={{
								span: <span />,
							}}
							values={{
								classname: 'mx-12 text-sm lg:mx-0',
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
						isDisabled={isSubmitting || !watchSysId}
					>
						{t('Label_General_Confirm')}
					</Button>
				</div>
			)}
		</>
	)
}

export { Step3 }
