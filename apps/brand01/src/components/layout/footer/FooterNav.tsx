'use client'

import {
	FOOTER_NAV_DATA,
	IFooterNavProps,
} from '@brand01/src/data/layout/footer'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { paths } from 'JF-constants'
import { LocaleLink, imageUrl, useGetPathname } from 'JF-core'
import { useSocialChannelStore } from 'JF-operations'

const FooterButton: React.FC<IFooterNavProps> = ({
	label,
	pathname,
	iconPath,
}) => (
	<div className='flex w-1/2 items-center justify-center'>
		<LocaleLink
			href={pathname}
			className='flex w-10 flex-col items-center justify-center text-center'
		>
			<img
				className='h-full w-full'
				src={imageUrl(iconPath)}
				alt={`icon-${label}`}
			/>
			<div className='mt-1 whitespace-nowrap text-xs font-medium'>{label}</div>
		</LocaleLink>
	</div>
)

const FooterNav = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { lineChannel } = useSocialChannelStore()

	return (
		<div className='mx-auto my-0 flex lg:hidden'>
			<div className='fixed bottom-0 left-0 right-0 z-30 flex h-16 w-full shadow-[0_0_20px_1px_rgb(var(--color-neutral-100)/0.5)]'>
				{/* 左邊 icon */}
				<div className='z-10 mr-[70px] flex w-full flex-1 items-center rounded-tr-2xl rounded-tl-lg bg-neutral-500'>
					<div className='flex w-1/2 items-center justify-center'>
						<a
							href={lineChannel.link}
							className='flex w-10 flex-col items-center justify-center text-center'
							target='_blank'
							rel='noopener noreferrer'
						>
							<img
								className='h-full w-full'
								src={imageUrl('/img/mobile-footer/icon-line.png')}
								alt='icon-line'
							/>
							<div className='mt-1 whitespace-nowrap text-xs font-medium'>
								{t('Label_General_LinePay')}
							</div>
						</a>
					</div>
					{FOOTER_NAV_DATA.left.map(({ label, pathname, iconPath }) => {
						return (
							<FooterButton
								key={label}
								label={t(label)}
								pathname={pathname}
								iconPath={iconPath}
							/>
						)
					})}
				</div>

				{/* HOME LOGO */}
				<div className='absolute left-1/2 bottom-4 z-20 h-20 w-20 translate-x-[-50%] rounded-full bg-neutral-500 p-2 shadow-[0_0_20px_1px_rgb(var(--color-neutral-100)/0.5)]'>
					<LocaleLink
						href={paths.home.root}
						className='absolute left-1/2 bottom-8 h-16 w-16 translate-x-[-50%]'
					>
						<img
							src={imageUrl('/img/mobile-footer/icon-home.png')}
							alt='icon-home'
							className='h-full w-full'
						/>
						<div className='whitespace-nowrap text-xs font-medium'>
							{t('Label_General_Home')}
						</div>
					</LocaleLink>
				</div>

				{/* 為了透明 border 的墊背圖 */}
				<div className='absolute bottom-0 left-1/2 -z-10 h-14 min-w-[470px] translate-x-[-50%]'>
					<img
						className='h-full w-full'
						src='/img/footer/footer-bg-01.svg'
						alt=''
					/>
				</div>

				<div className='z-10 ml-5 flex w-full flex-1 items-center rounded-tl-2xl rounded-tr-lg bg-neutral-500'>
					{FOOTER_NAV_DATA.right.map(({ label, pathname, iconPath }) => {
						return (
							<FooterButton
								key={label}
								label={t(label)}
								pathname={pathname}
								iconPath={iconPath}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default FooterNav
