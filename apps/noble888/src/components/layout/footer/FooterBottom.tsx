'use client'

import { useClientTranslation } from '@noble888/src/i18n/client'
import { IFooterData, paths } from 'JF-constants'
import { cn, useGetPathname } from 'JF-core'
import { useAuthStore } from 'libs/operations/src/lib/auth/store'
import { Fragment, useState } from 'react'

interface FooterBottomProps {
	promotionTextList: IFooterData['promotionTextList']
}

const FooterBottom = ({ promotionTextList }: FooterBottomProps) => {
	const { t } = useClientTranslation()
	const { currentPath } = useGetPathname()
	const {
		userInfo: { currencyId },
	} = useAuthStore()
	const [isShow, setIsShow] = useState(false)

	return (
		<div
			className={cn(
				'bg-secondary-400 text-primary-50 px-3 py-6 pb-28 text-start lg:px-28 lg:pb-6',
				{
					// 'pb-28': isLogin,
					'hidden lg:block': paths.home.root !== currentPath,
				},
			)}
		>
			{/* mobile */}
			<div className='text-center lg:hidden'>
				<a
					href='https://aff.nova88mas102.com/?lang=en'
					target='_blank'
					className='text-xs font-semibold lg:mb-2'
				>
					Affiliate Program
				</a>
				<div className='text-xs lg:leading-5'>
					Nova88 uses cookies to enhance your website experience. By staying on
					the website, you agree to the use of these cookies.
				</div>
			</div>

			{/* desktop */}
			{isShow ? (
				<div className='hidden lg:block'>
					<button
						className='text-xs font-semibold underline'
						onClick={() => setIsShow(false)}
					>
						{t('Label_HideInfo')}
					</button>
					{promotionTextList?.map(({ title, content }) => (
						<Fragment key={title}>
							<h1>{t(title)}</h1>
							<p>{t(content)}</p>
							<br />
						</Fragment>
					))}
				</div>
			) : (
				<div className='hidden lg:block'>
					<h3 className='font-semibold lg:mb-2'>
						{t(`Label_Sports_Betting_Online_${currencyId}`)}
					</h3>
					<div className='text-xs lg:leading-5'>
						{t(`Label_Sports_Betting_Online_Desc`)}
						<button
							className='font-semibold underline lg:mx-2'
							onClick={() => setIsShow(true)}
						>
							{isShow ? null : `${t('Label_General_ReadMore')} >`}
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default FooterBottom
