'use client'

import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import { bannerUrl, LocaleLink, useLocaleRouter } from 'JF-core'
import { useAuthStore, useModalStore } from 'JF-operations'
import dynamic from 'next/dynamic'
import React from 'react'

const LoginModal = dynamic(() => import('../customModals/LoginModal'), {
	ssr: false,
})

const WelcomeInfo: React.FC = () => {
	const { t } = useClientTranslation()
	// const { onMenuOpen } = useMenuOpen()
	const router = useLocaleRouter()
	const { isLogin } = useAuthStore()
	const { openModal } = useModalStore()
	// TODO winning open，affiliate onClick
	// 開法跟 menuData 內定義的不同，故另外寫物件餵給 onMenuOpen
	// const sportSoccerItem = {
	// 	...PRODUCTS.Soccer,
	// 	desktop: {
	// 		menuActionType: MenuActionTypeEnum.EnterPage,
	// 	},
	// }

	const handleReferralClick = () => {
		if (!isLogin) {
			openModal({
				content: <LoginModal />,
			})
			return
		}
		router.push(paths.referral.root)
	}

	return (
		<div className='mt-7 hidden justify-center gap-5 lg:flex'>
			{isLogin ? (
				<div className='relative'>
					<img
						className='rounded-b-[1.25rem]'
						src={bannerUrl('/desktop/img/4.0/welcome-affiliate.png')}
						alt='welcome-affiliate'
					/>
					<div className='absolute bottom-0 grid w-full grid-cols-1 gap-8 px-9 text-center'>
						<div className='h-16'>
							<div className='text-lg font-semibold'>
								{t('Label_General_Affiliate')}
							</div>
							<div className='mt-1 text-sm text-gray-500'>
								{t('Label_Affiliate_Program_desc')}
							</div>
						</div>
						<div className='h-12 px-7'>
							<button className='bg-secondary-500 h-full w-full rounded-t-3xl px-10 text-center text-lg font-semibold'>
								{t('Label_General_MoreInfo')}
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className='relative'>
					<img
						className='rounded-b-[1.25rem]'
						src={bannerUrl('/desktop/img/4.0/welcome-join.png')}
						alt='welcome-join'
					/>
					<div className='absolute bottom-0 grid w-full grid-cols-1 gap-8 px-9 text-center'>
						<div className='h-16'>
							<div className='text-lg font-semibold'>
								{t('Label_General_Join')}
							</div>
							<div className='mt-1 text-sm text-gray-500'>
								{t('Label_Home_JoinDescription')}
							</div>
						</div>
						<LocaleLink href={paths.join.root} className='h-12 px-7'>
							<button className='bg-secondary-500 h-full w-full rounded-t-3xl px-10 text-center text-lg font-semibold'>
								{t('Label_General_MoreInfo')}
							</button>
						</LocaleLink>
					</div>
				</div>
			)}
			<div className='relative'>
				<img
					className='rounded-b-[1.25rem]'
					src={bannerUrl('/desktop/img/4.0/welcome-winning.png')}
					alt='welcome-winning'
				/>
				<div className='absolute bottom-0 grid w-full grid-cols-1 gap-8 px-9 text-center'>
					<div className='h-16'>
						<div className='text-lg font-semibold'>
							{t('Label_Home_StartWinning')}
						</div>
						<div className='mt-1 text-sm text-gray-500'>
							{t('Label_Home_StartWinningDescription')}
						</div>
					</div>
					<div className='h-12 px-7'>
						<button
							className='bg-secondary-500 h-full w-full rounded-t-3xl px-10 text-center text-lg font-semibold'
							// onClick={() => {
							// 	onMenuOpen(sportSoccerItem, {
							// 		loginCallback: () => {
							// 			router.push(paths.login.root)
							// 		},
							// 	})
							// }}
						>
							{t('Label_General_MoreInfo')}
						</button>
					</div>
				</div>
			</div>
			<div className='relative'>
				<img
					className='rounded-b-[1.25rem]'
					src={bannerUrl('/desktop/img/4.0/welcome-vip.png')}
					alt='welcome-vip'
				/>
				<div className='absolute bottom-0 grid w-full grid-cols-1 gap-8 px-9 text-center'>
					<div className='h-16'>
						<div className='text-lg font-semibold'>
							{t('Label_Home_GetReward')}
						</div>
						<div className='mt-1 text-sm text-gray-500'>
							{t('Label_Home_GetRewardDescription')}
						</div>
					</div>
					<LocaleLink href={paths.promotion.root} className='h-12 px-7'>
						<button className='bg-secondary-500 h-full w-full rounded-t-3xl px-10 text-center text-lg font-semibold'>
							{t('Label_General_MoreInfo')}
						</button>
					</LocaleLink>
				</div>
			</div>
			<div className='relative'>
				<img
					className='rounded-b-[1.25rem]'
					src={bannerUrl('/desktop/img/4.0/welcome-referral.png')}
					alt='welcome-referral'
				/>
				<div className='absolute bottom-0 grid w-full grid-cols-1 place-content-between gap-8 px-9 text-center'>
					<div className='h-16'>
						<div className='text-lg font-semibold'>
							{t('Label_Home_SimpleReferral')}
						</div>
						<div className='mt-1 text-sm text-gray-500'>
							{t('Label_Home_SimpleReferralDescription')}
						</div>
					</div>
					<div className='h-12 px-7'>
						<button
							className='bg-secondary-500 h-full w-full rounded-t-3xl px-10 text-center text-lg font-semibold'
							onClick={handleReferralClick}
						>
							{t('Label_General_MoreInfo')}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WelcomeInfo
