'use client'

import { getIpCountry } from 'JF-api/site/client'
import { paths } from 'JF-constants'
import { redirect } from 'next/navigation'
import NextTopLoader from 'nextjs-toploader'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css/bundle'
import '../style/global.css'

export default function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: {
		locale: string
	}
}) {
	const { isLoading, ipCountryData } = getIpCountry()
	const { isAccess } = ipCountryData || {}

	// fetching 完成且不可進入導回首頁
	if (!isLoading && !isAccess) {
		redirect(paths.blockIp.root)
	}
	return (
		<html lang={locale}>
			<body className='bg-tertiary-500 mx-auto lg:bg-neutral-500'>
				<NextTopLoader
					color='rgb(var(--color-primary-300))'
					showSpinner={false}
				/>
				{children}
			</body>
		</html>
	)
}
