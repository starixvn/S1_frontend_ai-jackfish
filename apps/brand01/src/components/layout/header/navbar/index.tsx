'use client'

import ChangePasswordModal from './ChangePasswordModal'
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

			{/* 後台手動設定修改密碼彈窗 */}
			<ChangePasswordModal />
		</>
	)
}

export default Navbar
