'use client'

import { useState } from 'react'

/**
 *
 * @returns 要讓某icon旋轉一圈，通常是用在loading樣式上的動畫
 */
const useIconSpin = () => {
	const [isSpinActive, setIsSpinActive] = useState(false)
	const onIconSpin = () => {
		// 觸發動畫
		setIsSpinActive(true)
		// 動畫結束後重置狀態
		setTimeout(() => {
			setIsSpinActive(false)
		}, 1000) // 與tailwind config 設定的 duration (1s) 對應
	}

	return { isSpinActive, onIconSpin }
}

export { useIconSpin }
