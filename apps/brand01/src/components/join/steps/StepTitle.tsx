import { useClientTranslation } from '@brand01/src/i18n/client'
import { JoinStepEnum } from 'JF-constants'
import { useGetPathname } from 'JF-core'

interface IStepTitleProps {
	step: JoinStepEnum
}

const StepTitle = ({ step }: IStepTitleProps) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	return (
		<div className='cursor-default text-center text-2xl'>
			{step === JoinStepEnum.Phone && t('Label_Join_Set_Phone')}
			{step === JoinStepEnum.Password && t('Label_Join_Set_Password')}
			{step === JoinStepEnum.Bank && t('Label_Join_Choose_Bank')}
		</div>
	)
}

export { StepTitle }
