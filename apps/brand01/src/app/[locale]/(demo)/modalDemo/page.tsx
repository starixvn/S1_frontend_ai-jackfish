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
				<Modal size='sm' isOpen={isModalOpen} onClose={closeModal}>
					<h3 className='border-top mb-6 text-xl font-normal'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
						consectetur. Numquam temporibus sit reiciendis doloremque cumque
						distinctio reprehenderit consequuntur aliquam molestiae fugiat, nisi
						repellendus maiores est, in suscipit magni qui!
					</h3>
					<Button className='mr-5'>Yes</Button>
					<Button type='cancel'>No</Button>
				</Modal>
			</div>
		</>
	)
}

export default ModalPage
