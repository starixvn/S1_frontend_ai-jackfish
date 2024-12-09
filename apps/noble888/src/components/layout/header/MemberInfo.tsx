'use client'

import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import { cn, imageUrl, useIconSpin } from 'JF-core'
import useDevice from 'libs/core/src/lib/hooks/useDevice'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io'
import { IoMailSharp } from 'react-icons/io5'
import { TbRefresh } from 'react-icons/tb'

const MemberInfo = () => {
	const { t } = useClientTranslation()
	const { isSpinActive, onIconSpin } = useIconSpin()
	const isMobile = useDevice('mobile')

	const handleRefetchWallet = () => {
		onIconSpin()
	}
	return (
		<>
			{isMobile ? (
				<div className='text-primary-50'>
					<p className='text-xs'>{t('Label_General_Hello')}, wentestvnd02</p>
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
								src={imageUrl('/desktop/img/4.0/minus.png')}
								alt='down-icon'
							/>
						</button>
					</div>
				</div>
			) : (
				<>
					<div className='h-10 w-10'>
						<img
							src={imageUrl('/desktop/img/4.0/header-vintage.png')}
							alt='VIP Badge'
							className='h-full w-full'
						/>
					</div>
					<div className='text-primary-50'>
						<div className='flex cursor-pointer items-center gap-1'>
							<span className='text-primary-50'>
								{t('Label_General_Hello')}, wentestvnd02
							</span>
							<div className='h-4 w-3'>
								<IoIosArrowDown className='h-full w-full' />
							</div>
						</div>
						<div className='flex items-center gap-2'>
							<div className='h-4 w-4 rounded-full bg-[#c8600b]'></div>
							<span>VINTAGE</span>
						</div>
					</div>
					<Link href={paths.message.root} className='w-7'>
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
									src={imageUrl('/desktop/img/4.0/minus.png')}
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
				</>
			)}
		</>
	)
}

export default MemberInfo
