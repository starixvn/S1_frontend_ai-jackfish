'use client'

import { affiliateCheck, getAffiliateAgent } from 'JF-api/site/client'
import { CurrenciesEnum } from 'JF-constants'
import { useAuthStore, useStaticDataStore } from 'JF-operations'
import { includes } from 'lodash-es'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const useJoinAff = ({
	successCallback,
	errorCallback,
}: {
	successCallback: (aff: string, affCurrencyId?: number) => void
	errorCallback: () => void
}) => {
	// 驗證 aff 成功
	const [isAffValid, setIsAffValid] = useState<boolean>(false)
	const [affValidType, setAffValidType] = useState<'affId' | 'affCode' | null>(
		null,
	)
	// 是否有符合 ALLOWED_CURRENCIES 幣別設定
	const {
		userInfo: { currencyId },
	} = useAuthStore()
	const { ALLOWED_CURRENCIES } = useStaticDataStore()
	const allowedAffCurrencies = ALLOWED_CURRENCIES?.AFFILIATE as CurrenciesEnum[]

	const searchParams = useSearchParams()
	const [cookies] = useCookies(['AffId', 'AffCode'])
	const affId = searchParams.get('AffId')
	const affCode = searchParams.get('AffCode')
	const urlAffId = affId || cookies.AffId
	const urlAffCode = affCode || cookies.AffCode

	// url or cookie 有帶 aff 先驗證
	const checkUrlAffiliate = useCallback(async () => {
		if (!urlAffId && !urlAffCode) return
		// AffId 是 Referral 用的，AffCode 是代理用的
		try {
			if (urlAffId) {
				const { currencyId: affCurrencyId } = await getAffiliateAgent({
					affId: urlAffId as string,
				})
				if (affCurrencyId) {
					successCallback(urlAffId, affCurrencyId)
					setIsAffValid(true)
					setAffValidType('affId')
				}
			} else if (urlAffCode) {
				await affiliateCheck({
					affCode: urlAffCode as string,
				})
				successCallback(urlAffCode)
				setIsAffValid(true)
				setAffValidType('affCode')
			}
		} catch (error) {
			// api驗證失敗則不帶入 affiliate 欄位
			return
		}
	}, [successCallback, urlAffCode, urlAffId])

	// 手動輸入 aff 欄位驗證
	const checkAffiliate = async (affCode: string) => {
		if (!affCode) return
		try {
			await affiliateCheck({
				affCode,
			})
			successCallback(affCode)
			setIsAffValid(true)
			setAffValidType('affCode')
		} catch (error) {
			errorCallback()
		}
	}

	useEffect(() => {
		if (includes(allowedAffCurrencies, currencyId)) checkUrlAffiliate()
	}, [allowedAffCurrencies, checkUrlAffiliate, currencyId])

	return { checkAffiliate, isAffValid, affValidType }
}

export { useJoinAff }
