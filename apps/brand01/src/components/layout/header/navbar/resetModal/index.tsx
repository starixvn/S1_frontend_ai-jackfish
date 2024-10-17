'use client'

import Modal from '@brand01/src/components/modal'
import { paths } from 'JF-constants'
import { useDisclosure, useGetPathname, useLocaleRouter } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const ChangePasswordModal = dynamic(() => import('./ChangePasswordModal'), {
	ssr: false,
})
const SetLocalBankInfoModal = dynamic(() => import('./SetLocalBankInfoModal'), {
	ssr: false,
})

const ResetModal = () => {
	const { currentPath } = useGetPathname()
	const router = useLocaleRouter()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		userInfo: { isResetPwd, accountName },
	} = useAuthStore()

	// 後台手動 Reset BankInfo
	const isResetBankInfo = accountName === null

	// 設定所有需要條件
	const isOpenModal = isResetPwd || isResetBankInfo

	// 設定個別條件對應到的 Component，照順序排序
	const modalsConfig = [
		{ condition: isResetPwd, Component: ChangePasswordModal },
		{ condition: isResetBankInfo, Component: SetLocalBankInfoModal },
	]

	// 從 modalsConfig 找 condition 對應到的 Component
	const renderModals = () => {
		const activeModal = modalsConfig.find(modal => modal.condition)
		return activeModal ? <activeModal.Component /> : null
	}

	// 根據條件判斷 open or close modal
	useEffect(() => {
		if (isOpenModal) {
			// 進入首頁以外地方導回首頁
			currentPath !== paths.home.root && router.push(paths.home.root)
			onOpen()
		} else {
			onClose()
		}
	}, [currentPath, isOpenModal, isResetBankInfo, onClose, onOpen, router])

	return (
		<Modal
			size='xs'
			isOpen={isOpen}
			onClose={onClose}
			closeOnEsc={false}
			closeOnOverlayClick={false}
			showCloseButton={false}
		>
			{renderModals()}
		</Modal>
	)
}

export default ResetModal
