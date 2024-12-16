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

				setJoke(
					data.type === 'single'
						? data.joke
						: `${data.setup} - ${data.delivery}`,
				)
			} catch {
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
			{/* 點擊按鈕開啟彈窗 */}
			<Button onClick={onOpen}>Open</Button>
			{/* 彈窗內容 */}
			<Modal
				size='popup' // 自訂義尺寸 只有popup會特別用popup這個size rwd下不會滿版
				type='info'
				isOpen={isOpen} // 彈窗是否開啟
				onClose={onClose} // 關閉彈窗行為
				showCloseButton={true} // 是否顯示右上角的關閉按鈕
				confirmText='自定義文字與功能' // type='confirm' 可自定義 確認按鈕文字
				onConfirm={handleConfirm} //  type='confirm' 可自定義 確認按鈕行為
			>
				{joke}
			</Modal>

			{/* 
			其他範例 

			## 1 

			Default Modal = type 不用塞
			Info Modal = type ='info'
			Error Modal = type = 'error'

			## 2 

			Custom Icon and Title Modal
			<Modal
				size='md'
				isOpen={isOpen}
				onClose={onClose}
				icon={<TbBellRinging2Filled size={50} className='text-green-500' />}
				title='自訂標題'
			>
				這是一個帶有自訂圖示與標題的彈窗
			</Modal> */}


		</>
	)
}

export default ModalPage
