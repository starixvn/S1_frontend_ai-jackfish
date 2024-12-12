'use client'

import { ALLOWED_CURRENCIES } from '@noble888/src/data/static'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import { LocaleLink, bannerUrl, cn, useGetPathname, useIconSpin } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { includes } from 'lodash-es'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoMailSharp } from 'react-icons/io5'
import { TbRefresh } from 'react-icons/tb'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'
import Country from './Country'

const MemberInfo = () => {
	const { t } = useClientTranslation()
	const router = useRouter()
	const { currentPath } = useGetPathname()
	const ref = useRef(null)
	const { isSpinActive, onIconSpin } = useIconSpin()
	const {
		value: isMemberInfoActive,
		toggle: toggleIsMemberInfoActive,
		setFalse,
	} = useBoolean(false)
	const { value: isLangActive, toggle: toggleIsLangActive } = useBoolean(false)
	const {
		userInfo: { currencyId },
		onSignOut,
	} = useAuthStore()

	const handleRefetchWallet = () => {
		onIconSpin()
	}

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
			{/* mobile */}
			<div className='text-primary-50 lg:hidden'>
				<LocaleLink href={paths.profile.root} className='text-xs'>
					{t('Label_General_Hello')}, wentestvnd02
				</LocaleLink>
				<div className='flex items-center gap-1'>
					<span className='font-bold'>VND 187,211.5 (&apos;000)</span>
					<button className='h-4 w-4' onClick={handleRefetchWallet}>
						<TbRefresh
							className={cn('h-full w-full cursor-pointer', {
								'animate-spin-once': isSpinActive,
							})}
						/>
					</button>
					<button className='h-4 w-4'>
						<img
							className='h-full w-full cursor-pointer'
							src={bannerUrl('/desktop/img/4.0/minus.png')}
							alt='down-icon'
						/>
					</button>
				</div>
			</div>

			{/* desktop */}
			<div className='hidden gap-4 lg:flex'>
				<div className='h-10 w-10'>
					<img
						src={bannerUrl('/desktop/img/4.0/header-vintage.png')}
						alt='VIP Badge'
						className='h-full w-full'
					/>
				</div>
				<div ref={ref} className='text-primary-50'>
					<div className='relative flex cursor-pointer items-center gap-1'>
						<span
							className='text-primary-50'
							onClick={toggleIsMemberInfoActive}
						>
							{t('Label_General_Hello')}, wentestvnd02
						</span>
						<div className='h-4 w-3'>
							<IoIosArrowDown className='h-full w-full' />
						</div>
						{/* 按下username之後出現的下拉內容 */}
						{isMemberInfoActive && (
							<div className='absolute right-2 top-14 z-10 mt-2 w-72 rounded-2xl bg-[#f9f9f9] p-4 shadow-lg'>
								<div className='text-primary-900 space-y-2 text-sm font-medium'>
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
						<div className='h-4 w-4 rounded-full bg-[#c8600b]'></div>
						<span>VINTAGE</span>
					</div>
				</div>
				<Link href={paths.message.root} className='h-7 w-7'>
					<IoMailSharp className='h-full w-full text-white' />
				</Link>
				<div className='h-12 w-[1px] bg-white'></div>
				<div className='text-primary-50'>
					<div className='flex cursor-pointer items-center gap-1'>
						<span className=''>Balance</span>
						<div className='h-4 w-3'>
							<img
								src='https://banner.0814media.net/desktop/img/4.0/down-1.png'
								alt='Down Arrow'
								className='h-full w-full'
							/>
						</div>
					</div>
					<div className='flex items-center'>
						<button className='h-4 w-4' onClick={handleRefetchWallet}>
							<img
								className={cn('h-full w-full cursor-pointer', {
									'animate-spin-once': isSpinActive,
								})}
								src={'/img/icon/icon-refresh.svg'}
								alt='refresh-icon'
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
				</div>

				<div className='col-span-3 flex items-center justify-end'>
					<button className='text-primary-50 rounded-[50px] bg-orange-500 px-6 py-2'>
						Deposit
					</button>
				</div>
			</div>
		</>
	)
}

export default MemberInfo
