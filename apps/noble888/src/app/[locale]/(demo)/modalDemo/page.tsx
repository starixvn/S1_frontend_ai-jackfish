'use client'

import Button from '@noble888/src/components/button'
import Modal from '@noble888/src/components/modal'
import { useDisclosure } from 'JF-core'
import { useEffect, useState } from 'react'

const ModalPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const [joke, setJoke] = useState('載入中...')

	useEffect(() => {
		// 呼叫 API 抓取笑話
		const fetchJoke = async () => {
			try {
				const response = await fetch('https://v2.jokeapi.dev/joke/Any')
				const data = await response.json()

				// 判斷笑話類型（單句或雙句）
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
	}, []) // 空陣列確保只執行一次

	return (
		<>
			<Button onClick={onOpen}>Click to Open Modal</Button>

			<Modal
				size='xs'
				isOpen={isOpen}
				onClose={onClose}
				type='default'
				showCloseButton={true}
				cancelText='Close'
				okText='OK'
				buttonCount={2}
				
			>
				{joke}
			</Modal>
		</>
	)
}

export default ModalPage
