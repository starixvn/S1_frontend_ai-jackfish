'use client'

import Layout from '@noble888/src/components/layout'
import { fallbackLng, languages } from '@noble888/src/i18n/settings'
import { getIpCountry } from 'JF-api/site/client'
import { LangId, langId, paths } from 'JF-constants'
import { useGetPathname } from 'JF-core'
import { toUpper } from 'lodash-es'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: LangId }
}) {
	if (!languages.includes(locale)) locale = fallbackLng
	return {
		title: `${toUpper(`${process.env.NEXT_PUBLIC_SITE_NAME}`)}`,
		description: `Welcome to ${toUpper(`${process.env.NEXT_PUBLIC_SITE_NAME}`)}`,
		icons: { icon: `${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/favicon.ico` },
	}
}

export default function MainLayout({ children }: { children: ReactNode }) {
	const { isLoading, ipCountryData } = getIpCountry()
	const { isAccess } = ipCountryData || {}
	const { locale } = useGetPathname()

	// fetching 完成且不可進入導回首頁
	if (!isLoading && !isAccess) {
		redirect(paths.blockIp.root)
	}

	return (
		<html dir={locale === langId.ar ? 'rtl' : 'ltr'}>
			<body>
				<Layout>{children}</Layout>
			</body>
		</html>
	)
}
