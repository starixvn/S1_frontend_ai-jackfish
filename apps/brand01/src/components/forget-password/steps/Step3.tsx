import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { imageUrl, useGetPathname } from 'JF-core'
import { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTimeout } from 'usehooks-ts'

interface IStep3Props {
	setIsTimeOut: Dispatch<SetStateAction<boolean>>
}

const Step3 = ({ setIsTimeOut }: IStep3Props) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	const {
		formState: { errors, dirtyFields, isSubmitting, isSubmitSuccessful },
		register,
	} = useFormContext()

	useTimeout(() => setIsTimeOut(true), 300000)

	return (
		<>
			<div className='grid place-items-center'>
				<img
					className='h-20 w-20'
					src={imageUrl('/img/popup/popup-pwd.png')}
					alt='pwd'
				/>
			</div>
			<div className='mt-3.5 w-full lg:mt-2.5'>
				<Input
					register={register('password')}
					placeholder={t('Label_General_Password') || ''}
					password
					icon='icon-lock'
					error={!!errors['password']}
					errorMessage={errors['password']?.message as string}
					dirty={!!dirtyFields['password']}
				/>
				<Input
					register={register('confirmPwd')}
					placeholder={t('Label_Join_ConfirmPassword') || ''}
					password
					icon='icon-lock'
					error={!!errors['confirmPwd']}
					errorMessage={errors['confirmPwd']?.message as string}
					dirty={!!dirtyFields['confirmPwd']}
				/>
			</div>
			<Button
				htmlType='submit'
				type='secondary'
				className='h-12 w-full'
				isDisabled={isSubmitting || isSubmitSuccessful}
			>
				{t('Label_General_Confirm')}
			</Button>
		</>
	)
}

export { Step3 }
