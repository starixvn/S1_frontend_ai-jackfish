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
				className='fixed bottom-0 left-0 right-0 z-30 flex w-full bg-neutral-500 px-2 py-4 shadow-2xl'
				style={{ boxShadow: '0px 0px 20px 1px #cccccc' }}
			>
				{/* 左邊兩個 */}
				<div className='mr-4 flex flex-1 items-center justify-evenly'>
					{FOOTER_NAV_LEFT_DATA.map((value: IFooterNavProps) => {
						const { displayKey, pathname, iconPath } = value

						return (
							<div role='button' key={displayKey}>
								<Link
									href={pathname}
									className='text-sk-grey-400 flex h-8 w-8 flex-col items-center justify-center text-center'
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
				<div className='border-primary-300 absolute left-1/2 bottom-5 z-20 h-20 w-20 translate-x-[-50%] rounded-full border-8 border-[#8F43DF] bg-neutral-500 p-2'>
					<Link
						href={paths.home.root}
						className='absolute left-1/2 bottom-6 h-14 w-14 translate-x-[-50%]'
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

				{/* 右邊兩個 */}
				<div className='ml-4 flex flex-1 items-center justify-evenly'>
					{FOOTER_NAV_RIGHT_DATA.map(value => {
						const { displayKey, pathname, iconPath } = value

						return (
							<div role='button' key={displayKey}>
								<Link
									href={pathname}
									className='text-sk-grey-400 flex h-8 w-8 flex-col items-center justify-center text-center'
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
