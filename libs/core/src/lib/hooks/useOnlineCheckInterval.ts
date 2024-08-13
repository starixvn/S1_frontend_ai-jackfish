'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { onlineCheck } from 'JF-api/account/client'
import { IAxiosError } from 'JF-api/baseApi'
import { paths } from 'JF-constants'
import { useAuthStore } from 'JF-operations'
import { toast } from 'react-toastify'
import { useInterval } from 'usehooks-ts'
import { useGetPathname } from './useGetPathname'
import { useLocaleRouter } from './useLocaleRouter'

const useOnlineCheckInterval = () => {
	const router = useLocaleRouter()
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { isLogin, resetAuth } = useAuthStore()
	// 一分鐘檢查一次登入狀態
	useInterval(
		async () => {
			try {
				await onlineCheck()
			} catch (error) {
				// errorCode === 1001 登出
				if ((error as IAxiosError)?.errorCode === 1001) {
					toast.error(
						(error as IAxiosError).message || t('Label_General_LoggedOut'),
					)
					router.push(paths.login.root)
					resetAuth()
				}
			}
		},
		isLogin ? 60000 : null,
	)
}

export { useOnlineCheckInterval }
