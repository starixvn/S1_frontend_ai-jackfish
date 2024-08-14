'use client'
import { useClientTranslation } from '@brand01/src/i18n/client'
import {
	cn,
	getProgressPercentage,
	imageUrl,
	numFormatToDigits,
	useGetPathname,
	useIconSpin,
} from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { useRef } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

const Wallet = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const ref = useRef(null)
	const { value: isActive, toggle, setFalse } = useBoolean(false)
	const { userInfo, wallet, getWalletInfo } = useAuthStore()
	const { userName } = userInfo
	const { mainWallet, bonusWallet, totalWallet } = wallet
	const { isSpinActive, onIconSpin } = useIconSpin()

	const handleRefetchWallet = () => {
		getWalletInfo()
		onIconSpin()
	}

	useOnClickOutside(ref, setFalse)
	return (
		<>
			<div
				ref={ref}
				className='bg-tertiary-400 my-4 mr-8 rounded-xl pl-4 pr-8 lg:relative lg:my-auto lg:mr-0 lg:bg-transparent lg:px-0'
			>
				<div
					className='cursor-pointer text-right lg:text-center'
					onClick={toggle}
				>
					{userName}
				</div>
				<div className='bg-tertiary-400 flex items-center justify-end gap-2 rounded-3xl lg:justify-between lg:gap-4 lg:pr-2'>
					<img
						className='hidden h-8 w-8 cursor-pointer lg:block'
						src={imageUrl('/img/header/balance-money.png')}
						alt=''
						onClick={toggle}
					/>
					<span className='text-primary-200 cursor-pointer' onClick={toggle}>
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

				{/* wallet modal */}
				{isActive && (
					<div className='bg-tertiary-400 absolute right-0 mt-2 min-w-[320px] rounded-2xl px-6 py-4 text-sm'>
						{/* 第一行 */}
						<div className='mb-2 flex justify-between'>
							<p className='text-primary-200'>
								{t(`Label_Currency_${userInfo.currencyId}`)}
							</p>
							<div className='flex items-center gap-2'>
								{/* 此數字為main wallet + bonus wallet總和 */}
								<span className='text-check-200'>
									{numFormatToDigits(totalWallet)}
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

						{/* 第二行 */}
						<div className='bg-tertiary-500 mb-2 flex justify-between rounded-md px-4 py-2'>
							<p className='text-primary-200'>{t('Label_Wallet_MainWallet')}</p>
							<p className='text-secondary-300'>
								{numFormatToDigits(mainWallet)}
							</p>
						</div>

						{/* 第三行 該玩家沒有bonus在手時，不會顯示bonus wallet這個區域 */}
						{bonusWallet !== 0 && (
							<div className='bg-tertiary-500 flex flex-col justify-between gap-2 rounded-md px-4 py-2'>
								<div className='flex justify-between'>
									<p className='text-primary-200'>{t('Label_BonusWallet_0')}</p>
									<p className='text-secondary-300'>
										{numFormatToDigits(bonusWallet)}
									</p>
								</div>
								<div className='flex items-center justify-between'>
									<div className='h-3 w-[70%] rounded-3xl bg-white'>
										<div
											className={`from-secondary-300 to-tertiary-300 h-3 rounded-3xl bg-gradient-to-r`}
											style={{
												width: `${getProgressPercentage(bonusWallet, totalWallet)}%`,
											}}
										></div>
									</div>

									<span className='text-secondary-300'>
										{getProgressPercentage(bonusWallet, totalWallet)}%
									</span>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	)
}

export default Wallet
