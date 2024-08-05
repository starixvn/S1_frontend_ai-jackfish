'use client'
import { cn } from 'JF-core'
import React from 'react'

interface ModalProps {
	children: React.ReactNode
	size: 'sm' | 'md'
	className?: string
	isOpen: boolean
	onClose: () => void
	blockScrollOnMount?: boolean
}

const Modal: React.FC<ModalProps> = ({
	size,
	isOpen,
	children,
	className,
	onClose,
	blockScrollOnMount = true,
}) => {
	const baseClasses =
		'lg:rounded-xl relative mx-auto scale-100 transform bg-tertiary-500 shadow-xl transition-transform duration-300 ease-in-out'

	const sizeClasses = {
		sm: 'w-full h-full lg:w-[600px] lg:h-[800px]',
		md: 'w-full h-full lg:w-[800px] lg:h-[750px]',
	}

	const sizeClass = sizeClasses[size]
	const additionalClasses = className

	React.useEffect(() => {
		if (blockScrollOnMount && isOpen) {
			document.body.style.overflow = 'hidden'
		}
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isOpen, blockScrollOnMount])

	if (!isOpen) return null

	return (
		<>
			<div
				className='bg-primary-300/40 fixed inset-0 z-50 flex items-center justify-center'
				aria-labelledby='modal-title'
				role='dialog'
				aria-modal='true'
			>
				<div
					className={cn(baseClasses, sizeClass, additionalClasses)}
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
					</div>
					<div className='h-fullbg-tertiary-500 px-5 py-3 lg:rounded-bl-xl lg:rounded-br-xl'>
						{children}
					</div>
				</div>
			</div>
		</>
	)
}

export default Modal
