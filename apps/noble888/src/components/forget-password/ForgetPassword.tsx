'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { FlagEnum } from 'JF-api/site/type'
import { paths } from 'JF-constants'
import { bannerUrl, useLocaleRouter } from 'JF-core'
import { useAuthOperations, useAuthStore, useModalStore } from 'JF-operations'
import { upperFirst } from 'lodash-es'
import { useForm } from 'react-hook-form'
import { GoMail } from 'react-icons/go'
import { IoIosUnlock } from 'react-icons/io'
import { z } from 'zod'
import { Button, Input } from '../common'

const ForgetPassword: React.FC = () => {
	const { t } = useClientTranslation()
	const router = useLocaleRouter()
	const {
		userInfo: { langId },
	} = useAuthStore()
	const { openModal } = useModalStore()

	const formSchema = z.object({
		email: z.string().email({ message: t('Label_Join_MailWrongFormat') }),
	})
	const {
		handleSubmit,
		register,
		formState: { errors, dirtyFields },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		},
		mode: 'onBlur',
	})

	const { forgetPassword } = useAuthOperations()

	const handleForgetPassword = async ({
		email,
	}: z.infer<typeof formSchema>) => {
		try {
			await forgetPassword({ langId, email, flag: FlagEnum.hasLang })
			openModal({
				type: 'info',
				title: t('Label_General_ForgetPsw'),
				content: t('Label_General_ForgotPwdMailSent'),
				icon: <IoIosUnlock className='text-secondary-400' size={40} />,
			})
		} catch (error) {
			openModal({
				type: 'error',
				content: (error as Error).message,
			})
		}
	}

	return (
		<div className='mx-auto my-12 flex min-h-[60vh] max-w-[80vw] items-start gap-6 lg:min-h-[40vh] lg:max-w-[55vw] lg:items-center'>
			<div className='hidden h-full w-full lg:block'>
				<img
					src={bannerUrl('/desktop/img/forgetpasswordbg.png')}
					alt='forget-password-background'
				/>
			</div>
			<form
				className='h-full w-full'
				onSubmit={handleSubmit(handleForgetPassword)}
			>
				<div className='mb-5 font-bold'>{t('Label_Header_ForgetPassword')}</div>
				<Input
					register={register('email')}
					icon={<GoMail size={14} />}
					error={!!errors['email']}
					errorMessage={errors['email']?.message as string}
					dirty={!!dirtyFields['email']}
					title={t('Label_General_Email') || ''}
					infoMessage={
						t('Label_General_ResetPasswordMsg', {
							site: upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'] || ''),
						}) || ''
					}
				/>
				<div className='mt-1 flex gap-2.5'>
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
		</div>
	)
}

export default ForgetPassword
