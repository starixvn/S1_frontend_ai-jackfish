'use client'
import { cn } from 'JF-core'
import React, { useEffect } from 'react'

interface ModalProps {
	children: React.ReactNode
	size: 'sm' | 'md'
	isOpen: boolean
	onClose: () => void
	className?: string
	blockScrollOnMount?: boolean
	closeOnEsc?: boolean
	closeOnOverlayClick?: boolean
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
}) => {
	const baseClasses =
		'lg:rounded-xl relative transform bg-tertiary-500 shadow-xl transition-transform duration-300 ease-in-out'

	const sizeClasses = {
		sm: 'w-full h-full lg:w-[600px] lg:h-[810px]',
		md: 'w-full h-full lg:w-[800px] lg:h-[561px]',
	}

	const sizeClass = sizeClasses[size]
	const additionalClasses = className

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
		<>
			<div
				className='bg-primary-300/40 fixed inset-0 z-50 flex items-center justify-center'
				aria-labelledby='modal-title'
				role='dialog'
				aria-modal='true'
				onClick={() => closeOnOverlayClick && onClose()} // Closing on overlay click
			>
				<div
					className={cn(
						baseClasses,
						sizeClass,
						additionalClasses,
						'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform',
					)}
					onClick={e => e.stopPropagation()} // 防止點擊內容區域觸發關閉
				>
					<div
						className={`bg-tertiary-500 flex justify-end p-3 lg:rounded-tl-xl lg:rounded-tr-xl`}
					>
						{/* 這邊先保留 */}

						{/* <div
						className={`flex ${needGoBack ? 'justify-between' : 'justify-end'} bg-teal-200 p-3 lg:rounded-tl-xl lg:rounded-tr-xl`}
					> */}
						{/* {needGoBack && (
							<button
								type='button'
								className='inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
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
						)} */}

						<button
							type='button'
							onClick={onClose} // 只有點擊這個按鈕時才觸發 onClose
							className='inline-flex items-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
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
					</div>
					<div className='bg-tertiary-500 h-full overflow-y-scroll px-5 py-6 lg:rounded-bl-xl lg:rounded-br-xl'>
						{children}
					</div>
				</div>
			</div>
		</>
	)
}

export default Modal
