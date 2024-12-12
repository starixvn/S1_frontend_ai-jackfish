'use client'
import { cn } from 'JF-core'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TbBellRinging2Filled } from 'react-icons/tb'
import Button from '../button'

interface ModalProps {
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
	okText?: string
	cancelText?: string
	onOk?: () => void
	onCancel?: () => void
	buttonCount?: number
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
	okText,
	cancelText,
	onOk,
	onCancel,
	buttonCount = 0,
}) => {
	const { t } = useTranslation()

	const baseClasses =
		'lg:rounded-xl relative transform bg-tertiary-500 shadow-xl transition-transform duration-300 ease-in-out'

	const sizeClasses = {
		xs: 'lg:max-w-[500px] lg:min-h-[230px]',
		sm: 'lg:w-[600px] lg:h-[810px] w-[90%] h-auto',
		md: 'lg:w-[880px] lg:h-[560px] w-[90%] h-auto',
		lg: 'lg:w-[880px] lg:h-[810px] w-[90%] h-auto',
	}

	const sizeClass = sizeClasses[size]

	// 根據 type 設定預設值
	const { mergedIcon, mergedTitle, mergedOkText, mergedCancelText } =
		useMemo(() => {
			let defaultIcon: React.ReactNode = icon
			let defaultTitle: string | null = title || null
			let defaultOkText: string | null = okText || null
			let defaultCancelText: string | null = cancelText || null

			const bellColor = 'text-yellow-800'

			switch (type) {
				case 'info':
					defaultIcon = icon ?? (
						<TbBellRinging2Filled className={bellColor} size={40} />
					)
					defaultTitle = title || t('Label_General_Information')
					defaultOkText = okText || t('Label_General_OK')
					break
				case 'error':
					defaultIcon = icon ?? (
						<TbBellRinging2Filled className={bellColor} size={40} />
					)
					defaultTitle = title || 'Error'
					defaultOkText = okText || t('Label_General_Close')
					break
				case 'confirm':
					defaultIcon = icon ?? (
						<TbBellRinging2Filled className={bellColor} size={40} />
					)
					defaultTitle = title || t('Label_General_Oh')
					defaultOkText = okText || t('Label_General_Yes')
					defaultCancelText = cancelText || t('Label_General_No')
					break
				case 'default':
				default:
					defaultIcon = icon || null
					defaultTitle = title || null
					defaultOkText = okText || null
					defaultCancelText = cancelText || null
					break
			}

			return {
				mergedIcon: defaultIcon,
				mergedTitle: defaultTitle,
				mergedOkText: defaultOkText,
				mergedCancelText: defaultCancelText,
			}
		}, [type, title, icon, okText, cancelText])

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

	const handleOk = () => {
		if (onOk) {
			onOk()
		} else {
			onClose()
		}
	}

	const handleCancel = () => {
		if (onCancel) {
			onCancel()
		} else {
			onClose()
		}
	}

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
				{/* Header 區域 */}
				{(mergedIcon || mergedTitle || showCloseButton) && (
					<div className='bg-tertiary-500 relative flex items-center justify-between p-3 lg:rounded-tl-xl lg:rounded-tr-xl'>
						<div className='flex w-full flex-col items-center justify-center'>
							{mergedIcon && <div className='mt-4'>{mergedIcon}</div>}
							{mergedTitle && (
								<div id='modal-title' className='text-center font-bold'>
									{mergedTitle}
								</div>
							)}
						</div>
						{/* Close Icon */}
						{showCloseButton && (
							<button
								type='button'
								onClick={onClose}
								className='absolute right-3 top-3 inline-flex items-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 lg:hidden'
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
					</div>
				)}

				<div className='bg-tertiary-500 flex-grow overflow-y-auto px-4 py-3 lg:rounded-bl-xl lg:rounded-br-xl'>
					<div className='text-center'>{children}</div>
				</div>

				{/* 按鈕區域 - 若都沒有指定就不顯示
				{(mergedOkText || mergedCancelText) && (
					<div className='bg-tertiary-500 flex justify-center space-x-4 p-3 lg:rounded-bl-xl lg:rounded-br-xl'>
						{mergedCancelText && (
							<Button
								onClick={handleCancel}
								className='rounded-md bg-gray-200 px-4 py-2'
							>
								{mergedCancelText}
							</Button>
						)}
						{mergedOkText && (
							<Button
								onClick={handleOk}
								className='rounded-md bg-blue-500 px-4 py-2 text-white'
							>
								{mergedOkText}
							</Button>
						)}
					</div>
				)} */}
				{/* 內容區域 */}
				{/* <div className='px-6 py-4'>{children}</div> */}

				{/* 按鈕區域 */}
				<div className='flex justify-center space-x-4 p-4'>
					{buttonCount >= 1 && (
						<Button
							onClick={handleOk}
							className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
						>
							{okText}
						</Button>
					)}
					{buttonCount === 2 && (
						<Button
							onClick={handleCancel}
							className='rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400'
						>
							{cancelText}
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default Modal
