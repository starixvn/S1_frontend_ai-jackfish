'use client'
import {
	FOOTER_NAV_LEFT_DATA,
	FOOTER_NAV_RIGHT_DATA,
	IFooterNavProps,
} from '@brand01/src/data/layout/footer'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { imageUrl, useGetPathname } from 'JF-core'
import Link from 'next/link'
import React from 'react'
import { paths } from 'JF-constants'

const FooterNav = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	return (
		<div className='mx-auto my-0 flex lg:hidden'>
			<div
				className='fixed bottom-0 left-0 right-0 z-30 flex h-16 w-full shadow-2xl'
				style={{ boxShadow: '0px 0px 20px 1px #cccccc' }}
			>
				{/* 左邊兩個 */}
				<div className='z-10 mr-[70px] flex w-full flex-1 items-center rounded-tr-2xl rounded-tl-lg bg-neutral-500'>
					{FOOTER_NAV_LEFT_DATA.map((value: IFooterNavProps) => {
						const { displayKey, pathname, iconPath } = value

						return (
							<div
								role='button'
								key={displayKey}
								className='flex w-1/2 items-center justify-center'
							>
								<Link
									href={pathname}
									className='text-sk-grey-400 flex h-10 w-10 flex-col items-center justify-center text-center'
								>
									<img
										src={imageUrl(iconPath)}
										alt={`icon-${displayKey}`}
										className='h-full w-full'
									/>
									<div className='text-body-sm font-subtitle dark:text-sk-grey-400 mt-1 whitespace-nowrap text-xs text-neutral-100'>
										{t(displayKey)}
									</div>
								</Link>
							</div>
						)
					})}
				</div>

				{/* HOME ＬＯＧＯ */}
				<div className='absolute left-1/2 bottom-4 z-20 h-20 w-20 translate-x-[-50%] rounded-full bg-neutral-500 p-2'>
					<Link
						href={paths.home.root}
						className='absolute left-1/2 bottom-8 h-16 w-16 translate-x-[-50%]'
					>
						<img
							src={imageUrl('/desktop/img/home.png')}
							alt='icon-home'
							className='h-full w-full'
						/>

						<div className='text-body-sm font-subtitle dark:text-sk-grey-400 whitespace-nowrap text-xs text-neutral-100'>
							{t('Label_General_Home')}
						</div>
					</Link>
				</div>
				{/* 為了透明border的墊背圖 */}
				<div className='absolute bottom-0 left-1/2 -z-10 h-14 w-full translate-x-[-50%]'>
					<img
						className='h-full w-full'
						src='/img/footer/footer-bg-01.svg'
						alt=''
					/>
				</div>

				{/* 右邊兩個 */}
				<div className='z-10 ml-5 flex w-full flex-1 items-center rounded-tl-2xl rounded-tr-lg bg-neutral-500'>
					{FOOTER_NAV_RIGHT_DATA.map(value => {
						const { displayKey, pathname, iconPath } = value

						return (
							<div
								role='button'
								key={displayKey}
								className='flex w-1/2 items-center justify-center'
							>
								<Link
									href={pathname}
									className='text-sk-grey-400 flex h-10 w-10 flex-col items-center justify-center text-center'
								>
									<img
										src={imageUrl(iconPath)}
										alt={`icon-${displayKey}`}
										className='h-full w-full'
									/>
									<div className='text-body-sm font-subtitle dark:text-sk-grey-400 mt-1 whitespace-nowrap text-xs text-neutral-100'>
										{t(displayKey)}
									</div>
								</Link>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default FooterNav
