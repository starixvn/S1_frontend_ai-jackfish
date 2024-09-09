'use client'
import { cn } from 'JF-core'
import { ButtonHTMLAttributes } from 'react'

interface ICardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	className?: string // 新增的自定義 CSS 類別名稱屬性
}

const MenuCard: React.FC<ICardProps> = ({
	children,
	className = '',
	...props
}) => {
	const baseClasses =
		'inline-flex items-center justify-center px-3 py-3 text-center h-[70px] justify-start rounded-xl mb-1'

	const additionalClasses = className
	return (
		<button className={cn(baseClasses, additionalClasses)} {...props}>
			{children}
		</button>
	)
}

export default MenuCard
