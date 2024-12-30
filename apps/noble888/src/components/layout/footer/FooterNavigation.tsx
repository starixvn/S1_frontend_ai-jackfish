'use client'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { paths } from 'JF-constants'
import { bannerUrl } from 'JF-core'
import Link from 'next/link'

const FooterNavigation = () => {
	const { t } = useClientTranslation()
	return (
		<div className='hidden items-center justify-center gap-20 bg-gray-900 text-sm font-medium lg:flex lg:py-5'>
			<a
				href='https://aff.nova88mas102.com/?lang=en'
				className='flex items-center gap-2'
			>
				<img
					src={bannerUrl('/desktop/img/4.0/affiliate.png')}
					alt='Affiliate Program logo'
				/>
				<span>{t('Label_Affiliate_Program')}</span>
			</a>
			<a
				href='https://banner.0814media.net/Static/en/ContactUs.html'
				className='flex items-center gap-2'
			>
				<img
					src={bannerUrl('/desktop/img/4.0/contact.png')}
					alt='Contact Us logo'
				/>
				<span>{t('Label_ContactUs')}</span>
			</a>
			<Link href={paths.milestones.root} className='flex items-center gap-2'>
				<img
					src={bannerUrl('/desktop/img/4.0/milestones.png')}
					alt='Milestones logo'
				/>
				<span>{t('Label_General_Milestone')}</span>
			</Link>
		</div>
	)
}

export default FooterNavigation
