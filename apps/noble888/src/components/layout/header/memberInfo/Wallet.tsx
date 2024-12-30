'use client'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import { LocaleLink, bannerUrl, cn, numberFormat } from 'JF-core'
import {
	useAuthInfo,
	useAuthOperations,
	useAuthStore,
	useGetWalletInfo,
} from 'JF-operations'
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { TbRefresh } from 'react-icons/tb'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

interface IWalletProps {
	handleRefetchWallet: () => void
	isSpinActive: boolean
	isHideBalanceValue: boolean
	setIsHideBalanceValue: (value: boolean) => void
	toggleHideBalance: () => void
}

const Wallet = ({
	handleRefetchWallet,
	isSpinActive,
	isHideBalanceValue,
	setIsHideBalanceValue,
	toggleHideBalance,
}: IWalletProps) => {
	const { t } = useClientTranslation()
	const ref = useRef(null)
	const {
		userInfo: { currencyId, currencyName, lastLogin },
	} = useAuthStore()
	const { onSetHideBalance } = useAuthOperations()

	const {
		isHideBalance,
		mainWalletInfo,
		custBonusWallet = [],
		totalWalletBalance,
		tpWalletBalanceList,
	} = useGetWalletInfo()
	const { refetchAllWallet } = useAuthInfo()

	const {
		value: isWalletInfoActive,
		toggle: toggleIsWalletInfoActive,
		setFalse,
	} = useBoolean(false)

	const { balance, lastTransaction } = mainWalletInfo ?? {}

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

	useOnClickOutside(ref, setFalse)
	return (
		<div ref={ref} className='text-primary-50 relative'>
			<div
				className='flex cursor-pointer items-center gap-1'
				onClick={toggleIsWalletInfoActive}
			>
				<span>{t('Label_General_Balance')}</span>
				<div className='h-4 w-3'>
					<IoIosArrowDown />
				</div>
			</div>
			<div className='flex items-center'>
				<button className='h-4 w-4' onClick={handleRefetchWallet}>
					<TbRefresh
						className={cn('h-full w-full cursor-pointer', {
							'animate-spin-once': isSpinActive,
						})}
					/>
				</button>
				<span>
					{currencyName}
					{!isHideBalanceValue &&
						numberFormat(totalWalletBalance, currencyId, 2)}
				</span>
				<button
					className='h-4 w-4'
					onClick={e => {
						e.stopPropagation()
						toggleHideBalance()
					}}
				>
					<img
						className='h-full w-full cursor-pointer'
						src={`${isHideBalanceValue ? `${bannerUrl('/desktop/img/4.0/plus.png')}` : `${bannerUrl('/desktop/img/4.0/minus.png')}`}`}
						alt='down-icon'
					/>
				</button>
			</div>

			{isWalletInfoActive && (
				<div className='absolute right-2 top-14 z-10 mx-auto mt-2 w-80 rounded-2xl bg-[#f9f9f9] p-5 shadow-lg'>
					{/* Header */}
					<div className='text-primary-900 mb-2 flex items-center justify-between px-2 text-base font-medium'>
						<span>{currencyName}</span>
						<div className='flex items-center gap-1'>
							<span>{numberFormat(totalWalletBalance, currencyId, 2)}</span>
							<button className='h-4 w-4' onClick={handleRefetchWallet}>
								<TbRefresh
									className={cn('h-full w-full cursor-pointer', {
										'animate-spin-once': isSpinActive,
									})}
								/>
							</button>
						</div>
					</div>

					{/* main and bonus wallet cards */}
					<div className='text-primary-900 space-y-2 rounded-xl bg-gray-200 p-2 text-base font-medium'>
						<div className='flex items-center justify-between'>
							<span>{t('Label_Wallet_MainWallet')}</span>
							<span>{numberFormat(balance || 0, currencyId)}</span>
						</div>

						{/* bonus wallet */}
						{custBonusWallet?.map(item => {
							const { turnover, rollover, promoCategoryId, bonus } = item

							const percentage =
								turnover > rollover
									? 100
									: ((turnover / rollover) * 100).toFixed(2)
							return (
								<div key={promoCategoryId}>
									<div className='flex items-center justify-between'>
										<span>
											{t(`Label_Wallet_BonusWallet_${promoCategoryId}`)}
										</span>
										<span>{bonus}</span>
									</div>

									<div className='flex items-center'>
										{/* TODO:  色票 */}
										<div className='me-2 h-2 w-full overflow-hidden rounded-lg border-[1px] border-[#5574A7]'>
											<div
												className='h-full bg-[#5574A7]'
												style={{ width: `${percentage}%` }}
											></div>
										</div>
										<div className='text-xs font-bold text-[#5574A7]'>
											{percentage}%
										</div>
									</div>
								</div>
							)
						})}
					</div>

					{/* tpWallet cards */}
					{tpWalletBalanceList?.map(({ tpName, balance, tpId }) => (
						<div
							className='text-primary-900 my-2 space-y-2 rounded-xl bg-gray-200 p-2 text-base font-medium'
							key={tpId}
						>
							<div className='flex items-center justify-between'>
								<span>{tpName}</span>
								<span>{numberFormat(balance, currencyId)}</span>
							</div>
						</div>
					))}

					{/* Action Buttons */}
					<div className='mt-6 grid grid-cols-2 place-content-center place-items-center gap-2 text-sm font-medium'>
						<LocaleLink
							href={paths.withdrawal.root}
							className='bg-primary-900 hover:bg-secondary-500 min-w-32 rounded-md p-3 text-center
                          font-semibold text-white transition-opacity duration-200'
						>
							{t('Label_General_Withdrawal')}
						</LocaleLink>
						<LocaleLink
							href={paths.transferFunds.root}
							className='bg-primary-900 hover:bg-secondary-500 min-w-32 rounded-md p-3 text-center
                          font-semibold text-white transition-opacity duration-200'
						>
							{t('Label_General_TransferFunds')}
						</LocaleLink>
					</div>

					{/* Footer Info */}
					<div className='text-primary-900 mt-6 space-y-2 text-xs font-medium'>
						<div className='flex justify-between'>
							<span>{t('Label_General_LastLogin')}</span>
							<span>{dayjs(lastLogin).format('MM/DD/YYYY h:mm A')}</span>
						</div>
						<div className='flex justify-between'>
							<span>{t('Label_General_LastTransaction')}</span>
							<span>
								{lastTransaction &&
									dayjs(lastTransaction).format('MM/DD/YYYY h:mm A')}
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Wallet
