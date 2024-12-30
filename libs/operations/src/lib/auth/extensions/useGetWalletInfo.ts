'use client'
import { getTpWalletInfoByTpId } from 'JF-api/account/client'
import { ITpWalletInfoData } from 'JF-api/account/type'
import { numberFormat } from 'JF-core'
import { useAuthInfo, useAuthStore } from 'JF-operations'
import { sumBy } from 'lodash-es'
import { useEffect, useState } from 'react'

const useGetWalletInfo = () => {
	const {
		userInfo: { currencyId },
	} = useAuthStore()
	const { mainWalletInfo, custBonusWallet, tpWalletList } = useAuthInfo()
	const [tpWalletBalanceList, setTpWalletBalanceList] = useState<
		ITpWalletInfoData[]
	>([])

	const getTpWalletBalanceList = async () => {
		if (tpWalletList && tpWalletList?.length >= 1) {
			const promiseTpWalletListMap = tpWalletList.map(({ tpId, tpName }) => {
				return getTpWalletInfoByTpId(tpId).then(data => {
					return { ...data, tpName }
				})
			})
			const res = (await Promise.all(
				promiseTpWalletListMap,
			)) as ITpWalletInfoData[]
			setTpWalletBalanceList(res)
		}
	}
	useEffect(() => {
		getTpWalletBalanceList()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tpWalletList])
	const { balance } = mainWalletInfo
	const {
		bonus = 0,
		rollover = 0,
		turnover = 0,
		promoCategoryId = 0,
	} = custBonusWallet[0]

	// * tp 錢包總金額
	const tpWalletsBalanceSum = sumBy(tpWalletBalanceList, 'balance')
	// * bonus 錢包總金額
	const bonusWalletSum = sumBy(custBonusWallet, 'bonus')
	// * 主錢包 + tp 錢包總金額 + bonus 錢包總金額
	const totalWalletBalance =
		(mainWalletInfo?.balance || 0) + tpWalletsBalanceSum + bonusWalletSum

	// TUK Wallet---
	const TUKWallet = {
		mainWallet: numberFormat(balance, currencyId),
		bonusWallet: numberFormat(bonus, currencyId),
		totalWallet: numberFormat(balance + bonus, currencyId),
		rollover,
		turnover,
		promoCategoryId,
	}

	return {
		TUKWallet,
		isHideBalance: Boolean(mainWalletInfo?.isHideBalance),
		mainWalletInfo,
		custBonusWallet,
		totalWalletBalance,
		tpWalletBalanceList,
	}
}

export { useGetWalletInfo }
