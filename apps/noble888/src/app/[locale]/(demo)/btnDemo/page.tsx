'use client'

import { Button, Modal } from '@noble888/src/components/common'
import { useDisclosure } from 'JF-core'

const Page = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<div className=''>
				<Button type='primary'>primary</Button>
				<Button type='secondary'>secondary</Button>
				<Button type='tertiary'>tertiary</Button>
				<Button type='disabled'>disabled</Button>
				<Button type='outlinedPri'>Outlined Primary</Button>
				<Button type='outlinedSec'>Outlined Secondary</Button>
				<Button type='outlinedTer'>Outlined Tertiary</Button>

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
								modal contents
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

export default Page
