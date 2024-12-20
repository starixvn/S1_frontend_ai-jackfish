'use client'

import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import { LocaleLink, bannerUrl, cn, useIconSpin } from 'JF-core'
import Link from 'next/link'
import { IoMailSharp } from 'react-icons/io5'
import { TbRefresh } from 'react-icons/tb'
import Profile from './Profile'
import Wallet from './Wallet'

const MemberInfo = () => {
	const { t } = useClientTranslation()
	const { isSpinActive, onIconSpin } = useIconSpin()

	const handleRefetchWallet = () => {
		onIconSpin()
	}

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
				<Profile />

				<Link href={paths.message.root} className='h-7 w-7'>
					<IoMailSharp className='h-full w-full text-white' />
				</Link>

				<div className='h-12 w-[1px] bg-white'></div>

				<Wallet
					handleRefetchWallet={handleRefetchWallet}
					isSpinActive={isSpinActive}
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
