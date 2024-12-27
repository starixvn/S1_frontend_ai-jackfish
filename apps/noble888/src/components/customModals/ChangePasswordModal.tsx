'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { changePassword } from 'JF-api/account/client'
import { PASSWORD_REGEX } from 'JF-constants'
import { bannerUrl } from 'JF-core'
import { useModalStore } from 'JF-operations'
import { useForm } from 'react-hook-form'
import { ImKey } from 'react-icons/im'
import { IoIosUnlock } from 'react-icons/io'
import { z } from 'zod'
import { Button, Input } from '../common'

interface IChangePasswordModalProps {
	path?: string
	affCode?: string
}

const ChangePasswordModal: React.FC<IChangePasswordModalProps> = () => {
	const { openModal, closeModal } = useModalStore()
	const { t } = useClientTranslation()

	// 定義 Zod schema
	const formSchema = z
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

	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
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
			openModal({
				type: 'info',
				content: (
					<>
						<div>{t('Label_ChangePassword_ChangePswUpdateSuccess')}</div>
						<div>{t('Label_ChangePassword_ChangePswSuccessHint')}</div>
					</>
				),
				onConfirm: () => {
					closeModal()
				},
			})
		} catch (error) {
			openModal({
				type: 'error',
				content: (error as Error).message,
				onConfirm: () => {
					openModal({
						content: <ChangePasswordModal />,
					})
				},
			})
		}
	}

	return (
		<div className='lg: grid h-full w-full grid-cols-1 place-content-start place-items-center gap-11'>
			<div className='mx-auto mt-5 lg:hidden'>
				<img
					className='w-[40vw]'
					src={bannerUrl('/h5/img/logo_en_w.png')}
					alt='logo_en_w'
				/>
			</div>
			<form
				className='grid w-full grid-cols-1 place-items-center gap-3 lg:gap-5'
				onSubmit={handleSubmit(handleChangePassword)}
			>
				<IoIosUnlock className='text-secondary-400' size={40} />
				<div className='lg:text-md text-center text-xl font-bold'>
					{t('Label_General_ChangePassword')}
				</div>
				<div className='w-full'>
					<Input
						register={register('oldPassword')}
						placeholder={t('Label_ChangePassword_OldPassword')}
						password
						icon={<ImKey size={14} />}
						error={!!errors['oldPassword']}
						errorMessage={errors['oldPassword']?.message as string}
						dirty={!!dirtyFields['oldPassword']}
					/>
					<Input
						register={register('newPassword')}
						placeholder={t('Label_ChangePassword_NewPassword')}
						password
						icon={<ImKey size={14} />}
						error={!!errors['newPassword']}
						errorMessage={errors['newPassword']?.message as string}
						dirty={!!dirtyFields['newPassword']}
					/>
					<Input
						register={register('confirmPwd')}
						placeholder={t('Label_Join_ConfirmPassword')}
						password
						icon={<ImKey size={14} />}
						error={!!errors['confirmPwd']}
						errorMessage={errors['confirmPwd']?.message as string}
						dirty={!!dirtyFields['confirmPwd']}
					/>
				</div>
				<div>
					<Button type='secondary' htmlType='submit' desktopSize='lg'>
						{t('Label_General_Submit')}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default ChangePasswordModal
