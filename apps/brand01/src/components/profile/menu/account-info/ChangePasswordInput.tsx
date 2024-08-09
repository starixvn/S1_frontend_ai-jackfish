import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { changePassword } from 'JF-api/accountApi/api'
import { IAxiosError } from 'JF-api/baseApi'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

type TFormValues = {
	oldPassword: string
	newPassword: string
	confirmPassword: string
}

const ChangePasswordInput = () => {
	const { t } = useTranslation()
	const [loading, setLoading] = useState(false)
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, dirtyFields },
	} = useForm<TFormValues>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<TFormValues> = async data => {
		try {
			setLoading(true)
			await changePassword(data)
			toast.success('Password changed successfully!')
		} catch (error) {
			const axiosError = error as IAxiosError
			const errorMessage = axiosError.message || 'Failed to change password!'
			toast.error(errorMessage)
			setLoading(false)
		}
	}

	const newPassword = watch('newPassword')

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className='mx-auto rounded p-1'>
				<div className='mb-1'>
					<Input
						password
						id='oldPassword'
						type='password'
						register={register('oldPassword', {
							required: 'Old Password is required',
						})}
						placeholder={t('Label_ChangePassword_OldPassword')}
						dirty={!!dirtyFields.oldPassword}
						error={!!errors.oldPassword}
						errorMessage={errors.oldPassword?.message}
					/>
				</div>

				<div className='mb-1'>
					<Input
						password
						id='newPassword'
						placeholder={t('Label_ChangePassword_NewPassword')}
						type='password'
						register={register('newPassword', {
							required: 'New Password is required',
						})}
						dirty={!!dirtyFields.newPassword}
						error={!!errors.newPassword}
						errorMessage={errors.newPassword?.message}
					/>
				</div>

				{/* 確認新密碼輸入欄位 */}
				<div className='mb-1'>
					<Input
						password
						id='confirmPassword'
						placeholder={t('Label_Join_ConfirmPassword')}
						type='password'
						register={register('confirmPassword', {
							validate: value =>
								value === newPassword || 'The passwords do not match', // 自定義驗證規則
							required: 'Confirm Password is required',
						})}
						dirty={!!dirtyFields.confirmPassword}
						error={!!errors.confirmPassword}
						errorMessage={errors.confirmPassword?.message}
					/>
				</div>
				<Button
					type='secondary'
					size='xl'
					desktopSize='xl'
					h='md'
					htmlType='submit'
					loading={loading}
				>
					{t('Label_General_ChangePassword')}
				</Button>
			</form>
		</div>
	)
}

export default ChangePasswordInput
