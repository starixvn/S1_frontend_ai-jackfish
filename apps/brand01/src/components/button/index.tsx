'use client'
import React from 'react'
import { cn } from 'JF-core'

type ButtonProps = {
	size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
	type?: 'primary' | 'secondary' | 'ghost' | 'cancel' | 'disabled'
	onClick?: () => void
	children: React.ReactNode
	isDisabled?: boolean
	htmlType?: 'button' | 'submit'
	fullWidth?: boolean // 用於設置按鈕寬度為 100%
	className?: string // 新增的自定義 CSS 類別名稱屬性
}

const sizeClasses = {
	sm: 'min-h-[40px] min-w-[94px]',
	md: 'min-h-[40px] min-w-[147px]',
	lg: 'min-h-[40px] min-w-[147px] lg:min-h-[40px] lg:min-w-[199px]',
	xl: 'min-h-[50px] min-w-[313px]',
	'2xl': 'min-h-[50px] min-w-[348px] lg:min-w-[500px] min-h-[60px] ',
	'3xl': 'min-h-[40px] min-w-[94px]  lg:min-h-[50px] lg:min-w-[374px]',
	'4xl': 'min-w-[348px] min-h-[50px] lg:min-w-[500px] lg:min-h-[60px]',
}

// 比較長的demo 用 3xl size 在小尺寸會自動變sm size ; 直接使用 sm size的情況建立在是通用的按鈕＋且在無需rwd的按鈕

const variantClasses = {
	primary:
		'bg-primary-300 hover:bg-primary-400 active:bg-primary-500 text-white',
	secondary:
		'bg-secondary-300 hover:bg-secondary-400 active:bg-secondary-500 text-white',
	cancel:
		'bg-primary-200 text-tertiary-500, hover:bg-primary-100 hover:text-tertiary-400 active:bg-primary-200  active:text-tertiary-500',

	ghost:
		'border border-white bg-tertiary-500 text-white hover:bg-tertiary-500 hover:border-secondary-200  hover:text-secondary-200 active:border-secondary-300  active:text-secondary-300  text-white',
	disabled:
		'bg-neutral-300 text-neutral-400 cursor-default pointer-events-none',
	playNow:
		'min-h-[40px] min-w-[94px] bg-secondary-300 hover:bg-secondary-400 active:bg-secondary-500 text-white sm:',
}

const Button: React.FC<ButtonProps> = ({
	size = 'sm',
	type = 'primary',
	onClick,
	children,
	isDisabled = false,
	htmlType = 'button',
	fullWidth = false,
	className = '',
}) => {
	const baseClasses =
		'inline-flex rounded-lg  items-center justify-center px-6 py-2 text-center'

	const sizeClass = sizeClasses[size]

	const widthClass = fullWidth ? 'w-full' : '' // 根據 fullWidth 決定是否全寬

	const variantClass = isDisabled
		? variantClasses['disabled']
		: variantClasses[type]

	const additionalClasses = className
	return (
		<button
			type={htmlType}
			className={cn(
				baseClasses,
				widthClass,
				sizeClass,
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
