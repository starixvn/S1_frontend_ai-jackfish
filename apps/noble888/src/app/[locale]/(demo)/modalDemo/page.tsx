'use client'

import Button from '@noble888/src/components/button'
import Modal from '@noble888/src/components/modal'
import { useDisclosure } from 'JF-core'
import { useEffect, useState } from 'react'

const ModalPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const [joke, setJoke] = useState('載入中...')

	useEffect(() => {
		const fetchJoke = async () => {
			try {
				const response = await fetch('https://v2.jokeapi.dev/joke/Any')
				const data = await response.json()

				if (data.type === 'single') {
					setJoke(data.joke)
				} else if (data.type === 'twopart') {
					setJoke(`${data.setup} - ${data.delivery}`)
				}
			} catch (error) {
				setJoke('無法載入笑話，請稍後再試！')
			}
		}

		fetchJoke()
	}, [])

	useEffect(() => {
		if (joke) {
			onOpen()
		}
	}, [joke])


	const handleConfirm = () => {
		alert('test')
		onClose()
	}


	return (
		<>
			<Button onClick={onOpen}>Click to Open Modal</Button>
			<Modal
				size='popup' // 自訂義尺寸
				type='default' // popup樣式
				isOpen={isOpen}
				onClose={onClose}
				showCloseButton={true}
				confirmText='自定義文字跟功能'       // popup type = confirm 自訂義確認按鈕文字
				onConfirm={handleConfirm} // popup type = confirm 自訂義確認行為
			>
				{joke}
			</Modal>
		</>
	)
}

export default ModalPage
