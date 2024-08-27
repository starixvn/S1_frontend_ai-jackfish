'use client'

import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import Modal from '@brand01/src/components/modal'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { TFunction } from 'i18next'
import { changePassword } from 'JF-api/account/client'
import { PASSWORD_REGEX, paths } from 'JF-constants'
import { useGetPathname, useLocaleRouter } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import useDisclosure from 'libs/core/src/lib/hooks/useDisclosure'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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

const ChangePasswordModal = () => {
	const { locale, currentPath } = useGetPathname()
	const router = useLocaleRouter()
	const { t } = useClientTranslation(locale)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		userInfo: { isResetPwd },
		getUserInfo,
	} = useAuthStore()

	const formSchema = createFormSchema(t)
	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields, isSubmitting },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
	})

	const handleChangePassword = async ({
		oldPassword,
		newPassword,
	}: z.infer<typeof formSchema>) => {
		try {
			await changePassword({ oldPassword, newPassword })
			await getUserInfo()
			toast.success(t('Label_ChangePassword_ChangePswUpdateSuccess'))
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	// 後台手動 ResetPassword 時要開啟 Modal 不給做任何事直到修改完密碼
	useEffect(() => {
		if (!isResetPwd) {
			// 進入首頁以外地方導回首頁
			currentPath !== paths.home.root && router.push(paths.home.root)
			onOpen()
		} else {
			onClose()
		}
	}, [currentPath, isResetPwd, onClose, onOpen, router])

	return (
		<Modal
			size='xs'
			isOpen={isOpen}
			onClose={onClose}
			closeOnEsc={false}
			closeOnOverlayClick={false}
			showCloseButton={false}
		>
			<div className='mt-4 text-center text-lg font-bold'>
				{t('Label_General_ChangePassword')}
			</div>
			<form
				className='mx-auto mt-10 w-full lg:w-3/4'
				onSubmit={handleSubmit(handleChangePassword)}
			>
				<Input
					register={register('oldPassword')}
					placeholder={t('Label_ChangePassword_OldPassword')}
					password
					icon='icon-lock'
					error={!!errors['oldPassword']}
					errorMessage={errors['oldPassword']?.message as string}
					dirty={!!dirtyFields['oldPassword']}
				/>
				<Input
					register={register('newPassword')}
					placeholder={t('Label_ChangePassword_NewPassword')}
					password
					icon='icon-lock'
					error={!!errors['newPassword']}
					errorMessage={errors['newPassword']?.message as string}
					dirty={!!dirtyFields['newPassword']}
				/>
				<Input
					register={register('confirmPwd')}
					placeholder={t('Label_Join_ConfirmPassword')}
					password
					icon='icon-lock'
					error={!!errors['confirmPwd']}
					errorMessage={errors['confirmPwd']?.message as string}
					dirty={!!dirtyFields['confirmPwd']}
				/>
				<Button
					htmlType='submit'
					type='secondary'
					className='h-12 w-full'
					loading={isSubmitting}
				>
					{t('Label_General_Confirm')}
				</Button>
			</form>
		</Modal>
	)
}

export default ChangePasswordModal
