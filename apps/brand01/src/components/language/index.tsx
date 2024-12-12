'use client'

import { langLabel, languageGroup } from '@brand01/src/data/country'
import { setLanguage } from 'JF-api/account/client'
import { CurrenciesEnum, ENV_COOKIE_NAMES } from 'JF-constants'
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
		ENV_COOKIE_NAMES.langId,
		ENV_COOKIE_NAMES.currencyId,
	])

	// 切換語系 func.
	// 已登入呼叫 setLanguage api，未登入 push 觸發 effect 更新 cookie userInfo 資料
	const handleLangChange = async (langId: string) => {
		if (cookies[ENV_COOKIE_NAMES.langId] !== langId) {
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
			{languageGroup[CurrenciesEnum.THB].map(langId => (
				<button
					key={langId}
					className='flex items-center justify-center gap-1.5'
					onClick={() => handleLangChange(langId)}
				>
					<img
						className='h-7 w-7 rounded-full'
						src={imageUrl(`/img/flag/${langId}.jpg`)}
						alt={langId}
					/>
					<span
						className={cn('relative w-16 text-left', {
							"after:bg-check-200 after:absolute after:-bottom-[7px] after:left-0 after:h-[2px] after:w-5 after:rounded-full after:content-['']":
								locale === langId,
						})}
					>
						{langLabel[langId]}
					</span>
				</button>
			))}
		</div>
	)
}

export default Language
