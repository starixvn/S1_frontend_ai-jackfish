// modalStore.ts
import { ReactNode } from 'react'
import { create } from 'zustand'

interface IModalState {
	isOpen: boolean
	type?: 'default' | 'info' | 'error' | 'confirm'
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'popup'
	// react-icons
	icon?: ReactNode
	title?: string
	content?: string | ReactNode
	confirmText?: string
	onConfirm?: () => void
	openModal: (
		props: Partial<Omit<IModalState, 'openModal' | 'closeModal'>>,
	) => void
	closeModal: () => void
}

// 定义默认的模态框状态，并显式指定类型
const defaultModalState: Omit<IModalState, 'openModal' | 'closeModal'> = {
	isOpen: false,
	type: undefined,
	size: undefined,
	icon: undefined,
	title: undefined,
	content: undefined,
	confirmText: undefined,
	onConfirm: undefined,
}

const useModalStore = create<IModalState>(set => ({
	...defaultModalState,
	openModal: props =>
		set({
			...defaultModalState,
			...props,
			isOpen: true,
		}),
	closeModal: () =>
		set({
			...defaultModalState,
		}),
}))

export default useModalStore
