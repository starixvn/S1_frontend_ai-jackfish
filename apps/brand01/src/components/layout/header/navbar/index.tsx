'use client'
import Language from '@brand01/src/components/language'
import Auth from './Auth'
import DepositAndWithdrawalBtn from './DepositAndWithdrawalBtn'
import DepositLeft from './DepositLeft'
import Profile from './Profile'
import Wallet from './Wallet'

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
			<Language isLogin={true} />
			{/* 登入註冊 */}
			<Auth />
			{/* ==================================== */}
		</>
	)
}

export default Navbar
