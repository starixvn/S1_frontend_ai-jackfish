'use client'
import { FOOTER_DATA } from 'JF-constants'
import { useAuthStore } from 'JF-operations'
import useDevice from 'libs/core/src/lib/hooks/useDevice'
import { useSeoStore } from 'libs/operations/src/lib/seo/store'
import { useEffect } from 'react'
import FooterBottom from './FooterBottom'
import FooterCenter from './FooterCenter'
import FooterNavigation from './FooterNavigation'
import FooterNavH5 from './footerNavH5'
interface FooterProps {
	isLogin: boolean
}

export default function Footer({ isLogin }: FooterProps) {
	const isMobile = useDevice('mobile')
	const {
		userInfo: { currencyId, langId },
	} = useAuthStore()
	const { fetchSeoData, seoData } = useSeoStore()
	const {
		quickLinks,
		licenseData,
		suggestedBrowser,
		paymentMethodsByCurrencyId,
		promotionTextList,
	} = FOOTER_DATA({ langId, currencyId })

	useEffect(() => {
		fetchSeoData({ langId })
	}, [fetchSeoData, langId])

	return (
		<div className='relative w-full'>
			{/* footer-navigation */}
			<FooterNavigation />

			{/* footer-center */}
			<FooterCenter
				quickLinks={quickLinks}
				licenseData={licenseData}
				seoData={seoData}
				suggestedBrowser={suggestedBrowser}
				paymentMethodsByCurrencyId={paymentMethodsByCurrencyId}
			/>

			{/* footer-bottom */}
			<FooterBottom isLogin={isLogin} promotionTextList={promotionTextList} />

			{/* Login && h5 才有的footer功能列 */}
			{isMobile && isLogin && <FooterNavH5 />}
		</div>
	)
}
