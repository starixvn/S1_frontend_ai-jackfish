'use client'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import { LocaleLink, bannerUrl, cn, useGetPathname } from 'JF-core'
import { useBoolean } from 'usehooks-ts'
const FooterNavMobile = () => {
	const { t } = useClientTranslation()
	const { value: isActive, toggle } = useBoolean(false)
	const { currentPath } = useGetPathname()

	return (
		<div className='block lg:hidden'>
			<div className='fixed bottom-0 z-10 mx-auto h-[21.5vw] w-full bg-[url("/img/footer/footer-bg.png")] bg-cover bg-center bg-no-repeat' />

			<div className='fixed bottom-0 z-20 grid w-full grid-cols-5 place-content-center place-items-center  text-sm'>
				<LocaleLink href={paths.home.root} className='w-fit text-center'>
					<img
						className='mx-auto w-[6vw]'
						src={`${bannerUrl(`/h5/img/4.0/footer/home${currentPath === paths.home.root ? '-dark' : ''}.png`)}`}
						alt=''
					/>
					<p
						className={cn('w-full text-xs', {
							'text-[#d1d1d1]': currentPath !== paths.home.root,
							'border-b-2 border-b-[#ff7600]': currentPath === paths.home.root,
						})}
					>
						{t('Label_General_Home')}
					</p>
				</LocaleLink>
				<LocaleLink href={paths.promotion.root} className='w-fit text-center'>
					<img
						className='mx-auto w-[6vw]'
						src={`${bannerUrl(`/h5/img/4.0/footer/gift${currentPath === paths.promotion.root ? '-dark' : ''}.png`)}`}
						alt=''
					/>
					<p
						className={cn('text-xs ', {
							'text-[#d1d1d1]': currentPath !== paths.promotion.root,
							'border-b-2 border-b-[#ff7600]':
								currentPath === paths.promotion.root,
						})}
					>
						{t('Label_General_Promotion')}
					</p>
				</LocaleLink>
				<div className='w-fit'>
					<button
						className={cn(
							'footer-plus relative mt-[-7.5vw] h-[14vw] w-[14vw] flex-[0_0_14vw] rounded-full bg-gradient-to-b from-[#ff973e] to-[#db4300] p-[2vw] shadow-[0_0_5px_#ffae68]',
							{
								'before:rotate-[135deg] after:rotate-[225deg]': isActive,
							},
						)}
						onClick={toggle}
					></button>
				</div>
				<a
					href='https://direct.lc.chat/11638088/1'
					target='_blank'
					className='w-fit'
				>
					<img
						className='mx-auto w-[6vw]'
						src={`${bannerUrl('/h5/img/4.0/footer/livechat.png')}`}
						alt=''
					/>
					<p className='text-xs text-[#d1d1d1]'>
						{t('Label_General_LiveChat')}
					</p>
				</a>
				<LocaleLink href={paths.menu.root} className='w-fit text-center'>
					<img
						className='mx-auto w-[6vw]'
						src={`${bannerUrl(`/h5/img/4.0/footer/me${currentPath === paths.menu.root ? '-dark' : ''}.png`)}`}
						alt=''
					/>
					<p
						className={cn('text-xs ', {
							'text-[#d1d1d1]': currentPath !== paths.menu.root,
							'border-b-2 border-b-[#ff7600]': currentPath === paths.menu.root,
						})}
					>
						{t('Label_General_Me')}
					</p>
				</LocaleLink>
			</div>

			{/* 橘色按鈕打開後顯示灰底選單 */}

			<div
				className={cn(
					'bg-primary-800 fixed bottom-0 flex w-full transform items-start justify-center rounded-tl-[50px] rounded-tr-[50px] transition-all duration-500 ease-in-out',
					{
						'translate-y-full p-0': !isActive,
						'translate-y-0 p-[5vw_23vw_25vw]': isActive,
					},
				)}
			>
				<div className='flex gap-x-8'>
					<LocaleLink href={paths.deposit.root}>
						<div className='mx-auto h-12 w-12 rounded-full bg-white p-2'>
							<img
								src={`${bannerUrl('/h5/img/4.0/footer/deposit.png')}`}
								alt=''
							/>
						</div>
						<p className='text-center text-xs'>{t('Label_General_Deposit')}</p>
					</LocaleLink>
					<LocaleLink href={paths.withdrawal.root}>
						<div className='mx-auto h-12 w-12 rounded-full bg-white p-2'>
							<img
								src={`${bannerUrl('/h5/img/4.0/footer/withdrawal.png')}`}
								alt=''
							/>
						</div>
						<p className='text-center text-xs'>
							{t('Label_General_Withdrawal')}
						</p>
					</LocaleLink>
					<LocaleLink href={paths.transferFunds.root}>
						<div className='mx-auto h-12 w-12 rounded-full bg-white p-2'>
							<img
								src={`${bannerUrl('/h5/img/4.0/footer/transfer.png')}`}
								alt=''
							/>
						</div>
						<p className='text-center text-xs'>
							{' '}
							{t('Label_General_Transfer')}
						</p>
					</LocaleLink>
				</div>
			</div>
		</div>
	)
}

export default FooterNavMobile
