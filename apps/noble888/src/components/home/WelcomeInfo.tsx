'use client'

import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import { bannerUrl, LocaleLink, useLocaleRouter } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import React from 'react'

const WelcomeInfo: React.FC = () => {
	const { t } = useClientTranslation()
	// const { onMenuOpen } = useMenuOpen()
	const router = useLocaleRouter()
	const { isLogin } = useAuthStore()

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
			// TODO loginCallback
			return
		}
		router.push(paths.referral.root)
	}

	return (
		<div className='mx-auto mt-7 hidden max-w-[88vw] justify-center gap-8 lg:flex'>
			{isLogin ? (
				<div className='relative'>
					<img
						className='rounded-b-[1.25rem]'
						src={bannerUrl('/desktop/img/4.0/welcome-affiliate.png')}
						alt='welcome-affiliate'
					/>
					<div className='absolute bottom-16 h-14 w-full px-12 text-center'>
						<div className='text-primary-600 text-xl'>
							{t('Label_General_Affiliate')}
						</div>
						<div className='mt-1 text-xs text-gray-600'>
							{t('Label_Affiliate_Program_desc')}
						</div>
					</div>
					<div className='absolute bottom-0 w-full px-10 text-center'>
						<button className='bg-primary-600 h-10 rounded-t-[1.25rem] px-10 text-center text-white'>
							{t('Label_General_MoreInfo')}
						</button>
					</div>
				</div>
			) : (
				<div className='relative'>
					<img
						className='rounded-b-[1.25rem]'
						src={bannerUrl('/desktop/img/4.0/welcome-join.png')}
						alt='welcome-join'
					/>
					<div className='absolute bottom-16 h-14 w-full px-12 text-center'>
						<div className='text-primary-600 text-xl'>
							{t('Label_General_Join')}
						</div>
						<div className='mt-1 text-xs text-gray-600'>
							{t('Label_Home_JoinDescription')}
						</div>
					</div>
					<LocaleLink
						href={paths.join.root}
						className='absolute bottom-0 w-full px-10 text-center'
					>
						<button className='bg-primary-600 h-10 rounded-t-[1.25rem] px-10 text-center text-white'>
							{t('Label_General_MoreInfo')}
						</button>
					</LocaleLink>
				</div>
			)}
			<div className='relative'>
				<img
					className='rounded-b-[1.25rem]'
					src={bannerUrl('/desktop/img/4.0/welcome-winning.png')}
					alt='welcome-winning'
				/>
				<div className='absolute bottom-16 h-14 w-full px-12 text-center'>
					<div className='text-success-500 text-xl'>
						{t('Label_Home_StartWinning')}
					</div>
					<div className='mt-1 text-xs text-gray-600'>
						{t('Label_Home_StartWinningDescription')}
					</div>
				</div>
				<div className='absolute bottom-0 w-full px-10 text-center'>
					<button
						className='bg-success-500 h-10 rounded-t-[1.25rem] px-10 text-center text-white'
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
			<div className='relative'>
				<img
					className='rounded-b-[1.25rem]'
					src='https://banner.0814media.net/desktop/img/4.0/welcome-vip.png'
					alt='welcome-vip'
				/>
				<div className='absolute bottom-16 h-14 w-full px-12 text-center'>
					<div className='text-danger-500 text-xl'>
						{t('Label_Home_GetReward')}
					</div>
					<div className='mt-1 text-xs text-gray-600'>
						{t('Label_Home_GetRewardDescription')}
					</div>
				</div>
				<LocaleLink
					href={paths.promotion.root}
					className='absolute bottom-0 w-full px-10 text-center'
				>
					<button className='bg-danger-500 h-10 rounded-t-[1.25rem] px-10 text-center text-white'>
						{t('Label_General_MoreInfo')}
					</button>
				</LocaleLink>
			</div>
			<div className='relative'>
				<img
					className='rounded-b-[1.25rem]'
					src='https://banner.0814media.net/desktop/img/4.0/welcome-referral.png'
					alt='welcome-referral'
				/>
				<div className='absolute bottom-16 h-14 w-full px-12 text-center'>
					<div className='text-xl text-purple-600'>
						{t('Label_Home_SimpleReferral')}
					</div>
					<div className='mt-1 text-xs text-gray-600'>
						{t('Label_Home_SimpleReferralDescription')}
					</div>
				</div>
				<div className='absolute bottom-0 w-full px-10 text-center'>
					<button
						className='h-10 rounded-t-[1.25rem] bg-purple-600 px-10 text-center text-white'
						onClick={handleReferralClick}
					>
						{t('Label_General_MoreInfo')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default WelcomeInfo
