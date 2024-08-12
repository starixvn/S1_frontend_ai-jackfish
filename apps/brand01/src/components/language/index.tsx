'use client'

import { envCookieNames } from '@brand01/src/i18n/settings'
import { setLanguage } from 'JF-api/account/client'
import { langId, languageGroup } from 'JF-constants'
import { cn, imageUrl, useGetPathname } from 'JF-core'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

interface ILanguageProps {
	isLogin: boolean
	className?: string
}

const Language = ({ isLogin, className }: ILanguageProps) => {
	const { locale, currentPath } = useGetPathname()
	const [cookies, setCookie] = useCookies([
		envCookieNames.langId,
		envCookieNames.currencyId,
	])

	const handleLangChange = async (langId: string, currencyId: number) => {
		if (cookies[envCookieNames.langId] !== langId) {
			try {
				if (isLogin) {
					await setLanguage({ langId })
				}
				setCookie(envCookieNames.langId, langId, { path: '/' })
				setCookie(envCookieNames.currencyId, currencyId, { path: '/' })
				window.history.pushState(null, '', `/${langId}${currentPath}`)
			} catch (error) {
				toast.error((error as Error).message)
			}
		}
	}

	return (
		<div className={cn('flex items-center justify-center gap-3', className)}>
			{languageGroup[langId.th].map(({ displayText, value, currencyId }) => (
				<button
					key={value}
					className='flex items-center justify-center gap-1.5'
					onClick={() => handleLangChange(value, currencyId)}
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
