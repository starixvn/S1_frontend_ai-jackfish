import { useClientTranslation } from '@brand01/src/i18n/client'
import { ForgetPasswordStepEnum } from 'JF-constants'
import { useGetPathname } from 'JF-core'

interface IStepTitleProps {
	step: ForgetPasswordStepEnum
}

const StepTitle = ({ step }: IStepTitleProps) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	return (
		<div className='cursor-default text-center text-2xl'>
			{step === ForgetPasswordStepEnum.ForgetPassword &&
				t('Label_Forget_Password')}
			{step === ForgetPasswordStepEnum.ConfirmOTP && t('Label_Sms_Otp_Confirm')}
			{step === ForgetPasswordStepEnum.ResetPassword &&
				t('Label_Join_Set_Password')}
		</div>
	)
}

export { StepTitle }
