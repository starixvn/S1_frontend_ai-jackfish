'use client'

import { useModalStore } from 'JF-operations'
import { Modal } from '../common'

const GlobalModal = () => {
	const {
		isOpen,
		showCloseButton,
		size = 'sm',
		type = 'default',
		icon,
		title,
		content,
		confirmText,
		className,
		onConfirm,
		closeModal,
	} = useModalStore()

	return (
		<Modal
			size={size}
			isOpen={isOpen}
			onClose={closeModal}
			showCloseButton={showCloseButton}
			type={type}
			icon={icon}
			title={title}
			confirmText={confirmText}
			className={className}
			onConfirm={onConfirm}
		>
			{content}
		</Modal>
	)
}

export default GlobalModal
