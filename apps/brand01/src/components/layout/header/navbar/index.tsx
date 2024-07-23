'use client'
import React from 'react'
import Wallet from './Wallet'
import DepositAndWithdrawalBtn from './DepositAndWithdrawalBtn'
import DepositLeft from './DepositLeft'
import Country from '../../headerOld/rightFunction/country'
import Profile from './Profile'
import Auth from './Auth'

const Navbar = () => {
	return (
		<>
			{/* 存提款選擇左邊的功能 */}
			<DepositLeft />

			{/* 存提款按鈕 */}
			<DepositAndWithdrawalBtn />

			{/* 錢包＆個人資訊 */}
			<Wallet />

			{/* 個人資訊 */}
			<Profile />

			{/* ==============之後關掉=============== */}
			{/* 語系選擇 */}
			<Country />
			{/* 登入註冊 */}
			<Auth />
			{/* ==================================== */}
		</>
	)
}

export default Navbar
