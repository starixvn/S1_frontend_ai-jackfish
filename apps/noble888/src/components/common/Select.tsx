'use client'

import { useClientTranslation } from '@noble888/src/i18n/client'
import { cn } from 'JF-core'
import { filter, find, includes, uniqueId } from 'lodash'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { GoTriangleDown } from 'react-icons/go'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

type TSelectOption = {
	value: string | number
	label: string | number | ReactNode
	disabled?: boolean
	optionIcon?: ReactNode
}
interface ISelectProps {
	className?: string
	value?: string | number
	defaultValue?: string | number
	options: TSelectOption[]
	icon?: ReactNode
	placeholder?: string
	showSearch?: boolean
	isTranslation?: boolean
	title?: string
	showMessage?: boolean
	errorMessage?: string
	successMessage?: string
	showValue?: boolean
	onChange?: (value: TSelectOption['value']) => void
}

const Select: React.FC<ISelectProps> = props => {
	const { t } = useClientTranslation()
	const ref = useRef(null)

	const {
		className,
		value,
		defaultValue,
		options,
		icon,
		placeholder = t('Label_General_None'),
		showSearch,
		isTranslation,
		title,
		showMessage = false,
		errorMessage,
		successMessage,
		showValue,
		onChange,
	} = props
	const { value: isActive, toggle, setFalse } = useBoolean()
	const [currentOption, setCurrentOption] = useState<TSelectOption>()
	const [filterValue, setFilterValue] = useState('')

	// 顯示的 label
	const label = isTranslation
		? t(currentOption?.label as string) || t(placeholder || '')
		: showValue
			? (currentOption?.value as string)
			: currentOption?.label ?? placeholder

	const handleOptionClick = (option: TSelectOption) => {
		setCurrentOption(option)
		onChange?.(option.value)
		setFalse()
		setFilterValue('')
	}

	// 絕對搜尋 value 與 模糊搜尋 label
	const filterOptions = filter(options, item => {
		return (
			String(item.value).toLowerCase() === filterValue ||
			includes(t(String(item.label)).toLowerCase(), filterValue)
		)
	})

	const renderMessages = () => {
		if (!showMessage) return null
		if (errorMessage) {
			return (
				<div className='text-danger-400 ms-2 text-sm font-medium'>
					{errorMessage}
				</div>
			)
		}
		if (successMessage && currentOption) {
			return (
				<div className='text-primary-600 ms-2 text-sm font-medium'>
					{successMessage}
				</div>
			)
		}
		return <div className='my-5' />
	}

	useOnClickOutside(ref, setFalse)

	// 當 value 改變時，設置 currentOption
	useEffect(() => {
		setCurrentOption(find(options, { value }))
	}, [options, value])

	// 當沒有 value 時，使用 defaultValue
	useEffect(() => {
		if (!value && defaultValue) {
			setCurrentOption(find(options, { value: defaultValue }))
		}
	}, [defaultValue, options, value])

	return (
		<div
			className={cn(
				'relative mx-5 lg:mx-0 lg:h-full lg:w-full',
				{
					'mb-[1px]': isActive,
				},
				className,
			)}
			ref={ref}
		>
			{/* 輸入框 */}
			<div
				className={cn(
					'flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5',
					'border-primary-500 border',
					{
						'rounded-b-none border-b-0': isActive,
					},
					{ 'border-danger-400': !isActive && errorMessage },
				)}
				onClick={toggle}
			>
				<div className='text-primary-700 flex items-center gap-2 truncate'>
					{icon && icon}
					{title && <span>{t(title)}</span>}
					{currentOption?.optionIcon}
					<span className='min-h-5'>{label}</span>
				</div>
				<GoTriangleDown className='text-primary-700' size={14} />
			</div>
			{/* 下拉選單 */}
			{isActive && (
				<div className='border-primary-500 bg-primary-100 absolute top-[33px] z-10 w-full rounded-b-md border-b border-l border-r shadow-lg lg:bg-white'>
					{showSearch && (
						<div className='my-2.5'>
							<input
								type='text'
								placeholder='Search'
								className='border-primary-500 w-full rounded border px-2.5 py-1.5 focus:outline-none'
								onChange={e => setFilterValue(e.target.value.toLowerCase())}
							/>
						</div>
					)}
					<div className='max-h-60 overflow-auto'>
						{(showSearch ? filterOptions : options).map(option => (
							<div
								key={uniqueId()}
								className={cn(
									'text-primary-700 flex cursor-pointer items-center gap-1 py-[5px] ps-5',
									'hover:bg-primary-100',
									{
										'cursor-not-allowed text-gray-400 hover:bg-inherit':
											option.disabled,
									},
								)}
								onClick={() => !option.disabled && handleOptionClick(option)}
							>
								{option.optionIcon}
								<span>
									{isTranslation ? t(option.label as string) : option.label}
								</span>
							</div>
						))}
					</div>
				</div>
			)}
			{/* 訊息 */}
			{renderMessages()}
		</div>
	)
}
export default Select
