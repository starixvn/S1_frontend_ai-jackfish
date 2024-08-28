'use client'

import Button from '@brand01/src/components/button'
import Modal from '@brand01/src/components/modal'
import { useDisclosure } from 'JF-core'

//把原本內建的overflow-y-scroll 拿掉 需要的話自己加上

const ModalPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<div className=''>
				<Button onClick={onOpen}>Click to Open Modal</Button>
				<Modal
					size='xs'
					isOpen={isOpen}
					onClose={onClose}
					// closeOnEsc={false}
					// closeOnOverlayClick={true}
					showCloseButton={false}
				>
					<div className='h-64'>
						<div className='h-full overflow-y-scroll'>
							<h3 className='border-top mb-6 text-xl font-normal'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
								consectetur. Numquam temporibus sit reiciendis doloremque cumque
								distinctio reprehenderit consequuntur aliquam molestiae fugiat,
								nisi repellendus maiores est, in suscipit magni qui!
							</h3>
							<h3 className='border-top mb-6 text-xl font-normal'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
								consectetur. Numquam temporibus sit reiciendis doloremque cumque
								distinctio reprehenderit consequuntur aliquam molestiae fugiat,
								nisi repellendus maiores est, in suscipit magni qui!
							</h3>
							<h3 className='border-top mb-6 text-xl font-normal'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
								consectetur. Numquam temporibus sit reiciendis doloremque cumque
								distinctio reprehenderit consequuntur aliquam molestiae fugiat,
								nisi repellendus maiores est, in suscipit magni qui!
							</h3>
							<h3 className='border-top mb-6 text-xl font-normal'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
								consectetur. Numquam temporibus sit reiciendis doloremque cumque
								distinctio reprehenderit consequuntur aliquam molestiae fugiat,
								nisi repellendus maiores est, in suscipit magni qui!
							</h3>
							<h3 className='border-top mb-6 text-xl font-normal'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
								consectetur. Numquam temporibus sit reiciendis doloremque cumque
								distinctio reprehenderit consequuntur aliquam molestiae fugiat,
								nisi repellendus maiores est, in suscipit magni qui!
							</h3>
							<h3 className='border-top mb-6 text-xl font-normal'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
								consectetur. Numquam temporibus sit reiciendis doloremque cumque
								distinctio reprehenderit consequuntur aliquam molestiae fugiat,
								nisi repellendus maiores est, in suscipit magni qui!
							</h3>
						</div>
					</div>
				</Modal>
			</div>
		</>
	)
}

export default ModalPage
