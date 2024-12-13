'use client'
import { cn } from 'JF-core'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TbBellRinging2Filled } from 'react-icons/tb'
import Button from '../button'

interface ModalProps {
	children?: React.ReactNode
	size: 'popup' | 'xs' | 'sm' | 'md' | 'lg'
	isOpen: boolean
	onClose: () => void
	className?: string
	blockScrollOnMount?: boolean
	closeOnEsc?: boolean
	closeOnOverlayClick?: boolean
	showCloseButton?: boolean
	type?: 'info' | 'error' | 'confirm' | 'default'
	title?: string
	icon?: React.ReactNode
	okText?: string
	confirmText?: string
	onConfirm?: () => void
}

const Modal: React.FC<ModalProps> = ({
	size,
	isOpen,
	children,
	className,
	onClose,
	blockScrollOnMount = true,
	closeOnEsc = true,
	closeOnOverlayClick = false,
	showCloseButton = true,
	type,
	title,
	icon,
	confirmText,
	onConfirm,
}) => {
	const { t } = useTranslation()

	const baseClasses =
		'relative transform bg-blue-100 shadow-xl transition-transform duration-300 ease-in-out lg:rounded-xl overflow-hidden'

	// const sizeClasses = {
	// 	popup: 'lg:max-w-[500px] lg:min-h-[230px] mx-6',
	// 	xs: 'w-full h-full lg:w-[500px] lg:h-[530px]',
	// 	sm: 'lg:w-[600px] lg:h-[810px] w-[90%] h-auto',
	// 	md: 'lg:w-[880px] lg:h-[560px] w-[90%] h-auto',
	// 	lg: 'lg:w-[880px] lg:h-[810px] w-[90%] h-auto',
	// }

	const sizeClasses = {
		popup: 'lg:max-w-[500px] lg:min-h-[230px] mx-6',
		xs: 'w-full h-full lg:w-[500px] lg:h-[530px]',
		sm: 'w-full h-full lg:w-[600px] lg:h-[810px]',
		md: 'w-full h-full lg:w-[880px] lg:h-[560px]',
		lg: 'w-full h-full lg:w-[880px] lg:h-[810px]',
	}
	
	const sizeClass = sizeClasses[size]

	const { mergedIcon, mergedTitle } = useMemo(() => {
		let defaultIcon: React.ReactNode = icon
		let defaultTitle: string | null = title || null

		const bellColor = 'text-yellow-500'

		switch (type) {
			case 'info':
				defaultIcon = icon ?? (
					<TbBellRinging2Filled className={bellColor} size={40} />
				)
				defaultTitle = title || t('Label_General_Information')
				break
			case 'error':
				defaultIcon = icon ?? (
					<TbBellRinging2Filled className={bellColor} size={40} />
				)
				defaultTitle = title || t('Label_Error_Oops')
				break
			case 'confirm':
				defaultIcon = icon ?? (
					<TbBellRinging2Filled className={bellColor} size={40} />
				)
				defaultTitle = title || t('Label_General_Oh')
				break
			case 'default':
			default:
				defaultIcon = icon || null
				defaultTitle = title || null
				break
		}

		return {
			mergedIcon: defaultIcon,
			mergedTitle: defaultTitle,
		}
	}, [type, title, icon, t])

	useEffect(() => {
		if (blockScrollOnMount && isOpen) {
			document.body.style.overflow = 'hidden'
		}

		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && closeOnEsc) {
				onClose()
			}
		}

		document.addEventListener('keydown', handleEsc)

		return () => {
			document.body.style.overflow = 'unset'
			document.removeEventListener('keydown', handleEsc)
		}
	}, [isOpen, blockScrollOnMount, closeOnEsc, onClose])

	if (!isOpen) return null

	const defaultConfirmText = confirmText || t('Label_General_Yes')

	return (
		<div
			className='bg-primary-900/40 fixed inset-0 z-50 flex items-center justify-center'
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
			onClick={() => closeOnOverlayClick && onClose()}
		>
			<div
				className={cn(baseClasses, sizeClass, className, 'flex flex-col')}
				onClick={e => e.stopPropagation()}
			>
				{(mergedIcon || mergedTitle) && (
					<div className='relative flex items-center justify-between bg-blue-100 p-3'>
						<div className='flex w-full flex-col items-center justify-center'>
							{mergedIcon && <div className='mt-4'>{mergedIcon}</div>}
							{mergedTitle && (
								<div
									id='modal-title'
									className='mt-3 text-center text-lg font-extrabold'
								>
									{mergedTitle}
								</div>
							)}
						</div>
					</div>
				)}

				{showCloseButton && (
					<button
						type='button'
						onClick={onClose}
						className={cn(
							'absolute right-3 top-3 inline-flex items-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900',
							type === 'error' || type === 'info' || type === 'confirm'
								? 'lg:hidden'
								: '',
						)}
					>
						<svg
							className='h-5 w-5'
							fill='#afa9d6'
							stroke='#afa9d6'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
							strokeWidth='2'
						>
							<path
								fillRule='evenodd'
								d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
								clipRule='evenodd'
							></path>
						</svg>
					</button>
				)}
				<div className='flex-grow overflow-y-auto bg-blue-100 px-4 py-3 lg:rounded-bl-xl lg:rounded-br-xl'>
					<div
						className={cn(
							'text-center',
							!mergedTitle && !mergedIcon && 'mt-8', // 當沒有 title 和 icon 時，加入 mt-8
						)}
					>
						{children}
					</div>
				</div>

				{type === 'confirm' && (
					<div className='flex justify-center space-x-4 p-4'>
						<Button
							className={cn(
								'bg-primary-600 font-bold text-blue-100 hover:bg-red-600',
							)}
							onClick={onConfirm}
						>
							{defaultConfirmText}
						</Button>
						<Button
							onClick={onClose}
							className={cn(
								'text-black-100 bg-gray-500 font-bold text-gray-700 hover:bg-gray-800 hover:text-gray-100',
							)}
						>
							{t('Label_General_No')}
						</Button>
					</div>
				)}

				{type === 'error' && (
					<div className='flex justify-center space-x-4 p-4'>
						<Button
							className={cn(
								'bg-primary-600 font-bold text-blue-100 hover:bg-red-600',
							)}
							onClick={onClose}
						>
							{t('Label_General_Close')}
						</Button>
					</div>
				)}

				{type === 'info' && (
					<div className='flex justify-center space-x-4 p-4'>
						<Button
							className={cn(
								'bg-primary-600 font-bold text-blue-100 hover:bg-red-600',
							)}
							onClick={onClose}
						>
							{t('Label_General_Close')}
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Modal
