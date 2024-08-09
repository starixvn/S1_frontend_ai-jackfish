'use client'

import Button from '@brand01/src/components/button'
import Modal from '@brand01/src/components/modal'
import useDisclosure from 'libs/core/src/lib/hooks/useDisclosure'

const ModalPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<div className='h-[4000px]'>
				<Button onClick={onOpen}>Click to Open Modal</Button>
				<Modal
					size='sm'
					isOpen={isOpen}
					onClose={onClose}
					// closeOnEsc={false}
					// closeOnOverlayClick={true}
				>
					<h3 className='border-top mb-6 text-xl font-normal'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
						consectetur. Numquam temporibus sit reiciendis doloremque cumque
						distinctio reprehenderit consequuntur aliquam molestiae fugiat, nisi
						repellendus maiores est, in suscipit magni qui!
					</h3>
					<h3 className='border-top mb-6 text-xl font-normal'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
						consectetur. Numquam temporibus sit reiciendis doloremque cumque
						distinctio reprehenderit consequuntur aliquam molestiae fugiat, nisi
						repellendus maiores est, in suscipit magni qui!
					</h3>
					<h3 className='border-top mb-6 text-xl font-normal'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
						consectetur. Numquam temporibus sit reiciendis doloremque cumque
						distinctio reprehenderit consequuntur aliquam molestiae fugiat, nisi
						repellendus maiores est, in suscipit magni qui!
					</h3>
					<h3 className='border-top mb-6 text-xl font-normal'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
						consectetur. Numquam temporibus sit reiciendis doloremque cumque
						distinctio reprehenderit consequuntur aliquam molestiae fugiat, nisi
						repellendus maiores est, in suscipit magni qui!
					</h3>
					<h3 className='border-top mb-6 text-xl font-normal'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
						consectetur. Numquam temporibus sit reiciendis doloremque cumque
						distinctio reprehenderit consequuntur aliquam molestiae fugiat, nisi
						repellendus maiores est, in suscipit magni qui!
					</h3>
					<h3 className='border-top mb-6 text-xl font-normal'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
						consectetur. Numquam temporibus sit reiciendis doloremque cumque
						distinctio reprehenderit consequuntur aliquam molestiae fugiat, nisi
						repellendus maiores est, in suscipit magni qui!
					</h3>
					<h3 className='border-top mb-6 text-xl font-normal'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
						consectetur. Numquam temporibus sit reiciendis doloremque cumque
						distinctio reprehenderit consequuntur aliquam molestiae fugiat, nisi
						repellendus maiores est, in suscipit magni qui!
					</h3>
					<h3 className='border-top mb-6 text-xl font-normal'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
						consectetur. Numquam temporibus sit reiciendis doloremque cumque
						distinctio reprehenderit consequuntur aliquam molestiae fugiat, nisi
						repellendus maiores est, in suscipit magni qui!
					</h3>
					<h3 className='border-top mb-6 text-xl font-normal'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
						consectetur. Numquam temporibus sit reiciendis doloremque cumque
						distinctio reprehenderit consequuntur aliquam molestiae fugiat, nisi
						repellendus maiores est, in suscipit magni qui!
					</h3>
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
