import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { QuickAmountButtons } from '@brand01/src/components/withdrawal/form/QuickAmountButtons'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { IAxiosError } from 'JF-api/baseApi'
import { CurrenciesEnum } from 'JF-constants'
import {
	generateShortcutList,
	isConvert,
	numberFormat,
	scrollToTop,
	useGetPathname,
} from 'JF-core'
import { useAuthStore, useWithdrawalStore } from 'JF-operations'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { BankInfo } from './BankInfo'
import { LimitationInfo } from './LimitationInfo'

export const WithdrawalForm: React.FC = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const {
		userInfo: { currencyId = CurrenciesEnum.THB },
	} = useAuthStore()
	const { submitWithdrawalRequest, isLoading } = useWithdrawalStore()
	const converted = isConvert(currencyId)

	const { withdrawalLimit, withdrawalBalance } = useWithdrawalStore()

	const {
		withdrawalMin = 0,
		unlimited = false,
		// 該出款卡片可提款最大限額
		withdrawalAvailableAmount = 0,
	} = withdrawalLimit ?? {}

	// 帳戶可提款的合法金額
	const { availableBalance = 0 } = withdrawalBalance ?? {}

	const formSchema = z.object({
		amount: z.coerce
			.number({
				required_error: t('Label_Withdrawal_Insufficientbalance'),
			})
			.superRefine((amount, ctx) => {
				const realAmount = converted ? Number(amount) * 1000 : Number(amount)

				if (!unlimited && realAmount > withdrawalAvailableAmount) {
					// localBank,大於日限額
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: t('Label_Withdrawal_DailyReached') ?? '',
					})
				} else if (
					realAmount <= 0 ||
					(withdrawalMin !== 0 && realAmount < withdrawalMin)
				) {
					// 低於最小值
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message:
							t('Label_General_AmountLessThan', {
								value1: numberFormat(withdrawalMin, currencyId, 0),
							}) ?? '',
					})
				} else if (
					withdrawalMin !== undefined &&
					availableBalance !== undefined &&
					(realAmount > availableBalance || realAmount < withdrawalMin)
				) {
					// not in range
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `${numberFormat(realAmount, currencyId, 0)} ${t(
							'Label_Withdrawal_Insufficientbalance',
						)}`,
					})
				}
			}),
	})

	const amountForm = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
	})

	const {
		watch,
		register,
		setValue,
		handleSubmit,
		trigger,
		formState: { dirtyFields, errors },
	} = amountForm

	const currentAmount = watch('amount')

	const handleWithdrawalSubmit = async (amount: number) => {
		const successToast = () =>
			toast.success(
				`${t('Label_Withdrawal_WithdrawalSuccess')} ${t('Label_Withdrawal_WithdrawalSuccessNotify')}`,
			)
		try {
			await submitWithdrawalRequest({ amount, currencyId })
			// 成功之後會跳到 Processing 畫面，手機版需要退到最頂，否則 pageView 位置不對
			scrollToTop()
			successToast()
		} catch (error) {
			if ((error as IAxiosError).errorCode === -1) {
				// 實測這些狀態都會在前端被擋掉，但為求完整，還是先把這些移植過來。
				toast.error(
					`${t('Label_Withdrawal_RolloverOverError')}: ${
						(error as Error).message
					}`,
				)
			} else if ((error as IAxiosError).errorCode === -2) {
				toast.error(
					`${t('Label_Withdrawal_DepositOverError')}: ${
						(error as Error).message
					}`,
				)
			} else if ((error as IAxiosError).errorCode === -3) {
				// 這個 error 是秀數字,所以才 parseInt
				toast.error(
					`${t('Label_Withdrawal_WithdrawalOverError')}: ${parseInt(
						(error as Error).message,
						10,
					).toString()}`,
				)
			} else {
				toast.error((error as Error).message)
			}
		}
	}

	return (
		<div className='bg-tertiary-500  grid grid-flow-row gap-4 rounded-2xl p-4 lg:p-6'>
			<h4 className='text-center text-xl '>
				{t('Label_Withdrawal_WithdrawalTo')}
			</h4>
			<BankInfo />
			<LimitationInfo />
			<form
				className='grid place-items-center gap-4'
				onSubmit={handleSubmit(({ amount }) => handleWithdrawalSubmit(amount))}
			>
				<Input
					register={register('amount')}
					placeholder={t('Label_Withdrawal_AmountInputPlaceHolder')}
					type='number'
					className='rounded-2xl text-start'
					error={!!errors['amount']}
					errorMessage={errors['amount']?.message as string}
					dirty={!!dirtyFields['amount']}
				/>
				<QuickAmountButtons
					minAmount={withdrawalMin}
					maxAmount={(() => {
						// 這裡要取可以提款的最大值，所以拿金額比較大的 limit 做標準
						return withdrawalAvailableAmount > availableBalance
							? availableBalance
							: withdrawalAvailableAmount
					})()}
					current={currentAmount}
					list={generateShortcutList({
						minAmount: withdrawalMin,
					})}
					onChange={value => {
						setValue('amount', value)
						trigger('amount')
					}}
				/>
				<Button
					type='secondary'
					className='w-full'
					htmlType='submit'
					loading={isLoading}
				>
					{t('Label_General_Submit')}
				</Button>
			</form>
		</div>
	)
}
