'use client'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import { bannerUrl, cn, LocaleLink } from 'JF-core'
import { useRef } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { TbRefresh } from 'react-icons/tb'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

interface IWalletProps {
	handleRefetchWallet: () => void
	isSpinActive: boolean
}

const Wallet = ({ handleRefetchWallet, isSpinActive }: IWalletProps) => {
	const { t } = useClientTranslation()
	const ref = useRef(null)
	const {
		value: isWalletInfoActive,
		toggle: toggleIsWalletInfoActive,
		setFalse,
	} = useBoolean(false)

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
				<span>VND 187,211.5 (&apos;000)</span>
				<button className='h-4 w-4'>
					<img
						className='h-full w-full cursor-pointer'
						src={bannerUrl('/desktop/img/4.0/minus.png')}
						alt='down-icon'
					/>
				</button>
			</div>

			{isWalletInfoActive && (
				<div className='absolute right-2 top-14 z-10 mx-auto mt-2 w-80 rounded-2xl bg-[#f9f9f9] p-5 shadow-lg'>
					{/* Header */}
					<div className='text-primary-900 mb-2 flex items-center justify-between px-2 text-base font-medium'>
						<span>USD</span>
						<div className='flex items-center gap-1'>
							<span>0</span>
							<button className='h-4 w-4' onClick={handleRefetchWallet}>
								<TbRefresh
									className={cn('h-full w-full cursor-pointer', {
										'animate-spin-once': isSpinActive,
									})}
								/>
							</button>
						</div>
					</div>

					{/* Wallet Cards */}
					<div className='text-primary-900 space-y-2 text-base font-medium'>
						<div className='flex items-center justify-between rounded-xl bg-gray-200 p-2'>
							<span>Main Wallet</span>
							<span>0</span>
						</div>

						<div className='flex items-center justify-between rounded-xl bg-gray-200 p-2'>
							<span>9W Wallet</span>
							<span>0</span>
						</div>
					</div>

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
							<span>Last Login</span>
							<span>12/12/2024 1:48 PM</span>
						</div>
						<div className='flex justify-between'>
							<span>Last Transaction</span>
							<span>12/11/2024 6:43 PM</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Wallet
