'use client'
import Modal from '@noble888/src/components/modal' // 引用你剛剛修改後的 Modal
import { useModalStore } from 'JF-operations'

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
