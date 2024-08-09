'use client'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { cookieName } from '@brand01/src/i18n/settings'
import { languageGroup } from 'JF-constants'
import { cn, objectEntries, useGetPathname } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

const Language = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const router = useRouter()
	const ref = useRef(null)
	const { i18n } = useTranslation(['common'])
	const currentPathname = usePathname()
	const currentLocale = i18n.language
	const { userInfo, isSetLanguage, onSetLanguage } = useAuthStore()

	const { value: isActive, toggle, setFalse } = useBoolean(false)
	const [cookies, setCookie] = useCookies([cookieName])
	// 點選語言下拉選單，更換url language
	const handleSetLanguage = (value: string) => {
		const { currencyId = 4 } = userInfo
		const errorMsg = `setLanguage: ${t('Label_Error_TooManyRequests')}`
		onSetLanguage(value, currencyId, errorMsg)
		setCookie(cookieName, value)
	}

	useEffect(() => {
		if (isSetLanguage) {
			router.push(
				currentPathname.replace(`/${currentLocale}`, `/${cookies.i18next}`),
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cookies.i18next, isSetLanguage])

	useEffect(() => {
		if (cookies.i18next) return
		setCookie(cookieName, currentLocale, { path: '/' })
	}, [cookies.i18next, currentLocale, setCookie])

	// 點選畫面任何區域關閉語言下拉選單
	useOnClickOutside(ref, setFalse)

	return (
		<div ref={ref} className='flex flex-col items-center'>
			<button
				className='h-10 w-10 cursor-pointer object-cover'
				type='button'
				aria-label='country-flag'
				onClick={toggle}
				style={{ whiteSpace: 'nowrap' }}
			>
				<img
					src={`/img/flag/${currentLocale}.png`}
					alt={`flag_${currentLocale}`}
					className='h-full w-full rounded-full'
				/>
			</button>

			<div
				className={cn(
					'absolute top-24 right-3 z-10 rounded-xl border-2 border-white/20 bg-neutral-500 py-5 px-3 shadow-md shadow-white/20 lg:right-0',
					{ hidden: !isActive },
				)}
			>
				{objectEntries(languageGroup).map(([lang, item]) => {
					return (
						<Fragment key={lang}>
							{/* <div className="" key={lang}>
                {LANG_GROUP_COUNTRY[lang]}
              </div> */}
							<div
								className={cn(
									'rounded py-2 pr-2 pl-1 hover:bg-white/20 hover:text-neutral-100',
								)}
								key={`flag_${lang}`}
							>
								{item?.map(({ value, displayText }) => {
									return (
										<button
											type='button'
											className={`flex w-full gap-2 rounded-full`}
											key={`${lang}_${value}`}
											onClick={() => {
												handleSetLanguage(value)
												toggle()
											}}
										>
											<img
												className='h-6 w-6 object-cover'
												src={`/img/flag/${value}.png`}
												alt={`flag_${lang}`}
											/>
											<span>{displayText}</span>
										</button>
									)
								})}
							</div>
						</Fragment>
					)
				})}
			</div>
		</div>
	)
}

export default Language
