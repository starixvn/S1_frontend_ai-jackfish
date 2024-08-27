import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { TFunction } from 'i18next'
import { changePassword } from 'JF-api/account/client'
import { IAxiosError } from 'JF-api/baseApi'
import { PASSWORD_REGEX } from 'JF-constants'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { z } from 'zod'

const createFormSchema = (t: TFunction) => {
	return z
		.object({
			oldPassword: z
				.string()
				.min(1, { message: t('Label_General_PasswordRequired') }),
			newPassword: z
				.string()
				.min(1, { message: t('Label_General_PasswordRequired') })
				.refine(value => PASSWORD_REGEX.test(value), {
					message: t('Label_General_PasswordValidate'),
				}),
			confirmPwd: z.string().min(1, { message: t('Label_Join_ConfirmPwdReq') }),
		})
		.refine(data => data.newPassword === data.confirmPwd, {
			message: t('Label_Join_ConfirmPwdNotMatch'),
			path: ['confirmPwd'],
		})
}

const ChangePasswordInput = () => {
	const { t } = useTranslation()
	const [loading, setLoading] = useState(false)

	const formSchema = createFormSchema(t)
	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async ({
		oldPassword,
		newPassword,
	}) => {
		try {
			setLoading(true)
			await changePassword({ oldPassword, newPassword })
			toast.success(t('Label_ChangePassword_ChangePswUpdateSuccess'))
		} catch (error) {
			const axiosError = error as IAxiosError
			const errorMessage = axiosError.message || 'Failed to change password!'
			toast.error(errorMessage)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className='mx-auto rounded p-1'>
				<div className='mb-1'>
					<Input
						password
						id='oldPassword'
						register={register('oldPassword')}
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
						register={register('newPassword')}
						dirty={!!dirtyFields.newPassword}
						error={!!errors.newPassword}
						errorMessage={errors.newPassword?.message}
					/>
				</div>

				{/* 確認新密碼輸入欄位 */}
				<div className='mb-1'>
					<Input
						password
						id='confirmPwd'
						placeholder={t('Label_Join_ConfirmPassword')}
						register={register('confirmPwd')}
						dirty={!!dirtyFields.confirmPwd}
						error={!!errors.confirmPwd}
						errorMessage={errors.confirmPwd?.message}
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
