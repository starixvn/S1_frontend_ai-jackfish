import { TFunction } from 'i18next'
import { ForgetPasswordStepEnum } from 'JF-constants'

interface ITitleProps {
	step: ForgetPasswordStepEnum
	t: TFunction<string, undefined>
}

const Title: React.FC<ITitleProps> = ({ step, t }) => {
	const getTitle = () => {
		if (step === ForgetPasswordStepEnum.ForgetPassword) {
			return t('Label_Forget_Password')
		}
		if (step === ForgetPasswordStepEnum.ConfirmOTP) {
			return t('Label_Sms_Otp_Confirm')
		}
		if (step === ForgetPasswordStepEnum.ResetPassword) {
			return t('Label_Join_Set_Password')
		}
		return ''
	}
	return <div className='cursor-default text-center text-2xl'>{getTitle()}</div>
}

export default Title
