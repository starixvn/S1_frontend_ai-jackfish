'use client'
import { useAuthStore } from 'JF-operations'
import { useEffect, useState } from 'react'
import { useBoolean } from 'usehooks-ts'

const useGetWalletInfo = () => {
	const { value: isActive, toggle, setFalse } = useBoolean(false)
	const { walletInfo, getWalletInfo } = useAuthStore()
	const [mainWallet, setMainWallet] = useState(0)
	const [bonusWallet, setBonusWallet] = useState(0)

	useEffect(() => {
		getWalletInfo()
	}, [getWalletInfo])

	useEffect(() => {
		const { balance = 0, bonusWallets: [{ bonus = 0 } = {}] = [] } = walletInfo
		setMainWallet(balance)
		bonus && setBonusWallet(bonus)
	}, [walletInfo])

	const onClickWallet = () => {
		toggle()
	}

	return {
		isActive,
		onClickWallet,
		setFalse,
		mainWallet,
		bonusWallet,
		totalWallet: mainWallet + bonusWallet,
	}
}

export { useGetWalletInfo }
