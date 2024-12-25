'use client'

import { cn } from 'JF-core'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TbBellRinging2Filled } from 'react-icons/tb'
import Button from './Button'

interface IModalProps {
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
	confirmText?: string
	onConfirm?: () => void
}

const Modal: React.FC<IModalProps> = ({
	size,
	isOpen,
	children,
	className,
	onClose,
	blockScrollOnMount = true,
	closeOnEsc = false,
	closeOnOverlayClick = false,
	showCloseButton = true,
	type = 'default',
	title,
	icon,
	confirmText,
	onConfirm,
}) => {
	const { t } = useTranslation()

	const baseClasses = `relative transform bg-blue-100 shadow-xl transition-transform duration-300 ease-in-out lg:rounded-xl overflow-hidden`
	const sizeClasses = {
		popup: 'lg:max-w-[500px] lg:min-h-[230px] mx-6',
		xs: 'w-full h-full lg:w-[880px] lg:h-[450px]',
		sm: 'w-full h-full lg:w-[600px] lg:h-[810px]',
		md: 'w-full h-full lg:w-[880px] lg:h-[560px]',
		lg: 'w-full h-full lg:w-[880px] lg:h-[810px]',
	}

	const sizeClass = sizeClasses[size]

	let finalIcon: React.ReactNode = icon
	let finalTitle: string | null = title || null
	const bellColor = 'text-yellow-500'
	const defaultConfirmText = confirmText || t('Label_General_Yes')

	switch (type) {
		case 'info':
			finalIcon = icon ?? (
				<TbBellRinging2Filled className={bellColor} size={40} />
			)
			finalTitle = title || t('Label_General_Information')
			break
		case 'error':
			finalIcon = icon ?? (
				<TbBellRinging2Filled className={bellColor} size={40} />
			)
			finalTitle = title || t('Label_Error_Oops')
			break
		case 'confirm':
			finalIcon = icon ?? (
				<TbBellRinging2Filled className={bellColor} size={40} />
			)
			finalTitle = title || t('Label_General_Oh')
			break
		case 'default':
		default:
			finalIcon = icon || null
			finalTitle = title || null
			break
	}

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

	return (
		<div
			className='bg-primary-900/40 fixed inset-0 z-50 flex h-full w-full items-center justify-center'
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
			onClick={() => closeOnOverlayClick && onClose()}
		>
			<div
				className={cn(`${baseClasses} ${sizeClass} ${className} flex flex-col`)}
				onClick={e => e.stopPropagation()}
			>
				{/* icon and title  */}

				{(finalIcon || finalTitle) && (
					<div className='relative flex items-center justify-between bg-blue-100 p-3'>
						<div className='flex w-full flex-col items-center justify-center'>
							{finalIcon && <div className='mt-4'>{finalIcon}</div>}
							{finalTitle && (
								<div
									id='modal-title'
									className='mt-3 text-center text-lg font-extrabold'
								>
									{finalTitle}
								</div>
							)}
						</div>
					</div>
				)}

				{/* close button */}

				{showCloseButton && (
					<button
						type='button'
						onClick={onClose}
						className={cn(
							'absolute end-3 top-3',
							'inline-flex items-center rounded-lg bg-transparent text-sm text-gray-400',
							'hover:bg-gray-200 hover:text-gray-900',
						)}
					>
						<svg
							className='h-5 w-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M6 18L18 6M6 6l12 12'
							></path>
						</svg>
					</button>
				)}
				<div className='flex-grow  bg-blue-100 px-4 py-3 '>
					{/* <div
						className={
							!title && !icon ? 'overflow-y-auto ' : 'overflow-y-auto '
						}
					> */}
					{children}
					{/* </div> */}
				</div>

				{/* modal buttons for type: 'confirm', 'info', 'error' */}

				{type === 'confirm' && (
					<div className='flex justify-center gap-4 p-4'>
						<Button
							className='bg-primary-600 font-bold text-blue-100 hover:bg-red-600'
							onClick={onConfirm}
						>
							{defaultConfirmText}
						</Button>
						<Button
							onClick={onClose}
							className='text-black-100 bg-gray-500 font-bold text-gray-700 hover:bg-gray-800 hover:text-gray-100'
						>
							{t('Label_General_No')}
						</Button>
					</div>
				)}

				{type === 'error' && (
					<div className='flex justify-center gap-4 p-4'>
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
					<div className='flex justify-center gap-4 p-4'>
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
