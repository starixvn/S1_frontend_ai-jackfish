'use client'

import Layout from '@noble888/src/components/layout'
import { getIpCountry } from 'JF-api/site/client'
import { paths } from 'JF-constants'
import { useGetPathname } from 'JF-core'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
	const { isLoading, ipCountryData } = getIpCountry()
	const { isAccess } = ipCountryData || {}
	const { locale } = useGetPathname()

	// fetching 完成且不可進入導回首頁
	if (!isLoading && !isAccess) {
		redirect(paths.blockIp.root)
	}

	// 	TODO: 有sign in功能之後再加上
	return (
		<html dir={locale === 'ar' ? 'rtl' : 'ltr'}>
			<body>
				<Layout isSignedIn={false}>{children}</Layout>
			</body>
		</html>
	)
}
