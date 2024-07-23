'use client'
import React from 'react'
import Wallet from './Wallet'
import DepositAndWithdrawalBtn from './DepositAndWithdrawalBtn'
import DepositLeft from './DepositLeft'
import Country from '../../headerOld/rightFunction/country'
import Profile from './Profile'

const Navbar = () => {
	return (
		<>
			{/* 存提款選擇左邊的功能 */}
			<DepositLeft />

			{/* 登入註冊 */}
			{/* <Auth /> */}

			{/* 存提款按鈕 */}
			<DepositAndWithdrawalBtn />

			{/* 錢包＆個人資訊 */}
			<Wallet />

			{/* 個人資訊 */}
			<Profile />

			{/* 語系選擇 */}
			<Country />
		</>
	)
}

export default Navbar
