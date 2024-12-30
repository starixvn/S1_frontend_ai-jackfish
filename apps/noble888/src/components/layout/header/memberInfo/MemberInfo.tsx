'use client'

import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import { LocaleLink, bannerUrl, cn, numberFormat, useIconSpin } from 'JF-core'
import {
	useAuthInfo,
	useAuthOperations,
	useAuthStore,
	useGetWalletInfo,
} from 'JF-operations'
import Link from 'next/link'
import { useEffect } from 'react'
import { IoMailSharp } from 'react-icons/io5'
import { TbRefresh } from 'react-icons/tb'
import { useBoolean } from 'usehooks-ts'
import Profile from './Profile'
import Wallet from './Wallet'

const MemberInfo = () => {
	const { t } = useClientTranslation()
	const { isSpinActive, onIconSpin } = useIconSpin()
	const {
		userInfo: { userName, currencyName, currencyId },
	} = useAuthStore()
	const { refetchAllWallet } = useAuthInfo()
	const { onSetHideBalance } = useAuthOperations()

	const { isHideBalance, totalWalletBalance } = useGetWalletInfo()

	const {
		value: isHideBalanceValue,
		setValue: setIsHideBalanceValue,
		toggle: toggleHideBalance,
	} = useBoolean(isHideBalance)

	// 設定隱藏或顯示餘額打api，以便之後在其他裝置登入後帶入上一個是隱藏還是顯示
	useEffect(() => {
		onSetHideBalance(isHideBalanceValue)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isHideBalanceValue])
	// * fetching 結束後給予正確數值
	useEffect(() => {
		setIsHideBalanceValue(isHideBalance)
		refetchAllWallet()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isHideBalance, setIsHideBalanceValue])

	const handleRefetchWallet = () => {
		onIconSpin()
		refetchAllWallet()
	}

	return (
		<>
			{/* mobile */}
			<div className='text-primary-50 lg:hidden'>
				<LocaleLink href={paths.profile.root} className='text-xs'>
					{t('Label_General_Hello')}, {userName}
				</LocaleLink>
				<div className='flex items-center gap-1'>
					<span className='font-bold'>
						{currencyName}
						{!isHideBalanceValue &&
							numberFormat(totalWalletBalance, currencyId, 2)}
					</span>
					<button className='h-4 w-4' onClick={handleRefetchWallet}>
						<TbRefresh
							className={cn('h-full w-full cursor-pointer', {
								'animate-spin-once': isSpinActive,
							})}
						/>
					</button>
					<button
						className='h-4 w-4'
						onClick={e => {
							e.stopPropagation()
							toggleHideBalance()
						}}
					>
						<img
							className='h-full w-full cursor-pointer'
							src={`${isHideBalanceValue ? `${bannerUrl('/h5/img/4.0/plus.png')}` : `${bannerUrl('/h5/img/4.0/minus.png')}`}`}
							alt='down-icon'
						/>
					</button>
				</div>
			</div>

			{/* desktop */}
			<div className='hidden gap-4 lg:flex'>
				<Profile />

				<Link href={paths.message.root} className='h-7 w-7'>
					<IoMailSharp className='h-full w-full text-white' />
				</Link>

				<div className='h-12 w-[1px] bg-white'></div>

				<Wallet
					handleRefetchWallet={handleRefetchWallet}
					isSpinActive={isSpinActive}
					isHideBalanceValue={isHideBalanceValue}
					setIsHideBalanceValue={setIsHideBalanceValue}
					toggleHideBalance={toggleHideBalance}
				/>

				<div className='col-span-3 flex items-center justify-end'>
					<button className='text-primary-50 bg-secondary-500 rounded-[50px] px-6 py-2'>
						{t('Label_General_Deposit')}
					</button>
				</div>
			</div>
		</>
	)
}

export default MemberInfo
