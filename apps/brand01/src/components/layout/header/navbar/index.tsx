'use client'

import DepositAndWithdrawalBtn from './DepositAndWithdrawalBtn'
import DepositLeft from './DepositLeft'
import Profile from './Profile'
import ResetModal from './resetModal'
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

			{/* 後台手動 Reset 資料的彈窗 */}
			<ResetModal />
		</>
	)
}

export default Navbar
