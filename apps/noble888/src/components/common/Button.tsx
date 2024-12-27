'use client'

import { cn } from 'JF-core'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
	// mobile first
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'default'
	// desktop breakpoint
	desktopSize?: 'sm' | 'md' | 'lg' | 'xl' | 'default'
	// button height
	h?: 'sm' | 'md' | 'lg'
	type?:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'cancel'
		| 'disabled'
		| 'outlinedPri'
		| 'outlinedSec'
		| 'outlinedTer'
	children: React.ReactNode
	isDisabled?: boolean
	htmlType?: 'button' | 'submit'
	className?: string // 新增的自定義 CSS 類別名稱屬性
	loading?: boolean
}

const btnDesktopWidth = {
	default: '',
	sm: 'lg:w-[110px]',
	md: 'lg:w-[147px]',
	lg: 'lg:w-[313px]',
	xl: 'lg:w-full',
}

const btnMobileWidth = {
	default: '',
	sm: 'w-[65px]',
	md: 'w-[147px]',
	lg: 'w-[313px]',
	xl: 'w-full',
}

const buttonHeightClass = {
	sm: 'h-[40px]',
	md: 'h-[50px]',
	lg: 'h-[60px]',
}

const variantClasses = {
	primary: 'bg-gray-400 hover:bg-gray-600 active:bg-gray-700 transition',
	secondary:
		'bg-secondary-400 hover:bg-secondary-600 active:bg-secondary-700 transition',

	tertiary:
		'bg-tertiary-400 hover:bg-tertiary-600 active:bg-tertiary-700 transition',

	cancel:
		'bg-primary-200 text-gray-00, hover:bg-primary-100 hover:text-tertiary-400 active:bg-primary-200  active:text-tertiary-500 transition ',

	disabled: 'bg-gray-300 text-gray-600 cursor-default pointer-events-none',

	outlinedPri: `
    border border-gray-400 text-gray-400 bg-transparent
    hover:bg-gray-600 hover:text-gray-100 active:text-gray-100 active:bg-gray-700 transition
    hover:border-transparent active:border-transparent
  `,

	outlinedSec: `
    border border-secondary-400 text-secondary-400 bg-transparent
    hover:bg-secondary-600 hover:text-secondary-100 active:text-secondary-100 active:bg-secondary-700 transition
    hover:border-transparent active:border-transparent
  `,

	outlinedTer: `
    border border-tertiary-400 text-tertiary-400 bg-transparent
    hover:bg-tertiary-600 hover:text-tertiary-100 active:text-tertiary-100 active:bg-tertiary-700 transition
    hover:border-transparent active:border-transparent
  `,
}

const Button: React.FC<ButtonProps> = ({
	h = 'sm',
	size = 'default',
	desktopSize = 'default',
	type = 'primary',
	children,
	isDisabled = false,
	htmlType = 'button',
	className = '',
	loading = false,
	...props
}) => {
	const baseClasses =
		'inline-flex rounded-2xl items-center justify-center px-6 py-2 text-center'

	const desktopWidthClass = `lg: ${btnDesktopWidth[size]}`
	const mobileWidthClass = btnMobileWidth[desktopSize]
	const btnHeightClass = buttonHeightClass[h]

	const variantClass = isDisabled
		? variantClasses['disabled']
		: variantClasses[type]

	const additionalClasses = className

	const loadingClass = loading
		? 'opacity-70 cursor-default pointer-events-none'
		: ''

	return (
		<button
			type={htmlType}
			className={cn(
				baseClasses,
				btnHeightClass,
				desktopWidthClass,
				mobileWidthClass,
				variantClass,
				loadingClass,
				additionalClasses,
			)}
			{...props}
			disabled={isDisabled}
		>
			<>
				{loading && (
					<svg
						width='20'
						height='20'
						fill='currentColor'
						className='mr-2 animate-spin'
						viewBox='0 0 1792 1792'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z'></path>
					</svg>
				)}
				{children}
			</>
		</button>
	)
}

export default Button
