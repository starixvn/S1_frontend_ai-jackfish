import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { imageUrl, useGetPathname } from 'JF-core'
import { useFormContext } from 'react-hook-form'

interface IStep2Props {
	goToNextStep: () => void
}

const Step2 = ({ goToNextStep }: IStep2Props) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	const {
		formState: { errors, dirtyFields },
		register,
		trigger,
	} = useFormContext()

	const handleConfirmPassword = async () => {
		const isPasswordValid = await trigger('password')
		const isConfirmPwdValid = await trigger('confirmPwd')
		if (isPasswordValid && isConfirmPwdValid) {
			goToNextStep()
		}
	}

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
				htmlType='button'
				type='secondary'
				className='h-12 w-full'
				onClick={handleConfirmPassword}
			>
				{t('Label_General_Confirm')}
			</Button>
		</>
	)
}

export { Step2 }
