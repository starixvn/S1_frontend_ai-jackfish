'use client'

import Language from '@brand01/src/components/language'
import Modal from '@brand01/src/components/modal'
import MenuCard from '@brand01/src/components/profile/common/MenuCard'
import AccountInfo from '@brand01/src/components/profile/menu/account-info'
import ActivePromotion from '@brand01/src/components/profile/menu/active-promotion'
import FinancialLog from '@brand01/src/components/profile/menu/financial-log'
import PromotionCode from '@brand01/src/components/profile/menu/promotion-code'
import { menuOptions } from '@brand01/src/data/profile'
import { paths } from 'JF-constants'
import {
	cn,
	getProgressPercentage,
	imageUrl,
	useDisclosure,
	useIconSpin,
	useLocaleRouter,
} from 'JF-core'
import { useAuthStore } from 'JF-operations'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SyncLoader } from 'react-spinners'
import { useBoolean, useMediaQuery } from 'usehooks-ts'

const Profile = () => {
	const { t } = useTranslation()
	const [isSigningOut, setIsSigningOut] = useState<boolean>(false)
	const router = useLocaleRouter()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { onSignOut } = useAuthStore()
	const { value: isActive } = useBoolean(false)
	const {
		userInfo: { currencyId, userName },
		wallet,
		getWalletInfo,
	} = useAuthStore()
	const {
		mainWallet,
		bonusWallet,
		totalWallet,
		rollover,
		turnover,
		promoCategoryId,
	} = wallet
	const { isSpinActive, onIconSpin } = useIconSpin()

	// 定義桌機和手機的media query
	const isDesktop = useMediaQuery('(min-width: 1024px)')
	const isMobile = !isDesktop

	//確保桌機打開的第一個畫面是account info 手機則是預設的選單列表
	const [activeButton, setActiveButton] = useState<string | null>(
		isDesktop ? t('Label_Profile_AccountInfo') : null,
	)

	const handleSignOut = async () => {
		setIsSigningOut(true) // 設置加載狀態為 true
		try {
			await onSignOut()
			router.push(paths.login.root)
			router.refresh()
		} finally {
			setIsSigningOut(false) // 確保在登出完成後恢復加載狀態
		}
	}

	const handleRefetchWallet = () => {
		getWalletInfo()
		onIconSpin()
	}

	//object literal to map the content to the button
	const contentMap = {
		[t('Label_Profile_AccountInfo')]: <AccountInfo />,
		[t('Label_General_FinancialLog')]: <FinancialLog />,
		[t('Label_Profile_PromoCode')]: <PromotionCode />,
		[t('Label_Profile_ActivePromotion')]: <ActivePromotion />,
	}

	// 確保如果是手機的初始畫面，切換到桌機時會顯示 "Account Info"（因為手機尺寸下 activeButton 為 null）
	useEffect(() => {
		if (isDesktop && !activeButton) {
			setActiveButton(t('Label_Profile_AccountInfo'))
		}
	}, [isDesktop, activeButton, t])

	// 關閉重啟時，根據設備類型重置 activeButton，桌機顯示 "Account Info"，手機顯示菜單列表
	useEffect(() => {
		if (!isOpen) {
			setActiveButton(isDesktop ? t('Label_Profile_AccountInfo') : null)
		}
	}, [isOpen, isDesktop, t])

	// 桌機跟手機的menuOptions不同
	const displayedOptions = menuOptions.map(option => ({
		...option,
		label: t(option.label), // 翻譯定義的label
	}))

	// 因為預設畫面右半邊是隱藏的，所以需要檢查activeButton是否為null
	const getContent = () => {
		if (!activeButton) return null // 檢查 activeButton 是否為 null
		return contentMap[activeButton] || null
	}

	// 手機只會有一個畫面 但桌機會有左右兩個畫面 所以要特別處理
	const toggleView = () => {
		if (isMobile && activeButton) {
			// 若為手機尺寸且有選擇項目，隱藏左側並顯示右側
			return (
				<div className='h-full w-full'>
					<div className='flex justify-between'>
						<div
							onClick={() => setActiveButton(null)}
							className='fixed top-2 flex flex-row gap-3 p-1'
						>
							<img
								className='h-6 w-6'
								src={imageUrl('/img/icon/icon-back.svg')}
								alt='back'
							/>
							{t('Label_General_Back')}
						</div>
					</div>

					{getContent()}
				</div>
			)
		}
		return (
			<div className='mt-10 flex flex-col gap-1 px-4 pb-8 lg:mt-0'>
				{isMobile && (
					<>
						<div className='flex h-20 w-full cursor-pointer justify-center lg:relative'>
							<img
								className='h-20 w-20'
								src={imageUrl('/desktop/img/user-info.png')}
								alt='profile icon'
							/>
						</div>

						<div className='flex justify-center'>
							<p>{userName}</p>
						</div>

						{/* total money */}

						<div className='w-fill flex h-8 justify-center'>
							<div className='bg-tertiary-400 relative flex w-[40vw] items-center justify-end gap-2 rounded-3xl pl-8 pr-3'>
								<img
									className='absolute left-[-10px] h-10 w-10 cursor-pointer lg:block'
									src={imageUrl('/img/icon/user-info/balance-money.png')}
									alt='balance money'
								/>
								<span className='text-primary-200 cursor-pointer'>
									{totalWallet}
								</span>
								<img
									className={cn('h-4 w-4 cursor-pointer', {
										'animate-spin-once': isSpinActive,
									})}
									src={imageUrl('/img/icon/icon-refresh.svg')}
									alt='refresh-icon'
									onClick={handleRefetchWallet}
								/>
							</div>
						</div>

						{/* wallet modal to L:189 */}

						{!isActive && (
							<div className='bg-tertiary-400 right-0 my-2 rounded-2xl px-6 py-4 text-sm'>
								{/* 第二行 */}
								<div className='bg-tertiary-500 mb-2 flex justify-between rounded-md px-4 py-2'>
									<p className='text-primary-200'>
										{t('Label_Wallet_MainWallet')}
									</p>

									<div className='flex flex-row'>
										<p className='text-primary-200 mr-2'>
											{t(`Label_Currency_${currencyId}`)}
										</p>
										<p className='text-secondary-300'>{mainWallet}</p>
									</div>
								</div>

								{/* 第三行 該玩家沒有bonus在手時，不會顯示bonus wallet這個區域 */}
								{bonusWallet !== '0' && (
									<div className='bg-tertiary-500 flex flex-col justify-between gap-2 rounded-md px-4 py-2'>
										<div className='flex justify-between'>
											<p className='text-primary-200'>
												{t(`Label_Wallet_BonusWallet_${promoCategoryId}`)}
											</p>
											<div className='flex flex-row'>
												<p className='text-primary-200 mr-2'>
													{t(`Label_Currency_${currencyId}`)}
												</p>
												<p className='text-secondary-300'>{bonusWallet}</p>
											</div>
										</div>
										<div className='flex flex-col gap-2'>
											<div className='h-3 w-full rounded-3xl bg-white'>
												<div
													className={`from-secondary-300 to-tertiary-300 h-3 rounded-3xl bg-gradient-to-r`}
													style={{
														width: `${getProgressPercentage(turnover, rollover)}%`,
													}}
												></div>
											</div>

											<span className='text-secondary-300 flex justify-end'>
												{getProgressPercentage(turnover, rollover)}%
											</span>
										</div>
									</div>
								)}
							</div>
						)}
					</>
				)}

				{displayedOptions.map(option => (
					<MenuCard
						key={option.label}
						className={`${
							activeButton === option.label
								? 'from-secondary-300 to-primary-300 bg-gradient-to-b'
								: 'bg-tertiary-400 mt-1'
						}`}
						onClick={() => setActiveButton(option.label)}
					>
						<div className='flex justify-start'>
							<img
								src={imageUrl(option.iconUrl)}
								alt={option.label}
								className='mr-3 h-7 w-7'
							/>
							{option.label}
						</div>
					</MenuCard>
				))}
				{isMobile && (
					<MenuCard
						className='bg-tertiary-400 mt-1'
						onClick={() => {
							router.push(paths.referral.root)
							onClose()
						}}
					>
						<div className='flex justify-start'>
							<img
								src={imageUrl('/img/icon/user-info/icon-referral.png')}
								alt='referral'
								className='mr-3 h-7 w-7'
							/>
							{t('Label_General_Referral')}
						</div>
					</MenuCard>
				)}
				<MenuCard
					className='bg-tertiary-400 to-primary-300 active:from-secondary-300 mt-1 mb-4 bg-gradient-to-b'
					onClick={handleSignOut}
				>
					<img
						src={imageUrl('/img/icon/user-info/icon-logout.png')}
						className='mr-3 h-7 w-7'
						alt='logout'
					/>
					{t('Label_General_LogOut')}
				</MenuCard>
				<Language />
			</div>
		)
	}

	// 實作同個modal在不同尺寸下的不同畫面

	return (
		<>
			<div
				className='absolute h-11 w-11 cursor-pointer lg:relative'
				onClick={onOpen}
			>
				<img
					className='h-full w-full'
					src={imageUrl('/desktop/img/user-info.png')}
					alt='profile icon'
				/>
			</div>
			<Modal size='md' onClose={onClose} isOpen={isOpen}>
				<div className='grid h-full lg:grid-cols-3'>
					{isSigningOut && (
						<div className='bg-tertiary-500 absolute inset-0 z-50 flex items-center justify-center'>
							<div className='flex flex-col gap-5'>
								<SyncLoader color='#ffffff' size={12} /> {/* 加載動畫 */}
								<div>{t('Label_General_LogOut')}...</div>
							</div>
						</div>
					)}
					{/* 左側或在手機尺寸下顯示全寬 */}
					<div
						className={`col-span-1 h-full overflow-y-scroll ${!isDesktop ? 'col-span-3' : ''}`}
					>
						{toggleView()}
					</div>

					{/* 桌機版右側顯示 */}
					{isDesktop && <div className='col-span-2 h-full'>{getContent()}</div>}
				</div>
			</Modal>
		</>
	)
}

export default Profile
