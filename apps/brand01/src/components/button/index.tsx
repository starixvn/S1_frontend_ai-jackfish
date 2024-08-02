'use client'
import { cn } from 'JF-core'
import React from 'react'

type ButtonProps = {
	// mobile first
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'default'
	// desktop breakpoint
	desktopSize?: 'sm' | 'md' | 'lg' | 'xl' | 'default'
	// btuuon height
	h?: 'sm' | 'md' | 'lg'
	type?: 'primary' | 'secondary' | 'ghost' | 'cancel' | 'disabled'
	onClick?: () => void
	children: React.ReactNode
	isDisabled?: boolean
	htmlType?: 'button' | 'submit'
	className?: string // 新增的自定義 CSS 類別名稱屬性
}

const btnDesktopWidth = {
	default: '',
	sm: 'lg:w-[94px]',
	md: 'lg:w-[147px]',
	lg: 'lg:w-[313px]',
	xl: 'lg:w-full',
}

const btnMobileWidth = {
	default: '',
	sm: 'w-[94px]',
	md: 'w-[147px]',
	lg: 'w-[313px]',
	xl: 'w-full',
}

const buttonHeightClassese = {
	sm: 'h-[40px]',
	md: 'h-[50px]',
	lg: 'h-[60px]',
}

const variantClasses = {
	primary:
		'bg-primary-300 hover:bg-primary-400 active:bg-primary-500 transition',
	secondary:
		'bg-secondary-300 hover:bg-secondary-400 active:bg-secondary-500 transition',
	cancel:
		'bg-primary-200 text-tertiary-500, hover:bg-primary-100 hover:text-tertiary-400 active:bg-primary-200  active:text-tertiary-500 transition ',

	ghost:
		'border border-white hover:border-secondary-200  hover:text-secondary-200 active:border-secondary-300  active:text-secondary-300 transition',
	disabled:
		'bg-neutral-300 text-neutral-400 cursor-default pointer-events-none',
}

const Button: React.FC<ButtonProps> = ({
	h = 'sm',
	size = 'default',
	desktopSize = 'default',
	type = 'primary',
	onClick,
	children,
	isDisabled = false,
	htmlType = 'button',
	className = '',
}) => {
	const baseClasses =
		'inline-flex rounded-lg items-center justify-center px-6 py-2 text-center'

	const desktopWidthClass = `lg: ${btnDesktopWidth[size]}`
	const mobileWidthClass = btnMobileWidth[desktopSize]
	const btnHeightClass = buttonHeightClassese[h]

	const variantClass = isDisabled
		? variantClasses['disabled']
		: variantClasses[type]

	const additionalClasses = className
	return (
		<button
			type={htmlType}
			className={cn(
				baseClasses,
				btnHeightClass,
				desktopWidthClass,
				mobileWidthClass,
				variantClass,
				additionalClasses,
			)}
			onClick={onClick}
			disabled={isDisabled}
		>
			{children}
		</button>
	)
}

export default Button
