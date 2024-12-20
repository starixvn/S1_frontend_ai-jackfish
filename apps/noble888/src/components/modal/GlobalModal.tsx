'use client'
import Modal from '@noble888/src/components/modal'
import useModalStore from 'libs/operations/src/lib/modal/store'

const GlobalModal = () => {
	const {
		isOpen,
		size = 'md',
		type = 'default',
		icon,
		title,
		content,
		confirmText,
		onConfirm,
		closeModal
	} = useModalStore()

	return (
		<Modal
			size={size}
			isOpen={isOpen}
			onClose={closeModal}
			showCloseButton={true}
			type={type}
			icon={icon}
			title={title}
			confirmText={confirmText}
			onConfirm={onConfirm}
		>
			{content}
		</Modal>
	)
}

export default GlobalModal
