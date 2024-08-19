'use client'

import ContactSupport from '@brand01/src/components/contactSupport'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { cn, useGetPathname } from 'JF-core'
import { useStep } from 'usehooks-ts'
import Title from './Title'
import ForgetPasswordForm from './form'

const ForgetPassword: React.FC = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	// setup steps
	const [step, { goToNextStep }] = useStep(3)

	return (
		<div
			className={cn(
				'bg-tertiary-500 flex w-full flex-col justify-center p-7',
				'lg:shadow-primary-200 lg:min-h-[46rem] lg:rounded-lg lg:p-16 lg:shadow-[0_0_0.75rem_0]',
			)}
		>
			<Title step={step} t={t} />
			<ForgetPasswordForm t={t} step={step} goToNextStep={goToNextStep} />
			<ContactSupport t={t} className='mt-5 lg:mt-9' />
		</div>
	)
}

export default ForgetPassword
