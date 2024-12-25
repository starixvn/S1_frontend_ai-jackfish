'use client'

import { cn } from 'JF-core'
import React, { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TbBellRinging2Filled } from 'react-icons/tb'
import Button from './Button'

interface IModalProps {
	children?: React.ReactNode
	size: 'xs' | 'sm' | 'md' | 'lg'
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

	const sizeClasses = {
		xs: 'w-full h-full lg:max-w-[880px] lg:max-h-[450px]',
		sm: 'w-full h-full lg:max-w-[880px] lg:max-h-[560px]',
		md: 'w-full h-full lg:max-w-[880px] lg:max-h-[680px]',
		lg: 'w-full h-full lg:max-w-[880px] lg:max-h-[810px]',
	}

	const sizeClass = sizeClasses[size]

	let finalIcon = null
	let finalTitle = ''
	let finalConfirmText = ''

	const Bell: ReactNode = (
		<TbBellRinging2Filled className='text-yellow-500' size={40} />
	)

	switch (type) {
		case 'info':
			finalIcon = icon ?? Bell
			finalTitle = title || t('Label_General_Information')
			finalConfirmText = confirmText || t('Label_General_OK')
			break
		case 'error':
			finalIcon = icon ?? Bell
			finalTitle = title || t('Label_Error_Oops')
			finalConfirmText = confirmText || t('Label_General_Close')
			break
		case 'confirm':
			finalIcon = icon ?? Bell
			finalTitle = title || t('Label_General_Oh')
			finalConfirmText = confirmText || t('Label_General_Yes')
			break
		case 'default':
		default:
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
			className={cn(
				'bg-primary-900/40 fixed inset-0 z-50 flex h-full w-full items-start justify-center lg:items-center',
				type === 'default' ? 'p-0' : 'p-9',
			)}
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
			onClick={() => closeOnOverlayClick && onClose()}
		>
			<div
				className={cn(
					'relative transform overflow-hidden bg-white p-5 shadow-xl transition-transform duration-300 ease-in-out lg:rounded-xl lg:bg-blue-100',
					type === 'default'
						? sizeClass
						: 'w-full lg:max-h-[60vw] lg:w-[460px]',
					className,
				)}
				onClick={e => e.stopPropagation()}
			>
				{/* icon and title  */}
				{(finalIcon || finalTitle) && (
					<div className='relative flex items-center justify-between bg-white lg:bg-blue-100'>
						<div className='flex w-full flex-col items-center justify-center gap-1 lg:gap-3'>
							{finalIcon && <div className='lg:mt-4'>{finalIcon}</div>}
							{finalTitle && (
								<div
									id='modal-title'
									className='text-primary-900 text-center text-lg font-extrabold'
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

				{type === 'default' ? (
					children
				) : (
					<>
						<div className='text-primary-700 flex-grow overflow-y-auto bg-white py-1 text-center lg:bg-blue-100 lg:py-3'>
							{children}
						</div>
						<div className='flex justify-center gap-4 p-2 lg:p-4'>
							<Button
								className={cn(
									'bg-primary-600 w-full font-bold text-blue-100 hover:bg-red-600 lg:w-auto lg:min-w-32',
								)}
								onClick={() => {
									onClose()
									onConfirm && onConfirm()
								}}
							>
								{finalConfirmText}
							</Button>
							{type === 'confirm' && (
								<Button
									className='text-black-100 w-full bg-gray-500 font-bold text-gray-700 hover:bg-gray-800 hover:text-gray-100 lg:w-auto lg:min-w-32'
									onClick={onClose}
								>
									{t('Label_General_No')}
								</Button>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Modal
