import { useClientTranslation } from '@brand01/src/i18n/client'
import { JoinStepEnum } from 'JF-constants'
import { useGetPathname } from 'JF-core'

interface ITitleProps {
	step: JoinStepEnum
}

const Title: React.FC<ITitleProps> = ({ step }) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

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
