import { TFunction } from 'i18next'
import { JoinStepEnum } from 'JF-constants'

interface ITitleProps {
	step: JoinStepEnum
	t: TFunction<string, undefined>
}

const Title: React.FC<ITitleProps> = ({ step, t }) => {
	const getTitle = () => {
		if (step === JoinStepEnum.Phone) {
			return t('Label_Join_Set_Phone')
		}
		if (step === JoinStepEnum.Password) {
			return t('Label_Join_Set_Password')
		}
		if (step === JoinStepEnum.Bank) {
			return t('Label_Join_Choose_Bank')
		}
		return ''
	}

	return <div className='cursor-default text-center text-2xl'>{getTitle()}</div>
}

export { Title }
