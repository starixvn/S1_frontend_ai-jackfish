'use client'

import { getIpCountry } from 'JF-api/site/client'
import { paths } from 'JF-constants'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

export default function MainLayout({ children }: { children: ReactNode }) {
	const { isLoading, ipCountryData } = getIpCountry()
	const { isAccess } = ipCountryData || {}

	// fetching 完成且不可進入導回首頁
	if (!isLoading && !isAccess) {
		redirect(paths.blockIp.root)
	}
	return (
		<>
			{children}
			<ToastContainer />
		</>
	)
}
