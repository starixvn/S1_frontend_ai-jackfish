'use client'
import { ALLOWED_CURRENCIES } from '@noble888/src/data/static'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import {
	LocaleLink,
	bannerUrl,
	cn,
	numberFormat,
	useGetPathname,
} from 'JF-core'
import { useAuthStore, useStaticDataStore } from 'JF-operations'
import { includes } from 'lodash-es'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'
import Country from '../Country'

const Profile = () => {
	const { t } = useClientTranslation()
	const router = useRouter()
	const ref = useRef(null)
	const { currentPath } = useGetPathname()
	const {
		value: isMemberInfoActive,
		toggle: toggleIsMemberInfoActive,
		setFalse,
	} = useBoolean(false)
	const { value: isLangActive, toggle: toggleIsLangActive } = useBoolean(false)
	const {
		userInfo: { currencyId, userName },
		custVIPProgress,
		onSignOut,
	} = useAuthStore()
	const { VIP_CLUB_IMAGES = [] } = useStaticDataStore()

	const { upDeposit, currentVipLevel, actualDeposit } = custVIPProgress
	// * upDeposit = null 代表該會員已經是最高等級
	const isVipLevelHighest = upDeposit === null
	// const isVipLevelHighest = true

	// * 當前 VIP 等級資訊
	const currentVipLevelInfo = VIP_CLUB_IMAGES[currentVipLevel - 1]
	// * 下一階 VIP 等級資訊
	const nextVipLevelInfo = VIP_CLUB_IMAGES[currentVipLevel]

	// * Vip 進度條百分比
	const progress = Math.floor((actualDeposit / Number(upDeposit)) * 100)

	const { headerUrl, displayKey, level, alt, levelColor } =
		currentVipLevelInfo || {}
	const levelText = t(displayKey || '').replace('CLUB', '')
	const isShowVip = ALLOWED_CURRENCIES.VIP?.includes(currencyId)

	const handleSignOut = async () => {
		try {
			setFalse()
			await onSignOut()
			await router.push(paths.home.root)
			router.refresh()
		} catch (error) {
			// 因為會有已登出但畫面還未登出的情況，所以這裡不開彈窗接出錯誤訊息
			router.refresh()
			// modal.error((error as Error).message)
		}
	}

	useOnClickOutside(ref, setFalse)
	return (
		<>
			{/* 最前方的VIP圖片 */}
			<div className='h-10 w-10'>
				<img src={headerUrl} alt='VIP Badge' className='h-full w-full' />
			</div>

			<div ref={ref} className='text-primary-50'>
				<div className='relative flex cursor-pointer items-center gap-1'>
					<span className='text-primary-50' onClick={toggleIsMemberInfoActive}>
						{t('Label_General_Hello')}, {userName}
					</span>
					<div className='h-4 w-3'>
						<IoIosArrowDown />
					</div>
					{/* 按下username之後出現的下拉內容 */}
					{isMemberInfoActive && (
						<div className='absolute right-2 top-14 z-10  w-72 rounded-2xl bg-[#f9f9f9] shadow-lg'>
							{/* VIP progress section (根據ALLOWED_CURRENCIES.VIP決定顯示與否) */}
							{isShowVip && (
								<div className='text-primary-900 rounded-tl-2xl rounded-tr-2xl bg-gray-100 p-4'>
									{/* VIP image */}
									<div className='flex items-center justify-center'>
										<img
											className='h-20 w-20'
											src={currentVipLevelInfo?.headerUrl}
											alt={alt}
										/>
										{!isVipLevelHighest && (
											<img
												className='w-24'
												src={bannerUrl('/desktop/img/4.0/dot-2.png')}
												alt='img-dot'
											/>
										)}
										{!isVipLevelHighest && (
											<img
												className='h-20 w-20'
												src={nextVipLevelInfo?.headerUrl}
												alt='img-next-vip'
											/>
										)}
									</div>

									{/* progress bar */}
									{/* vip 等級最高時顯示 ReachedTheHighestLevel */}
									{isVipLevelHighest ? (
										<div className='text-primary-700 mx-auto w-full text-center text-sm font-medium'>
											<LocaleLink href={paths.vip.root}>
												<span>{t('Label_Vip_ReachedTheHighestLevel')}</span>
											</LocaleLink>
										</div>
									) : (
										<div className='flex w-full flex-col justify-center gap-2'>
											<div className='h-2 w-full rounded-[50px] bg-white'>
												<div
													className='progress-bar'
													style={{ width: `${Math.min(progress, 100)}%` }}
												/>
											</div>
											<div className='flex justify-between text-[10px] font-medium'>
												<div>
													{numberFormat(actualDeposit, currencyId)}/
													{numberFormat(Number(upDeposit), currencyId)}
												</div>
												<LocaleLink
													href={paths.vip.root}
													className='flex items-center text-gray-300'
												>
													<span>{t('Label_Vip_NextMilestone')}</span>

													<IoIosArrowForward />
												</LocaleLink>
											</div>
										</div>
									)}
								</div>
							)}

							<div className='text-primary-900 space-y-2 p-4 text-sm font-medium'>
								{/* Profile */}
								<LocaleLink
									href={paths.profile.root}
									passHref
									className='flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-gray-50'
									onClick={setFalse}
								>
									<div className='h-8 w-8'>
										<img
											src={bannerUrl('/desktop/img/4.0/profile.png')}
											alt='Profile'
											className='h-full w-full'
										/>
									</div>
									<span>{t('Label_General_Profile')}</span>
								</LocaleLink>

								{/* Bank Info */}
								{includes(ALLOWED_CURRENCIES['BANK_INFO'], currencyId) && (
									<LocaleLink
										href={paths.bankInfo.root}
										passHref
										className='flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-gray-50'
										onClick={setFalse}
									>
										<div className='h-8 w-8'>
											<img
												src={bannerUrl('/desktop/img/4.0/bankinfo.png')}
												alt='Bank'
												className='h-full w-full'
											/>
										</div>
										<span>{t('Label_General_BankInfo')}</span>
									</LocaleLink>
								)}

								{/* Crypto Wallet */}
								<LocaleLink
									href={paths.cryptoWallet.root}
									passHref
									className='flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-gray-50'
									onClick={setFalse}
								>
									<div className='h-8 w-8'>
										<img
											src={bannerUrl('/desktop/img/4.0/cryptowallet.png')}
											alt='Crypto'
											className='h-full w-full'
										/>
									</div>
									<span>{t('Label_General_CryptoWallet')}</span>
								</LocaleLink>

								{/* Refer Friends */}
								<LocaleLink
									href={paths.selfExclusion.root}
									passHref
									className='flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-gray-50'
									onClick={setFalse}
								>
									<div className='h-8 w-8'>
										<img
											src={bannerUrl('/desktop/img/4.0/referfriends.png')}
											alt='Refer'
											className='h-full w-full'
										/>
									</div>
									<span>{t('Label_General_ReferFriends')}</span>
								</LocaleLink>

								{/* Self Exclusion */}
								<LocaleLink
									href={paths.selfExclusion.root}
									passHref
									className='flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-gray-50'
									onClick={setFalse}
								>
									<div className='h-8 w-8'>
										<img
											src={bannerUrl('/desktop/img/4.0/exclusion-icon.png')}
											alt='Exclusion'
											className='h-full w-full'
										/>
									</div>
									<span>{t('Label_General_SelfExclusion')}</span>
								</LocaleLink>

								{/* Language Selector */}
								<div
									className='flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-gray-50'
									onClick={e => {
										// * 停止 toggle
										if (!includes(currentPath, paths.profile.root)) {
											e.stopPropagation()
										}
									}}
								>
									<Country
										toggle={toggleIsLangActive}
										isActive={isLangActive}
										selectedText={'English (USD)'}
									/>
								</div>

								{/* Logout */}
								<div
									className='flex cursor-pointer items-center gap-3 rounded p-2 text-orange-500 hover:bg-gray-50'
									onClick={async () => {
										handleSignOut()
									}}
								>
									<div className='h-8 w-8'>
										<img
											src={bannerUrl('/desktop/img/4.0/logout.png')}
											alt='Logout'
											className='h-full w-full'
										/>
									</div>
									<span>{t('Label_General_LogOut')}</span>
								</div>
							</div>
						</div>
					)}
					{/* ------------------------------ */}
				</div>
				<div className='flex items-center gap-2'>
					<div
						className={cn('h-4 w-4 rounded-full', {
							[levelColor]: level === currentVipLevel,
						})}
					></div>
					<span>{levelText}</span>
				</div>
			</div>
		</>
	)
}

export default Profile
