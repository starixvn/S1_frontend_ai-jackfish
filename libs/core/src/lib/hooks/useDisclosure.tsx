import { useState } from 'react'

interface IUseDisclosure {
	isOpen: boolean
	onClose: () => void
	onOpen: () => void
}

const useDisclosure = (defaultIsOpen = false): IUseDisclosure => {
	const [isOpen, setIsOpen] = useState(defaultIsOpen)
	const onClose = () => setIsOpen(false)
	const onOpen = () => setIsOpen(true)

	return {
		isOpen,
		onClose,
		onOpen,
	}
}

export default useDisclosure
