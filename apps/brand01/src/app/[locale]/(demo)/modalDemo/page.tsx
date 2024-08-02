// pages/ModalExample.tsx
'use client'

import Button from '@brand01/src/components/button'
import Modal from '@brand01/src/components/modal'
import { useState } from 'react'

const ModalPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	return (
		<>
			{/*  下這條測試 防止彈窗打開時是否無法滾動  */}
			<div className='h-[4000px]'>
				<Button onClick={openModal}>Click to Open Modal</Button>
				<Modal size='md' isOpen={isModalOpen} onClose={closeModal}>
					<div className='bg-teal-500 p-3 pt-2'>
						<h3 className='mb-6 text-xl font-normal text-gray-500'>
							Are you sure you want to delete this user?
						</h3>
						<Button>Yes</Button>
						<Button type='cancel'>No</Button>
					</div>
				</Modal>
			</div>
		</>
	)
}

export default ModalPage
