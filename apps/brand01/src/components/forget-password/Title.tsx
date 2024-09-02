import { useClientTranslation } from '@brand01/src/i18n/client'
import { ForgetPasswordStepEnum } from 'JF-constants'
import { useGetPathname } from 'JF-core'

interface ITitleProps {
	step: ForgetPasswordStepEnum
}

const Title: React.FC<ITitleProps> = ({ step }) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

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
