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
		? t(currentOption?.label as string) || ''
		: showValue
			? (currentOption?.value as string)
			: currentOption?.label ?? ''

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

		const baseMessageClass = 'ms-2 py-1 text-xs'

		if (errorMessage) {
			return (
				<div className={cn(baseMessageClass, 'text-danger-500')}>
					{errorMessage}
				</div>
			)
		}
		if (successMessage && currentOption) {
			return (
				<div className={cn(baseMessageClass, 'text-primary-500')}>
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
		<div className={cn('relative lg:h-full lg:w-full', className)} ref={ref}>
			{/* 輸入框 */}
			<div
				className={cn(
					'flex cursor-pointer items-center justify-between gap-3 rounded px-4 py-2',
					'border-primary-500 border',
					{ 'border-danger-400': !isActive && errorMessage },
				)}
				onClick={toggle}
			>
				<div className='text-primary-500 flex items-center gap-2 truncate'>
					{icon && icon}
					{title && <span>{t(title)}</span>}
					{currentOption?.optionIcon}
					<span className={cn('min-h-5', { 'text-white': label })}>
						{label || placeholder}
					</span>
				</div>
				<GoTriangleDown className='text-secondary-500' size={14} />
			</div>
			{/* 下拉選單 */}
			{isActive && (
				<div className='border-primary-500 absolute top-[33px] z-10 w-full rounded-b border-b border-l border-r bg-black shadow-lg'>
					{showSearch && (
						<div className='mt-1'>
							<input
								type='text'
								placeholder='Search'
								className='border-primary-500 w-full rounded border bg-black px-10 py-2 focus:outline-none'
								onChange={e => setFilterValue(e.target.value.toLowerCase())}
							/>
						</div>
					)}
					<div className='scrollbar-thin scrollbar-track-black scrollbar-thumb-secondary-500 max-h-60 overflow-auto'>
						{(showSearch ? filterOptions : options).map(option => (
							<div
								key={uniqueId()}
								className={cn(
									'text-primary-500 flex cursor-pointer items-center gap-1 px-10 py-2',
									'hover:bg-secondary-500 hover:text-white',
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
