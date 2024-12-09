'use client'

import { useClientTranslation } from '@noble888/src/i18n/client'
import { footerImgName, IFooterData } from 'JF-constants'
import { imageUrl } from 'JF-core'
import { useAuthStore, useSocialChannelStore } from 'JF-operations'
import { ISeoData } from 'libs/operations/src/lib/seo/type'
import { debounce, upperFirst } from 'lodash-es'
import Link from 'next/link'
import { useEffect } from 'react'
import License from './License'

interface FooterCenterProps {
	quickLinks: IFooterData['quickLinks']
	licenseData: IFooterData['licenseData']
	seoData: ISeoData
	suggestedBrowser: IFooterData['suggestedBrowser']
	paymentMethodsByCurrencyId: IFooterData['paymentMethodsByCurrencyId']
}

/** `quickLinks` 中的前八個鏈結為 Footer 顯示用 */
enum LinkEnum {
	AboutUs,
	TermsOfUse,
	ResponsibleGaming,
	ComplaintsAndArbitration,
	TermsConditions,
	AmlKycConditions,
	PaymentPolicy,
	PrivacyPolicy,
}

const linkGroups = [
	[LinkEnum.AboutUs, LinkEnum.TermsOfUse],
	[LinkEnum.ResponsibleGaming, LinkEnum.ComplaintsAndArbitration],
	[LinkEnum.TermsConditions, LinkEnum.AmlKycConditions],
	[LinkEnum.PaymentPolicy, LinkEnum.PrivacyPolicy],
]

const debouncedGetSocialChannels = debounce(
	(getSocialChannels, langId, currencyId) => {
		getSocialChannels({ langId, currencyId })
	},
	300,
)

const FooterCenter = ({
	quickLinks,
	licenseData: { defaultScript },
	seoData,
	suggestedBrowser,
	paymentMethodsByCurrencyId,
}: FooterCenterProps) => {
	const { t } = useClientTranslation()
	const {
		userInfo: { currencyId, langId },
	} = useAuthStore()
	const year = new Date().getFullYear()
	const site = upperFirst(process.env['NEXT_PUBLIC_SITE_NAME'])
	const { socialChannels, getSocialChannels } = useSocialChannelStore()
	const paymentMethods = paymentMethodsByCurrencyId?.[currencyId]

	useEffect(() => {
		debouncedGetSocialChannels(getSocialChannels, langId, currencyId)
		// 清理函數
		return () => {
			debouncedGetSocialChannels.cancel()
		}
	}, [currencyId, getSocialChannels, langId])

	if (!paymentMethods || paymentMethods.length === 0) {
		return null
	}

	return (
		<div className='bg-primary-900 text-primary-50 px-10 pt-6 lg:px-28'>
			{/* footer-top */}
			<div className='grid grid-cols-1 lg:grid-cols-4 lg:border-b lg:border-gray-500 lg:border-opacity-50 lg:pb-6'>
				<div className='col-span-3 hidden gap-20 text-sm font-semibold lg:flex'>
					{linkGroups.map(group => (
						<div key={group[0]} className='flex flex-col gap-y-2'>
							{group.map(linkKey => (
								<a
									className='flex flex-col'
									href={quickLinks?.[linkKey]?.href}
									key={linkKey}
									target='_blank'
									rel='noreferrer'
								>
									{t(quickLinks?.[linkKey]?.displayKey ?? '')}
								</a>
							))}
						</div>
					))}
				</div>

				<div className='flex justify-center lg:justify-end'>
					<div className='flex flex-wrap items-center justify-center gap-4 lg:flex-nowrap lg:gap-2'>
						{/* Social Media Icons */}
						{socialChannels.map(item => {
							const { link, channelName, title } = item
							return (
								<Link key={channelName} href={link} className='h-10 w-10'>
									<img
										className='h-full w-full'
										src={imageUrl(
											`/desktop/img/4.0/${footerImgName[channelName]}`,
										)}
										alt={title}
									/>
								</Link>
							)
						})}
					</div>
				</div>
			</div>

			<div className='mt-8 grid-cols-1 gap-8 text-sm font-semibold lg:grid lg:grid-cols-3 lg:border-b lg:border-gray-500 lg:border-opacity-50 lg:pb-6'>
				{/* Gaming License */}
				<License seoData={seoData} defaultScript={defaultScript} />

				{/* Suggested Browser */}
				<div className='hidden lg:block'>
					<h3 className='mb-2 font-bold'>{t('Label_Suggested_Browser')}</h3>
					<div className='flex gap-2'>
						{suggestedBrowser?.map(item => {
							const { alt, imageSrc } = item
							return (
								<div key={alt} className='h-12 w-12'>
									<img className='h-full w-full' src={imageSrc} alt={alt} />
								</div>
							)
						})}
					</div>
				</div>

				{/* Payment Methods */}
				<div className='hidden lg:block'>
					<h3 className='mb-2 font-bold'>{t('Label_Payment_Method')}</h3>
					{/* Add payment method icons here */}
					<div className='flex flex-wrap gap-4'>
						{paymentMethods?.map(item => {
							const { name, img } = item
							return (
								<div key={name} className='h-10 w-10'>
									<img
										className='h-full w-full rounded-md'
										src={img}
										alt={name}
									/>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{/* copyright */}
			<div className='hidden text-start lg:block lg:py-10'>
				<p> {t('Label_Footer_Copyright', { year, site })}</p>
			</div>
		</div>
	)
}

export default FooterCenter
