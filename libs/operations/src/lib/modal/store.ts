import { create } from 'zustand'

interface ModalState {
  isOpen: boolean
  type?: 'default' | 'info' | 'error' | 'confirm' | string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'popup'
  icon?: React.ReactNode
  title?: React.ReactNode
  content?: React.ReactNode
  confirmText?: string
  onConfirm?: () => void
  openModal: (props: Partial<Omit<ModalState, 'openModal' | 'closeModal'>>) => void
  closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: 'default',
  size: 'md',
  icon: undefined,
  title: undefined,
  content: undefined,
  confirmText: undefined,
  onConfirm: undefined,
  openModal: (props) => set((state) => ({ ...state, ...props, isOpen: true })),
  closeModal: () => set({ isOpen: false }),
}))
