import { JoinStepEnum } from 'JF-constants'
import { cn } from 'JF-core'

interface IStepBarProps {
	step: JoinStepEnum
}

const StepBar = ({ step }: IStepBarProps) => {
	return (
		<div className='mt-5 grid place-items-center lg:mt-4'>
			<div className='grid h-2 w-32 grid-cols-3 place-items-center gap-1'>
				<div
					className={cn('bg-primary-200 h-full w-full rounded-l-full', {
						'from-secondary-300 to-primary-300 bg-gradient-to-r': step > 0,
					})}
				/>
				<div
					className={cn('bg-primary-200 h-full w-full', {
						'bg-primary-300': step > 1,
					})}
				/>
				<div
					className={cn('bg-primary-200 h-full w-full rounded-r-full', {
						'from-primary-300 to-secondary-300 bg-gradient-to-r': step > 2,
					})}
				/>
			</div>
		</div>
	)
}

export { StepBar }
