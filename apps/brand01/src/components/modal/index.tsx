// pages/ModalExample.tsx
'use client'

import React, { useState } from 'react'

const Modal: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	const Modal = () => {
		return (
			<>
				<div
					className='bg-primary-200 fixed inset-0 z-50 flex items-center justify-center bg-opacity-20 transition-opacity duration-300 ease-in-out'
					aria-labelledby='modal-title'
					role='dialog'
					aria-modal='true'
				>
					<div className='relative top-40 mx-auto max-w-md scale-100 transform rounded-md bg-black shadow-xl transition-transform duration-300 ease-in-out'>
						<div className='flex justify-end p-2'>
							<button
								onClick={closeModal}
								type='button'
								className='ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
							>
								<svg
									className='h-5 w-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
										clipRule='evenodd'
									></path>
								</svg>
							</button>
						</div>

						<div className='p-6 pt-0 text-center'>
							<svg
								className='mx-auto h-20 w-20 text-red-600'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								></path>
							</svg>
							<h3 className='mt-5 mb-6 text-xl font-normal text-gray-500'>
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
					</div>
				</div>
			</>
		)
	}

	return (
		<div className='h-full w-full items-center justify-center align-middle text-white'>
			<button
				className='rounded-md bg-rose-500 px-4 py-2 text-white transition hover:bg-rose-700'
				onClick={openModal}
			>
				Click to Open modal
			</button>
			{isModalOpen && <Modal />}
		</div>
	)
}

export default Modal
