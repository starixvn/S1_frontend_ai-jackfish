'use client'

import { useEffect } from 'react'
import { useAuthStore } from '../store'

/**
 * 後台手動更改密碼，user 登入後要強製修改密碼，完成才可以去其他頁面
 */
const useChangePasswordModalEffect = (handleModalCallBack: () => void) => {
	const {
		isLoading,
		userInfo: { isResetPwd },
	} = useAuthStore()

	useEffect(() => {
		if (!isLoading && isResetPwd) {
			handleModalCallBack()
		}
	}, [handleModalCallBack, isLoading, isResetPwd])
}

export { useChangePasswordModalEffect }
