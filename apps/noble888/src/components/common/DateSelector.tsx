'use client'

import dayjs from 'dayjs'
import { cn } from 'libs/core/src/lib/utils/cn'
import DatePicker from 'react-datepicker'
import { ImCalendar } from 'react-icons/im'

interface IDateSelectorProps {
	className?: string
	title?: string
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
	selected,
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
				'flex h-full w-full items-center justify-between gap-3 px-4 py-2',
				'border-primary-500 rounded border',
				className,
			)}
		>
			<ImCalendar className='text-primary-500' size={16} />
			<div className='w-full'>
				{title && <span className='me-2 font-semibold'>{title}</span>}
				<DatePicker
					className='w-full cursor-pointer bg-black focus:outline-none'
					{...datePickerProps}
					selected={selected}
					wrapperClassName='!block'
					calendarClassName='!bg-black'
					dayClassName={date =>
						cn('!text-white hover:!bg-secondary-500', {
							'!bg-secondary-500':
								date.toDateString() === selected?.toDateString(),
						})
					}
					weekDayClassName={() => '!text-white'}
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
								className='px-2.5 font-bold'
								onClick={decreaseMonth}
								disabled={prevMonthButtonDisabled}
								type='button'
							>
								{'<'}
							</button>
							<select
								className='bg-black'
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
								className='bg-black'
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
								className='px-2.5 font-bold'
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
		</div>
	)
}

export default DateSelector
