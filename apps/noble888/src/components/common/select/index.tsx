'use client'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { filter, find, uniqueId } from 'lodash'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

export type SelectOptionType = {
	value: string | number
	label: string | number | ReactNode
	disabled?: boolean
	prefixOptionIcon?: ReactNode
}

export interface ISelectProps {
	value?: string | number
	defaultValue?: string | number
	options: SelectOptionType[]
	prefixIcon?: ReactNode
	placeholder?: string
	showSearch?: boolean
	isTranslation?: boolean
	prefixText?: string
	errorMessage?: string
	showValue?: boolean
	onChange?: (value: SelectOptionType['value']) => void
}

const Select = (props: ISelectProps) => {
	const {
		value,
		defaultValue,
		options,
		prefixIcon,
		placeholder = 'Please select',
		showSearch,
		isTranslation,
		prefixText,
		errorMessage,
		showValue,
		onChange,
	} = props

	const { t } = useClientTranslation()
	const ref = useRef(null)
	const { value: isActive, toggle, setFalse } = useBoolean()
	const [currentOption, setCurrentOption] = useState<SelectOptionType>()
	const [filterValue, setFilterValue] = useState('')

	// 當 value 改變時，設置 currentOption
	useEffect(() => {
		setCurrentOption(find(options, { value }))
	}, [value])

	// 當沒有 value 時，使用 defaultValue
	useEffect(() => {
		if (!value && defaultValue) {
			setCurrentOption(find(options, { value: defaultValue }))
		}
	}, [defaultValue])

	// 過濾選項
	const filterOptions = filter(options, item =>
		[String(item.value), String(item.label)]
			.map(str => str.toLowerCase())
			.some(text => text.includes(filterValue)),
	)

	// 顯示的 label
	const label = showValue
		? currentOption?.value ?? placeholder
		: currentOption?.label ?? placeholder

	const handleOptionClick = (option: SelectOptionType) => {
		setCurrentOption(option)
		onChange?.(option.value)
		setFalse()
	}

	useOnClickOutside(ref, setFalse)

	return (
		<div className='relative mx-5 lg:w-72' ref={ref}>
			{/* 輸入框 */}
			<div
				className={`flex cursor-pointer items-center justify-between  border border-blue-500 bg-white p-2 ${
					errorMessage ? 'border-red-500' : 'border-gray-300'
				}`}
				onClick={toggle}
			>
				<div className='flex items-center gap-2 truncate'>
					{prefixIcon}
					{prefixText && <span className='text-blue-500'>{prefixText}</span>}
					<span className='text-blue-500'>{label}</span>
				</div>
				<FiChevronDown className='text-blue-500' />
			</div>

			{/* 下拉選單 */}
			{isActive && (
				<div className='absolute top-full z-50 w-full  border border-t-0 border-blue-500 bg-white shadow-lg'>
					{showSearch && (
						<div className='border-b p-2'>
							<input
								type='text'
								placeholder='Search'
								className='w-full rounded border p-1 focus:ring focus:ring-blue-300'
								onChange={e => setFilterValue(e.target.value.toLowerCase())}
							/>
						</div>
					)}
					<div className='max-h-60 overflow-auto'>
						{(showSearch ? filterOptions : options).map(option => (
							<div
								key={uniqueId()}
								className={`flex cursor-pointer items-center gap-2 p-2 hover:bg-blue-100 ${
									option.disabled
										? 'cursor-not-allowed text-gray-400'
										: 'text-gray-800'
								}`}
								onClick={() => !option.disabled && handleOptionClick(option)}
							>
								{option.prefixOptionIcon}
								<span className='text-blue-500'>
									{isTranslation ? t(`${option.label}`) : option.label}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* 錯誤訊息 */}
			{errorMessage && <div className='mt-1 text-red-500'>{errorMessage}</div>}
		</div>
	)
}

export default Select
