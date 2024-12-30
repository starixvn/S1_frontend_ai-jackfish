'use client'

import { paths } from 'JF-constants'
import { bannerUrl, LocaleLink } from 'JF-core'

export default function Logo() {
	// const { showSpLogo } = useHeaderLogo({
	// 	mainLogoUrl: {
	// 		original: bannerUrl(`/desktop/img/4.0/logo_w_noline.png`),
	// 		special: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/logo-mid.png`,
	// 	},
	// })

	return (
		<div className='col-span-4 flex items-center justify-center gap-2 md:col-span-3 lg:col-span-2 lg:gap-4'>
			<LocaleLink href={paths.home.root} className='lg:w-36'>
				<img
					src={bannerUrl(`/desktop/img/4.0/logo_w_noline.png`)}
					alt='Nova88 Logo'
					className='h-full w-full'
				/>
			</LocaleLink>

			{/* noble888暫沒有sponsor logo */}
			{/* <div className='h-6 w-[1px] bg-white lg:h-12'></div>
			{showSpLogo && (
				<div className='lg:w-16'>
					<img
						src={bannerUrl('/desktop/img/4.0/sp-aston-villa.png')}
						alt='sponsor Logo'
						className='h-full w-full'
					/>
				</div>
			)} */}
		</div>
	)
}
