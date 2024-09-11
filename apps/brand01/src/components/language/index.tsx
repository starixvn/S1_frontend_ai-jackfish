'use client'

import { envCookieNames } from '@brand01/src/i18n/settings'
import { setLanguage } from 'JF-api/account/client'
import { langId, languageGroup } from 'JF-constants'
import { cn, imageUrl, useGetPathname, useLocaleRouter } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

interface ILanguageProps {
	className?: string
}

const Language = ({ className }: ILanguageProps) => {
	const { isLogin, getUserInfo } = useAuthStore()
	const router = useLocaleRouter()
	const { locale, currentPath } = useGetPathname()
	const [cookies] = useCookies([
		envCookieNames.langId,
		envCookieNames.currencyId,
	])

	// 切換語系 func.
	// 已登入呼叫 setLanguage api，未登入 push 觸發 effect 更新 cookie userInfo 資料
	const handleLangChange = async (langId: string) => {
		if (cookies[envCookieNames.langId] !== langId) {
			try {
				if (isLogin) {
					// 設定語系後重撈 custProfile
					await setLanguage({ langId })
					await getUserInfo()
				} else {
					router.push(currentPath, { locale: langId })
				}
			} catch (error) {
				toast.error((error as Error).message)
			}
		}
	}

	return (
		<div className={cn('flex items-center justify-center gap-3', className)}>
			{languageGroup[langId.th].map(({ displayText, value }) => (
				<button
					key={value}
					className='flex items-center justify-center gap-1.5'
					onClick={() => handleLangChange(value)}
				>
					<img
						className='h-7 w-7 rounded-full'
						src={imageUrl(`/img/flag/${value}.jpg`)}
						alt={value}
					/>
					<span
						className={cn('relative w-16 text-left', {
							"after:bg-check-200 after:absolute after:-bottom-[7px] after:left-0 after:h-[2px] after:w-5 after:rounded-full after:content-['']":
								locale === value,
						})}
					>
						{displayText}
					</span>
				</button>
			))}
		</div>
	)
}

export default Language
