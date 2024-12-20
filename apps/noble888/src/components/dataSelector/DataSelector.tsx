import dayjs from 'dayjs'
import { cn } from 'libs/core/src/lib/utils/cn'
import DatePicker from 'react-datepicker'
import { UseFormRegisterReturn } from 'react-hook-form'
import { ImCalendar } from 'react-icons/im'

interface IDateSelectorProps {
	className?: string
	title?: string
	register: UseFormRegisterReturn
	selected: Date | null
	onChange: (newDate: Date | null) => void
	maxDate?: Date
	placeholderText?: string
	closeOnScroll?: boolean
	showDisabledMonthNavigation?: boolean
	showYearDropdown?: boolean
	selectsStart?: boolean
	selectsEnd?: boolean
	startDate?: Date
	endDate?: Date
	minDate?: Date
}

const DateSelector: React.FC<IDateSelectorProps> = ({
	className,
	title,
	...datePickerProps
}) => {
	const startYear = new Date().getFullYear() - 100
	const endYear = new Date().getFullYear() + 1
	const years = Array.from(
		{ length: endYear - startYear + 1 },
		(_, i) => startYear + i,
	)
	const months = dayjs.months()

	return (
		<div
			className={cn(
				'flex h-full w-full items-center justify-between rounded-[5px] px-2.5 py-1.5',
				'border-primary-500 border border-solid',
				className,
			)}
		>
			<div className='w-full'>
				{title && <span className='me-2 font-semibold'>{title}</span>}
				<DatePicker
					className='w-full cursor-pointer focus:outline-none'
					{...datePickerProps}
					renderCustomHeader={({
						date,
						changeYear,
						changeMonth,
						decreaseMonth,
						increaseMonth,
						prevMonthButtonDisabled,
						nextMonthButtonDisabled,
					}) => (
						<div className='m-2.5 flex justify-center'>
							<button
								className='px-2.5 font-bold text-black'
								onClick={decreaseMonth}
								disabled={prevMonthButtonDisabled}
								type='button'
							>
								{'<'}
							</button>
							<select
								value={date.getFullYear()}
								onChange={({ target: { value } }) => changeYear(Number(value))}
							>
								{years.map(option => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>

							<select
								value={months[date.getUTCMonth()]}
								onChange={({ target: { value } }) =>
									changeMonth(months.indexOf(value))
								}
							>
								{months.map(option => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>

							<button
								className='px-2.5 font-bold text-black'
								onClick={increaseMonth}
								disabled={nextMonthButtonDisabled}
								type='button'
							>
								{'>'}
							</button>
						</div>
					)}
				/>
			</div>
			<ImCalendar size={14} />
		</div>
	)
}

export default DateSelector
