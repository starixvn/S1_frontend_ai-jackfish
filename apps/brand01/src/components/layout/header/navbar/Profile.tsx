import Button from '@brand01/src/components/button'
import Modal from '@brand01/src/components/modal'
import { imageUrl } from 'JF-core'
import useDisclosure from 'libs/core/src/lib/hooks/useDisclosure'
import { useState } from 'react'
const Profile = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [activeButton, setActiveButton] = useState<string | null>(null)

	const getContent = () => {
		switch (activeButton) {
			case 'Account Information':
				return '</>'
			case 'Financial Log':
				return '222'
			case 'Promotion Code':
				return '333'
			case 'Active Promotion':
				return '444'
		}
	}
	return (
		<>
			<div className='h-14 w-14 cursor-pointer' onClick={onOpen}>
				<img
					className='h-full w-full'
					src={imageUrl('/desktop/img/user-info.png')}
					alt='profile icon'
				/>
			</div>
			<Modal size='md' onClose={onClose} isOpen={isOpen}>
				<div className='wrapper flex h-full'>
					<div className='left h-full flex-shrink-0 flex-grow-0 basis-[40%] bg-white'>
						<div className='flex flex-col gap-2'>
							{[
								'Account Information',
								'Financial Log',
								'Promotion Code',
								'Active Promotion',
							].map(item => (
								<Button
									className={`bg-tertiary-400 h-[77px] rounded-xl ${activeButton === item ? 'from-secondary-300 to-primary-300 bg-gradient-to-b' : ''}`}
									onClick={() => setActiveButton(item)}
								>
									{item}
								</Button>
							))}
							<Button type='cancel' onClick={() => {}}>
								123
							</Button>
						</div>
					</div>
					<div className='right bg-primary-500 h-full flex-shrink-0 flex-grow-0 basis-[60%]'>
						{getContent()}
					</div>
				</div>
			</Modal>
		</>
	)
}

export default Profile
