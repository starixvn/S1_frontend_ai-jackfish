'use client'

import { cn } from 'JF-core'
import React, { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ImCross } from 'react-icons/im'
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
		xs: 'w-full h-full lg:max-w-[480px] lg:max-h-[450px]',
		sm: 'w-full h-full lg:max-w-[880px] lg:max-h-[450px]',
		md: 'w-full h-full lg:max-w-[880px] lg:max-h-[680px]',
		lg: 'w-full h-full lg:max-w-[880px] lg:max-h-[810px]',
	}

	const sizeClass = sizeClasses[size]

	let finalIcon = null
	let finalTitle = ''
	let finalConfirmText = ''

	const Bell: ReactNode = (
		<TbBellRinging2Filled className='text-secondary-500' size={40} />
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
				'fixed inset-0 z-50 flex h-full w-full items-start justify-center bg-black/40 lg:items-center',
				type === 'default' ? 'p-0' : 'p-9',
			)}
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
			onClick={() => closeOnOverlayClick && onClose()}
		>
			<div
				className={cn(
					'relative transform overflow-hidden bg-black p-5 shadow-xl transition-transform duration-300 ease-in-out lg:rounded-xl',
					type === 'default'
						? sizeClass
						: 'w-full lg:max-h-[60vw] lg:w-[460px]',
					className,
				)}
				onClick={e => e.stopPropagation()}
			>
				{/* icon and title  */}
				{(finalIcon || finalTitle) && (
					<div className='relative flex items-center justify-between bg-black'>
						<div className='flex w-full flex-col items-center justify-center gap-1 lg:gap-3'>
							{finalIcon && <div className='lg:mt-4'>{finalIcon}</div>}
							{finalTitle && (
								<div
									id='modal-title'
									className='text-center text-lg font-extrabold'
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
							'absolute end-4 top-4 h-4 w-4',
							'inline-flex items-center justify-center rounded-full bg-transparent text-sm',
							'hover:bg-white hover:text-black',
						)}
					>
						<ImCross size={12} />
					</button>
				)}

				{type === 'default' ? (
					children
				) : (
					<>
						<div className='text-primary-500 flex-grow overflow-y-auto bg-black py-1 text-center lg:py-3'>
							{children}
						</div>
						<div className='flex justify-center gap-4 p-2 lg:p-4'>
							<Button
								className={cn(
									'bg-secondary-500 hover:bg-secondary-400 w-full font-bold lg:w-auto lg:min-w-32',
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
									className='text-black-100 bg-primary-500 w-full font-bold hover:bg-gray-800 hover:text-gray-100 lg:w-auto lg:min-w-32'
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
