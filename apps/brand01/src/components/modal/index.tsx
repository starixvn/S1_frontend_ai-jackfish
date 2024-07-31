// pages/ModalExample.tsx
'use client'

import { cn } from 'JF-core'
import React, { useState } from 'react'

interface ModalProps {
	children: React.ReactNode
	size: 'sm' | 'md'
	className?: string
}

// const isRounded = false; // Replace 'false' with the appropriate value based on your logic
// const roundedClass = isRounded ? 'w-full' : ''; // 根據 fullWidth 決定是否全寬
// 'relative mx-auto w-full lg:max-w-md lg:rounded-md lg:h-[300px]  h-full scale-100 transform  bg-tertiary-500 shadow-xl transition-transform duration-300 ease-in-out'

const Modal: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	const Modal: React.FC<ModalProps> = ({
		children,
		size = 'md',
		className = '',
	}) => {
		const baseClasses =
			'lg:rounded-xl relative mx-auto scale-100 transform  bg-tertiary-500 shadow-xl transition-transform duration-300 ease-in-out'

		const sizeClasses = {
			sm: 'w-full h-full  lg:w-[600px] lg:h-[800px]',
			md: 'w-full h-full lg:w-[800px] lg:h-[750px]',
		}

		const sizeClass = sizeClasses[size]
		const additionalClasses = className

		return (
			<>
				<div
					className='bg-primary-200 fixed  inset-0 z-50 flex items-center justify-center bg-opacity-20 transition-opacity duration-300 ease-in-out'
					aria-labelledby='modal-title'
					role='dialog'
					aria-modal='true'
				>
					<div className={cn(baseClasses, sizeClass, additionalClasses)}>
						<div className='flex justify-end p-3 bg-teal-200 lg:rounded-tl-xl lg:rounded-tr-xl'>
							<button
								onClick={closeModal}
								type='button'
								className='ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
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
						{/* contents */}
						<div className='px-5 py-3 bg-teal-100 h-full lg:rounded-bl-xl lg:rounded-br-xl'>
							{children}
						</div>
					</div>
				</div>
				ss
			</>
		)
	}

	return (
		<div className='h-full w-full items-center justify-center align-middle text-white '>
			<button
				className='rounded-md bg-rose-500 px-4 py-2 text-white transition hover:bg-rose-700'
				onClick={openModal}
			>
				Click to Open modal
			</button>
			{isModalOpen && (
				<Modal size='sm'>
					<div className='p-3 pt-2 bg-teal-500'>
						<h3 className='mb-6 text-xl font-normal text-gray-500'>
							Are you sure you want to delete this user?
						</h3>

						<button
							onClick={closeModal}
							className='mr-2 inline-flex items-center rounded-lg bg-red-600 px-3 py-2.5 text-center text-base font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300'
						>
							Yes Im sure
						</button>
						<button
							onClick={closeModal}
							className='inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200'
						>
							No, cancel
						</button>
					</div>
				</Modal>
			)}
		</div>
	)
}

export default Modal
