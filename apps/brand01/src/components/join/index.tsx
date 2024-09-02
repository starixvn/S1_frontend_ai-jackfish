'use client'

import ContactSupport from '@brand01/src/components/contactSupport'
import { cn } from 'JF-core'
import { useStep } from 'usehooks-ts'
import { StepBar } from './StepBar'
import { Title } from './Title'
import Welcome from './Welcome'
import JoinForm from './form'

const Join: React.FC = () => {
	// Setup steps
	const [step, { goToNextStep, canGoToNextStep }] = useStep(4)

	return (
		<div
			className={cn(
				'bg-tertiary-500 flex w-full flex-col justify-center p-7',
				'lg:shadow-primary-200 lg:min-h-[46rem] lg:rounded-lg lg:p-16 lg:shadow-[0_0_0.75rem_0]',
			)}
		>
			{canGoToNextStep ? (
				<>
					<Title step={step} />
					<StepBar step={step} />
					<JoinForm step={step} goToNextStep={goToNextStep} />
					<ContactSupport className='mt-5 lg:mt-9' />
				</>
			) : (
				<Welcome />
			)}
		</div>
	)
}

export default Join
