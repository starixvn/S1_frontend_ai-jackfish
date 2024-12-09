'use client'
import { CurrenciesEnum } from 'JF-constants'
import { useAuthStore } from 'JF-operations'
import { useEffect, useState } from 'react'

interface IHeaderLogoProps {
	mainLogoUrl: { original: string; special: string }
}

const useHeaderLogo = ({ mainLogoUrl }: IHeaderLogoProps) => {
	const {
		userInfo: { currencyId },
	} = useAuthStore()
	const [logoUrl, setLogoUrl] = useState('')
	// 判斷是否有贊助商LOGO，若沒有，則使用沒有右邊分隔線的圖
	const [showSpLogo, setShowSpLogo] = useState(true)

	/** 當前是否為巴西 */
	const isBRL = currencyId === CurrenciesEnum.BRL

	// 僅有巴西沒有贊助球隊，所以秀 nova 原始 Logo
	useEffect(() => {
		if (isBRL) setShowSpLogo(false)
		setLogoUrl(mainLogoUrl.original)
	}, [currencyId, mainLogoUrl.original, isBRL])

	// useEffect(() => {
	// 	// 因應中秋節更換ＬＯＧＯ（期間：2024.9.12~9.18）(之後若有其他活動也可以在此調整)
	// 	const logo = isEventPeriod(EVENT_PERIOD.MIDAUTUMN)
	// 		? mainLogoUrl.special
	// 		: mainLogoUrl.original

	// 	setLogoUrl(logo)
	// }, [])

	return { logoUrl, showSpLogo }
}

export { useHeaderLogo }
