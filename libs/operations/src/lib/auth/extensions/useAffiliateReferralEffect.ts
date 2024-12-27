'use client'

import { some } from 'lodash-es'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

/**
 *
 * @description 記錄代理優惠資訊
 */
const useAffiliateReferralEffect = () => {
	useEffect(() => {
		const searchParams = useSearchParams()
		const affId = searchParams.get('affId')
		const affCode = searchParams.get('affCode')
		const refId = searchParams.get('refId')
		const aff = searchParams.get('aff')

		if (!some([affId, affCode, refId, aff], Boolean)) {
			return
		}

		const expires = new Date()
		expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000)

		const [, setCookie, removeCookie] = useCookies([
			'AffId',
			'RefId',
			'Aff',
			'AffCode',
		])

		removeCookie('AffId')
		removeCookie('RefId')
		removeCookie('Aff')
		removeCookie('AffCode')

		if (affId) setCookie('AffId', affId, { expires })
		if (refId) setCookie('RefId', refId, { expires })
		if (aff) setCookie('Aff', aff, { expires })
		if (affCode) setCookie('AffCode', affCode, { expires })
	}, [])
}

export { useAffiliateReferralEffect }
